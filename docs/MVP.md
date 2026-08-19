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
- 1 Senior Systems/C++ Engineer — ZK integration, performance, attestation
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

3. **Signed Event Stream / Evidence Graph**
   - Every event signed, linked, hashable.
   - Provenance DAG: claim, events, sources, rule, proof.

4. **SLA Engine**
   - Rules, timers, automatic recalculation for external factors.

5. **Exception attribution**
   - Traffic, weather, geofences, vehicle, warehouse.
   - Automatic determination of delay cause.

6. **Evidence Package**
   - Structured proof package: events, hashes, signatures, rule, conclusion.

7. **ZK proof of two claims**
   - SLA Exception Claim.
   - Cargo Condition Claim.

8. **e-documents**
   - Electronic waybills, acts, signatures.

9. **OpenAPI + webhooks**
   - Machine-readable API for integrations and AI agents.

10. **AI copilot for operations**
    - Analysis assistance. Not an autonomous dispatcher.

## What is NOT in MVP

- DePIN economics
- Scientific marketplace
- Soulbound badges
- MeshShield
- Proof-of-Freeze
- HD maps
- Warehouse marketplace

These are Phase 2+.

## MVP Definition of Done

- Real trucks produce signed events.
- SLA engine resolves exceptions automatically.
- Two ZK claims verified end-to-end.
- Evidence Package exported for external review.
- Design partners can access API and see value.