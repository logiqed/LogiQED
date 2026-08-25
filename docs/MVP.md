# LogiQED MVP

## Goal

Build the core evidence layer and prove it with real trucks.

## Timeline

3–4 months.

## Budget

$170–200K.

## Team

- 2 Senior .NET Engineers — platform and evidence pipeline
- 1 Senior Data Engineer — MS SQL, analytics, event storage design
- 1 Senior Systems/C++ Engineer — proof backend integration, performance
- DevOps Engineer — infrastructure, deployment, monitoring

Team can be scaled up to 2x full-time developers. Final size depends on budget and pilot scope.

## Existing Platform

C# Blazor operational platform is reused.

First demo within 1–2 weeks: map, documents, reports, SLA, chat.

Blockchain integration comes after the demo.

This reduces risk and accelerates the pilot.

## MVP Scope

1. **Shipment/Trip domain model**
   - Order, route, statuses, participants.

2. **GPS + mobile/device tracking**
   - Telemetry via smartphone and onboard systems.

3. **Cold-chain temperature**
   - Temperature sensor for cargo condition claims.

4. **Signed Event Stream / Evidence Graph**
   - Every event signed, linked, hashable.
   - Provenance DAG: claim, events, sources, rule, proof.

5. **SLA Engine**
   - Rules, timers, automatic recalculation for external factors.

6. **Exception attribution**
   - Traffic, weather, geofences, vehicle, warehouse.
   - Automatic determination of delay cause.

7. **Evidence Package**
   - Structured proof package: events, hashes, signatures, rule, conclusion.

8. **ZK proof of two claims**
   - Detention / Warehouse Waiting Claim.
   - Cargo Condition Claim.

9. **e-documents**
   - Electronic waybills, acts, signatures.

10. **OpenAPI + webhooks**
    - Machine-readable API for integrations and AI agents.

## What is NOT in MVP

- AI copilot for operations
- Full blockchain settlement
- EigenDA as critical dependency
- Arweave as permanent storage for every package
- DePIN economics
- Scientific marketplace
- Soulbound badges
- MeshShield
- Proof-of-Freeze
- HD maps
- Warehouse marketplace

These are Phase 2+.

## MVP Storage

Operational event storage, canonicalization, Merkle tree, Evidence Root, timestamp / external anchor, Evidence Package.

EigenDA is added only when benchmark shows the need for a separate DA layer.

## MVP Definition of Done

- Real trucks produce signed events.
- SLA engine resolves exceptions automatically.
- Two ZK claims verified end-to-end.
- Evidence Package exported for external review.
- At least one real commercial dispute or SLA exception is settled using the Evidence Package instead of the legacy manual process.