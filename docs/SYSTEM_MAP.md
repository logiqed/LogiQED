# LogiQED System Map

A single-page overview of how LogiQED processes events, computes trust, tracks route state, and produces evidence.

This document is a horizontal slice: all components side by side. For the vertical flow from device to SLA, see [Event Pipeline](EVENT_PIPELINE.md). For module responsibilities, see [Architecture](ARCHITECTURE.md).

## Overview

LogiQED is a pipeline. A GPS point enters the system, is validated and assigned a trust level, becomes a candidate event inside a Route State Machine, and either closes as a clean route, produces a claim package, or produces a full package for dispute resolution.

Three layers work together:

- **Trust Layer** — computes source assurance E0-E5.
- **State Layer** — tracks route state and detects exceptions.
- **Evidence Layer** — produces claim packages, trip anchors, and full packages.

## Full Flow Diagram

    ╔═══════════════════════════════════════════════════════════════════════════════════╗
    ║                                    DEVICE                                         ║
    ║  Onboard tracker · Mobile app · Browser PWA · External systems                    ║
    ║  GPS points · CAN bus · Sensor readings · EPCIS events                            ║
    ╚═════════════════════════════════════┬═════════════════════════════════════════════╝
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
    ║  │  4. Convert to EPCIS          │          │  · Integrity                   │    ║
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
    ║  │  Driver reports exception start and end manually                            │  ║
    ║  │  On exception close → package base is created                               │  ║
    ║  └────────────────────────────────────┬────────────────────────────────────────┘  ║
    ║                                       │                                           ║
    ║                                       │  driver report or auto-detected event     ║
    ║                                       ↓                                           ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Enrichment Decider (pure function)                                         │  ║
    ║  │  DriverReported Traffic → Yes, Traffic API                                  │  ║
    ║  │  GeofenceEntered → No · TemperatureOutOfRange → No · RouteCompleted → No    │  ║
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
    ║                             │    │  Once per claim                             │  ║
    ║                             │    └──────────────────┬──────────────────────────┘  ║
    ║                             │                       │                             ║
    ║                             └───────────┬───────────┘                             ║
    ║                                         │                                         ║
    ║                                         ↓                                         ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Route State Machine (continues)                                            │  ║
    ║  │  Apply result · Finalize claim                                              │  ║
    ║  │  Confirmed: SLA_PAUSED                                                      │  ║
    ║  │  Rejected: SLA continues                                                    │  ║
    ║  │  Checkpoint to SQL                                                          │  ║
    ║  └────────────────────────────────────┬────────────────────────────────────────┘  ║
    ╚═════════════════════════════════════════┬═════════════════════════════════════════╝
                                          │
                                          │  claim closed
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
    ║  │  Evidence Builder (triggered by Orchestrator)                               │  ║
    ║  │                                                                             │  ║
    ║  │  On claim close:                                                            │  ║
    ║  │    1. Collect claim events                                                  │  ║
    ║  │    2. Compute claim Evidence Root                                           │  ║
    ║  │    3. Compute claim level                                                   │  ║
    ║  │    4. Record decision (confirmed or rejected)                               │  ║
    ║  │    5. Assemble claim package base                                           │  ║
    ║  │    6. Anchor claim root + package in Arweave                                │  ║
    ║  │                                                                             │  ║
    ║  │  On route close:                                                            │  ║
    ║  │    1. Collect all route events                                              │  ║
    ║  │    2. Compute trip Evidence Root                                            │  ║
    ║  │    3. Anchor trip root in Arweave                                           │  ║
    ║  │                                                                             │  ║
    ║  │  On dispute request:                                                        │  ║
    ║  │    1. Retroactive corroboration                                             │  ║
    ║  │    2. Independence check in Evidence Graph                                  │  ║
    ║  │    3. Compute final claim level                                             │  ║
    ║  │    4. Generate ZK proof (if E3+)                                            │  ║
    ║  │    5. Assemble full package                                                 │  ║
    ║  │    6. Anchor full package in Arweave                                        │  ║
    ║  └────────────────────────────────────┬────────────────────────────────────────┘  ║
    ║                                       │                                           ║
    ║                                       ↓                                           ║
    ║  ┌─────────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  Arweave                                                                    │  ║
    ║  │  Trip anchors · Claim anchors · Full package anchors                        │  ║
    ║  │  Permanent evidence · Base ~2 KB, full ~4 KB                                │  ║
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

### Source Types and Maximum Own Assurance

Not every source can provide all seven dimensions. The maximum own assurance is capped by the source type.

| Dimension | Onboard tracker | Mobile app (third-party) | Browser (PWA) |
|-----------|-----------------|--------------------------|---------------|
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

A browser will never reach E3. An onboard tracker reaches E3. A third-party mobile app reaches E2 if it signs the payload with a key. Without signing, it stays at E1. It cannot reach E3 because it cannot prove device attestation from Secure Enclave or StrongBox. Most third-party apps do not implement either.

### EPCIS as Canonical Format

Ingest accepts events from multiple sources:

- Native clients (browser PWA) send EPCIS 2.0 directly.
- External trackers (Teltonika, Ruptela) send binary packets over TCP or HTTPS.
- Mobile apps (Colota, HookTrace) send JSON.
- Warehouse and customs APIs send their own format.

Ingest converts every event to GS1 EPCIS 2.0 at step 4. If the source already sends EPCIS, the step is a no-op.

After Ingest, the whole system works with a single canonical format. This removes the barrier for carriers: they do not need to adapt their existing systems to EPCIS.

## Layer 2: State — How the Route State Machine Works

The State Layer runs inside the Event Orchestrator. It consists of four components that work in sequence.

### Event Orchestrator

The Event Orchestrator is a single Background Service.

It holds a collection of Route State Machines, one per active trip. Each machine is independent. State is persisted to SQL via checkpoints.

When an event arrives:

1. Read event from the Channel.
2. Find State Machine by tripId. Create one if the trip is new.
3. Pass event to the State Machine.

The Orchestrator does not evaluate metrics or call APIs. It routes events to the correct State Machine and delegates to the Evidence Builder when a claim or route closes.

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

When a claim closes, the State Machine triggers the Evidence Builder.

### Enrichment Decider

The Enrichment Decider is a pure function. It determines whether a candidate event requires external confirmation.

It does not call APIs. It only decides.

| Candidate event | API needed |
|-----------------|------------|
| DriverReported Traffic | Yes - Traffic API |
| GeofenceEntered | No |
| TemperatureOutOfRange | No - E4 sensor |
| HarshBrake | No - accelerometer |
| RouteCompleted | No |

If no API is needed, the State Machine proceeds directly to finalization.

If an API is needed, the Decider hands the candidate to the On-Demand Oracle.

### On-Demand Oracle

The On-Demand Oracle calls the required external API.

The call is made once per claim, not continuously.

Results are returned to the State Machine.

### Finalizing the Claim

After enrichment, or if no enrichment was needed, the State Machine finalizes the claim.

Examples:

- Confirmed: driver-reported traffic + Traffic API confirmation → `TrafficEntered` → `SLA_PAUSED`.
- Rejected: driver-reported traffic + Traffic API denies → claim marked as rejected. SLA continues.

The transition is recorded as a checkpoint in SQL via `RouteStateSnapshots`.

### MVP Scope: Manual Detection

In MVP, exceptions are reported by the driver. The system does not detect traffic jams automatically.

The driver presses "Traffic started" when a jam begins. The driver presses "Traffic ended" when the jam clears.

Why: automatic detection would require continuous polling of external APIs. That is expensive and not justified at MVP scale.

In Phase 2, automatic detection of exception start may be added. Exception end will remain manual or on-demand.

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

#### Segments Are Optional

A route can be driven with a single segment covering the whole route.

In this case:

- SLA still works. Pause calculation is unaffected.
- Corroboration still works. Another vehicle on the same route can confirm the claim.
- Claim packages are still produced.
- What is not available: attribution by segment. The system cannot show where on the route the delay occurred.

Single-segment routes are supported for MVP and for carriers that do not want to configure segmentation.

Full segmentation with road network and historical data is planned for Phase 2.

## Layer 3: Evidence — How Claim Confidence Is Produced

The Evidence Layer runs when a claim closes, when a route closes, or when a dispute is opened.

### SLA Engine

The SLA Engine computes the pause for the active exception.

Rule: the pause is the measured interval between the entered and exited events of the exception, computed in the driver's working calendar, not wall-clock time.

If an entered or exited event falls outside the working calendar, the pause is rounded to the nearest working boundary.

The result is stored with the segment and used later when the route is completed.

### Evidence Builder

The Evidence Builder is called by the Orchestrator at three moments.

**On claim close:**

1. Collect claim events.
2. Compute claim Evidence Root.
3. Compute claim level.
4. Record decision: confirmed or rejected.
5. Assemble claim package base.
6. Anchor claim root and package in Arweave.

**On route close:**

1. Collect all route events.
2. Compute trip Evidence Root.
3. Anchor trip root in Arweave.

**On dispute request:**

1. Retroactive corroboration.
2. Independence check in Evidence Graph.
3. Compute final claim level.
4. Generate ZK proof if claim level is E3 or higher.
5. Assemble full package.
6. Anchor full package in Arweave.

The Builder writes to MS SQL tables: Events, EventHashes, MerkleNodes, EvidenceRoots, ClaimPackages, Anchors.

### Three Evidence Levels

| Level | What is produced | When |
|-------|------------------|------|
| Clean route | Signed events + trip Evidence Root + anchor | Every route |
| Incident | + claim package base + claim anchor | Every claim, confirmed or rejected |
| Disputed | + corroboration + ZK proof + new anchor | On dispute request |

Anchor is produced for every route, clean or incident. This protects the data from substitution.

Claim packages are produced for every claim, confirmed or rejected. A rejected claim is still a recorded event.

ZK proof is generated only when the claim level is E3 or higher.

### How Corroboration Is Requested

Corroboration is applied by the Evidence Builder, on dispute request. It is not applied by Ingest API, State Machine, or Orchestrator.

Two search strategies:

1. **Same-segment, same-time** — other vehicles in the same segment, within ±N minutes, that confirm the same exception.
2. **External gate** — warehouse gate API or border API at fixed points on the route.

An independent source is required. If two sources share a gateway, corroboration fails the independence check.

Retroactive corroboration works within the raw telemetry retention window. Raw positions are kept for 30 days. Aggregates are kept for 1 year.

### Claim Level and Source Level

Own Assurance is the level of a single source. It is computed in Ingest. It does not change with corroboration.

Claim Level is the level of a claim, formed from one or more independent sources.

The claim level is the maximum level among independent sources that confirm the same fact.

Examples:

| Sources | Claim level |
|---------|-------------|
| Mobile App only (E1, unsigned) | E1 |
| Mobile App only (E2, signed) | E2 |
| Mobile App (E1) + Mobile App (E1) | E1 |
| Mobile App (E2) + Mobile App (E2) | E2 |
| Mobile App (E1) + Tracker (E3) | E3 |
| Mobile App (E2) + Tracker (E3) | E3 |
| Tracker (E3) only | E3 |
| Tracker (E3) + Tracker (E3) | E4 |
| Tracker (E3) + Warehouse gate (E2) | E4 |
| Tracker (E3) + Traffic API (E1) | E3 |

Weak sources are ignored when a stronger independent source confirms the fact.

Corroboration raises the claim level to E4 only when two conditions are satisfied:

1. Primary source is at E3 or higher.
2. Corroborating source is at E2 or higher.

Below these thresholds, the claim stays at the level of the strongest source. Two E1 sources produce an E1 claim. Two E2 sources produce an E2 claim. A tracker at E3 plus a traffic API at E1 produces an E3 claim.

For the full rules, see [Trust Levels](TRUST_LEVELS.md).

### ZK Proof Gating

ZK proof is generated only when the claim level is E3 or higher.

Below E3, the package is still produced and anchored, but the ZK proof button in the UI is disabled. The UI shows: your trust level is insufficient for ZK proof. E3 or higher is required.

Why: below E3, the source cannot prove device attestation. A ZK proof would confirm a computation over data that is itself not attested.

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
- Trip Evidence Root.
- Arweave anchor.
- No claim package.
- No ZK proof.

For incident routes:

- Claim package base (~2 KB).
- Claim Evidence Root.
- Arweave anchor for claim.
- Trip Evidence Root anchored at route close.

For disputed routes:

- Full package (~4 KB).
- Corroboration result.
- ZK proof, if claim level is E3 or higher.
- New Arweave anchor.

## End-to-End Example: Traffic, Confirmed

A truck in transit. A traffic jam occurs.

1. Driver presses "Traffic started".
2. Claim created at E0.
3. System checks own data. Speed dropped. E2.
4. Traffic API called. Congestion confirmed. E1.
5. Claim level = max(E0, E2, E1) = E2. SLA paused.
6. Driver presses "Traffic ended".
7. SLA Engine computes pause: 15 minutes.
8. Orchestrator triggers Evidence Builder.
9. Builder collects claim events, computes claim Evidence Root, computes claim level E2, records decision CONFIRMED, assembles claim package base, anchors in Arweave.
10. Segment ends. SegmentExited written.
11. Route completes.
12. Builder collects all route events, computes trip Evidence Root, anchors in Arweave.
13. Later, operator requests dispute package.
14. Builder does retroactive corroboration. Second truck with onboard tracker confirms the same standstill. Different gateway → independent. Claim level = E4.
15. Builder generates ZK proof (E4 ≥ E3).
16. Full package assembled and anchored.

## End-to-End Example: Traffic, Rejected

A truck in transit. Driver reports a jam. The system disagrees.

1. Driver presses "Traffic started".
2. Claim created at E0.
3. System checks own data. Speed is normal. FAIL.
4. Traffic API called. No congestion. FAIL.
5. Claim rejected. SLA continues.
6. Driver presses "Traffic ended" (or the claim closes manually).
7. Orchestrator triggers Evidence Builder.
8. Builder assembles claim package base with decision REJECTED, anchors in Arweave.
9. Trip Evidence Root anchored at route close.

The rejected claim is still recorded. The driver can review it. The package shows why the claim was rejected.

## End-to-End Example: Clean Route

A truck drives Kyiv to Oslo. No exceptions.

1. GPS points arrive at Ingest API. Each event gets sourceAssurance = E3.
2. Orchestrator reads each event. State Machine transitions: Created → InTransit → SegmentEntered(A-B) → SegmentExited(A-B) → SegmentEntered(B-C) → ... → Completed.
3. No candidate events fire. No external API is called.
4. Route completes in 40 hours. SLA is 48 hours.
5. Builder collects all route events, computes trip Evidence Root, anchors in Arweave.
6. No claim package. No ZK proof.
7. Cost per route: approximately zero.

## What Belongs to Which Layer

| Component | Layer | Responsibility |
|-----------|-------|----------------|
| Ingest API | Trust | Validation, dedup, EPCIS conversion, source assurance E0-E5, event-level policy check |
| Bounded Channel | Transport | In-memory queue with backpressure |
| Event Orchestrator | State | Holds Route State Machines, delegates to Builder |
| Route State Machine | State | Evaluates metrics, creates candidate events, triggers Builder on claim close |
| Enrichment Decider | State | Decides if external API is needed |
| On-Demand Oracle | State | Calls external APIs |
| SLA Engine | Evidence | Computes pause in working calendar |
| Evidence Builder | Evidence | Assembles packages, computes Evidence Roots, anchors |
| Evidence Graph | Evidence | Provenance, independence check, E5 verification |
| Arweave | Evidence | Trip anchors, claim anchors, full package anchors |

## What Is Computed Where

| What | Where | When |
|------|-------|------|
| Source Assurance E0-E5 | Ingest API | On each event |
| Event-level policy check | Ingest API | On each event |
| Candidate event | Route State Machine | When metrics cross thresholds |
| Enrichment decision | Enrichment Decider | On each candidate event |
| External API result | On-Demand Oracle | On candidate events that require it |
| Claim decision | Route State Machine | After enrichment |
| SLA pause | SLA Engine | When a claim closes |
| Claim level | Evidence Builder | When a claim closes |
| Claim Evidence Root | Evidence Builder | When a claim closes |
| Trip Evidence Root | Evidence Builder | When a route closes |
| Claim anchor | Evidence Builder | When a claim closes |
| Trip anchor | Evidence Builder | When a route closes |
| Corroboration | Evidence Builder | On dispute request |
| Final claim level | Evidence Builder | On dispute request |
| ZK proof | Evidence Builder | On dispute request, if E3 or higher |
| Full package anchor | Evidence Builder | On dispute request |

## Related Documents

- [Event Pipeline](EVENT_PIPELINE.md) - vertical flow from device to SLA
- [Trust Levels](TRUST_LEVELS.md) - full trust model and corroboration rules
- [Evidence Flow](EVIDENCE_FLOW.md) - three evidence levels and anchor rules
- [Evidence Package](EVIDENCE.md) - package structure
- [Evidence Builder](EVIDENCE_BUILDER.md) - implementation specification
- [Architecture](ARCHITECTURE.md) - modules and boundaries
- [Data Flow](DATA_FLOW.md) - canonical event flow through all stages
- [SLA DSL](SLA_DSL.md) - rule format and evaluation result