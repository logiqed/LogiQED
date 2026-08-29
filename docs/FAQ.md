# LogiQED Overview

## What LogiQED Is

LogiQED is a cryptographic evidence layer for physical logistics.

It turns physical logistics events into independently verifiable business evidence.

## The Problem

SLA disputes in freight cost $500–2,000 per case: lawyers, time, lost customers.

Paper evidence is weak. Coordination is slow. Disputes close by negotiation, not by data.

LogiQED closes disputes by math.

## What LogiQED Proves

LogiQED proves that committed measurements produced by sources satisfying a trust policy were not changed, and that a rule was executed correctly over them.

It does not claim to prove physical truth directly.

## Evidence Package

An immutable snapshot linking a claim, its sources, trust policy result, rule version and proof.

An Evidence Package is generated only when a dispute or SLA exception requires proof.

Clean routes are closed with signed events and Evidence Root only.

## Trust Levels

Trust Levels E0–E5 describe Source Assurance.

They are not an enum supplied by the client. The server evaluates source identity, key, attestation, firmware and revocation status.

## Trust Policy

A Trust Policy defines the required assurance for a specific claim.

Example: E4_REQUIRED_V1.

## Claim Confidence

Claim Confidence is the result of evaluating a claim against its Trust Policy.

It is separate from Source Assurance.

Example:

- Policy: E4_REQUIRED_V1
- Sources: device with E4 attestation
- Claim Confidence: PASS
- Conclusion: warehouse attributable 68 min, carrier 0 min

## First Claims

1. Detention / Warehouse Waiting Claim.
2. Cargo Condition Claim.

## Why Detention First

Detention is deterministic: timestamps, geofences, events and rule. No traffic causality debate.

One detention dispute can cost a carrier $300–500 in administrative overhead and lost customer trust.

## Route Monitoring

A route is a finite state machine, not a stream of coordinates.

Telemetry positions are normalized into route events.

SLA pause is the measured interval between TrafficEntered and TrafficExited.

## On-Demand Oracle

External APIs are called only when an incident occurs.

In normal operation, external API costs are zero.

## Marketplace

LogiQED is evidence infrastructure. Marketplace may come later on top of the trust graph.

## Blockchain Role

Blockchain is a trust anchor. It is not the product.

MVP storage uses canonicalization, Merkle commitments, Evidence Root and external timestamp or anchor.

This means:

- Tamper-evident commitments
- External anchoring
- Optional ZK-proofs for disputed claims

## Proof Engine

Primary proof backend: Aligned Layer. Fast, cheap ZK-verification as AVS on EigenLayer.

Status: mock for MVP, integration in Phase 2.

Official developer documentation: https://docs.alignedlayer.com/

Alternatives: Groth16, Plonk, STARK, Flock.

## Formal Verification

Primary tool: Lean 4.

Machine-checked proofs for claim rules and SLA mathematics.

Status: research. MVP uses deterministic rules with golden tests.

Official repository: https://github.com/leanprover/lean4

## EPCIS

LogiQED uses GS1 EPCIS 2.0 as the logistics event language.

EPCIS describes what, when, where and why in supply chain events.

LogiQED adds verifiable trust and claim evaluation on top.

## eFTI Window

From 9 July 2027, EU authorities must accept regulatory freight information submitted electronically through certified eFTI platforms.

LogiQED positions as evidence infrastructure on top of eFTI.

## Target Pilot Partner

Shipper, 3PL, insurer or freight forwarder who makes penalty or payout decisions.

## MVP

Budget $170–200K. Timeline 3–4 months.

Included:

- Modular monolith on C# Blazor, MS SQL, Redis, RabbitMQ
- Telemetry ingestion and route state machine
- SLA engine with calendars and exception rules
- Evidence builder and mock proof backend
- Detention and cargo condition claims
- Role-based UI for dispatcher and driver
- End-to-end tests

Excluded:

- Real Aligned Layer integration, Phase 2
- Device attestation, Phase 2
- EigenDA, Phase 3
- Lean 4 formal proofs in production, Phase 2

## Success Metrics for Pilot

| Metric | Target |
|--------|--------|
| Pilot partners | 3–5 |
| Evidence Packages per month | 10,000+ |
| Disputes closed without lawyer | 100% |
| Time from dispute to proof | Under 5 minutes |
| NPS from pilot partners | 40+ |

## Why LogiQED vs Alternatives

| Alternative | Why Not |
|-------------|---------|
| Paper and email evidence | Weak, slow, contested |
| TMS and screenshot culture | Not cryptographically binding |
| General blockchain documents | No trust levels, no SLA logic, no geofence/telemetry |
| Manual arbitration | Costly, slow, subjective |

## Contact

For investment, acquisition or pilot partnership:

- Email: LogiQED@gmail.com
- [X / Twitter](https://x.com/LogiQED)

## Reference Documents

- [Architecture](ARCHITECTURE.md)
- [ZK Claims](CLAIMS.md)
- [Evidence Package](EVIDENCE.md)
- [Trust Levels](TRUST_LEVELS.md)
- [Business Model](BUSINESS_MODEL.md)
- [Roadmap](ROADMAP.md)
- [Contributing](CONTRIBUTING.md)
- [License](../LICENSE.md)