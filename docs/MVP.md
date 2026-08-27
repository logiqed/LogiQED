# LogiQED MVP

## Goal

Build the core evidence layer and prove it with real trucks.

## Timeline

3–4 months.

## Budget

$170–200K. Timeline 3–4 months.

## Team

- 2 Senior .NET Engineers — platform, evidence pipeline, API
- 1 Senior Data Engineer — MS SQL, event storage, analytics
- 1 Senior Systems/C++ Engineer — proof backend, performance
- 1 DevOps — CI/CD, infrastructure, monitoring

Team can be scaled up to 2x full-time developers. Final size depends on pilot scope.

## Milestones

| Phase 			   | Timeline   | Result 																   |
|----------------------|------------|--------------------------------------------------------------------------|
| Setup 			   | Week 1–2   | Demo: map, documents, reports, SLA, chat on existing platform            |
| Tracking and Events  | Week 3–6   | Telemetry, signatures, Evidence Graph, deduplication 					   |
| SLA and Orchestrator | Week 7–10  | Route State Machine, SLA Engine, Enrichment Decider, On-Demand Oracle    |
| Claims and Proof     | Week 11–13 | Two ZK claims with mock backend, Evidence Package, Arweave integration   |
| Pilot 			   | Week 14–16 | Real trucks, commercial dispute, final report 						   |

## Existing Platform

C# Blazor operational platform is reused.

First demo within 1–2 weeks: map, documents, reports, SLA, chat.

Blockchain integration comes after the demo.

This reduces risk and accelerates the pilot.

## MVP Scope

1. Shipment and trip domain model
   - Order, route, statuses, participants.

2. GPS and mobile device tracking
   - Telemetry via smartphone and onboard systems.

3. Cold-chain temperature
   - Temperature sensor for cargo condition claims.

4. Signed Event Stream and Evidence Graph
   - Every event signed, linked, hashable.
   - Provenance DAG: claim, events, sources, rule, proof.

5. Event-Driven Route Monitoring
   - Route State Machine per route.
   - TrafficEntered and TrafficExited events.
   - SLA pause as measured interval.

6. Event Orchestrator
   - Background Service in Web.API.
   - Enrichment Decider.
   - On-Demand Oracle for external API calls only on incident.

7. SLA Engine
   - Rules, timers, automatic recalculation for external factors.
   - Working calendars and holiday sets.
   - Evaluated in carrier timezone.

8. Exception attribution
   - Traffic, weather, geofences, vehicle, warehouse.
   - Automatic determination of delay cause.

9. Evidence Package
   - Structured proof package: events, hashes, signatures, rule, conclusion.
   - Generated only for disputes or SLA exceptions.

10. ZK proof of two claims
    - Detention / Warehouse Waiting Claim.
    - Cargo Condition Claim.
    - Mock proof backend for MVP.

11. e-documents
    - Electronic waybills, acts, signatures.

12. OpenAPI and webhooks
    - Machine-readable API for integrations and AI agents.

## What is NOT in MVP

| Item 							 | Why not 										 |
|--------------------------------|-----------------------------------------------|
| AI copilot 					 | Not needed for proof of value                 |
| Full blockchain settlement     | Requires business logic validation            |
| Real Aligned Layer integration | Mock suffices for MVP, integration in Phase 2 |
| EigenDA 					     | Only when benchmark load requires 			 |
| Arweave for every package      | Keep only disputed claims 					 |
| DePIN economics 		         | Research, not product 						 |
| Scientific marketplace         | Research, not product                         |
| Soulbound badges 		         | Research, not product                         |
| MeshShield 	   		         | Research, not product                         |
| Proof-of-Freeze  		         | Research, not product                         |
| HD maps                        | Research, not product                         |
| Warehouse marketplace          | Research, not product                         |

## MVP Storage

Raw positions: 30 days. Aggregates: 1 year. Evidence Packages: permanent.

Redis: hot read-through cache.

MS SQL: system of record.

Canonicalization, Merkle tree, Evidence Root, external anchor, Evidence Package.

EigenDA is added only when benchmark shows the need for a separate DA layer.

## MVP Definition of Done

- Real trucks produce signed events. At least 3 vehicles and 50 trips.
- Route State Machine reacts to TrafficEntered and TrafficExited.
- SLA engine resolves exceptions automatically.
- Two ZK claims verified end-to-end with mock proof backend.
- Evidence Package exported for external review.
- At least one real commercial dispute or SLA exception is settled using the Evidence Package instead of the legacy manual process.
- Load target: 1000 devices at 1 packet per second, p95 under 50 ms.
- Error rate below 1 percent.

## Risks

| Risk 					  | Mitigation 								     |
|-------------------------|----------------------------------------------|
| Aligned Layer not ready | Mock for full MVP, interface already defined |
| Phone GPS inaccurate    | Add onboard sensor, enrich with TMS events   |
| Pilot partner not found | Run 3–5 negotiations in parallel             |
| SLA calendar complexity | Golden tests from day one                    |
| Budget overrun          | CI/CD from start, reserve included           |