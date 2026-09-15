# LogiQED - Investor & Acquisition Memorandum

## Status

Blueprint public. Interactive demo live. Source code private (access granted under mutual NDA).

LogiQED is open to:

- **Immediate acquisition** — full or partial purchase of the platform, codebase, or turnkey project
- **MVP financing with team retention** — funded development, followed by platform buyout
- **Pilot carrier & 3PL partnerships**
- **Strategic institutional integrations**

Three transaction paths are documented below:

- **Option 1: Direct Asset Acquisition** — $150K (codebase) or $175K (turnkey project). Immediate purchase, no development phase.
- **Option 2: Milestone MVP Delivery + Platform Buyout** — $35K start, platform buyout on MVP acceptance.
- **Option 3: Full Turnkey Post-MVP Acquisition** — Option 2 plus brand and commercial identity.

**Minimum capital commitment to initiate MVP delivery: $35,000 (Month 1 funding).**

**Accelerated option: $132,000 upfront for engineering and delivery targets a 2-month MVP.**

Contacts:

- Investment & M&A: invest@logiqed.tech
- Partnerships & Commercial: hello@logiqed.tech
- Legal & Media Inquiries: contact@logiqed.tech
- Website / Live Demo: [logiqed.tech](https://logiqed.tech)
- [X / Twitter](https://x.com/LogiQED)
- [GitHub](https://github.com/logiqed/LogiQED)

---

## Executive Summary

LogiQED is a cryptographic, verifiable evidence layer designed to automate and resolve commercial disputes in physical logistics without exposing raw corporate telemetry.

- **Problem:** SLA and detention disputes cost carriers and 3PLs $200–500 per incident in manual investigation, legal friction, and idle fleet time.
- **Solution:** Cryptographically signed, independently verifiable Evidence Packages designed to support algorithmic claim resolution at an estimated marginal cost of $0.05–0.10 per package.
- **Current State:** Engineered platform foundation built with C# / .NET 10 / Blazor, 120+ projects, 1,300+ automated tests, and an interactive demo with 32 UI screens across 6 operational roles.

---

## Team

Senior engineering team based in Ukraine with 15+ years of production experience in high-load C#/.NET and distributed logistics architectures:

- **[Borys Mulev](https://www.linkedin.com/in/borysmulev/)** — Lead Architect & Senior .NET Engineer
- **[Volodymyr Marenych](https://www.linkedin.com/in/marenich/)** — Senior Systems Engineer

*Full engineering roster, CVs, and technical references available upon request under NDA.*

---

## Platform Architecture & Technical Assets

The current platform foundation is an engineered modular monolith built on .NET 10 / C# 14:

- **Core Domains:** Telemetry Ingestion, Route State Machine, SLA Evaluation Engine, Evidence Engine, Identity & Role-Based Access, Dispatch Console, Workflow Engine.
- **Proprietary Mediator (`LogiQED.MediatR`):** Custom `ValueTask`-based CQRS dispatch pipeline with startup cache prewarming, explicit behavior ordering, and no reflection in the hot dispatch path.
- **Evidence Layer:** Signed Event Stream, Evidence Graph, canonical hash chains, Evidence Roots, and Trust Levels E0–E5.
- **Cryptographic Primitives:** Ed25519 signatures with an established architectural path for post-quantum ML-DSA integration.
- **Proof Engine:** Pluggable backend architecture (Aligned Layer mock for MVP; extensible to Groth16, PLONK, STARK, and zkVM backends including SP1 and RISC Zero).
- **Audit & Security:** Dual-channel delivery auditing, SHA-256 tracker-key hashing (obliteration pattern), 30-day telemetry retention policies, and session-level revocation.

---

## Commercial Use Cases

### 1. Detention & Warehouse Dwell-Time Attribution

- *Scenario:* Scheduled loading appointment at 12:00. Geofence arrival logged at 11:54. Dock assignment delayed until 13:02. Loading commences at 13:18 and completes at 14:11.
- *Outcome:* Algorithmic calculation of 68 billable detention minutes attributed directly to facility operations according to contractual SLA rules.

### 2. Cold-Chain Cargo Integrity

- *Scenario:* High-value pharma transit requiring continuous 2–8°C compliance across EU transit corridors.
- *Outcome:* Sensor telemetry evaluated against contractual temperature thresholds without exposing full GPS trails. Output: verifiable `VALID` assertion package.

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

## MVP Budget & Delivery Plan

- **Engineering Rate:** $35,000 per month for the standard delivery plan, covering the agreed team allocation, project management, and operational overhead.
- **Standard Delivery:** 3–4 months, $105,000–$140,000.
- **Accelerated Delivery:** 2 months with an expanded team, $132,000 upfront for engineering and delivery. Non-engineering costs and the platform buyout are separate.
- **Non-Engineering Operations Budget:** $15,000–$25,000 (pilot hardware, cloud environments, legal admissibility review, operational buffer).
- **Total Standard MVP Operational Cost:** $120,000–$165,000.
- **Core Delivery Team:** up to 8 contributors across .NET, C++, QA, DevOps, and product/project management, with staffing and FTE allocation adjusted to the selected delivery plan.

---

# Transaction Options

## Overview

Three transaction paths are available:

- **Option 1: Direct Asset Acquisition** — purchase of codebase or turnkey project. $150K–$175K.
- **Option 2: Milestone MVP Delivery + Platform Buyout** — financing of MVP operational costs and subsequent platform buyout on acceptance. Total: $270K–$315K.
- **Option 3: Full Turnkey Project Acquisition (Post-MVP Option)** — Option 2 plus brand, domains, and commercial identity. Approximately $310K–$355K total.

---

## Option 1: Direct Asset Acquisition (As-Is Codebase)

Direct, clean-break acquisition of the existing platform. Ideal for buyers with an established in-house engineering and operations team.

### Tier 1: Core Platform IP — $150,000

- Full source code repository (120+ projects, clean architecture, commit history).
- Complete automated test suite (1,300+ unit, integration, and architecture tests).
- Deployment automation, container configurations, and CI/CD pipelines.
- Technical architecture specifications, database schemas, and internal API documentation.
- *Excludes:* Domain names, brand identity, marketing assets, and corporate email accounts.

### Tier 2: Turnkey Project Acquisition — $175,000 ($150,000 + $25,000)

- Everything included in Tier 1.
- Primary web domain (`logiqed.tech`) and associated registrations.
- Corporate email infrastructure (`invest@`, `hello@`, `contact@logiqed.tech`), subject to provider policies and migration terms.
- Transferable project social accounts, GitHub organization, and community footprints, subject to platform terms and account-transfer restrictions.
- Brand assets, presentation decks, interactive demo infrastructure, and marketing collateral.

*Brand valuation note: The indicative pre-MVP price for the brand and project identity package is $25,000. After successful MVP delivery and pilot validation, the indicative post-MVP acquisition price is $40,000, subject to the final scope and negotiation.*

*Closing Mechanism: Standard escrow arrangement with milestone-based code inspection.*

---

## Option 2: Milestone MVP Delivery + Platform Buyout

Structured for an investor or logistics operator who wants to validate execution, minimize day-one risk, and retain the founding team to deliver the agreed MVP and pilot deployment.

### How It Works

1. **Low Day-One Commitment:** The investor does not pay for the platform upfront. The project starts with **$35,000 (Month 1 engineering payment)**.
2. **Milestone Development:** The investor funds monthly delivery at the rate of $35,000 per month for 3–4 months against pre-agreed sprint milestones and pilot targets.
3. **Platform Buyout on Acceptance:** Upon successful delivery and formal acceptance of the agreed MVP, the investor pays the **$150,000 platform buyout**.
4. **Source Code & IP Transfer:** Complete legal title and full administrative control of the platform codebase and MVP work product are transferred upon receipt of the $150,000 buyout payment.

### Accelerated Delivery Option

If the investor funds $132,000 upfront for engineering and delivery, the team targets completion of the agreed MVP in 2 months using an expanded delivery crew.

Pilot hardware, legal review, cloud costs, and the final platform buyout are separate unless explicitly included in the definitive agreement.

### Accelerated Option Cost

Illustrative accelerated totals:

- **Option 2:** $132,000 engineering and delivery + $15,000–$25,000 non-engineering costs + $150,000 platform buyout = approximately $297,000–$307,000.
- **Option 3:** Option 2 accelerated total + $40,000 turnkey brand and domain package = approximately $337,000–$347,000.

Final scope, staffing, non-engineering costs, and acceptance conditions are subject to definitive agreement.

### Summary of Capital Allocation (Option 2)

- Standard MVP Delivery (3–4 months): $105,000–$140,000.
- Non-Engineering / Hardware / Pilot: $15,000–$25,000.
- **Total MVP Operational Cost:** $120,000–$165,000.
- Final Platform IP Buyout (on acceptance): **$150,000**.
- **Total Investment to Own the Agreed MVP:** approximately $270,000–$315,000.

### Safeguards for Both Parties

**For the Investor:**
- No upfront payment is required for the previously developed platform.
- Real-time visibility into team velocity and code quality through Azure DevOps.
- Access to a live staging environment throughout MVP development.
- If the team fails milestones, funding can be stopped without having paid for the platform.
- Full ownership of the platform and MVP work product transfers on buyout.

**For the Team:**
- The core platform repository remains private. The investor works with read-only and staging access.
- MVP work product is committed to private repositories controlled by the team.
- Deployment keys, signing keys, cloud credentials, and production secrets remain under team control until final settlement.
- Full repository ownership, key transfer, and production rights transfer upon receipt of the $150,000 buyout.
- If the investor stops funding, no ownership transfer occurs before the platform buyout payment. Access, licensing rights, and ownership of work product are governed by the signed services, IP, and termination agreements.

**Note on alternative sourcing:** Rebuilding the current scope from scratch would likely require more time and engineering effort than adopting the existing platform with the founding team.

---

## Option 3: Full Turnkey Project Acquisition (Post-MVP Option)

Identical to Option 2, with the inclusion of complete brand equity, operational domains, and commercial identity transferred upon MVP completion.

Because the brand, domain, and commercial footprint are significantly de-risked and validated by the live MVP and pilot results, the brand buyout is valued at **$40,000** upon MVP completion (compared to the $25,000 pre-MVP price).

### Settlement on MVP Acceptance

- Platform Codebase Buyout: **$150,000**
- Turnkey Brand & Domain Package Buyout: **$40,000**
- *Total final settlement upon formal MVP acceptance:* approximately **$190,000**
- **Total Standard Option 3 outlay:** approximately **$310,000–$355,000**, depending on MVP duration, approved non-engineering costs, and the final conversion scope.

The accelerated two-month option has a separate calculation based on the $132,000 engineering and delivery budget. The accelerated Option 3 total is approximately **$337,000–$347,000** before any scope changes.

### What Transfers Under Option 3

- 100% of platform and MVP source code repositories.
- `logiqed.tech` primary domain, DNS records, and defensive web assets.
- Corporate email infrastructure (`invest@`, `hello@`, `contact@logiqed.tech`), subject to provider policies and migration terms.
- All marketing collateral, website source files, and investor relations assets.
- Transferable project social accounts, GitHub organization, and community footprints, subject to platform terms and account-transfer restrictions.

---

## Comparison Matrix

| Evaluation Dimension | Option 1: Direct Acquisition | Option 2: MVP + Platform Buyout | Option 3: Turnkey Hybrid |
|:---|:---:|:---:|:---:|
| **Capital Required to Start** | 100% via Escrow ($150K–$175K) | **$35,000** | **$35,000** |
| **Accelerated MVP funding** | — | **$132,000 upfront** | **$132,000 upfront** |
| **Total Eventual Outlay** | $150,000–$175,000 | ~$270,000–$315,000 | ~$310,000–$355,000 |
| **Team Retained for Delivery** | No (Code handover) | Yes (3–4 months) | Yes (3–4 months) |
| **Domains, Emails & Brand** | +$25K (Tier 2) | Excluded (Code only) | Transferred on MVP acceptance ($40K) |
| **Initial Risk for Buyer** | Code integration risk | **Minimal** (monthly milestones) | **Minimal** (monthly milestones) |
| **IP Transfer Timing** | Upon contract closing | Upon $150K MVP acceptance | Upon ~$190K full acceptance |
| **Ideal Profile** | Established tech buyer | Logistics operator / Angel fund | Institutional fund seeking turnkey business |

---

## Execution Roadmap

1. **Mutual NDA** — executed prior to repository or architecture inspection.
2. **Architecture & Codebase Review** — Azure DevOps read-only access provided for technical due diligence.
3. **Interactive Demo Walkthrough** — 32 live UI screens and operational role workflows.
4. **Commercial Term Sheet** — selection of Option 1, Option 2, or Option 3.
5. **Definitive Legal Agreements** — escrow initialization and project mobilization.

---

## Legal & Formal Disclaimer

*This document is an indicative commercial memorandum prepared by the founding engineering team of LogiQED for discussion purposes only. It does not constitute a binding offer, investment solicitation, or formal securities offering.*

*All commercial valuations, ownership transfers, intellectual property assignments, and payment schedules remain subject to technical due diligence, definitive legal contract execution, and corporate, tax, and IP legal review in the governing jurisdiction.*

*The team remains flexible to evaluate alternative transaction frameworks (including hybrid equity participation or revenue-share mechanisms) proposed by qualified institutional partners.*