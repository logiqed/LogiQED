# LogiQED

![Status: Demo Preparation](https://img.shields.io/badge/status-demo_preparation-orange)
![Stack: C#](https://img.shields.io/badge/stack-C%23%20Blazor-blue)
![Post-Quantum: Ready](https://img.shields.io/badge/post--quantum-ready-green)

**Verifiable Freight Infrastructure.**

LogiQED is a cryptographic evidence layer for physical logistics.

Telemetry and trip events become signed, structured Evidence Packages. SLA violations are explained. Driver responsibility is confirmed or excluded based on verifiable data. Disputes close by math, not by trust.

---

## How It Works

Sensor/device, attestation, timestamp, signature, provenance, ZK, Evidence Package.

A late truck is explained by data: arrival 14:37, ETA 13:55, delay 42 min, cause: traffic between A-B, telemetry clean, events signed, hashes match, SLA rule v3, no penalty.

Event Orchestrator maintains the Route State Machine per route and decides whether external enrichment is required.

<p align="center">
  <img src="images/diagram-flow.svg" alt="LogiQED Data Flow" width="850"/>
</p>

---

## What LogiQED Provides

- **Signed Event Stream** — authenticated trip events from devices, APIs, and sources.
- **Trust Levels E0–E5** — graded confidence for every source.
- **Evidence Graph** — provenance DAG connecting events, sources, and rules.
- **SLA Engine** — rule execution with automatic exception attribution.
- **Route State Machine** — TrafficEntered pauses SLA, TrafficExited resumes it.
- **On-Demand Oracle** — external APIs called only when an incident occurs.
- **Evidence Package** — immutable snapshot of claim, proof, and context.
- **Targeted ZK Proofs** — high-value claims only. No overengineering.
- **Role-based UI** — navigation and screens are generated from permissions. No hardcoded roles.

---

## First Two ZK Claims

### 1. SLA Exception Claim

- ETA 13:55, arrival 14:37, traffic 31 min, queue 16 min, chargeable delay 0.
- Result: no penalty.

### 2. Cargo Condition Claim

- Contract 2–8°C, EU lane, temperature stayed in range.
- Proof: VALID.

---

## Tech Stack

C# Blazor, MS SQL, Redis, RabbitMQ, SignalR, Aligned Layer, Arweave.

Privacy-by-design. Crypto-agile. Post-quantum ready.

Formal verification with Lean 4.

<p align="center">
  <img src="images/diagram-system.svg" alt="LogiQED System Architecture" width="850"/>
</p>

---

## Why Now

From 9 July 2027, EU authorities must accept regulatory freight information submitted electronically through certified eFTI platforms, creating a major interoperability and digital-evidence tailwind.

Official regulation: [Regulation (EU) 2020/1056 on electronic freight transport information (eFTI)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32020R1056)

---

## Status

**Phase: Demo Preparation**

Blueprint is public. Architecture is documented. The C# Blazor platform is being prepared for a live demo with real UI screens.

Looking for pilot partners and funding to move from demo to real trucks.

---

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
- [UI - ASCII Schemes](UI.md)
- [Data Flow](DATA_FLOW.md)
- [Security](SECURITY.md)
- [Authorization](AUTHORIZATION.md)
- [Glossary](GLOSSARY.md)
- [Pilot](PILOT.md)
- [Development Process](DEVELOPMENT.md)
- [OpenAPI draft](OPENAPI.yaml)
- [ADR 0001: Modular Monolith](adr/0001-modular-monolith.md)
- [ADR 0002: Storage and Commitments](adr/0002-storage-and-commitments.md)

---

## More

- [For Investors](PLATFORM.md)
- [Business Model](BUSINESS_MODEL.md)
- [Roadmap](ROADMAP.md)
- [FAQ](FAQ.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [X / Twitter](https://x.com/LogiQED)
- [License](../LICENSE.md)

---

## Future Ideas

> Note: The following ideas are research directions, not product commitments.

Marketplace, DePIN, scientific sensors, soulbound reputation, security modules, HD maps, AI agents.

- [Future Product Ideas](../research/potential/README.md)