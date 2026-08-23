# LogiQED Architecture

## General Approach

Modular monolith on C# Blazor. Microservices are a Phase 2 concern.

For a pilot MVP, a modular monolith is the right trade-off. Natural computational boundaries are split later: telemetry ingestion, prover workers, AI execution.

## Backend & Frontend

- C# Blazor Server / WebAssembly — single stack.
- ASP.NET Core — REST API, OpenAPI, webhooks.
- Entity Framework Core + MS SQL Server — operational data, analytics.
- FluentValidation — request and domain validation.
- MediatR + CQRS — command and query separation.
- SignalR — real-time updates.
- RabbitMQ — message bus for telemetry and event processing.
- Redis — hot cache and pub/sub.
- Seq — structured logging and tracing.

## Telemetry Subsystem

Unified infrastructure layer for ingesting, normalizing, storing and distributing mobile-object positions in real time.

### Purpose

Separates coordinate sources from business objects. Provides generic answers:

- Where is this object now?
- Which position was just received?

### Core Idea

Coordinate source, telemetry device, owner, generic position.

### Sources

- Employee browser
- Tracker application
- External tracking systems

### Device Identity

Unique pair of SourceCode + ExternalId.

### Device Owner

OwnerKind + OwnerId. Employee is built-in. Vehicles and other kinds are extensible.

### Data Model

- Last known position on device record.
- Time-ordered position track with server-configurable retention.

### Ingestion and Normalization

- Latitude and longitude validated.
- Timestamps normalized to UTC.
- Future timestamps capped at server receive time.
- Duplicate timestamps removed.
- Points ordered by recorded time.
- Known points not re-inserted.
- Late payloads extend history but cannot move current position backwards.

### Realtime Delivery

- SignalR hub /hubs/telemetry.
- TelemetryPositionReceived event.
- Dispatch map adapter translates owner key and coordinate update.

### Resilience

- Client can buffer points offline.
- Retried payloads are safe.
- Late data does not degrade current position.

### Security

- Telemetry.Read
- Telemetry.Write
- Telemetry.Report
- Tracker-ingest API uses device key, not user auth.
- Only hash of tracker key stored.

### Extensibility

- New owner kinds without changing core.
- New ingest adapters without changing core.

## Evidence Layer

- Signed Event Stream
- Evidence Graph
- SLA Engine
- Evidence Package
- Trust Levels E0–E5

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
- Working calendars control timer behaviour.
- Exception rules generate Evidence Packages.
- Rule results visible to driver as Penalty Protection.

## Blockchain and ZK

- Flock-class proof systems — hash-intensive workloads. Runs on x86 Linux. Post-quantum proving already 3x faster on Mac, x86 ceiling still open. Benchmarks on real LogiQED circuits.
- EigenDA — temporary data availability.
- Arweave — permanent commitments and proofs.
- Arbitrum Stylus — smart contracts for settlement and arbitration (Phase 2).

## Proof Verification

Hash-based SNARKs for post-quantum Ethereum are formally verified through Lean 4 via Yukon Research and Ethereum Foundation.

Ethereum Foundation and zkSecurity run a $1M proximity challenge to establish strong security bounds.

LogiQED adopts formally verified proof backends when production ready.

### Verification Backends

Pluggable proof verification services.

- Native verifier
- Aligned Proof Aggregation — potential backend for cheap ZK verification at scale. Aggregates thousands of proofs into one, reducing L1 gas cost by 10-100x.
- EigenLayer — optional decentralized verification

## Storage

LogiQED uses different storage layers for different purposes.

### Redis

Purpose: speed and real-time.

Use cases:

- Hot cache for active shipments
- Pub/Sub for GPS updates and status changes
- Rate limiting for API
- Job queues for event processing

Redis is an operational cache. It is not a system of record.

### MS SQL

Purpose: system of record.

Use cases:

- Shipments, users, contracts, SLA rules
- Reports and analytics
- Reference data

MS SQL stores current state and business data.

### EigenDA

Purpose: temporary evidence availability.

Use cases:

- Signed events
- Hash chains
- Temporary evidence before aggregation

EigenDA provides short-term verifiable availability. It is not permanent storage.

### Arweave

Purpose: permanent evidence.

Use cases:

- Final Evidence Packages
- Proof roots
- Audit records

Arweave stores what must survive for years.

### Principle

Redis speeds up operations. MS SQL records state. EigenDA proves availability. Arweave preserves truth.

## Source Identity & Trust

Minimal attestation in MVP:

- SourceId
- DeviceKey
- SourceType
- AttestationType
- TrustLevel
- KeyIssuedAt
- Firmware/AppVersion
- RevocationStatus
- EvidenceConfidence

Trust Levels:

| Level | Source |
|-------|--------|
| E0 | user input |
| E1 | authenticated external API |
| E2 | signed software source |
| E3 | attested device |
| E4 | hardware-backed + corroborated source |
| E5 | multiple independent trusted sources |

## Observability

- Seq — structured logging.
- Correlation ID — end-to-end tracing across all async flows.
- Grafana — dashboards and metrics.
- Every evidence event traceable from ingest to Arweave.

Data is not lost. Every packet can be traced in seconds.

## Security

- Hybrid signatures: Ed25519 + ML-DSA.
- Crypto-agile signature providers.
- Pluggable proof backend.
- Device attestation — Phase 2.

## AI-Friendly Foundation

- Semantic tags on all entities.
- OpenAPI / Swagger — documented API.
- Webhooks — event-driven model for external agents.

## Scaling

- MVP: monolith, one server, MS SQL.
- Phase 2: microservices for ingestion, prover workers, AI execution.
- Phase 3: geo-distribution, own EigenDA nodes.