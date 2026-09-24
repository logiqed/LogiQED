# LogiQED Overview

## What LogiQED Is

LogiQED is a cryptographic evidence layer for physical logistics.

It turns physical logistics events into independently verifiable business evidence.

## The Problem

SLA disputes in freight cost $200-500 per case: lawyers, time, lost customers.

Paper evidence is weak. Coordination is slow. Disputes close by negotiation, not by data.

LogiQED closes disputes on evidence, not on negotiation.

## What LogiQED Proves

LogiQED proves that committed measurements produced by sources satisfying a trust policy were not changed, and that a rule was executed correctly over them.

It does not claim to prove physical truth directly.

## Evidence Package

An immutable snapshot linking a claim, its sources, trust policy result, rule version and proof.

Three levels of evidence are produced:

- **Clean route** - signed events + Trip Evidence Root + Arweave anchor.
- **Incident** - Evidence Package Base + Claim Evidence Root anchor. Confirmed or rejected.
- **Disputed** - retroactive corroboration + ZK proof + new anchor.

The Trip Evidence Root is anchored for every route, clean or incident. This protects the data from substitution even if no dispute ever arises.

An Evidence Package Base is produced for every claim, confirmed or rejected. A rejected claim is still a recorded event.

ZK proof is generated only on dispute request, and only when the claim level is E3 or higher.

Events are created automatically, signed on the device, evaluated server-side for own assurance, hash-chained, and anchored in Arweave.

See [Evidence Flow](EVIDENCE_FLOW.md) for the three levels and [Evidence Package](EVIDENCE.md) for the full structure.

## What Is the Evidence Package Interim

Between claim close and route close, an Evidence Package Interim can be assembled on demand.

- It uses corroboration over events already present in MS SQL and the Evidence Graph.
- External APIs are not called. Their responses were captured in the Evidence Package Base at claim open.
- It is not anchored and does not modify the Evidence Package Base.
- It carries a current claim level based on the independent sources found so far.
- It is stored as a CorroborationRun record in MS SQL.
- It can be re-run at any time before route close.

Purpose: give the operator a current claim level during the route, before the Trip Evidence Root is finalized.

See [Evidence Builder](EVIDENCE_BUILDER.md) for the pre-check query and CorroborationRun storage.

## Trust Levels

Trust Levels E0-E5 describe Own Assurance of a source.

They are not an enum supplied by the client. The server evaluates source identity, key, attestation, firmware and revocation status.

Own assurance is the level of a single source. It does not change with corroboration.

A claim level is the level of a claim, formed from one or more independent sources. It is the maximum level among independent sources that confirm the same fact. Retroactive corroboration raises the claim level on corroboration preview and on dispute request.

No special hardware required. Secure Enclave and TPM keys already exist in modern phones and telematics devices. LogiQED uses existing devices for MVP.

See [Trust Levels](TRUST_LEVELS.md) for the full model.

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

One detention dispute can cost a carrier $200-500 in administrative overhead and lost customer trust.

Detention claims produce an Evidence Package Base when the claim closes. The Trip Evidence Root is anchored for every route. So even a clean route is protected if a dispute arises later.

## Route Monitoring

A route is a finite state machine, not a stream of coordinates.

Telemetry positions are normalized into route events.

SLA pause is the measured interval between TrafficEntered and TrafficExited.

## On-Demand Oracle

External APIs are called only when an incident occurs.

In normal operation, external API costs are zero.

Once an API response is recorded, it becomes part of the claim and of Evidence Package Base. Later corroboration reads the recorded response; it does not call the API again.

## Blockchain Role

Blockchain is a trust anchor. It is not the product.

MVP storage uses canonicalization, Merkle commitments, Evidence Root and external timestamp or anchor.

## Proof Engine

Primary proof backend: Aligned Layer. Fast, cheap ZK-verification as AVS on EigenLayer.

Status: mock for MVP, integration in Phase 2.

Official website: https://alignedlayer.com/

Alternatives: Groth16, Plonk, STARK.

zkVM options: Lattice Jolt, SP1, RISC Zero.

Crypto-agile architecture allows replacing proof backend without changing the product.

EigenLayer is an integration choice, not an architectural dependency.

## EPCIS

LogiQED uses GS1 EPCIS 2.0 as the logistics event language.

A truck entering a geofence, a temperature breach, a loading start - every event is recorded in a format that eFTI platforms understand.

LogiQED adds verifiable trust and claim evaluation on top.

## eFTI Window

From 9 July 2027, EU authorities must accept regulatory freight information submitted electronically through certified eFTI platforms.

## Target Pilot Partner

Initial pilot partners: mid-sized carriers with 10-50 vehicles who face SLA penalties and need verifiable evidence to defend themselves.

Long-term: shippers, 3PLs, insurers, and freight forwarders who make or influence penalty and payout decisions.

See [Pilot Plan](PILOT.md) for the full pilot framework.

## MVP

Budget $120,000-$165,000. Timeline 3-4 months.

See [MVP](MVP.md) for the full delivery program.

Included:

- Modular monolith on C# Blazor, MS SQL, Redis, RabbitMQ
- Telemetry ingestion and route state machine
- SLA engine with calendars and exception rules
- Evidence builder and mock proof backend
- Evidence Package Base, Evidence Package Interim, Evidence Package Full
- Detention and cargo condition claims
- Role-based UI for dispatcher and driver
- End-to-end tests

Excluded:

- Real Aligned Layer integration, Phase 2
- Device attestation, Phase 2
- EigenDA, Phase 3

## Success Metrics for Pilot

| Metric | Target |
|--------|--------|
| Pilot partners | 3-5 |
| Disputes resolved via Evidence Package | 10+ |
| Disputes closed without lawyer | 90% |
| Time from dispute to proof | Under 15 minutes |
| NPS from pilot partners | 40+ |

## Why LogiQED vs Alternatives

| Alternative | Why Not |
|-------------|---------|
| Paper and email evidence | Weak, slow, contested |
| TMS and screenshot culture | Not cryptographically binding |
| Manual arbitration | Costly, slow, subjective |

## Contact

For pilot partnership:

- Email: contact@logiqed.tech
- [X / Twitter](https://x.com/LogiQED)

For investment: see [Investor Document](INVESTORS.md).

## Reference Documents

- [Vision](VISION.md)
- [System Map](SYSTEM_MAP.md)
- [Event Pipeline](EVENT_PIPELINE.md)
- [Architecture](ARCHITECTURE.md)
- [Claims](CLAIMS.md)
- [Evidence Flow](EVIDENCE_FLOW.md)
- [Evidence Package](EVIDENCE.md)
- [Evidence Builder](EVIDENCE_BUILDER.md)
- [Trust Levels](TRUST_LEVELS.md)
- [SLA DSL](SLA_DSL.md)
- [Data Flow](DATA_FLOW.md)
- [Business Model](BUSINESS_MODEL.md)
- [MVP](MVP.md)
- [Pilot Plan](PILOT.md)
- [Roadmap](ROADMAP.md)
- [Contributing](CONTRIBUTING.md)
- [License](../LICENSE.md)