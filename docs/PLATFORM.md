# LogiQED Platform

Production-grade C# Blazor platform for logistics and verifiable freight infrastructure.

## Executive Summary

From 9 July 2027, EU authorities must accept electronic freight transport information, eFTI, as the default.

LogiQED turns this obligation into competitive advantage through verifiable evidence infrastructure.

We are a senior engineering team from Ukraine with a production-ready platform.

## What It Is

A complete operational platform, not a prototype or MVP.

Built for real business processes: shipments, SLA, telemetry, warehouse, documents, communication and reporting.

## Platform Metrics

- 120+ projects in solution
- 1,300+ tests
- Source code is private, access after NDA

## Architecture Overview

Modular monolith on C# Blazor / ASP.NET Core, .NET 10.

Modules communicate through interfaces, never through each other's database tables.

![System Architecture](images/diagram-system.svg)

See [Architecture](ARCHITECTURE.md) for full details.

## Product Status

| Component | Status |
|-----------|--------|
| Core platform | Production-ready |
| Evidence Layer | MVP stage |
| ZK Claims | MVP stage |
| Post-quantum signatures | Hybrid Ed25519 + ML-DSA |

**Interactive demo:** [DEMO Access](DEMO.md) - credentials and recommended flow

## Core Modules

### Workflow Engine

Fully configurable from admin panel.

### SLA Engine

SLA policies, working calendars, holiday sets, exception attribution rules.

### Hybrid Authentication and Authorization

Stateful JWT with server sessions, 2FA, trusted devices, refresh rotation, RBAC and permissions.

### Custom Mediator

Command and query separation on a custom ValueTask-based mediator.

- No reflection in the hot path
- Typed dispatch at compile time
- Per-behavior ordering via attribute
- Per-notification publish strategies
- Cache prewarm before first request

Replaces the standard MediatR package.

### Admin Panel

User, role and permission management. Audit journal. Role-based UI. No hardcoded roles.

### Telemetry Subsystem

Position sources: browser, mobile app, onboard tracker, external systems.

Device identity: SourceCode + ExternalId.

See [Architecture](ARCHITECTURE.md) for source authentication details.

### Warehouse Operations

- Receipts, issues, transfers, write-offs
- Turnover sheet
- Approval workflows
- Transit warehouse support

### Reporting Engine

Export to PDF, CSV, XLSX. 200,000 rows × 60 columns in 5 seconds.

### Evidence Layer

- Signed Event Stream
- Evidence Graph
- Evidence Package
- Trust Levels E0-E5
- Hybrid signatures: Ed25519 + ML-DSA

### Route Monitoring

- Route State Machine
- TrafficEntered and TrafficExited events
- Event Orchestrator
- On-Demand Oracle

## Proof Engine

Primary: Aligned Layer. Fast, cheap ZK-verification as AVS on EigenLayer.

Status: mock for MVP, integration in Phase 2.

Estimated cost: $0.01-0.03 per evidence package. This is the COGS for LogiQED, covering ZK proof, Arweave anchor, and external API calls.

Official website: https://alignedlayer.com/

Alternatives: Groth16, Plonk, STARK.

zkVM options: Lattice Jolt, SP1, RISC Zero.

Crypto-agile architecture allows replacing proof backend without changing the product.

## Business Model

See [Business Model](BUSINESS_MODEL.md) for full details.

## Why Now

From 9 July 2027, EU authorities must accept electronic freight transport information as the default.

## Competitors and Partners

| Category | Examples | Position |
|----------|----------|----------|
| Visibility platforms | Transporeon, FourKites, project44 | Complement. They show where a truck is. LogiQED proves what happened and who is responsible. No cryptographic evidence layer. |
| TMS platforms | Trans.eu, CargoWise | Partners. They handle operations and documents. LogiQED integrates via API and adds the proof layer on top. |
| Manual arbitration | - | Replacement target. Slow, costly, subjective. Disputes close on negotiation, not on evidence. |

The distinction is not about size. It is about layer. Visibility and TMS platforms operate on data. LogiQED operates on evidence.

## Go-to-Market

- Pilot with one European carrier
- eFTI compliance as entry point
- TMS integrations via API

## Team

Senior engineering team from Ukraine.

- [Borys Mulev](https://www.linkedin.com/in/borysmulev/) - Senior C#/.NET Engineer
- [Volodymyr Marenych](https://www.linkedin.com/in/marenich/) - Senior Engineer

15+ years in C# / .NET across multiple domains. Worked together on several production systems.

Planned MVP delivery team: up to 8 contributors across .NET, C++, QA, DevOps, and product management.

Full resumes available on request under NDA.

## Transparency

The entire development process is visible in Azure DevOps.

Source code is private. Access after NDA.

## Contact

Email: contact@logiqed.tech

- [X / Twitter](https://x.com/LogiQED)
- [GitHub](https://github.com/logiqed/LogiQED)

Domain: logiqed.tech

---

## More Details

- [Investor Document](INVESTORS.md)
- [Business Model](BUSINESS_MODEL.md)
- [MVP](MVP.md)
- [Pilot](PILOT.md)
- [Architecture](ARCHITECTURE.md)