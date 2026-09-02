# ADR 0001: Modular Monolith for MVP

## Status

Accepted

## Context

LogiQED starts as a pilot MVP for evidence infrastructure in physical logistics.

Team:

- 3 Senior .NET Engineers - platform and evidence pipeline
- 2 Senior C++ Engineers - proof backend, performance
- 2 QA Engineers - testing, quality
- 1 DevOps - infrastructure, deployment, monitoring
- 1 Project Manager - coordination

Total: 9 roles, 6 FTE at start.

Constraints:

- Timeline: 3–4 months.
- Budget: $170–200K.
- Must produce two end-to-end claims.
- Must integrate with hardware trackers and temperature sensors.
- Deployment target: single VM and managed SQL.

## Decision

Use a modular monolith on C# Blazor / ASP.NET Core.

The Event Orchestrator runs as a Background Service inside the monolith.

Modules communicate through interfaces, not through each other's database tables.

### Module List

- Telemetry - ingest, normalization, deduplication, retention
- Route - route state machine, segment and traffic events
- SLA - policies, calendars, exception rules, timers
- Evidence - package builder, trust levels, provenance graph
- Identity - device keys, attestation, revocation
- Notifications - SignalR, webhooks, email, push
- Dispatcher - dashboard, manual incident resolution

## Consequences

### Positive

- Faster development and deployment.
- Simpler operations. One process, one deployment unit.
- Clear internal module boundaries enforced by convention and tests.
- Route State Machine and Orchestrator stay in-process for MVP.
- Refactoring across modules is cheap. No network boundaries.

### Negative

- Scaling limit. Modules share a single process.
- Deployment coupling. A bug in any module takes down the monolith.
- Big ball of mud risk without discipline.

### Mitigations

- Architecture tests enforce module boundaries.
- Shared Kernel contains common types.
- Review discipline. Boundary changes require 2 approvals.
- Telemetry ingest and orchestrator are isolated behind interfaces.

### Triggers for Extraction

- Sustained load above 5,000 active devices.
- Evidence build time above 500ms p95.
- Team size grows beyond 6 engineers.

## Alternatives Considered

### Microservices from day one

Rejected.

- Operational overhead: multiple deployments, service discovery, monitoring, tracing.
- No pilot-scale load justifies it.
- End-to-end evidence flows are harder to coordinate.

### Serverless

Rejected.

- Stateless functions poorly match route state machines.
- Cold start latency unpredictable for real-time telemetry.
- Less control over signature verification and proof generation.

### Separate orchestrator microservice

Rejected for MVP.

- No pilot-scale load.
- Route state machine co-located with SLA engine is simpler.
- Extraction path is clear.

## Related Documents

- [Architecture](../ARCHITECTURE.md)
- [MVP](../MVP.md)
- [Pilot](../PILOT.md)
- [Development Process](../DEVELOPMENT.md)
- [ADR 0002: Storage and Commitments](0002-storage-and-commitments.md)