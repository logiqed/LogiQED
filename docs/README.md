# LogiQED

**Verifiable Freight Infrastructure.**

LogiQED is a cryptographic evidence layer for physical logistics.

Telemetry and trip events become signed, structured Evidence Packages. SLA violations are explained. Driver responsibility is confirmed or excluded based on verifiable data. Disputes close by math, not by trust.

## The Chain

Sensor/device, attestation, timestamp, signature, provenance, ZK, Evidence Package.

A late truck is explained by data: arrival 14:37, ETA 13:55, delay 42 min, cause: traffic between A-B, telemetry clean, events signed, hashes match, SLA rule v3, no penalty.

## What LogiQED Provides

- **Signed Event Stream** — authenticated trip events from devices, APIs, and sources.
- **Trust Levels E0–E5** — graded confidence for every source.
- **Evidence Graph** — provenance DAG connecting events, sources, and rules.
- **SLA Engine** — rule execution with automatic exception attribution.
- **Evidence Package** — immutable snapshot of claim, proof, and context.
- **Targeted ZK Proofs** — high-value claims only. No overengineering.

## First Two ZK Claims

1. **SLA Exception Claim**
   - ETA 13:55, arrival 14:37, traffic 31 min, queue 16 min, chargeable delay 0.
   - Result: no penalty.

2. **Cargo Condition Claim**
   - Contract 2–8°C, EU lane, temperature stayed in range.
   - Proof: VALID.

## Tech Stack

C# Blazor, MS SQL, Flock-class proof systems, EigenDA, Arweave, Arbitrum Stylus.

Privacy-by-design. Crypto-agile. Post-quantum ready.

## Why Now

EU eFTI Regulation applies from July 9, 2027. Machine-verifiable freight evidence becomes mandatory. LogiQED is built for this window.

## Status

Blueprint phase. Looking for pilot partners and funding to move to real trucks.

## Docs

- [Vision](VISION.md)
- [Architecture](ARCHITECTURE.md)
- [MVP](MVP.md)
- [Trust Levels](TRUST_LEVELS.md)
- [Claims](CLAIMS.md)
- [Evidence](EVIDENCE.md)
- [Ingest API](INGEST.md)
- [Webhooks](WEBHOOKS.md)
- [Verification](VERIFY.md)
- [SLA DSL](SLA_DSL.md)
- [UI — ASCII Schemes](UI.md)
- [Data Flow](DATA_FLOW.md)
- [Security](SECURITY.md)
- [Glossary](GLOSSARY.md)
- [Pilot](PILOT.md)
- [Development Process](DEVELOPMENT.md)
- [OpenAPI draft](OPENAPI.yaml)
- [ADR 0001: Modular Monolith](adr/0001-modular-monolith.md)
- [ADR 0002: Crypto and Data Availability](adr/0002-crypto-data-availability.md)

## More

- [Business Model](BUSINESS_MODEL.md)
- [Roadmap](ROADMAP.md)
- [FAQ](FAQ.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [X / Twitter](https://x.com/LogiQED)
- [License](../LICENSE.md)

## Future Ideas

Draft directions for product expansion beyond the core evidence layer.

Marketplace, DePIN, scientific sensors, soulbound reputation, security modules, HD maps, AI agents.

- [Future Product Ideas](../research/potential/README.md)