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
    └──────────────────────────┬──────────────────────────────────┘
                               ↓
    ┌─────────────────────────────────────────────────────────────┐
    │  Evidence Builder                                           │
    │  • On claim close: Evidence Package Base + anchor           │
    │  • On route close: Trip Evidence Root + anchor              │
    │  • On dispute: corroboration + ZK + new anchor              │
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
    Evidence Builder
      ↓ on claim close: Evidence Package Base + anchor
      ↓ on route close: Trip Evidence Root + anchor
      ↓ on dispute: corroboration + ZK + new anchor

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

The Ingest API performs nine steps in order:

1. Verifies telemetry key. Looks up the source by X-Telemetry-Key hash.
2. Verifies signature. Ed25519 or ML-DSA over the canonical payload.
3. Deduplicates. Key: SourceId + ClientTimestampUtc + SourceSequence.
4. Converts the source format to EPCIS 2.0. If the source already sends EPCIS, this step is a no-op.
5. Validates the EPCIS structure.
6. Looks up source type and attestation from the source registry. The client never supplies either.
7. Evaluates source identity, attestation, firmware, revocation.
8. Applies Trust Policy. Computes sourceAssurance: E0-E5.
9. Normalizes and enqueues to the Bounded Channel.

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

### Why Conversion Happens at Ingest

Ingest is the single entry point. Converting here means:

- The rest of the system works with one format.
- Sources do not need to change their code.
- Validation rules are consistent.
- Canonicalization and hashing operate on a known structure.

Native clients (browser PWA) send EPCIS 2.0 directly. External trackers (Teltonika, Ruptela) send binary packets over TCP or HTTPS. Mobile apps (Colota, HookTrace) send JSON. Warehouse and customs APIs send their own format.

All of them are converted to EPCIS 2.0 at step 4.

### Authenticate: 7 Dimensions and Level Assignment

Step 6 from the list above, Evaluate source identity, is expanded here.

For each event, the server evaluates seven dimensions of the source.

| Dimension | What it checks | Example |
|-----------|----------------|---------|
| Identity | Who the source is | IMEI, certificate, key ID |
| Authentication | How the source proves identity | Signature verification |
| Integrity | Data validity | Hash match, signed payload |
| Attestation | Hardware or software context | TPM quote, Secure Enclave |
| Metrology | Calibration and accuracy | GPS accuracy ±15m, sensor tolerance |
| Time | Clock accuracy and synchronization | Drift below threshold |
| Provenance | Origin of the data | Gateway channel known |

Each dimension is evaluated independently. The final level is assigned by the weakest link.

#### Level Assignment Rules

    if not Authentication:              E0
    elif not Integrity:                 E1
    elif not Attestation:               E2
    elif not Corroboration:             E3
    elif not Independence (3+ sources): E4
    else:                               E5

The rule is applied in order. The first failing condition determines the level.

#### What Happens at Each Level

| Level | Meaning | Typical source |
|-------|---------|---------------|
| E0 | Manual input, basic authentication | Operator enters data through UI |
| E1 | Authenticated API | Third-party API with key |
| E2 | Signed software | Mobile app with signed payload |
| E3 | Attested device | Tracker with TPM or Secure Element |
| E4 | E3 plus corroboration | Tracker plus warehouse gate API |
| E5 | E4 plus independence | Tracker plus warehouse plus customs |

#### Metrology in Practice

Metrology checks the accuracy reported by the source.

Example:

- GPS tracker reports `accuracy: 15m`.
- The server checks: is this within the acceptable range for this source type?
- If accuracy is missing or out of range, Metrology fails and the level is capped.

Metrology does not request independent measurements. It evaluates the accuracy of one source.

#### Where Corroboration Is Applied

Corroboration is not requested in Authenticate.

Authenticate computes the Own Assurance of a single source. It answers the question: how much can we trust this source on its own?

Corroboration is applied later, by the Evidence Builder, when a claim is formed. The Evidence Builder applies the Trust Policy for that claim and, if corroboration is required, checks for an independent source.

So the flow is:

    Authenticate (Ingest)            → Own Assurance: E3
    Trust Policy applied (Evidence)  → requires E4 with corroboration
    Corroboration checked (Evidence) → warehouse gate API confirms
    Claim Confidence (Evidence)      → PASS, claim level E4

Own Assurance is a property of the source. Claim Confidence is a property of the claim.

#### Source Types and Maximum Own Assurance

Not every source can provide all seven dimensions. The maximum own assurance is capped by the source type.

| Dimension | Truck tracker | Mobile app (third-party) | Browser (PWA) |
|-----------|---------------|--------------------------|---------------|
| Identity | Yes | Partial | Partial |
| Authentication | Yes | Yes | Partial |
| Integrity | Yes | No | No |
| Attestation | Yes | No | No |
| Metrology | Yes | No | No |
| Time | Yes | Partial | No |
| Provenance | Yes | Partial | No |
| Max own assurance | E3 | E2 | E0-E1 |

Own assurance is the level of a single source. It does not change with corroboration.

A claim formed from independent sources can be higher. Two sources at E3 produce a claim at E4. Three independent sources produce E5.

A browser will never reach E3. A truck tracker reaches E3. A third-party mobile app reaches E2 if it signs the payload with a key. Without signing, it stays at E1. It cannot reach E3 because it cannot prove device attestation from Secure Enclave or StrongBox. Most third-party apps do not implement either.

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
| DriverReported Traffic | Yes - Traffic API |
| GeofenceEntered | No |
| TemperatureOutOfRange | No - E4 sensor |
| HarshBrake | No - accelerometer |
| RouteCompleted | No |

If no API is needed, the State Machine proceeds directly to finalization.

If an API is needed, the Enrichment Decider hands the event to the On-Demand Oracle.

In MVP, exceptions are reported by the driver, not detected automatically. The system does not poll external APIs continuously.

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

## Stage 10. Evidence Builder

The Evidence Builder is called by the Orchestrator at three moments.

**On claim close:**

1. Collect claim events.
2. Compute Claim Evidence Root.
3. Compute claim level.
4. Record decision: confirmed or rejected.
5. Assemble Evidence Package Base.
6. Anchor claim root and package in Arweave.

**On route close:**

1. Collect all route events.
2. Compute Trip Evidence Root.
3. Anchor trip root in Arweave.

**On dispute request:**

1. Retroactive corroboration.
2. Independence check in Evidence Graph.
3. Compute final claim level.
4. Generate ZK proof if claim level is E3 or higher.
5. Assemble Evidence Package Full.
6. Anchor Evidence Package Full in Arweave.

The Builder writes to MS SQL tables: Events, EventHashes, MerkleNodes, EvidenceRoots, EvidencePackages, Anchors.

See [Evidence Flow](EVIDENCE_FLOW.md) for the three evidence levels.

## What Is Computed Where

| What | Where | When |
|------|-------|------|
| Own assurance (E0-E5) | Ingest API | On each event |
| Candidate event | Route State Machine | When metrics cross thresholds |
| Enrichment decision | Enrichment Decider | On each candidate event |
| External API result | On-Demand Oracle | On candidate events that require it |
| Claim decision | Route State Machine | After enrichment or skip |
| SLA pause | SLA Engine | When a claim closes |
| Claim level | Evidence Builder | When a claim closes |
| Claim Evidence Root | Evidence Builder | When a claim closes |
| Trip Evidence Root | Evidence Builder | When a route closes |
| Claim anchor | Evidence Builder | When a claim closes |
| Trip anchor | Evidence Builder | When a route closes |
| Corroboration | Evidence Builder | On dispute request |
| Final claim level | Evidence Builder | On dispute request |
| ZK proof | Evidence Builder | On dispute request, if E3 or higher |
| Evidence Package Full anchor | Evidence Builder | On dispute request |

## Related Documents

- [System Map](SYSTEM_MAP.md) - horizontal overview of all layers
- [Architecture](ARCHITECTURE.md) - overall system and modules
- [Data Flow](DATA_FLOW.md) - canonical event flow through all stages
- [Ingest API](INGEST_API.md) - endpoint contract and signing flow
- [SLA DSL](SLA_DSL.md) - rule format and evaluation result
- [Trust Levels](TRUST_LEVELS.md) - how source assurance is computed
- [Evidence Builder](EVIDENCE_BUILDER.md) - implementation specification