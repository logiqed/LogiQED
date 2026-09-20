# LogiQED

![Status: Demo Available](https://img.shields.io/badge/status-demo_available-green)
![Stack: C#](https://img.shields.io/badge/stack-C%23%20Blazor-blue)

**Verifiable Freight Infrastructure.**

LogiQED is the cryptographic evidence layer for physical logistics.

A truck arrives at the warehouse. Geofence entry 11:54. Dock assignment 13:02. Loading start 13:18. Warehouse exit 14:11.

Verified waiting: 68 minutes. Warehouse attributable: 68 minutes. Carrier attributable: 0 minutes.

Disputes close on evidence, not on negotiation.

---

## The Result

A late truck is explained by data:

> Arrival 14:37, ETA 13:55, delay 42 min. Cause: traffic between A-B. Telemetry clean, events signed, hashes match, SLA rule v3, no penalty.

One Evidence Package costs about $0.08. One SLA dispute costs $200–500.

One won dispute pays for months of subscription.

---

## How It Works

A route is a finite state machine, not a stream of coordinates. Telemetry positions are normalized into route events. Each event is signed and processed through an event orchestration pipeline that evaluates SLA rules and produces verifiable evidence.

<p align="center">
  <img src="https://github.com/logiqed/LogiQED/blob/main/docs/images/diagram-flow.svg" alt="LogiQED Data Flow" width="850"/>
</p>

**The pipeline in short:**

1. **Ingest** - signed Protobuf coordinate deltas arrive at Telemetry Ingest.
2. **Orchestrate** - the Event Orchestrator maintains the Route State Machine per route.
3. **Evaluate** - the SLA Engine computes deterministic results in the working calendar.
4. **Build** - the Evidence Builder produces a compact package. ZK proof is generated only for disputed routes.
5. **Anchor** - Evidence Packages and proof roots are anchored externally for permanent verification.

---

### From a GPS point to verifiable evidence

A GPS point is not evidence. It is a claim: "something reported this location at this time." Evidence begins when that claim is authenticated, signed, evaluated against a trust policy, and included in an Evidence Root that any party can verify.

The diagram shows the full chain: raw claim, signed event, Evidence Package, verification result. Raw telemetry stays protected - the verifier only needs the package.

<p align="center">
  <img src="https://github.com/logiqed/LogiQED/blob/main/docs/images/diagram-gps-to-evidence.svg" alt="From a GPS claim to verifiable evidence" width="1000"/>
</p>

---

### Public verification

Verification is open. Any party - carrier, insurer, auditor, customs broker - can check an Evidence Package without an API key and without access to raw telemetry.

The public endpoint validates the organization signature, recomputes the Evidence Root from canonical event hashes, checks the rule digest, evaluates the trust policy, and confirms the proof and external anchor. The result is explicit: **VALID** or **INVALID**, with every check reported.

<p align="center">
  <img src="https://github.com/logiqed/LogiQED/blob/main/docs/images/diagram-verification-flow.svg" alt="Verification flow" width="850"/>
</p>

---

## What LogiQED Provides

- **Signed Event Stream** - authenticated trip events from devices, APIs, and sources.
- **Trust Levels E0–E5** - graded confidence for every source.
- **Evidence Graph** - provenance DAG connecting events, sources, and rules.
- **SLA Engine** - rule execution with automatic exception attribution.
- **Route State Machine** - TrafficEntered pauses SLA, TrafficExited resumes it.
- **On-Demand Oracle** - external APIs called only when an incident occurs.
- **Evidence Package** - immutable snapshot of claim, proof, and context.
- **Role-based UI** - navigation and screens generated from permissions.

---

## Modules

### Telemetry

Unified infrastructure for ingesting, normalizing, storing, and distributing mobile-object positions in real time.

**Sources:**
- Employee browser (self-reporting via My Location page)
- Tracker application (background reporting, screen-off)
- External tracking systems (via adapters)

**Device identity:** SourceCode + ExternalId. Owners are extensible - Employee is built-in, Vehicles and other kinds are added by domains.

**Tracker keys:** Admin issues a key for a tracker app. Only the SHA-256 hash is stored. The key is shown once and never recoverable. Rotation and revocation supported.

**Ingestion:** Latitude and longitude validated, timestamps normalized to UTC, future timestamps capped at server receive time, duplicates removed, points ordered by recorded time.

**Resilience:** Offline buffering on the client, safe retries, late payloads extend history without moving the current position backwards.

**Realtime:** SignalR hub `/hubs/telemetry` delivers live position updates to the dispatch map.

**Retention:** Raw positions 30 days, 1-hour aggregates 1 year. Evidence Packages are permanent via Arweave.

### Route

Finite state machine per route. TrafficEntered pauses SLA, TrafficExited resumes it. Multiple pauses per segment are aggregated.

### SLA

Policies, working calendars, holiday sets, exception rules, timers, and escalations. Deterministic calculation in the driver's working calendar.

### Evidence

Signed Event Stream, Evidence Graph, Evidence Package, Trust Levels E0–E5, Evidence Root construction, and independent verification.

### Identity

Device keys, hardware attestation, key rotation, and revocation. Hybrid signatures Ed25519 + ML-DSA.

### Workflow

Configurable process engine. Statuses, transitions, timers, condition groups. Dispatcher and admin configure workflows from the visual editor - no rebuild, no deploy.

### Communication

Chats (direct and group), notifications, delivery journal, and audit trail. Full messenger experience with read receipts, attachments, reactions. IP telephony integration available on request.

### Dispatcher

Dashboard for operational control: incident reports, evidence packages, manual incident resolution, and full trip lifecycle visibility.

---

## First Two Claims

### 1. Detention / Warehouse Waiting

- Appointment 12:00, geofence entry 11:54, dock assignment 13:02, loading start 13:18, exit 14:11.
- Result: warehouse attributable 68 minutes.

### 2. Cargo Condition

- Contract 2–8°C, EU lane, temperature stayed in range.
- Proof: VALID.

---

## EPCIS and eFTI

LogiQED uses **GS1 EPCIS 2.0** - the international logistics event language.

A truck entering a geofence, a temperature breach, a loading start - every event is recorded in a format that eFTI platforms understand.

When eFTI becomes mandatory for EU authorities on 9 July 2027, LogiQED Evidence Packages will already be in the correct format. No rework needed.

---

## Tech Stack

C# Blazor on .NET 10, MS SQL, Redis, RabbitMQ, SignalR, Aligned Layer, Arweave. Custom ValueTask-based Mediator.

Privacy-by-design. GDPR compliant.

Post-quantum ready: hybrid signatures Ed25519 + ML-DSA.

Source code is private. Access after NDA.

<p align="center">
  <img src="https://github.com/logiqed/LogiQED/blob/main/docs/images/diagram-system.svg" alt="LogiQED System Architecture" width="850"/>
</p>

---

## Team

Senior engineering team from Ukraine.

- [Borys Mulev](https://www.linkedin.com/in/borysmulev/) - Senior C#/.NET Engineer
- [Volodymyr Marenych](https://www.linkedin.com/in/marenich/) - Senior Engineer

15+ years in C# / .NET across multiple domains. Worked together on several production systems.

Additional contributors work on research and documentation. Their contributions are visible in the commit history.

Planned MVP delivery team: up to 8 contributors across .NET, C++, QA, DevOps, and product management.

Full resumes available on request under NDA.

---

## Why Now

From 9 July 2027, EU authorities must accept regulatory freight information submitted electronically through certified eFTI platforms.

The 2027 deadline creates a market window: carriers and brokers will need verifiable digital evidence in a format authorities accept. Building that infrastructure now positions LogiQED before the mandate drives demand.

Official regulation: [Regulation (EU) 2020/1056](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32020R1056)

---

## Status

Core platform production-ready. Evidence Layer and claims are in MVP development.

**Demo available.** 30+ screens, 6 roles.

**Interactive demo:** [DEMO Access](https://github.com/logiqed/LogiQED/blob/main/docs/DEMO.md) - credentials and recommended flow

Live walkthroughs available on request.

Contact: contact@logiqed.tech | [X / Twitter](https://x.com/LogiQED)

---

## For Investors

- [Investor Document](https://github.com/logiqed/LogiQED/blob/main/docs/INVESTORS.md) - team, deal options, budget
- [Business Model](https://github.com/logiqed/LogiQED/blob/main/docs/BUSINESS_MODEL.md) - pricing and economics
- [MVP](https://github.com/logiqed/LogiQED/blob/main/docs/MVP.md) - 16-week plan and budget
- [Pilot](https://github.com/logiqed/LogiQED/blob/main/docs/PILOT.md) - proving value with real trucks
- [Platform](https://github.com/logiqed/LogiQED/blob/main/docs/PLATFORM.md) - full platform details

---

## Docs

- [Vision](https://github.com/logiqed/LogiQED/blob/main/docs/VISION.md)
- [Architecture](https://github.com/logiqed/LogiQED/blob/main/docs/ARCHITECTURE.md)
- [Mediator](https://github.com/logiqed/LogiQED/blob/main/docs/MEDIATOR.md)
- [Trust Levels](https://github.com/logiqed/LogiQED/blob/main/docs/TRUST_LEVELS.md)
- [Claims](https://github.com/logiqed/LogiQED/blob/main/docs/CLAIMS.md)
- [Evidence Package](https://github.com/logiqed/LogiQED/blob/main/docs/EVIDENCE.md)
- [Evidence Flow](https://github.com/logiqed/LogiQED/blob/main/docs/EVIDENCE_FLOW.md)
- [Ingest API](https://github.com/logiqed/LogiQED/blob/main/docs/INGEST.md)
- [Communication](https://github.com/logiqed/LogiQED/blob/main/docs/COMMUNICATION.md)
- [Workflow](https://github.com/logiqed/LogiQED/blob/main/docs/WORKFLOW.md)
- [Webhooks](https://github.com/logiqed/LogiQED/blob/main/docs/WEBHOOKS.md)
- [Verification](https://github.com/logiqed/LogiQED/blob/main/docs/VERIFY.md)
- [SLA DSL](https://github.com/logiqed/LogiQED/blob/main/docs/SLA_DSL.md)
- [UI](https://github.com/logiqed/LogiQED/blob/main/docs/UI.md)
- [Data Flow](https://github.com/logiqed/LogiQED/blob/main/docs/DATA_FLOW.md)
- [Security](https://github.com/logiqed/LogiQED/blob/main/docs/SECURITY.md)
- [Authorization](https://github.com/logiqed/LogiQED/blob/main/docs/AUTHORIZATION.md)
- [Glossary](https://github.com/logiqed/LogiQED/blob/main/docs/GLOSSARY.md)
- [Development Process](DEVELOPMENT.md)
- [OpenAPI](https://github.com/logiqed/LogiQED/blob/main/docs/OPENAPI.yaml)
- [ADR 0001](https://github.com/logiqed/LogiQED/blob/main/adr/0001-modular-monolith.md)
- [ADR 0002](https://github.com/logiqed/LogiQED/blob/main/adr/0002-storage-and-commitments.md)

---

## More

- [Roadmap](https://github.com/logiqed/LogiQED/blob/main/docs/ROADMAP.md)
- [FAQ](https://github.com/logiqed/LogiQED/blob/main/docs/FAQ.md)
- [Contributing](https://github.com/logiqed/LogiQED/blob/main/docs/CONTRIBUTING.md)
- [Changelog](https://github.com/logiqed/LogiQED/blob/main/docs/CHANGELOG.md)
- [X / Twitter](https://x.com/LogiQED)
- [License](https://github.com/logiqed/LogiQED/blob/main/LICENSE.md)

---

## Future Directions

Research and exploration beyond the core evidence layer.

Marketplace, DePIN, scientific sensors, soulbound reputation, security modules, HD maps, AI agents.

- [Future Product Ideas](https://github.com/logiqed/LogiQED/blob/main/research/potential/README.md)
