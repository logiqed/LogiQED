# LogiQED — Investor & Acquisition Memorandum

## Status

Blueprint public. Interactive demo live. Source code private (access granted under mutual NDA).

LogiQED is open to:

- Direct asset acquisition (platform or complete project)
- MVP financing with founding team retention
- Pilot carrier & 3PL partnerships
- Strategic institutional integrations

**Minimum capital commitment to initiate delivery: $105–110K.**

Contact: invest@logiqed.tech

- [Website / Live Demo](https://logiqed.tech)
- [X / Twitter](https://x.com/LogiQED)
- [LinkedIn — Borys Mulev](https://www.linkedin.com/in/borysmulev/)
- [GitHub](https://github.com/logiqed/LogiQED)

---

## Executive Summary

LogiQED is a cryptographic, verifiable evidence layer designed to automate and resolve commercial disputes in physical logistics without exposing raw corporate telemetry.

- **Problem:** SLA and detention disputes cost carriers and 3PLs $200–500 per incident in manual investigation, legal friction, and idle fleet time.
- **Solution:** Cryptographically signed, independently verifiable Evidence Packages designed to support algorithmic claim resolution at an estimated cost of $0.05–0.10 per package.
- **Current State:** Fully engineered platform foundation built with C# / .NET 10 / Blazor, 120+ projects, 1,300+ automated tests, and an interactive demo with 32 UI screens across 6 operational roles.

---

## Team

Senior engineering team based in Ukraine with 15+ years of production experience in high-load C#/.NET and distributed logistics architectures:

- **[Borys Mulev](https://www.linkedin.com/in/borysmulev/)** — Lead Architect & Senior .NET Engineer
- **[Volodymyr Marenych](https://www.linkedin.com/in/marenich/)** — Senior Systems Engineer

*Full roster, engineering CVs, and references available upon request under NDA.*

---

## Platform Architecture & Technical Assets

The current platform foundation is an engineered modular monolith built on .NET 10 / C# 14:

- **Core Domains:** Telemetry Ingestion, Route State Machine, SLA Evaluation Engine, Evidence Engine, Identity & Role-Based Access, Dispatch Console, Workflow Engine.
- **Proprietary Mediator (`LogiQED.MediatR`):** Custom `ValueTask`-based CQRS dispatch pipeline with startup cache prewarming, explicit behavior ordering, and no reflection in the hot dispatch path.
- **Evidence Layer:** Signed Event Stream, Evidence Graph, canonical hash chains, Evidence Roots, and Trust Levels E0–E5.
- **Cryptographic Primitives:** Ed25519 signatures with a defined architectural path for ML-DSA integration.
- **Proof Engine:** Pluggable backend architecture (Aligned Layer mock for MVP; extensible to Groth16, PlonK, STARK, and zkVM backends including SP1 and RISC Zero).
- **Audit & Security:** Dual-channel delivery auditing, SHA-256 tracker-key hashing (obliteration pattern), 30-day telemetry retention policies, and session-level revocation.

---

## Commercial Use Cases

### 1. Detention & Warehouse Dwell-Time Attribution

- *Scenario:* Scheduled loading appointment at 12:00. Geofence arrival logged at 11:54. Dock assignment delayed until 13:02. Loading commences at 13:18 and completes at 14:11.
- *Outcome:* Algorithmic calculation of 68 billable detention minutes attributed directly to facility operations according to contractual SLA rules.

### 2. Cold-Chain Cargo Integrity

- *Scenario:* High-value pharma transit requiring continuous 2–8°C compliance across EU transit corridors.
- *Outcome:* Sensor telemetry evaluated against smart contract boundaries without exposing full GPS trails. Output: verifiable `VALID` assertion package.

---

## Market & Regulatory Tailwinds

- **Dispute Economics:** Manual resolution currently costs $200–500 per claim. Automated cryptographic resolution is designed to reduce processing cost to $0.05–0.10 per package.
- **Regulatory Mandate:** The **eFTI Regulation (EU) 2020/1056** enters full application on **9 July 2027**. EU member-state authorities must accept compliant electronic freight information shared through certified eFTI platforms.
- **Target Market:** Mid-sized carriers (10–100 trucks), temperature-controlled reefers, cross-border 3PLs, and digital freight brokers.

---

## Pilot Framework

**Objective:** Execute an operational pilot to resolve at least one live commercial dispute using signed Evidence Packages.

- **Fleet Scope:** 1 partner carrier (10–50 trucks) or regional 3PL.
- **Hardware Footprint:** 3–5 GPS trackers and 2–3 calibrated temperature sensors.
- **Duration:** 2–4 weeks of live transit across 50+ commercial loads.
- **Target Metrics:** >99.5% event ingestion integrity, automated generation of dispute packages, and partner acceptance of dispute outcomes.

---

## MVP Budget & Deployment Plan

- **Estimated Budget:** $170,000–$200,000
- **Delivery Timeline:** 3–4 months from funding
- **Core Delivery Team:** up to 8 contributors across .NET, C++, QA, DevOps, and product/project management.

### Budget Breakdown

1. **Engineering & Delivery:** $140,000–$160,000. The $35,000–$40,000 monthly rate covers the planned delivery team, project management, and operational overhead over four months.
2. **MVP Non-Engineering Costs:** $30,000–$40,000, including pilot hardware, proof integration environment, cloud infrastructure, legal review, onboarding, and operational reserve.

The estimated MVP budget is therefore $170,000–$200,000.

---

# Transaction Options

## Overview

Three transaction paths are available:

- **Option 1: Asset Acquisition** — direct purchase of platform or full project assets. $175K–$350K.
- **Option 2: Platform + MVP** — purchase of platform IP plus funded MVP development with the founding team. $345K–$375K.
- **Option 3: Hybrid Conversion** — Option 2 with a pre-agreed option to acquire the remaining project assets after MVP acceptance.

---

## Option 1: Direct Asset Acquisition

Direct, clean-break acquisition of the codebase and intellectual property. Ideal for buyers with an established engineering team.

### Tier 1: Core Platform IP — $175,000

- Full source code repository (120+ projects, clean commit history).
- Complete automated test suite (1,300+ unit, integration, and architecture tests).
- Deployment automation, container configurations, and CI/CD pipelines.
- Technical architecture specifications, database schemas, and API documentation.
- *Excludes:* Domains, trademarks, brand identity, and external social/email assets.

### Tier 2: Complete Project Acquisition — $300,000–$350,000 (Negotiable)

- Everything in Tier 1.
- Primary web domain (`logiqed.tech`) and associated defensive registrations.
- Official organization email infrastructure, communication channels, and GitHub org.
- Brand assets, presentation materials, diagrams, and investor collateral.
- Clean handover of all technical and marketing footprints.

*Closing Mechanism: Standard escrow arrangement with milestone-based code inspection.*

---

## Option 2: Platform Sale + MVP Development (Team Continues)

Structured for an investor or logistics operator who wants the existing platform, full MVP delivery, and execution continuity from the team that architected the platform.

### Investment Structure

| Component | Capital Allocation | Description |
|:---|---:|:---|
| **Platform IP Acquisition** | **$175,000** | Existing codebase, architecture, tests, documentation, and foundational R&D. |
| **MVP Development Funding** | **$170,000–$200,000** | Engineering, integrations, pilot, hardware, legal review, and operations. |
| **Total Indicative Commitment** | **$345,000–$375,000** | Platform ownership plus MVP delivery. |

### Capital Deployment and Payment Schedule

| Milestone / Stage | Allocation | Trigger Condition |
|:---|---:|:---|
| **Platform Tranche 1** | **$70,000** | Definitive agreement execution, repository access, and exclusive commercial license. |
| **MVP Month 1** | **$35,000–$40,000** | Project kickoff and team allocation. |
| **Minimum Commitment to Start** | **$105,000–$110,000** | Required to mobilize the team. |
| **MVP Months 2–4** | **$105,000–$120,000** | Monthly payments against agreed milestones. |
| **MVP Non-Engineering Costs** | **$30,000–$40,000** | Hardware, infrastructure, legal review, onboarding, and reserve. |
| **Platform Tranche 2** | **$105,000** | MVP acceptance and completion of the agreed platform IP transfer. |
| **Total** | **$345,000–$375,000** | Subject to final scope and agreement. |

### Intellectual Property and Risk Safeguards

- **Initial access:** After receipt of the first $70,000 platform tranche, the investor receives repository access and an exclusive, non-transferable commercial license for the agreed evaluation and development scope.
- **Title transfer:** Full legal ownership of the platform IP transfers to the investor's operating entity after payment of the final $105,000 platform tranche and completion of the agreed MVP acceptance conditions.
- **MVP work product:** Work product created and paid for during MVP development is governed by the signed services and IP agreement.
- **If funding stops:** The parties follow the termination, license, access, and work-product provisions agreed in the definitive contracts. No automatic transfer of full platform ownership occurs before the applicable payment and acceptance conditions are satisfied.
- **Brand carve-out:** Registered domains, project email accounts, social accounts, and brand assets remain excluded from Option 2 unless separately agreed or acquired under Option 3.
- **Long-term alignment:** The founding team may retain 5–10% performance-based equity or profit participation, subject to separate vesting and shareholder agreements.

---

## Option 3: Hybrid Conversion (De-Risked Staged Buyout)

Designed for an investor who wants to evaluate the team and MVP before acquiring the complete project footprint.

### Structure

1. **Initial agreement:** Parties execute Option 2 with a minimum initial commitment of $105,000–$110,000.
2. **Evaluation window:** The investor funds the MVP delivery cycle and reviews technical and pilot progress.
3. **MVP acceptance:** The parties evaluate the agreed technical and commercial milestones.
4. **Conversion window:** After MVP acceptance, the investor receives an exclusive 60-day option to acquire the remaining project assets.
5. **Remaining assets:** The conversion may include domains, brand, project email accounts, social accounts, marketing assets, and full operational control.
6. **Conversion price:** The price and included assets are agreed in writing at the beginning of the transaction.

Any amounts already paid and any assets already transferred must be clearly credited in the final acquisition calculation.

The hybrid structure gives the investor time to evaluate the team and MVP before committing to full project ownership.

---

## Comparison Matrix

| Evaluation Dimension | Option 1: Asset Acquisition | Option 2: Platform + MVP | Option 3: Hybrid |
|:---|:---:|:---:|:---:|
| **Indicative total cost** | $175K–$350K | $345K–$375K | Option 2 plus agreed conversion price |
| **Minimum capital to start** | According to closing terms | $105K–$110K | $105K–$110K |
| **Existing platform** | Purchased | Purchased under staged transfer | Purchased under Option 2 |
| **MVP included** | No | Yes | Yes |
| **Team continuity** | No | Yes, during MVP | Yes, during evaluation |
| **Domains and brand** | Included in Tier 2 | Excluded by default | Transferable under conversion |
| **Engineering risk** | Buyer assumes development risk | Mitigated by founding team | Staged and shared |
| **Time to MVP pilot** | Depends on buyer's team | 3–4 months | 3–4 months |
| **Best for** | Buyer with an existing engineering team | Investor seeking execution continuity | Investor seeking staged commitment |

---

## Execution Roadmap

1. **Mutual NDA** — signed before any code or data exchange.
2. **Architecture & Codebase Review** — Azure DevOps read-only access.
3. **Interactive Demo Walkthrough** — 32 UI screens, 6 operational roles.
4. **Term Sheet & Option Selection** — Option 1, 2, or 3.
5. **Definitive Agreements & Funding** — escrow setup and project mobilization.

---

## Legal & Formal Disclaimer

*This document is an indicative commercial overview prepared by the founding engineering team of LogiQED for discussion purposes only. It does not constitute a binding legal offer, investment solicitation, or financial advice.*

*All commercial valuations, ownership transfers, intellectual property assignments, and payment schedules remain subject to technical due diligence, mutual contract execution, and corporate, tax, and intellectual property legal counsel in the governing jurisdiction.*

*The team is prepared to restructure the transaction if the investor or their legal counsel proposes a clearer, safer, or more standard structure. Custom deal structures — including equity participation, revenue sharing, milestone-based models, or hybrid arrangements — are open for discussion.*