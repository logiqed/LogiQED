# LogiQED System Map

A single-page overview of how LogiQED processes events, computes trust, tracks route state, and produces evidence.

This document is a horizontal slice: all components side by side. For the vertical flow from device to SLA, see [Event Pipeline](EVENT_PIPELINE.md). For module responsibilities, see [Architecture](ARCHITECTURE.md).

## Overview

LogiQED is a pipeline. A GPS point enters the system, is validated and assigned a trust level, becomes a candidate event inside a Route State Machine, and either closes as a clean route or produces an Evidence Package for dispute resolution.

Three layers work together:

- **Trust Layer** — computes source assurance E0-E5.
- **State Layer** — tracks route state and detects exceptions.
- **Evidence Layer** — produces Evidence Packages and Claim Confidence.

## Full Flow Diagram

    ╔═══════════════════════════════════════════════════════════════════════════════════╗
    ║                                    DEVICE                                         ║
    ║  Onboard tracker · Mobile app · Browser PWA · External systems                    ║
    ║  GPS points · CAN bus · Sensor readings · EPCIS events                            ║
    ╚═════════════════════════════════════════┬═════════════════════════════════════════╝
                                              │
                                              │  HTTP POST /v1/evidence/ingest
                                              │  Header: X-Telemetry-Key
                                              ↓
    ╔═══════════════════════════════════════════════════════════════════════════════════╗
    ║  LAYER 1 — TRUST                                                                  ║
    ║                                                                                   ║
    ║  ┌───────────────────────────────┐          ┌────────────────────────────────┐    ║
    ║  │  Ingest API — main flow       │          │  5. AUTHENTICATE               │    ║
    ║  │                               │          │                                │    ║
    ║  │  1. Verify X-Telemetry-Key    │          │  7 dimensions:                 │    ║
    ║  │  2. Verify signature          │          │  · Identity                    │    ║
    ║  │  3. Deduplicate               │  ────►   │  · Authentication              │    ║
    ║  │  4. Validate EPCIS            │          │  · Integrity                   │    ║
    ║  │                               │          │  · Attestation                 │    ║
    ║  │                               │          │  · Metrology                   │    ║
    ║  │                               │          │  · Time                        │    ║
    ║  │                               │  ◄────   │  · Provenance                  │    ║
    ║  │                               │          │                                │    ║
    ║  │                               │          │  Level assignment:             │    ║
    ║  │                               │          │  weakest link rule             │    ║
    ║  │                               │          │                                │    ║
    ║  │                               │          │  not Authentication      → E0  │    ║
    ║  │                               │          │  not Integrity           → E1  │    ║
    ║  │                               │          │  not Attestation         → E2  │    ║
    ║  │                               │          │  not Corroboration       → E3  │    ║
    ║  │                               │          │  not Independence (3+)   → E4  │    ║
    ║  │                               │          │  else                    → E5  │    ║
    ║  │                               │          │                                │    ║
    ║  │                               │          │  ↓ sourceAssurance             │    ║
    ║  │                               │          └────────────────────────────────┘    ║
    ║  │  6. Verify vs Trust Policy    │                                                ║
    ║  │  7. Normalize                 │                                                ║
    ║  │  8. Enqueue to Channel        │                                                ║
    ║  └───────────────────────────────┘                                                ║
    ╚═════════════════════════════════════┬═════════════════════════════════════════════╝
                                          │
                                          │  Event with E-level attached
                                          ↓
    ╔═══════════════════════════════════════════════════════════════════════════════════╗
    ║  TRANSPORT — Bounded Channel                                                      ║
    ║  System.Threading.Channels.Channel<T>                                             ║
    ║  In-memory queue · Backpressure · Capacity 10,000                                 ║
    ║  Writer (Ingest) ──────────► [ queue ] ──────────► Reader (Orchestrator)          ║
    ╚═════════════════════════════════════════┬═════════════════════════════════════════╝
                                          │
                                          │  Read event
                                          ↓
    ╔═══════════════════════════════════════════════════════════════════════════════════╗
    ║  LAYER 2 — STATE                                                                  ║
    ║                                                                                   ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Event Orchestrator (single Background Service)                             │  ║
    ║  │  Holds one Route State Machine per active trip                              │  ║
    ║  │  For each event: find State Machine by tripId                               │  ║
    ║  └────────────────────────────────────┬────────────────────────────────────────┘  ║
    ║                                       │                                           ║
    ║                                       ↓                                           ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Route State Machine (tripId = SHP-802)                                     │  ║
    ║  │  Evaluate: speed · geofence · time · direction                              │  ║
    ║  │                                                                             │  ║
    ║  │  States:                                                                    │  ║
    ║  │    Created → InTransit → SegmentEntered(A-B)                                │  ║
    ║  │    SegmentEntered → TrafficEntered → SLA_PAUSED                             │  ║
    ║  │    SLA_PAUSED → TrafficExited → SLA_RESUMED                                 │  ║
    ║  │    SLA_RESUMED → SegmentExited(A-B) → Completed                             │  ║
    ║  │                                                                             │  ║
    ║  │  Six exception types: Traffic, Weather, Breakdown,                          │  ║
    ║  │  Warehouse Queue, Geofence Wait, Border Delay                               │  ║
    ║  │                                                                             │  ║
    ║  │  On threshold crossed → create candidate event                              │  ║
    ║  └────────────────────────────────────┬────────────────────────────────────────┘  ║
    ║                                       │                                           ║
    ║                                       │  candidate event: SegmentDelayDetected    ║
    ║                                       ↓                                           ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Enrichment Decider (pure function)                                         │  ║
    ║  │  GeofenceEntered → No · SegmentDelayDetected → Yes, Traffic API             │  ║
    ║  │  TemperatureOutOfRange → No · HarshBrake → No · RouteCompleted → No         │  ║
    ║  └────────────────────────────────────┬────────────────────────────────────────┘  ║
    ║                                       │                                           ║
    ║                             ┌─────────┴─────────┐                                 ║
    ║                             │                   │                                 ║
    ║                          No API            API needed                             ║
    ║                             │                   │                                 ║
    ║                             │                   ↓                                 ║
    ║                             │    ┌─────────────────────────────────────────────┐  ║
    ║                             │    │  On-Demand Oracle                           │  ║
    ║                             │    │  Traffic / Weather / Warehouse / Border     │  ║
    ║                             │    │  Once per incident                          │  ║
    ║                             │    └──────────────────┬──────────────────────────┘  ║
    ║                             │                       │                             ║
    ║                             └───────────┬───────────┘                             ║
    ║                                         │                                         ║
    ║                                         ↓                                         ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Route State Machine (continues)                                            │  ║
    ║  │  Apply result · Finalize transition                                         │  ║
    ║  │  TrafficEntered → SLA_PAUSED · Checkpoint to SQL                            │  ║
    ║  └─────────────────────────────────────────────────────────────────────────────┘  ║
    ╚═════════════════════════════════════════┬═════════════════════════════════════════╝
                                          │
                                          │  State transition + pause start
                                          ↓
    ╔═══════════════════════════════════════════════════════════════════════════════════╗
    ║  LAYER 3 — EVIDENCE                                                               ║
    ║                                                                                   ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  SLA Engine                                                                 │  ║
    ║  │  Compute pause: interval between Entered and Exited events                  │  ║
    ║  │  In driver working calendar, not wall-clock                                 │  ║
    ║  └────────────────────────────────────┬────────────────────────────────────────┘  ║
    ║                                       │                                           ║
    ║                                       ↓                                           ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Route Completed?                                                           │  ║
    ║  │                                                                             │  ║
    ║  │     Disputed                                   Clean                        │  ║
    ║  │        │                                         │                          │  ║
    ║  │        ↓                                         ↓                          │  ║
    ║  │  Evidence Package                          Signed events                    │  ║
    ║  │  + ZK proof                                + Evidence Root                  │  ║
    ║  │  + Claim Confidence                        No package, no proof             │  ║
    ║  │  + Arweave anchor                          Cost ≈ zero                      │  ║
    ║  └────────────────────────────────────┬────────────────────────────────────────┘  ║
    ║                                       │                                           ║
    ║                                       ↓                                           ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Evidence Builder (when disputed)                                           │  ║
    ║  │                                                                             │  ║
    ║  │  1. Apply Trust Policy                                                      │  ║
    ║  │  2. Request corroboration if required                                       │  ║
    ║  │  3. Check independence in Evidence Graph                                    │  ║
    ║  │  4. Compute Claim Level                                                     │  ║
    ║  │  5. Produce Claim Confidence                                                │  ║
    ║  │  6. Produce Evidence Package                                                │  ║
    ║  └────────────────────────────────────┬────────────────────────────────────────┘  ║
    ║                                       │                                           ║
    ║                                       ↓                                           ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Arweave                                                                    │  ║
    ║  │  Permanent evidence · ~4 KB per package                                     │  ║
    ║  └─────────────────────────────────────────────────────────────────────────────┘  ║
    ╚═══════════════════════════════════════════════════════════════════════════════════╝

The device sends signed events to `POST /v1/evidence/ingest` with the `X-Telemetry-Key` header.

## Layer 1: Trust — How E0-E5 Is Computed

The Trust Layer runs inside the Ingest API, before the event reaches the Channel.

### Seven Dimensions

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

### Level Assignment Rules

    if not Authentication:              E0
    elif not Integrity:                 E1
    elif not Attestation:               E2
    elif not Corroboration:             E3
    elif not Independence (3+ sources): E4
    else:                               E5

The rule is applied in order. The first failing condition determines the level.

### Two Applications of Trust Policy

Trust Policy is applied in two places, for two different purposes.

**In Ingest (this layer):** the server verifies whether the event's sourceAssurance satisfies the policy for this event type. This is an event-level check. Result: `evaluationStatus: PASS / FAIL / INSUFFICIENT_DATA`.

**In Evidence Builder (Layer 3):** the server applies the policy to a specific claim. It collects all sources that confirm the claim, checks corroboration, computes the claim level, and produces `Claim Confidence: PASS / FAIL`.

The two checks answer different questions:

- Ingest: can this event be accepted into the system?
- Evidence Builder: is there enough evidence for this claim?

Example:

- Event: GPS point from Mobile App (E1).
- Event type policy: `minTrustLevel: E1`.
- Ingest: E1 ≥ E1 → PASS. Event enters the system.
- Later, a Traffic claim is formed.
- Claim policy: `minTrustLevel: E2`.
- Evidence Builder: only source is E1. Claim level = E1. E1 < E2 → FAIL. Claim Confidence: FAIL.

If a second vehicle with an onboard tracker (E3) also confirms the same event, the claim level becomes E3. E3 ≥ E2 → PASS.

### What Happens at Each Level

| Level | Meaning | Typical source |
|-------|---------|---------------|
| E0 | Manual input, basic authentication | Operator enters data through UI |
| E1 | Authenticated API | Third-party mobile app with key |
| E2 | Signed software | App with signed payload |
| E3 | Attested device | Onboard tracker with TPM or Secure Element |
| E4 | E3 plus corroboration | Tracker plus warehouse gate API |
| E5 | E4 plus independence | Tracker plus warehouse plus customs |

### Metrology in Practice

Metrology checks the accuracy reported by the source.

Example: a GPS tracker reports `accuracy: 15m`. The server checks whether this is within the acceptable range for this source type. If accuracy is missing or out of range, Metrology fails and the level is capped.

Metrology does not request independent measurements. It evaluates the accuracy of one source.

### Source Types and Maximum Levels

Not every source can provide all seven dimensions. The maximum level is capped by the source type.

| Dimension | Onboard tracker | Mobile app (third-party) | Browser (PWA) |
|-----------|-----------------|--------------------------|---------------|
| Identity | Yes | Partial | Partial |
| Authentication | Yes | Yes | Partial |
| Integrity | Yes | No | No |
| Attestation | Yes | No | No |
| Metrology | Yes | No | No |
| Time | Yes | Partial | No |
| Provenance | Yes | Partial | No |
| Max level | E3 (E4 with corroboration) | E1 | E0-E1 |

A browser will never reach E3. A third-party mobile app will never exceed E1. An onboard tracker reaches E3 and, with corroboration, E4.

## Layer 2: State — How the Route State Machine Works

The State Layer runs inside the Event Orchestrator. It consists of four components that work in sequence.

### Event Orchestrator

The Event Orchestrator is a single Background Service.

It holds a collection of Route State Machines, one per active trip. Each machine is independent. State is persisted to SQL via checkpoints.

When an event arrives:

1. Read event from the Channel.
2. Find State Machine by tripId. Create one if the trip is new.
3. Pass event to the State Machine.

The Orchestrator does not evaluate metrics or call APIs. It only routes events to the correct State Machine.

### Route State Machine

The State Machine evaluates the event against its current state.

Checks:

- Position vs route geofences (segment entry and exit).
- Speed vs thresholds (possible delay).
- Direction vs planned route (deviation).
- Time in current state (possible SLA breach).

States:

    Created → InTransit → SegmentEntered(A-B)
           → TrafficEntered → SLA_PAUSED
           → TrafficExited → SLA_RESUMED
           → SegmentExited(A-B)
           → Completed

Optional loop: SLA_RESUMED → SLA_PAUSED again if traffic returns.

For multi-segment routes: SegmentExited(A-B) → SegmentEntered(B-C).

When a trigger condition is met, the State Machine creates a candidate event, for example `SegmentDelayDetected`.

### Enrichment Decider

The Enrichment Decider is a pure function. It determines whether the candidate event requires external confirmation.

It does not call APIs. It only decides.

| Candidate event | API needed |
|-----------------|------------|
| GeofenceEntered | No |
| SegmentDelayDetected | Yes - Traffic API |
| TemperatureOutOfRange | No - E4 sensor |
| HarshBrake | No - accelerometer |
| RouteCompleted | No |

If no API is needed, the State Machine proceeds directly to finalization.

If an API is needed, the Decider hands the candidate to the On-Demand Oracle.

### On-Demand Oracle

The On-Demand Oracle calls the required external API.

The call is made once per incident, not continuously.

Results are returned to the State Machine.

### Finalizing the Transition

After enrichment, or if no enrichment was needed, the State Machine finalizes the transition.

Examples:

- Candidate `SegmentDelayDetected` + Traffic API confirmation → `TrafficEntered` → `SLA_PAUSED`.
- Candidate `WeatherDetected` + Weather API confirmation → `WeatherEntered` → `SLA_PAUSED`.

The transition is recorded as a checkpoint in SQL via `RouteStateSnapshots`.

### Trip Workflow vs Route State Machine

Two state machines coexist:

- **Trip Workflow** — business process, configured by dispatchers. States: Created, Picked up, In transit, Delivered. Managed by the Workflow Engine.
- **Route State Machine** — technical state machine, owned by the Event Orchestrator.

They are separate layers. The Workflow Engine can trigger actions when the Route State Machine changes state, but does not drive it.

### Six Exception Types

Traffic is shown as the example. The same pattern applies to all six.

| Exception | Entered / Exited | Enrichment API |
|-----------|-----------------|----------------|
| Traffic | TrafficEntered / TrafficExited | Traffic API |
| Weather | WeatherDetected / WeatherCleared | Weather API |
| Vehicle Breakdown | BreakdownDetected / BreakdownResolved | Roadside assistance API (optional) |
| Warehouse Queue | WarehouseQueueEntered / WarehouseQueueExited | Warehouse gate API |
| Geofence Wait | GeofenceWaitEntered / GeofenceWaitExited | None |
| Border Delay | BorderDelayEntered / BorderDelayExited | Border or customs API |

Each pair follows the same mechanism: entered, then SLA_PAUSED. Exited, then SLA_RESUMED.

### Segment Lifecycle

A segment is a section of a route, defined when the route is created.

Segments are proposed automatically from known geofences (warehouses, borders, terminals), the road network (cities, junctions), and historical data. The operator reviews on the map, adjusts, and saves.

Segments do not have their own SLA. One SLA rule applies to the whole route. Segments exist for attribution and corroboration.

If a segment ends while an exception is still active, the exception is closed at the segment boundary. If the condition persists, a new exception is opened in the next segment.

## Layer 3: Evidence — How Claim Confidence Is Produced

The Evidence Layer runs after the route is completed, or when a dispute is opened.

### SLA Engine

The SLA Engine computes the pause for the active exception.

Rule: the pause is the measured interval between the entered and exited events of the exception, computed in the driver's working calendar, not wall-clock time.

If an entered or exited event falls outside the working calendar, the pause is rounded to the nearest working boundary.

The result is stored with the segment and used later when the route is completed.

### Evidence Builder

The Evidence Builder runs when a claim is formed. It:

1. Applies the Trust Policy for the claim.
2. Requests corroboration if required by policy.
3. Checks independence in the Evidence Graph.
4. Computes the claim level.
5. Produces Claim Confidence: PASS or FAIL.
6. Produces the Evidence Package if the claim is disputed.

### How Corroboration Is Requested

Corroboration is applied by the Evidence Builder, after the route is completed. It is not applied by Ingest API, State Machine, or Orchestrator.

Two search strategies:

1. **Same-segment, same-time** — other vehicles in the same segment, within ±N minutes, that confirm the same exception.
2. **External gate** — warehouse gate API or border API at fixed points on the route.

An independent source is required. If two sources share a gateway, corroboration fails the independence check.

### Claim Level and Source Level

Own Assurance is the level of a single source. It is computed in Ingest.

Claim Level is the level of a claim, formed from one or more independent sources.

The claim level is the maximum level among independent sources that confirm the same fact.

Examples:

| Sources | Claim level |
|---------|-------------|
| Mobile App only (E1) | E1 |
| Mobile App (E1) + Mobile App (E1) | E1 |
| Mobile App (E1) + Tracker (E3) | E3 |
| Tracker (E3) only | E3 |
| Tracker (E3) + Tracker (E3) | E4 |
| Tracker (E3) + Warehouse gate (E2) | E4 |
| Tracker (E3) + Traffic API (E1) | E3 |

Weak sources are ignored when a stronger independent source confirms the fact.

Two weak sources do not combine into a strong claim. Corroboration requires at least one independent source at E3.

For the full rules, see [Trust Levels](TRUST_LEVELS.md).

### Evidence Graph

The Evidence Graph is a directed acyclic graph that connects:

- Events
- Sources
- Rules
- Claims

It is used for three purposes:

1. **Provenance** — trace a claim back to its events and sources.
2. **Independence check** — determine whether two sources are independent.
3. **E5 verification** — confirm that three sources are physically independent.

#### Provenance

A claim can be traced back to its events and sources.

Example:

    Claim: Detention 68 min
      ├─ Event: GeofenceEntered 11:54
      │    └─ Source: TRK-GPS-01
      │         └─ Source-of-source: hardware vendor
      ├─ Event: DockAssigned 13:02
      │    └─ Source: WH-API-01
      │         └─ Source-of-source: warehouse WMS
      └─ Rule: DETENTION_V1
           └─ Version: 1.0

#### Independence Check

When two sources confirm the same event, the Evidence Graph checks whether they are independent.

Example:

- Source A: TRK-GPS-01, gateway = Teltonika.
- Source B: WH-API-01, gateway = warehouse WMS.
- Different gateways → independent. Corroboration stands.

Counter-example:

- Source A: TRK-GPS-01, gateway = Teltonika.
- Source B: GW-TELEMATICS-01, gateway = Teltonika.
- Same gateway → not independent. Corroboration fails.

#### E5 Verification

E5 requires three physically independent sources. The Evidence Graph confirms that all three do not share a gateway or physical signal.

A hundred weak sources do not combine into one strong source. Corroboration is not arithmetic.

### Trust Policy

A Trust Policy defines the required assurance for a specific claim.

Example: `E4_REQUIRED_V1` with primary source at E3 and corroborating source at E2.

A claim is valid only if all required sources satisfy the policy.

### What Gets Built

For clean routes:

- Signed events.
- Evidence Root.
- No Evidence Package.
- No ZK proof.

For disputed routes:

- Evidence Package (~4 KB).
- ZK proof.
- Claim Confidence: PASS or FAIL.
- Arweave anchor.

## End-to-End Example: Traffic

A truck in transit. A traffic jam occurs.

1. GPS point arrives at Ingest API.
2. Server evaluates 7 dimensions. Source is an onboard tracker with TPM. sourceAssurance = E3.
3. Event is enqueued to Bounded Channel with E3 attached.
4. Orchestrator reads event. Finds State Machine for tripId = SHP-802.
5. State Machine sees: speed dropped to 2 km/h, sustained 3 minutes. Creates candidate event SegmentDelayDetected.
6. Enrichment Decider: Traffic API is needed.
7. On-Demand Oracle calls Traffic API. Congestion confirmed.
8. State Machine applies result. Transition: TrafficEntered → SLA_PAUSED. Checkpoint written to SQL.
9. SLA Engine starts pause. Counted in driver working calendar.
10. Speed recovers. State Machine creates TrafficExited → SLA_RESUMED. Pause = 15 minutes.
11. Segment ends. SegmentExited(A-B) written with full report.
12. Route completes.
13. Evidence Builder applies Trust Policy.
14. Another vehicle with an onboard tracker confirms the same standstill. Evidence Graph checks independence: different gateway. Claim level = E4.
15. Evidence Package written and anchored in Arweave.

## End-to-End Example: Clean Route

A truck drives Kyiv to Oslo. No exceptions.

1. GPS points arrive at Ingest API. Each event gets sourceAssurance = E3.
2. Orchestrator reads each event. State Machine transitions: Created → InTransit → SegmentEntered(A-B) → SegmentExited(A-B) → SegmentEntered(B-C) → ... → Completed.
3. No candidate events fire. No external API is called.
4. Route completes in 40 hours. SLA is 48 hours.
5. Evidence Builder does not create an Evidence Package. No dispute.
6. Route closes with signed events and Evidence Root only.
7. Cost per route: approximately zero.

## What Belongs to Which Layer

| Component | Layer | Responsibility |
|-----------|-------|----------------|
| Ingest API | Trust | Validation, dedup, E0-E5 |
| Bounded Channel | Transport | In-memory queue with backpressure |
| Event Orchestrator | State | Holds Route State Machines |
| Route State Machine | State | Evaluates metrics, creates candidate events |
| Enrichment Decider | State | Decides if external API is needed |
| On-Demand Oracle | State | Calls external APIs |
| SLA Engine | Evidence | Computes pause in working calendar |
| Evidence Builder | Evidence | Applies Trust Policy, checks corroboration, computes claim level |
| Evidence Graph | Evidence | Provenance, independence check, E5 verification |
| Arweave | Evidence | Permanent anchor |

## What Is Computed Where

| What | Where | When |
|------|-------|------|
| Source Assurance E0-E5 | Ingest API | On each event |
| Candidate event | Route State Machine | When metrics cross thresholds |
| Enrichment decision | Enrichment Decider | On each candidate event |
| External API result | On-Demand Oracle | On candidate events that require it |
| Final transition | Route State Machine | After enrichment or skip |
| SLA pause | SLA Engine | When an exception is closed |
| Claim level | Evidence Builder | When a claim is formed |
| Independence check | Evidence Graph | When a claim is formed |
| Claim Confidence | Evidence Builder | When a dispute or exception requires proof |

## Related Documents

- [Event Pipeline](EVENT_PIPELINE.md) - vertical flow from device to SLA
- [Trust Levels](TRUST_LEVELS.md) - full trust model and corroboration rules
- [Architecture](ARCHITECTURE.md) - modules and boundaries
- [Data Flow](DATA_FLOW.md) - canonical event flow through all stages
- [SLA DSL](SLA_DSL.md) - rule format and evaluation result
- [Evidence Package](EVIDENCE.md) - package structure