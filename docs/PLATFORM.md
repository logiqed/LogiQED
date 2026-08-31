# LogiQED Platform

Production-grade C# Blazor platform for logistics and verifiable freight infrastructure.

## Executive Summary

From 9 July 2027, every European logistics company must accept electronic freight transport information, eFTI, as the default.

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

Modular monolith on C# Blazor / ASP.NET Core.

Modules communicate through interfaces, never through each other's database tables.

![System Architecture](images/diagram-system.svg)

See [ARCHITECTURE.md](ARCHITECTURE.md) for full details.

## Product Status

| Component | Status |
|-----------|--------|
| Core platform | Production-ready |
| Evidence Layer | MVP stage |
| ZK Claims | MVP stage |
| Post-quantum signatures | Hybrid: Ed25519 + ML-DSA |

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

### Reporting Engine

Export to PDF, CSV, XLSX. 200,000 rows × 60 columns in 5 seconds.

### Evidence Layer

- Signed Event Stream
- Evidence Graph
- Evidence Package
- Trust Levels E0–E5
- Hybrid signatures: Ed25519 + ML-DSA

### Route Monitoring

- Route State Machine
- TrafficEntered and TrafficExited events
- Event Orchestrator
- On-Demand Oracle

## Proof Engine

Primary: Aligned Layer. Fast, cheap ZK-verification as AVS on EigenLayer.

Status: mock for MVP, integration in Phase 2.

Estimated cost: $0.01–0.05 per shipment.

Fallback: Groth16 or Plonk.

Official documentation: https://docs.alignedlayer.com/

## Business Model

See [BUSINESS_MODEL.md](BUSINESS_MODEL.md) for full details.

## Why Now

From 9 July 2027, EU authorities must accept electronic freight transport information as the default.

## Competitors

| Competitor | Why LogiQED |
|-----------|-------------|
| Transporeon, FourKites, project44 | Visibility and dwell-time, but no cryptographic evidence layer |
| Manual arbitration | Slow, costly, subjective |

## Go-to-Market

- Pilot with one European carrier
- eFTI compliance as entry point
- TMS integrations via API

## Team

Senior engineering team from Ukraine.

- 15+ years in C# / .NET
- Worked together on logistics and cloud systems
- Resumes on request

## Transparency

The entire development process is visible in Azure DevOps.

Source code is private. Access after NDA.

## Deal Options

### Option 1: Full Acquisition

Price: Starting at $350K. Negotiable.

Full transfer including source code, deployment scripts, CI/CD pipelines, marketing assets, and all registered domain names.

### Option 2: Team + Platform + Equity

The team invests 50% of the $350K valuation into the project.

Remaining for the investor: $175K.

| Parameter | Value |
|-----------|-------|
| Platform fee | 40% of $175K = $70K, paid upfront |
| Remaining platform value | 60% of $175K = $105K, after MVP |
| MVP development | $170–200K USDT, estimated |
| Equity | 15% |

Minimum investor commitment to start: $70K upfront + $35–40K first month of work = $105–110K.

Payment flexibility for MVP:

- 50% upfront: standard speed
- 80% upfront: faster delivery
- 100% upfront: maximum speed, 10% discount

The monthly rate stays $35–40K regardless of team size.

Code transfer after full platform payment.

## Contact

Email: LogiQED@gmail.com

- [X / Twitter](https://x.com/LogiQED)
- [GitHub](https://github.com/logiqed/LogiQED)

Domain: logiqed.tech