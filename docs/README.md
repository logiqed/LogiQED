# LogiQED

![Status: Demo Preparation](https://img.shields.io/badge/status-demo_preparation-orange)
![Stack: C#](https://img.shields.io/badge/stack-C%23%20Blazor-blue)

**Verifiable Freight Infrastructure.**

LogiQED is a cryptographic evidence layer for physical logistics.

Telemetry and trip events become signed Evidence Packages. SLA violations are explained. Disputes close by math, not by trust.

---

## How It Works

Sensor/device, attestation, timestamp, signature, provenance, Evidence Package.

A late truck is explained by data: arrival 14:37, ETA 13:55, delay 42 min, cause: traffic between A-B, telemetry clean, events signed, hashes match, SLA rule v3, no penalty.

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
- **Role-based UI** — navigation and screens generated from permissions.

---

## First Two Claims

### 1. Detention / Warehouse Waiting

- Appointment 12:00, geofence entry 11:54, dock assignment 13:02, loading start 13:18, exit 14:11.
- Result: warehouse attributable 68 minutes.

### 2. Cargo Condition

- Contract 2–8°C, EU lane, temperature stayed in range.
- Proof: VALID.

---

## Tech Stack

C# Blazor, MS SQL, Redis, RabbitMQ, SignalR, Aligned Layer, Arweave.

Privacy-by-design. GDPR compliant.

Post-quantum ready: hybrid signatures Ed25519 + ML-DSA.

Source code is private. Access after NDA.

<p align="center">
  <img src="images/diagram-system.svg" alt="LogiQED System Architecture" width="850"/>
</p>

---

## Why Now

From 9 July 2027, EU authorities must accept regulatory freight information submitted electronically through certified eFTI platforms.

Official regulation: [Regulation (EU) 2020/1056](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32020R1056)

---

## Status

Core platform production-ready. Evidence Layer and claims are in MVP development.

Demo in progress. Looking for pilot partners.

Contact: LogiQED@gmail.com | [X / Twitter](https://x.com/LogiQED)

---

## Docs

- [Vision](VISION.md)
- [Architecture](ARCHITECTURE.md)
- [Trust Levels](TRUST_LEVELS.md)
- [Claims](CLAIMS.md)
- [Evidence](EVIDENCE.md)
- [Ingest API](INGEST.md)
- [Webhooks](WEBHOOKS.md)
- [Verification](VERIFY.md)
- [SLA DSL](SLA_DSL.md)
- [UI](UI.md)
- [Data Flow](DATA_FLOW.md)
- [Security](SECURITY.md)
- [Authorization](AUTHORIZATION.md)
- [Glossary](GLOSSARY.md)
- [Development Process](DEVELOPMENT.md)
- [OpenAPI](OPENAPI.yaml)
- [ADR 0001](adr/0001-modular-monolith.md)
- [ADR 0002](adr/0002-storage-and-commitments.md)

---

## More

- [Roadmap](ROADMAP.md)
- [FAQ](FAQ.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [X / Twitter](https://x.com/LogiQED)
- [License](../LICENSE.md)