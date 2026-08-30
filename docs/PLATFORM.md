# LogiQED Platform

Production-grade C# Blazor platform for logistics and verifiable freight infrastructure.

## Executive Summary

From 9 July 2027, every European logistics company must accept electronic freight transport information, eFTI, as the default.

LogiQED turns this obligation into competitive advantage through verifiable evidence infrastructure with ZK proofs.

LogiQED is the only platform connecting eFTI compliance, ZK proofs, and post-quantum security on one enterprise-grade C# foundation.

We are a senior engineering team from Ukraine with a production-ready platform: 120+ projects, 1,300+ tests, 330+ tables.

## What It Is

A complete operational platform, not a prototype or MVP.

Built for real business processes: shipments, SLA, telemetry, warehouse, documents, communication and reporting.

The platform is the foundation for two products:

- LogiQED — Verifiable Freight Infrastructure
- PowerQED — Verifiable Energy Infrastructure, blueprint stage

Both products reuse the same C# Blazor core: SLA engine, workflow, auth, admin panel, telemetry, reporting.

## Platform Metrics

- 120+ projects in solution
- 1,300+ tests
- Web.UI.Tests: 400+ tests
- Omnichannel.Tests: 160+ tests
- 330+ tables in the domain model

## Architecture Overview

Modular monolith on C# Blazor / ASP.NET Core.

Modules communicate through interfaces, never through each other's database tables. Shared types live in SharedKernel.

Data flow: Telemetry Ingest, then Event Orchestrator, then Route State Machine, then SLA Engine, then Evidence Package Builder, then Aligned Layer, then Arweave.

![System Architecture](images/diagram-system.svg)

See ARCHITECTURE.md for full details.

## Product Status

| Component | Status |
|-----------|--------|
| Core platform | Production-ready |
| Evidence Layer | MVP stage |
| ZK Claims | MVP stage |
| Lean 4 formal verification | Research |
| Post-quantum signatures | Hybrid: Ed25519 + ML-DSA |
| PowerQED | Blueprint only |

## Database

Large enterprise database with a wide domain model. 330+ tables.

Multi-provider support:

- MS SQL Server
- PostgreSQL

## Core Modules

### Workflow Engine

Fully configurable from admin panel.

### SLA Engine

SLA policies, working calendars, holiday sets, exception attribution rules.

### Hybrid Authentication and Authorization

Stateful JWT with server sessions, 2FA, trusted devices, refresh rotation, RBAC and permissions.

### Admin Panel

User, role and permission management. Audit journal. Role-based UI. No hardcoded roles.

### Telemetry Subsystem

Position sources: browser, tracker app, external systems.

Device identity: SourceCode + ExternalId.

### Warehouse Operations

- Receipts, issues, transfers, write-offs
- Turnover sheet
- Approval workflows
- Transit warehouse support

### Shift Management

- Shift scheduling and handover
- Incident registry per shift
- Supervisor controls

### Reporting Engine

Export to PDF, CSV, XLSX. 200,000 rows × 60 columns in 5 seconds.

### Evidence Layer

- Signed Event Stream
- Evidence Graph
- Evidence Package
- Trust Levels E0–E5
- Hybrid signatures: Ed25519 + ML-DSA
- Hashing: SHA-256, BLAKE3

### Route Monitoring

- Route State Machine
- TrafficEntered and TrafficExited events
- Event Orchestrator
- On-Demand Oracle

### Lean 4 Formal Verification

Machine-checked proofs for claim rules and SLA mathematics.

Example property: "If SLA deadline expires, exception attribution rule applies at most once."

Roadmap: penalty calculation and exception handling in Phase 2.

Using Mathlib standard library.

Official repository: https://github.com/leanprover/lean4

## Post-Quantum Readiness

Hybrid signatures: Ed25519 + ML-DSA.

Implemented with BouncyCastle and NSec.

Crypto-agile architecture.

Following SNARK.fast for post-quantum proof verification on x86/Linux.

## Security

- Private keys stored in HSM such as Azure Key Vault
- Multisignature for smart contract management
- Cold and hot wallet separation
- AES-256 at rest, TLS 1.3 in transit

## Proof Engine

Primary: Aligned Layer. Fast, cheap ZK-verification as AVS on EigenLayer.

Flow: Evidence Graph, then claim, then batch to Aligned Layer, then verify, then Arweave or EigenDA.

Estimated cost: $0.01–0.05 per shipment.

Verification is offchain with final commitment to Ethereum.

EigenDA for hot availability. Arweave for permanent archive.

Fallback: Groth16 or Plonk.

Official documentation: https://docs.alignedlayer.com/

## ZK Schemes

| Scheme | Use |
|--------|-----|
| STARK, FRI | Primary in MVP, post-quantum, fast verification |
| Groth16, BN254 | Fallback when Aligned is unavailable |
| PLONK | Specific interactive cases |

Scheme choice is abstracted behind an interface.

## AI Integration

Using Darkbloom or OpenRouter for:

- ETA prediction
- Anomaly detection
- Document extraction

Open-weight models such as Llama 3 or Qwen2.5.

Architecture: REST or gRPC to Darkbloom, or OpenRouter API. ONNX Runtime for export.

PowerQED: load prediction, energy theft detection.

ZK-verified AI inference is researched.

## Business Model

See BUSINESS_MODEL.md for full details.

- SaaS subscription per carrier
- Fee per Evidence Package
- Fee per SLA claim verification
- Enterprise API access

## Why Now

From 9 July 2027, EU authorities must accept electronic freight transport information as the default.

eFTI certification planned for 2026 according to Regulation (EU) 2020/1056.

## Competitors

| Competitor | Why LogiQED |
|-----------|-------------|
| SAP, Oracle TM | No ZK proofs, no trust levels |
| VeChain, Chronicled | No SLA engine, no enterprise C# |
| Manual arbitration | Slow, costly, subjective |

## Go-to-Market

- Pilot with one European carrier
- eFTI compliance as entry point
- Insurance API integrations
- Marketplace later

## Token Utility

If the investor launches a token:

- Discounts on evidence fees
- Staking for SLA guarantees with slashing
- Payment for Aligned Layer fees with DEX conversion
- Governance of subsidized evidence types

Slashing scenario: if a node operator fails to provide proof within N blocks, stake is slashed via smart contract. Violations are objectively determined by telemetry and verifiers.

## Team

Senior engineering team from Ukraine.

- 15+ years in C# / .NET
- Worked together on logistics and cloud systems
- Comfortable with crypto, ZK, blockchain
- Experience with smart contracts and ZK circuits
- Resumes on request

## Technical Marketing

LogiQED Labs — technical Twitter account.

- Architecture deep dives
- ZK in logistics
- C# / Blazor engineering
- MVP progress

Plus technical blog on Medium and Dev.to.

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Missing eFTI deadline | Pilot Q1 2026, parallel compliance |
| Aligned Layer availability | Fallback to Groth16 or Plonk |
| ZK cost increase | Monitoring, batching, SNARK.fast |
| Quantum breakthrough | Hybrid signatures, crypto-agile |
| Conservative adoption | Pilot carrier, TMS integration |
| Team capacity | Phased delivery, fixed scope |

## Deal Options

### Option 1: Full Acquisition

Price: Starting at $350K. Negotiable.

Full transfer of code, brand, domain, GitHub, X account, documentation.

### Option 2: Team + Platform + Equity

| Parameter | Value |
|-----------|-------|
| Upfront payment | $48K USDT (40%) |
| After MVP | $72K USDT (60%) |
| Monthly team rate | $35–40K USDT |
| Equity | 15% |
| Token allocation | 15%, if launched |

The team manages development. The investor covers infrastructure.

All payments in USDT.

## Timeline

| Phase | When | What |
|-------|------|------|
| MVP | Q1 2026 | Evidence Layer, ZK Claims, Pilot |
| Phase 2 | Q3 2026 | Aligned Layer, attestation, insurance API, Lean 4 |
| eFTI | July 2027 | Compliance tooling ready |

## Contact

Email: LogiQED@gmail.com

- [X / Twitter](https://x.com/LogiQED)
- [GitHub](https://github.com/logiqed/LogiQED)

Domain: logiqed.tech