# LogiQED MVP

## Goal

Build the core evidence layer and prove it with real trucks.

## Timeline

3–4 months.

## Budget

$170–200K.

Budget covers MVP scope only. Phase 2 is funded separately based on progress and agreed roadmap.

## Team

- 3 Senior .NET Engineers
- 2 Senior C++ Engineers
- 2 QA Engineers
- 1 DevOps
- 1 Project Manager

Total: 9 roles, 6 FTE at start. Scalable to 8–10 FTE from month 2.

C++ and QA are shared part-time in the first month.

Core principle: senior people, small team, fast execution.

## Milestones

| Phase | Timeline | Result | Depends on |
|-------|----------|--------|------------|
| Setup | Week 1–2 | Demo: map, documents, reports, SLA, chat on existing platform | None |
| Tracking and Events | Week 3–6 | Telemetry, signatures, Evidence Graph, deduplication | Setup |
| SLA and Orchestrator | Week 7–10 | Route State Machine, SLA Engine, Enrichment Decider, On-Demand Oracle | Tracking |
| Claims and Proof | Week 11–13 | Two ZK claims with mock backend, Evidence Package, Arweave integration for disputed claims only | Evidence Graph, SLA |
| Pilot | Week 14–16 | Pilot launch, real trucks, commercial dispute, final report | Claims |

## Existing Platform

C# Blazor operational platform is reused.

First demo within 1–2 weeks: map, documents, reports, SLA, chat.

Blockchain integration comes after the demo.

This reduces risk and accelerates the pilot.

## Pilot Partner Profile

Ideal first pilot partner:

- Mid-sized carrier with 10–50 vehicles
- Operates temperature-sensitive or time-critical freight
- Has existing TMS or telematics, open to API integration
- Willing to sign mutual NDA and participate in 4–6 week pilot

Expected value for the pilot partner: at least one avoided dispute cost ($200–500) and documentation of process improvement.

3–5 negotiations run in parallel.

## MVP Scope

1. Shipment and trip domain model
2. GPS and mobile device tracking
3. Cold-chain temperature
4. Signed Event Stream and Evidence Graph
5. Event-Driven Route Monitoring
6. Event Orchestrator
7. SLA Engine
8. Exception attribution
9. Evidence Package
10. ZK proof of two claims
11. e-documents
12. OpenAPI and webhooks

## What is NOT in MVP

| Category | What is excluded |
|----------|-----------------|
| Features | AI copilot, Full blockchain settlement |
| Integrations | Real Aligned Layer, EigenDA, Arweave for every package |
| Research | DePIN, Scientific marketplace, Soulbound badges, MeshShield, Proof-of-Freeze, HD maps, Warehouse marketplace |

## MVP Storage

Raw positions: 30 days. Aggregates: 1 year. Evidence Packages: permanent.

Redis: hot read-through cache.

MS SQL: system of record.

Canonicalization, Merkle tree, Evidence Root, external anchor, Evidence Package.

EigenDA is added only when benchmark shows the need for a separate DA layer.

## MVP Definition of Done

Must have:

- Real trucks produce signed events. At least 3 vehicles and 50 trips.
- Route State Machine reacts to TrafficEntered and TrafficExited.
- SLA engine resolves exceptions automatically.
- Two ZK claims verified end-to-end with mock proof backend.
- Evidence Package exported for external review and accepted by pilot partner as valid evidence.
- Load target: 1000 devices at 1 packet per second.
  - p95 under 50 ms for telemetry ingestion.
  - p95 under 200 ms for API reads.
- Error rate below 1 percent.

Stretch:

- At least one real commercial dispute or SLA exception settled using the Evidence Package instead of the legacy manual process, documented as a case study.

## Collaboration Tools

- Azure DevOps: backlog, tasks, bugs, sprint planning
- Investor dashboard: read-only access to progress
- Demo every 2 weeks
- Progress report at each milestone

## Risks

| Risk | Mitigation |
|------|------------|
| Aligned Layer not ready | Mock for full MVP, interface already defined |
| Phone GPS inaccurate | Add onboard sensor, enrich with TMS events |
| Pilot partner not found | Run 3–5 negotiations in parallel |
| SLA calendar complexity | Golden tests from day one |
| Budget overrun | CI/CD from start, reserve included |
| Legal or regulatory delay in eFTI | Focus on voluntary SLA disputes first, they exist today regardless of eFTI |

## Success Criteria for Phase 2

MVP success unlocks Phase 2:

- Real Aligned Layer integration
- Insurance API
- AI module
- Device attestation