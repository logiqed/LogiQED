# LogiQED Architecture

See [System Map](SYSTEM_MAP.md) for a one-page overview of all layers.

## General Approach

Modular monolith on C# Blazor. Microservices are a Phase 2 concern.

For a pilot MVP, a modular monolith is the right trade-off. Natural computational boundaries are split later: telemetry ingestion, prover workers, AI execution.

![LogiQED System Architecture](images/diagram-system.svg)

## Architectural Principles

- **Modular Monolith First** - single deployment unit, modules strictly separated.
- **CQRS / MediatR** - commands change state, queries read from projections.
- **Idempotent Event Processing** - handlers safe to retry without side effects.
- **Domain Events within Modules Only** - modules communicate via interfaces, not via each other's tables.
- **Cost-Aware Design** - external APIs only when a claim is opened. Zero external calls in normal operation.
- **Crypto-Agility** - signatures, proof backends, hashes are pluggable.
- **Provider Abstraction** - proof backends, data availability, and attestation providers sit behind interfaces. EigenLayer is an integration choice, not an architectural dependency.
- **Traceability** - every event traceable from ingest to permanent storage.
- **Fail-Open vs Fail-Closed Policy** - telemetry continues when Redis is down; SLA decisions persist until SQL is available.
- **Observability is not optional** - every component must expose metrics and structured logs from day one.

## Backend & Frontend

- C# Blazor Server / WebAssembly on .NET 10 - single stack.
- ASP.NET Core - REST API, OpenAPI, webhooks.
- Entity Framework Core + MS SQL Server - operational data, analytics.
- FluentValidation - request and domain validation.
- Custom Mediator + CQRS - command and query separation. ValueTask-based, no reflection in the hot path, typed dispatch, prewarmed cache. See [Mediator](MEDIATOR.md).
- SignalR - real-time updates. Redis backplane for scale-out.
- RabbitMQ - message bus for telemetry and event processing.
- Redis - hot cache, pub/sub, route state buffer.
- Seq - structured logging and tracing.
- OpenTelemetry - distributed tracing.

## Module Boundaries

| Module | Responsibility |
|--------|----------------|
| Telemetry | Device registration, position ingest, track history |
| Route | Route state machine, segment/traffic events |
| SLA | Policies, calendars, exception rules, timers |
| Evidence | Event stream, graph, package builder, trust levels |
| Identity | Device keys, attestation, revocation |
| Notifications | SignalR, webhooks, email/push |
| Dispatcher | Dashboard, manual incident resolution |

Rule: modules expose interfaces, never internal DbContexts. Shared types live in SharedKernel.

## Event-Driven Route Monitoring

### Core Idea

A route is a finite state machine, not a stream of coordinates.

Telemetry positions are normalized into route events. Each event is signed, validated, and processed through the event orchestration pipeline.

### Data Flow

Driver devices - browser, mobile app, or onboard tracker - send coordinate deltas to Telemetry Ingest. Payload is approximately 1 KB per packet on average. The exact size depends on the source format.

Telemetry Ingest receives the stream. Events are converted to EPCIS 2.0, deduplicated, and validated. After Ingest, the whole system works with a single canonical format.

MS SQL is the system of record. Redis serves as a hot cache for fast reads.

SignalR at /hubs/telemetry delivers real-time map updates.

Event Orchestrator runs as a Background Service. It maintains the Route State Machine per route, decides whether external enrichment is required, and delegates to the Evidence Builder when a claim or route closes.

SLA Engine performs deterministic calculation. Pause is the interval between the entered and exited events of a claim.

Evidence Package Builder produces packages in three moments: on claim close, on route close, and on dispute request. Base package is approximately 2 KB. Full package is approximately 4 KB.

Aligned Layer generates the ZK-proof. For MVP this is mocked.

Arweave provides permanent evidence storage. Trip anchors, claim anchors, and full package anchors are all anchored in Arweave.

See [Event Pipeline](EVENT_PIPELINE.md) for the full flow from device to SLA.

### Route State Machine

- Created, then InTransit
- InTransit, then SegmentEntered(A-B)
- SegmentEntered, then TrafficEntered, then SLA_PAUSED
- SLA_PAUSED, then TrafficExited, then SLA_RESUMED
- SLA_RESUMED, then SLA_PAUSED again if traffic returns (optional loop)
- SLA_RESUMED, then SegmentExited(A-B)
- SegmentExited(A-B), then SegmentEntered(B-C) for multi-segment routes
- SegmentExited(final), then Completed

In MVP, the driver reports the exception start and end manually. The system does not detect exceptions automatically. Automatic detection would require continuous polling of external APIs.

TrafficEntered and TrafficExited are shown as the example. The same pattern applies to all six exception types:

| Exception | Entered / Exited | Enrichment API |
|-----------|-----------------|----------------|
| Traffic | TrafficEntered / TrafficExited | Traffic API |
| Weather | WeatherDetected / WeatherCleared | Weather API |
| Vehicle Breakdown | BreakdownDetected / BreakdownResolved | Roadside assistance API (optional) |
| Warehouse Queue | WarehouseQueueEntered / WarehouseQueueExited | Warehouse gate API |
| Geofence Wait | GeofenceWaitEntered / GeofenceWaitExited | None |
| Border Delay | BorderDelayEntered / BorderDelayExited | Border or customs API |

Each pair follows the same mechanism: entered, then SLA_PAUSED. Exited, then SLA_RESUMED. If the claim is rejected, SLA continues.

Rule: SLA pause is the measured interval between the entered and exited events of the active exception, computed in driver working calendar, not wall-clock time.

If the entered or exited event falls outside working calendar, the pause is rounded to the nearest working boundary.

TrafficEntered and TrafficExited are transition triggers, not separate states. The stable state during any exception is SLA_PAUSED.

![Route State Machine](images/diagram-route-state-machine.svg)

The diagram shows the Traffic path as the reference. Other exception types use the same structure with their own entered and exited events.

### Segment Lifecycle

A route is divided into segments. Each segment covers a section of the route between two points: warehouse, border, city, or terminal.

A segment is not a separate SLA unit. One SLA rule applies to the whole route.

#### How Segments Are Created

Segments are proposed automatically when the route is created. Sources:

- Known geofences: warehouses, borders, terminals.
- Road network: cities and junctions along the route.
- Historical data: if the route has been driven before.

The operator reviews the proposal on the map, adjusts boundaries, and saves. Segments are stored with the route, not with the SLA.

#### How Segments Are Filled

When the vehicle moves, the Event Orchestrator opens each segment on entry and closes it on exit.

For each segment, the SLA Engine records:

- entry and exit time
- total duration
- pause events and pause duration
- attribution of pauses to the responsible party

No numbers are entered manually. All values are computed from the event stream.

If an exception is still active when the vehicle leaves the segment, the exception is closed at the segment boundary. If the condition persists, a new exception is opened in the next segment.

#### Segments Are Optional

A route can be driven with a single segment covering the whole route. SLA, corroboration, and claim packages still work. Attribution by segment is not available.

#### How the Result Is Assembled

When the route is completed, the SLA Engine sums durations across all segments and compares the total against the route-level SLA.

| Level | What it contains |
|-------|-----------------|
| Route | One PASS or FAIL against the SLA |
| Segment | Duration, pauses, attribution for each section |

Example:

| Segment | Duration | Pause |
|---------|----------|-------|
| Kyiv - Lviv | 8h | 1h (Traffic) |
| Lviv - Krakow | 7h | 0 |
| Krakow - Berlin | 9h | 1h (Weather) |
| Berlin - Hamburg | 4h | 0 |
| Hamburg - Oslo | 14h | 0 |
| **Total** | **42h** | **2h pause** |

Chargeable time: 42h - 2h = 40h.

SLA on the route: 48h. Result: PASS.

The segment breakdown does not change the SLA result. It explains where time was spent and which party is responsible for each pause.

See [SLA DSL](SLA_DSL.md) for the rule format and evaluation result.

### Event Orchestrator

Background Service within LogiQED.Web.API for MVP. Extract to a separate microservice when scale justifies it.

Route state is owned by the Orchestrator and persisted to SQL. Redis is a read-through projection. On restart, the Orchestrator rebuilds active routes from SQL, not from Redis.

The Orchestrator does not evaluate metrics or call APIs. It routes events to the correct State Machine and delegates to the Evidence Builder when a claim or route closes.

Reliability:

- Checkpoints to SQL via RouteStateSnapshots
- On restart, reprocess from last checkpoint
- Bounded Channel for backpressure

### On-Demand Oracle

External APIs are called only when a claim is opened.

- DriverReported Traffic - Traffic API for the segment
- GeofenceEntered - no external API
- TemperatureOutOfRange - no external API, E4 sensor
- HarshBrake - no external API, accelerometer
- RouteCompleted - no external API

Rule: In normal operation, external API costs are zero.

### Enrichment Decider

Pure function that determines whether a candidate event requires external confirmation.

Candidate event, then Enrichment Decider, then API needed, then Yes, then One call, or No, then Skip.

### Claim Pipeline

Every in-transit claim follows the same pipeline.

1. Driver reports an incident - E0. The claim is a statement, not proof.
2. The system checks its own data - GPS track, CAN bus, telemetry. This confirms the physical situation. E2.
3. The system calls an external API on demand - traffic, weather, road conditions. This adds an independent source. E1 or E2, depending on the API.
4. The claim is confirmed or rejected. If confirmed, SLA pauses. If rejected, SLA continues.

If other vehicles report the same event in the same segment and time window, retroactive corroboration raises the claim level on dispute request.

CAN bus is an amplifier, not corroboration. It confirms vehicle state inside one source, but it does not create a new independent source. CAN and GPS typically arrive through the same telematics gateway.

### Source Availability

Sources can be onboard or mobile. The choice affects the maximum reachable own assurance.

| Situation | Source | Own assurance |
|-----------|--------|---------------|
| Onboard GPS present | Truck tracker (direct or via adapter) | E3 |
| No onboard GPS | Third-party mobile app | E1 (E2 with signed payload) |
| Browser fallback | Browser (PWA) | E0-E1 |

Onboard trackers send data in one of three ways:

1. Dual-server - tracker sends to existing server and LogiQED in parallel.
2. Data forwarding - existing telematics platform forwards the stream.
3. Endpoint replacement - tracker reconfigured to point at LogiQED. Only with carrier consent.

Own assurance is the level of a single source. It does not change with corroboration.

A claim formed from independent sources can be higher. A claim confirmed by a second vehicle or an external gate reaches E4. Three independent sources reach E5.

A second weaker source does not raise the own assurance. Adding a mobile app next to an onboard tracker keeps the source level at E3 and does not change the claim level.

See [Trust Levels](TRUST_LEVELS.md) for the full dimension table.

### Proof Flow

Evidence Builder, then Proof Engine, then Full Evidence Package, then Arweave.

ZK-proof is generated only on dispute request, and only when the claim level is E3 or higher. Below E3, the package is still produced and anchored, but the ZK button is disabled.

The Proof Engine is pluggable. See the Proof Engine section for backends and pipeline.

## Telemetry Subsystem

Unified infrastructure layer for ingesting, normalizing, storing and distributing mobile-object positions in real time.

### Purpose

Separates coordinate sources from business objects. Provides generic answers:

- Where is this object now?
- Which position was just received?

### Core Idea

Coordinate source, telemetry device, owner, generic position.

### Sources

- Employee browser (PWA, session-authenticated)
- Mobile app (third-party, key-authenticated via X-Telemetry-Key)
- Onboard tracker (device in vehicle, certificate-authenticated)
- External tracking systems (via adapters)

### Device Identity

Unique pair of SourceCode + ExternalId.

### Device Owner

OwnerKind + OwnerId. Employee is built-in. Vehicles and other kinds are extensible.

### Data Model

- Last known position on device record.
- Time-ordered position track with server-configurable retention.
- Raw positions: 30 days. Aggregated 1-hour buckets: 1 year.
- Evidence Roots and anchors: permanent via Arweave.

### Geofences

Geofence rules are stored server-side and pushed to the device. The device evaluates geofences locally and emits GeofenceEntered and GeofenceExited events.

### Ingestion and Normalization

- Latitude and longitude validated.
- Timestamps normalized to UTC.
- Future timestamps capped at server receive time.
- Deduplication key: SourceId + ClientTimestampUtc + SourceSequence.
- Points ordered by recorded time.
- Known points not re-inserted.
- Late payloads extend history but cannot move current position backwards.

### Realtime Delivery

- SignalR hub /hubs/telemetry.
- TelemetryPositionReceived event.
- Dispatch map adapter translates owner key and coordinate update.

### Resilience

- Client can buffer points offline.
- Retried payloads are safe. Idempotent.
- Late data does not degrade current position.
- Redis down fallback: read from MS SQL projections.
- No connectivity at geofence boundary: events buffered and replayed with original timestamp. SLA uses event timestamp, not receive time.

### Security

- Telemetry.Read
- Telemetry.Write
- Telemetry.Report
- Telemetry-ingest API uses device key, not user auth.
- Only SHA-256 hash of tracker key stored.
- Key rotation endpoint available.

### Extensibility

- New owner kinds without changing core.
- New ingest adapters without changing core.

## SLA Subsystem

Service level management with policies, calendars and exception rules.

### Components

- SLA policies: reaction and resolution targets by scope.
- Working calendars: working hours by weekday and time zone.
- Holiday sets: named non-working days.
- Exception rules: automatic penalty exclusion based on conditions.

### Policy

- Code, reaction time, resolution time, on-site arrival time.
- Calendar type: 24-7 or business hours.
- Valid from and valid to.
- Scope dimensions: category, type, priority.

### Calendar

- Time zone.
- Working hours per weekday.
- Holiday sets attached.
- Default calendar flag.

### Exception Rules

- Condition builder: field comparisons, domain conditions, AND/OR/NOT.
- Timers and escalations.
- Resulting action: chargeable delay, evidence generation.
- Rule versioning.
- Execution history.

### Integration

- SLA policies apply to shipments.
- Working calendars control timer behaviour. Evaluated in carrier timezone.
- Exception rules generate claim packages.
- Rule results visible to driver as Penalty Protection.
- Golden tests for midnight, DST, holiday boundaries.

See [SLA DSL](SLA_DSL.md) for rule format and evaluation result.

## Evidence Layer

The evidence layer turns signed events into verifiable packages.

- **Signed Event Stream** - every event signed by its source.
- **Evidence Graph** - provenance DAG connecting events, sources, and rules.
- **Evidence Package** - base ~2 KB, full ~4 KB.
- **Trust Levels E0-E5** - computed server-side from seven dimensions.
- **Trip Evidence Root** - Merkle root of all route events.
- **Claim Evidence Root** - Merkle root of events related to one claim.

See [Evidence](EVIDENCE.md) and [Evidence Flow](EVIDENCE_FLOW.md) for details.

### Three Evidence Levels

| Level | What is produced | When |
|-------|------------------|------|
| Clean route | Signed events + trip Evidence Root + anchor | Every route |
| Incident | + claim package base + claim anchor | Every claim, confirmed or rejected |
| Disputed | + corroboration + ZK proof + new anchor | On dispute request |

Anchor is produced for every route, clean or incident. This protects the data from substitution.

Claim packages are produced for every claim, confirmed or rejected. A rejected claim is still a recorded event.

ZK proof is generated only on dispute request, and only when the claim level is E3 or higher.

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

### Storage Tables

The Evidence Builder writes to the following MS SQL tables.

| Table | Content | When |
|-------|---------|------|
| Events | Raw events of the route | On ingest |
| EventHashes | SHA-256 of each event | On ingest |
| MerkleNodes | Intermediate Merkle nodes | On route or claim close |
| EvidenceRoots | Trip and claim roots | On close |
| ClaimPackages | Claim package bases and full packages | On claim close or dispute request |
| Anchors | Arweave transaction IDs | After anchor |

## Event Model

LogiQED uses GS1 EPCIS 2.0 as the logistics event language.

GS1 EPCIS Event, then LogiQED Source Identity, then Signature / Attestation, then Evidence Graph, then Claim, then Proof, then Evidence Package.

LogiQED adds verifiable trust and claim evaluation on top of EPCIS.

Ingest accepts events from multiple sources and converts them to EPCIS 2.0 at the entry point. After Ingest, the whole system works with a single canonical format.

## Trust Levels

| Level | Description |
|-------|-------------|
| E0 | Manual input, basic authentication |
| E1 | Authenticated external API |
| E2 | Signed software source |
| E3 | Attested device, TPM or Secure Element |
| E4 | E3 plus corroboration with another source |
| E5 | E4 plus three or more independent sources |

Trust Levels are not just an enum. They become Trust Policy + Provenance Graph.

Three sources are not necessarily independent. GPS and geofence may derive from the same signal.

Evidence Graph must record provenance of the source of the source.

See [Trust Levels](TRUST_LEVELS.md) for the full model, dimensions by source type, and computation rules.

## Hardware Attestation Research

LogiQED researches hardware proving approaches from d-inference by Layr-Labs.

Reference: https://github.com/Layr-Labs/d-inference

Key patterns:

- Secure Enclave / TEE-based key generation
- Hardware-verified attestation
- E2E encryption between client and node
- Hash-only logs

These patterns map to LogiQED trust levels E4-E5.

## Proof Engine

Pluggable proof backend.

Primary: Aligned Layer - fast, cheap ZK-verification as AVS on EigenLayer. Status: mock for MVP, integration in Phase 2.

Official website: https://alignedlayer.com/

### Traditional proof systems

- Groth16
- Plonk
- STARK

### zkVM options

- [Lattice Jolt](https://github.com/a16z/jolt) - post-quantum zkVM, lattice-based (a16z crypto). Newest experimental engine, runs on lattices.
- [SP1](https://github.com/succinctlabs/sp1) - Rust-based, production-ready, strong EVM integration (Succinct Labs).
- [RISC Zero](https://github.com/risc0/risc0) - mature, stable zkVM, full RISC-V emulation (RISC Zero).

### Proof pipeline

1. Business logic is written in pure Rust.
2. Any zkVM (Jolt / SP1 / RISC Zero) wraps execution into a compact ZK proof.
3. The proof is submitted to Aligned Layer, where the operator network verifies validity cheaply via an Ethereum smart contract.

This pipeline closes the questions of scaling and transaction cost.

Crypto-agile architecture allows replacing proof backend without changing the product.

EigenLayer is an integration choice, not an architectural dependency.

## Storage

MVP storage: operational event storage, canonicalization, Merkle tree, Evidence Root, external anchor, claim packages.

EigenDA is a provider choice behind the storage abstraction, not a core dependency. It is added only when benchmark shows the need for a separate DA layer.

### Redis

Purpose: speed, real-time, route state buffer.

Redis is an operational cache and buffer. It is not a system of record.

If Redis is empty, the system reads from MS SQL and repopulates the cache.

### MS SQL

Purpose: system of record.

Covers shipments, users, contracts, SLA rules, warehouse operations, telemetry devices, audit and analytics.

Multi-provider support: MS SQL and PostgreSQL are both available via configuration.

### Arweave

Purpose: permanent evidence.

Raw telemetry is never stored permanently. Trip anchors, claim anchors, and full package anchors are stored in Arweave.

Trip anchor is a single 32-byte hash. Claim anchor is a single 32-byte hash. Full package anchor contains the full package.

## Source Identity & Trust

Every telemetry source has a minimal identity record. The server computes trust level from this record. The source never declares its own level.

- **SourceId** - unique identifier of the source.
- **DeviceKey** - hash of the key issued by the admin.
- **SourceType** - ONBOARD_TRACKER, MOBILE_APP, BROWSER, WAREHOUSE_API, MANUAL.
- **AttestationType** - SECURE_ENCLAVE, TPM, DEVICE_CERTIFICATE, or NONE.
- **OwnAssurance** - computed from seven dimensions (E0-E5).
- **KeyIssuedAt** - when the key was issued.
- **Firmware/AppVersion** - reported by the source.
- **RevocationStatus** - ACTIVE, REVOKED, EXPIRED.
- **EvidenceConfidence** - derived from trust policy evaluation.

See [Trust Levels](TRUST_LEVELS.md) for the computation rules.

## Observability

- Seq - structured logging.
- Correlation ID - end-to-end tracing.
- Grafana - dashboards and metrics.
- OpenTelemetry - distributed tracing.

Metrics:

- telemetry_ingested_total
- route_state_transitions_total
- sla_paused_seconds_total
- evidence_build_duration_seconds
- oracle_call_total
- rabbitmq_consumer_lag

## Error Handling & Idempotency

- Deduplication key for telemetry: SourceId + ClientTimestampUtc + SourceSequence.
- Idempotent consumers.
- Poison message queue.
- Outbox Pattern.

Fallback Policy:

- Redis down - read from MS SQL projections.
- SQL down - telemetry buffer to filesystem, retry later.
- Oracle API down - return NoExternalData with synthetic flag, notify dispatcher.

## Testing Strategy

| Level | Scope | Tools |
|-------|-------|-------|
| Unit | SLA timer calculations, enrichment decider, FSM transitions | xUnit |
| Integration | RabbitMQ, SQL, Redis, SignalR hub | Testcontainers |
| E2E | Blazor UI, real telemetry stream, evidence package | Playwright |
| Load | 1000 devices, 1 packet/sec, check p95 | k6 |

## Scaling

- MVP: monolith with background service, one server, MS SQL.
- Phase 2: microservices for ingestion, event orchestration, prover workers.
- Phase 3: geo-distribution, own EigenDA nodes.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| External Oracle API becomes slow/expensive | Zero-call in normal mode |
| SQL is bottleneck | Projection tables, Redis cache |
| Device key theft | Hash storage + rotation |
| Proof backend not ready (Aligned Layer) | Mock with clear interface |
| EPCIS 2.0 too complex for MVP | Use minimal subset |
| No connectivity at geofence boundary | Events buffered and replayed |
| Claim rejected but driver disputes | Claim package base is anchored, driver can review |