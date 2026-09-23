# LogiQED MVP

## Goal

Build the core evidence layer and prove it with real trucks.

## Position in the Delivery Program

The MVP and the pilot are one continuous program, not two separate projects.

Phase A - MVP delivery (months 1-3.5):

- Shipment and trip domain model
- Telemetry ingestion and signed event stream
- Route State Machine, SLA Engine, Event Orchestrator
- Evidence Builder with claim packages, trip Evidence Root, and mock proof backend
- Two ZK claims verified end-to-end
- Trip and claim anchors to Arweave
- OpenAPI and webhooks

Phase B - Pilot (last 2-4 weeks of MVP, overlaps with final delivery):

- 3+ vehicles, 50+ trips with real signed events
- At least one real commercial dispute prepared for settlement using an Evidence Package
- Legal assessment of admissibility
- Case study and pilot report

The MVP produces the system. The pilot proves it works with real trucks.

See [Pilot Plan](PILOT.md) for the pilot framework.

## Timeline

3-4 months total (MVP delivery + pilot execution).

## Budget

This budget covers MVP delivery and pilot execution only. It does not include the platform buyout option.

- **Engineering:** $105,000-$140,000 (3-4 months at $35,000/month)
- **Non-engineering** (hardware, cloud, legal, pilot): $15,000-$25,000
- **Total for Phase A + Phase B:** $120,000-$165,000

Phase 2 is funded separately based on progress and agreed roadmap.

See [Investor Memorandum](INVESTORS.md) for the full capital allocation, including buyout options.

## Team

- 3 Senior .NET Engineers
- 2 Senior C++ Engineers
- 2 QA Engineers
- 1 DevOps
- 1 Project Manager

Core principle: senior people, small team, fast execution.

## Milestones

| Phase | Timeline | Result | Depends on |
|-------|----------|--------|------------|
| Setup | Week 1-2 | Demo: map, documents, reports, SLA, chat on existing platform | None |
| Tracking and Events | Week 3-6 | Telemetry, signatures, Evidence Graph, deduplication | Setup |
| SLA and Orchestrator | Week 7-10 | Route State Machine, SLA Engine, Enrichment Decider, On-Demand Oracle | Tracking |
| Claims and Proof | Week 11-13 | Two ZK claims with mock backend, claim package base, trip and claim anchors to Arweave, ZK proof for disputed claims only | Evidence Graph, SLA |
| Pilot execution | Week 13-16 | Real trucks, commercial dispute, case study | Claims |

## Existing Platform

C# Blazor operational platform is reused.

First demo within 1-2 weeks: map, documents, reports, SLA, chat.

Blockchain integration comes after the demo.

This reduces risk and accelerates the pilot.

## Pilot Partner Profile

Ideal first pilot partner:

- Mid-sized carrier with 10-50 vehicles
- Operates temperature-sensitive or time-critical freight
- Has existing TMS or telematics, open to API integration
- Willing to sign mutual NDA and participate in the 4-6 week pilot cycle, including 2-4 weeks of live operation

Expected value for the pilot partner: at least one avoided dispute cost ($200-500) and documentation of process improvement.

3-5 negotiations run in parallel.

See [Pilot Plan](PILOT.md) for the full pilot framework.

## MVP Scope

1. Shipment and trip domain model
2. GPS and mobile device tracking
3. Cold-chain temperature
4. Signed Event Stream and Evidence Graph
5. Event-Driven Route Monitoring
6. Event Orchestrator
7. SLA Engine
8. Exception attribution
9. Claim package base and full package
10. Trip and claim Evidence Roots, Arweave anchors
11. ZK proof of two claims
12. e-documents
13. OpenAPI and webhooks

## What is NOT in MVP

| Category | What is excluded |
|----------|-----------------|
| Features | AI copilot, full blockchain settlement |
| Integrations | Real Aligned Layer, EigenDA, Arweave for every package |
| Research | DePIN, Scientific marketplace, Soulbound badges, MeshShield, Proof-of-Freeze, HD maps, Warehouse marketplace |

## MVP Storage

Raw positions: 30 days. Aggregates: 1 year. Trip anchors and claim anchors: permanent.

Redis: hot read-through cache.

MS SQL: system of record.

Canonicalization, Merkle tree, trip and claim Evidence Roots, external anchors, claim packages.

EigenDA is added only when benchmark shows the need for a separate DA layer.

## MVP Definition of Done

**Must have:**

- Real trucks produce signed events. At least 3 vehicles and 50 trips.
- Route State Machine reacts to TrafficEntered and TrafficExited.
- SLA engine resolves exceptions automatically.
- Two ZK claims verified end-to-end with mock proof backend.
- Claim package base produced for every claim, confirmed or rejected.
- Trip Evidence Root anchored for every route, clean or incident.
- Full package with corroboration and ZK proof produced on dispute request, when claim level is E3 or higher.
- Claim package exported for external review and accepted by pilot partner as valid evidence.
- Load target: 1000 devices at 1 packet per second.
  - p95 under 50 ms for telemetry ingestion.
  - p95 under 200 ms for API reads.
- Error rate below 1 percent.

**Shared goal with pilot partner:**

- At least one real commercial dispute or SLA exception prepared for settlement using the Evidence Package.
- Documentation of the outcome as a case study.

The dispute closure depends on the pilot partner's commercial situation, not only on the system. It is treated as a shared goal, not a one-sided commitment.

---

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
| Pilot partner not found | Run 3-5 negotiations in parallel |
| SLA calendar complexity | Golden tests from day one |
| Budget overrun | CI/CD from start, reserve included |
| Legal or regulatory delay in eFTI | Focus on voluntary SLA disputes first, they exist today regardless of eFTI |

## Success Criteria for Phase 2

MVP success unlocks Phase 2:

- Real Aligned Layer integration
- Insurance API integrations
- AI module
- Expanded device attestation

See [Business Model](BUSINESS_MODEL.md) for the phase-by-phase roadmap.

---

## Related

- [Pilot Plan](PILOT.md) - pilot framework and execution
- [Investor Memorandum](INVESTORS.md) - capital allocation and deal options
- [Architecture](ARCHITECTURE.md) - technical foundation
- [Evidence Flow](EVIDENCE_FLOW.md) - evidence levels from clean route to dispute