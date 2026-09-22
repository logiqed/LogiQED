# LogiQED Event Pipeline

How a single GPS point becomes an SLA decision.

This document is a vertical slice: from the device to the SLA Engine. For horizontal references, see [Architecture](ARCHITECTURE.md), [Data Flow](DATA_FLOW.md), [Ingest API](INGEST_API.md), and [SLA DSL](SLA_DSL.md).

## Pipeline Diagram

    ┌─────────────────────────────────────────────────────────────┐
    │  Device                                                     │
    │  GPS points → `POST /v1/evidence/ingest`                    │
    └──────────────────────────┬──────────────────────────────────┘
                               ↓
    ┌─────────────────────────────────────────────────────────────┐
    │  Ingest API                                                 │
    │  1. Verifies X-Telemetry-Key                                │
    │  2. Verifies signature                                      │
    │  3. Dedup (SourceId + ClientTimestampUtc + SourceSequence)  │
    │  4. Validates EPCIS structure                               │
    │  5. Authenticate: 7 dimensions → E0-E5                      │
    │  6. Applies Trust Policy                                    │
    │  7. Normalizes                                              │
    │  8. Enqueues to Bounded Channel (with E-level attached)     │
    └──────────────────────────┬──────────────────────────────────┘
                               ↓
    ┌─────────────────────────────────────────────────────────────┐
    │  Event Orchestrator                                         │
    │  Reads event with E-level                                   │
    │  For each tripId:                                           │
    │    Route State Machine                                      │
    │    • Evaluates metrics: speed, geofence, time               │
    │    • Creates candidate event                                │
    │    Enrichment Decider → On-Demand Oracle → API              │
    │    State Machine: applies result, finalizes transition      │
    │    Writes checkpoint to SQL                                 │
    └──────────────────────────┬──────────────────────────────────┘
                               ↓
    ┌─────────────────────────────────────────────────────────────┐
    │  SLA Engine                                                 │
    │  • Computes pause in driver working calendar                │
    └─────────────────────────────────────────────────────────────┘

## Pipeline Overview

    Device
      ↓ GPS point, signed
    Ingest API
      ↓ validates, deduplicates, computes trust level
    Bounded Channel
      ↓ in-memory queue, backpressure
    Event Orchestrator
      ↓ one process, many Route State Machines
    Route State Machine
      ↓ evaluates metrics, creates candidate events
    Enrichment Decider
      ↓ decides if external API is needed
    On-Demand Oracle
      ↓ calls Traffic / Weather / Warehouse API
    Route State Machine (continues)
      ↓ applies result, finalizes transition, writes checkpoint
    SLA Engine
      ↓ computes pause in driver working calendar

Each stage is described below.

## Stage 1. Device

Sources that produce telemetry:

- Onboard tracker (device in vehicle, certificate-authenticated)
- Mobile app (third-party, X-Telemetry-Key)
- Browser (PWA, session-authenticated)
- External tracking systems (via adapters)

The device sends signed EPCIS events to `POST /v1/evidence/ingest` with the `X-Telemetry-Key` header.

Payload is approximately 1 KB per packet on average.

## Stage 2. Ingest API

The Ingest API performs eight steps in order:

1. Verifies telemetry key. Looks up the source by X-Telemetry-Key hash.
2. Verifies signature. Ed25519 or ML-DSA over the canonical payload.
3. Deduplicates. Key: SourceId + ClientTimestampUtc + SourceSequence.
4. Validates EPCIS event structure.
5. Looks up source type and attestation from the source registry. The client never supplies either.
6. Evaluates source identity, attestation, firmware, revocation.
7. Applies Trust Policy. Computes sourceAssurance: E0-E5.
8. Normalizes and enqueues to the Bounded Channel.

After step 8 the event carries:

- `sourceId`
- `sourceAssurance` (E0-E5)
- `trustPolicy` result
- canonical position, timestamp, and metadata

The client never supplies the trust level. The server computes it.

### Order of Dedup and Validate

Deduplication runs after signature verification but before structural validation.

Rationale:

- Signature verification is a fast cryptographic check.
- Dedup then runs only on valid events, so retry storms do not pollute the dedup table with unsigned payloads.
- Structural validation is more expensive and runs only on events that are both signed and new.

### Why the Event Carries E-Level Into the Channel

The Ingest API computes sourceAssurance and attaches it to the event before enqueueing. The Orchestrator reads events with the trust level already attached.

This keeps the responsibility for trust computation in one place: the Ingest API. It also means that any consumer of the Channel receives events with a consistent shape.

Moving trust computation later into the Orchestrator is possible if profiling shows the Ingest API is a bottleneck. Optimization is deferred until after the MVP.

## Stage 3. Bounded Channel

The Channel is an in-memory queue with a bounded capacity.

```csharp
    // Program.cs
    var channel = Channel.CreateBounded<Event>(
        new BoundedChannelOptions(capacity: 10_000)
        {
            FullMode = BoundedChannelFullMode.Wait
        });

    // DI registration
    services.AddSingleton(channel);
    services.AddSingleton<IngestService>();
    services.AddHostedService<EventOrchestrator>();
```

The Channel is `System.Threading.Channels.Channel<T>`.

- An in-memory queue inside one process.
- Thread-safe. Multiple producers and consumers can work in parallel.
- Asynchronous. Producers and consumers await, do not block.
- Bounded. Capacity is limited to 10,000 events.
- Backpressure. If the queue is full, the producer waits.

### One Channel, Two Sides

The Channel is one object with two sides:

- `Writer` - used by the producer (Ingest API).
- `Reader` - used by the consumer (Event Orchestrator).

Both sides refer to the same in-memory queue.

The Channel is created once at application startup and injected into both classes. This is what guarantees that the producer and the consumer work with the same queue.

Creating two separate channels would mean the producer writes to one and the consumer reads from another. No data would flow.

### Backpressure in Practice

- The Orchestrator processes events at its own pace.
- The Ingest API writes events as they arrive.
- If events arrive faster than the Orchestrator can process them, the Channel fills up.
- Once full, the Ingest API waits. This propagates backpressure to the device through HTTP latency.
- No event is dropped, and no memory is exhausted.

## Stage 4. Event Orchestrator

The Event Orchestrator is a single Background Service.

It holds a collection of Route State Machines, one per active trip. Each machine is independent. State is persisted to SQL via checkpoints. On restart, all active machines are rebuilt from the latest checkpoint, not from Redis.

For each incoming event:

1. Reads the event from the Channel.
2. Finds the Route State Machine by tripId. Creates one if the trip is new.
3. Passes the event to the State Machine.

The Orchestrator does not compute trust levels. It reads them from the event.

## Stage 5. Route State Machine

The State Machine evaluates the event against its current state.

Checks:

- Position vs route geofences (segment entry and exit).
- Speed vs thresholds (possible delay).
- Direction vs planned route (deviation).
- Time in current state (possible SLA breach).

When a trigger condition is met, the State Machine creates a candidate event, for example `SegmentDelayDetected`.

The candidate event is passed to the Enrichment Decider.

## Stage 6. Enrichment Decider

The Enrichment Decider is a pure function. It determines whether the candidate event requires external confirmation.

Examples:

| Candidate event | API needed |
|-----------------|------------|
| GeofenceEntered | No |
| SegmentDelayDetected | Yes - Traffic API |
| TemperatureOutOfRange | No - E4 sensor |
| HarshBrake | No - accelerometer |
| RouteCompleted | No |

If no API is needed, the State Machine proceeds directly to finalization.

If an API is needed, the Enrichment Decider hands the event to the On-Demand Oracle.

## Stage 7. On-Demand Oracle

The On-Demand Oracle calls the required external API.

The call is made once per incident, not continuously.

Results are returned to the State Machine.

## Stage 8. Route State Machine (continues)

The State Machine applies the result of the external API, if any, and finalizes the transition.

For example:

- Candidate `SegmentDelayDetected` + Traffic API confirmation → `TrafficEntered` → `SLA_PAUSED`.
- Candidate `WeatherDetected` + Weather API confirmation → `WeatherEntered` → `SLA_PAUSED`.

The transition is recorded as a checkpoint in SQL via `RouteStateSnapshots`.

If the segment ends while an exception is still active, the exception is closed at the segment boundary. If the condition persists, a new exception is opened in the next segment.

## Stage 9. SLA Engine

The SLA Engine computes the pause for the active exception.

Rule: the pause is the measured interval between the entered and exited events of the exception, computed in the driver's working calendar, not wall-clock time.

If an entered or exited event falls outside the working calendar, the pause is rounded to the nearest working boundary.

The result is stored with the segment and used later when the route is completed.

## What Is Computed Where

| What | Where | When |
|------|-------|------|
| Source Assurance (E0-E5) | Ingest API | On each event |
| Candidate event | Route State Machine | When metrics cross thresholds |
| Enrichment decision | Enrichment Decider | On each candidate event |
| External API result | On-Demand Oracle | On candidate events that require it |
| Final transition | Route State Machine | After enrichment or skip |
| SLA pause | SLA Engine | When an exception is closed |
| Claim Confidence | Evidence Package Builder | When a dispute or exception requires proof |


## Related Documents

- [Architecture](ARCHITECTURE.md) - overall system and modules
- [Data Flow](DATA_FLOW.md) - canonical event flow through all stages
- [Ingest API](INGEST_API.md) - endpoint contract and signing flow
- [SLA DSL](SLA_DSL.md) - rule format and evaluation result
- [Trust Levels](TRUST_LEVELS.md) - how source assurance is computed