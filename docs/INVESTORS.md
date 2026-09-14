# LogiQED - Investor Document

## Status

Blueprint public. Demo available. Source code private, access after NDA.

Deal options below are indicative. Final structure, pricing, and terms are subject to legal, tax, and corporate advice — and to negotiation.

LogiQED is seeking:

- Full acquisition discussions
- MVP funding with team continuation
- Pilot partners
- Strategic logistics and technology partners

**Minimum commitment to start: $105–110K.**

Contact: LogiQED@gmail.com

- [X / Twitter](https://x.com/LogiQED)
- [LinkedIn](https://www.linkedin.com/in/borysmulev/)
- [GitHub](https://github.com/logiqed/LogiQED)
- Website: [logiqed.tech](https://logiqed.tech)

---

## Team

Senior engineering team from Ukraine.

- [Borys Mulev](https://www.linkedin.com/in/borysmulev/) - Senior C#/.NET Engineer
- [Volodymyr Marenych](https://www.linkedin.com/in/marenich/) - Senior Engineer

The core team has 15+ years of experience in C#/.NET and has worked together on logistics and cloud systems.

Additional team members and resumes are available on request.

---

## What We Have

A working C#/.NET 10 and Blazor platform for logistics and verifiable freight infrastructure.

- Modular monolith with 120+ projects
- 1,300+ tests
- Azure DevOps read-only access available after NDA
- Interactive demo with 32 screens and 6 roles
- Custom Mediator — ValueTask-based, no reflection, prewarmed cache

Core modules:

- Telemetry
- Route
- SLA
- Evidence
- Identity
- Notifications
- Dispatcher
- Workflow

Evidence Layer:

- Signed Event Stream
- Evidence Graph
- Evidence Package
- Evidence Root
- Trust Levels E0-E5
- Independent verification flow

Cryptography and proof architecture:

- Ed25519 signatures
- ML-DSA integration direction
- Pluggable proof backend
- Aligned Layer mock for MVP
- Planned integration options: Groth16, Plonk, STARK, and zkVM backends

The demo uses simulated evidence data. The architecture is designed for integration with real telemetry and production proof backends.

Source code is private. Access is available after NDA and technical due diligence.

---

## What We Are Building

LogiQED is a verifiable evidence layer for physical logistics.

### Claim 1: Detention and warehouse waiting

Example route:

- Appointment: 12:00
- Geofence entry: 11:54
- Dock assignment: 13:02
- Loading starts: 13:18
- Vehicle exits: 14:11

The system calculates 68 minutes of waiting and attributes responsibility according to the configured SLA rule.

### Claim 2: Cargo condition

- Contract temperature range: 2-8°C
- Route: EU lane
- Temperature remains within the required range
- Result: VALID

The goal is to replace manual dispute resolution with signed, reproducible, independently verifiable evidence.

---

## Market

- Freight SLA disputes cost approximately $200-500 per case
- An Evidence Package is designed to cost approximately $0.05-0.10
- eFTI Regulation (EU) 2020/1056 applies in full from 9 July 2027
- Target customers: mid-sized carriers, 3PLs, customs brokers, and eFTI platforms
- Initial focus: temperature-sensitive and time-critical freight

---

## Pilot

### Goal

Prove that an Evidence Package can help close a real commercial dispute.

### Pilot profile

- Carrier with 10-50 vehicles or a 3PL
- 3-5 GPS trackers
- 2-3 temperature sensors
- 2-4 weeks of real trips

### Success criteria

- At least 3 vehicles
- At least 50 trips
- At least one real dispute documented and evaluated
- Measurable reduction in dispute-resolution time
- Validation of evidence requirements with the pilot partner

---

## MVP Budget

Estimated MVP budget: $170-200K.

Estimated development timeline: 3-4 months after funding and scope approval.

Initial delivery team may include:

- Senior .NET engineers
- Senior C++ engineers
- QA engineers
- DevOps
- Product/project management

Estimated monthly delivery rate: $35-40K, subject to final scope and staffing plan.

The MVP budget covers:

- Core platform development
- Real telemetry and device integrations
- Proof-engine integration
- Pilot hardware
- Cloud deployment and operations
- Legal review of evidence admissibility
- Pilot partner acquisition
- QA and security review

---

# Deal Options

## Option 1: Asset Acquisition

This is a direct purchase of the existing project assets.

### Tier 1: Core Platform

**Indicative price: $170K**

Includes:

- Source code and repositories
- Deployment scripts
- CI/CD pipelines
- Technical documentation
- Test suite
- Demo environment
- Agreed platform IP

This tier does not include the project brand, domains, social accounts, or project email accounts unless separately agreed.

### Tier 2: Full Project Acquisition

**Indicative price: $300-350K, negotiable**

Includes everything in Tier 1, plus:

- Registered domains
- Project email accounts
- Social media accounts
- Brand and marketing assets
- Website assets
- Project documentation
- All agreed project IP and materials

### Transfer terms

- Full transfer occurs after completion of payment.
- Escrow or milestone-based closing may be used to protect both parties.
- No continuing equity or operating relationship is required unless separately negotiated.
- The final asset list, warranties, liabilities, and transfer conditions will be defined in the acquisition agreement.

---

## Option 2: Platform Sale + MVP Development

This structure is for an investor who wants the existing platform, the MVP, and the continued support of the team.

The investor purchases the existing platform IP and separately funds MVP development.

The team continues working under a paid services agreement.

### Investment structure

| Component | Amount |
|-----------|-------:|
| Existing platform and prior engineering work | $175K |
| MVP development budget | $170-200K |
| **Total indicative commitment** | **$345-375K** |

### Payment Schedule

| Stage | Amount | Trigger |
|-------|--------|---------|
| Platform — upfront | $70K | Signing + IP assignment |
| MVP — month 1 | $35-40K | Project start |
| **Minimum commitment to start** | **$105-110K** | |
| Platform — remaining balance | 65% of remaining, monthly | During MVP development |
| Platform — final balance | 35% of remaining | On MVP acceptance |
| MVP — months 2-4 | $35-40K/month | Monthly, on milestone acceptance |
| **Total over MVP** | **$345-375K** | |

### Payment flexibility

Payment terms are negotiable. The team is open to discussing:

- Different upfront amounts
- Different milestone structures
- Extended payment schedules
- Performance-based components

A minimum commitment of $105-110K is required to start the project.

### Existing platform transfer

The $175K platform component compensates the team for the existing platform and approximately one year of prior engineering work.

It includes:

- Source code and repositories
- Platform architecture
- Evidence Layer
- Telemetry subsystem
- Workflow engine
- SLA engine
- Identity and security modules
- Tests and CI/CD
- Technical documentation
- Demo environment

### MVP development

The separate $170-200K MVP budget funds:

- Real telemetry integrations
- Proof-engine integration
- Pilot deployment
- Hardware and sensors
- QA and security review
- Legal review
- Product and project management

The team remains available during MVP development at an estimated monthly rate of $35-40K, subject to final scope and staffing.

### Assets not included by default

The following are not included in the standard Option 2 platform transfer:

- Registered domains
- Project email accounts
- Social media accounts
- Brand and marketing assets
- Full company acquisition

These assets can be transferred separately by negotiation.

### What the investor receives

- Platform IP and source code
- MVP development under an agreed scope
- Continued access to the team that built the platform
- Technical documentation and deployment materials
- Milestone reporting
- Optional governance and information rights

### What the team receives

- $175K compensation for prior platform development, paid per the schedule above
- Continued paid work during MVP development
- Optional equity or performance-based participation, subject to separate agreement

---

## Option 3: Hybrid Conversion

This structure starts as Option 2 and gives the investor a later right to acquire the remaining project assets.

### Structure

- The investor commits to Option 2.
- The platform transfer and MVP development proceed under signed agreements.
- The team continues development during the MVP period.
- After MVP delivery, the investor receives a 60-day conversion window.
- During this window, the investor may convert to a full project acquisition.

### Payment Schedule

Same as Option 2:

| Stage | Amount | Trigger |
|-------|--------|---------|
| Platform — upfront | $70K | Signing + IP assignment |
| MVP — month 1 | $35-40K | Project start |
| **Minimum commitment to start** | **$105-110K** | |
| Platform — remaining balance | 65% of remaining, monthly | During MVP development |
| Platform — final balance | 35% of remaining | On MVP acceptance |
| MVP — months 2-4 | $35-40K/month | Monthly, on milestone acceptance |
| **Total over MVP** | **$345-375K** | |
| Conversion (domains, brand, accounts) | Agreed at signing | Within 60 days after MVP |

### Conversion

The conversion price and included assets are agreed in writing at the beginning of the transaction.

The conversion agreement may include:

- Domains
- Brand
- Project email accounts
- Social media accounts
- Marketing assets
- Full operational control
- Remaining project IP and commercial assets

The conversion price can be:

- fixed at signing; or
- calculated according to an agreed formula.

Any amounts already paid and any transferred assets must be clearly credited in the final acquisition calculation.

### Purpose

The hybrid structure allows the investor to:

- evaluate the team during MVP development;
- observe the platform under real pilot conditions;
- review technical and commercial progress;
- decide whether to continue with the team or acquire the full project.

The team receives:

- compensation for prior platform development;
- funded MVP development;
- paid engineering work during the evaluation period;
- a clearly defined conversion mechanism.

---

## Comparison

| | Option 1: Acquisition | Option 2: Platform + MVP | Option 3: Hybrid |
|---|---|---|---|
| Indicative cost | $170-350K | $345-375K | Agreed at signing |
| Minimum to start | Full payment | $105-110K | $105-110K |
| Existing platform | Purchased | Purchased | Purchased |
| MVP included | No | Yes | Yes |
| Team continues | No | Yes | Yes during MVP |
| Domains and brand | Included in Tier 2 | Not included by default | Transferable on conversion |
| Development risk | Buyer takes it | Shared through services agreement | Shared during evaluation |
| Full ownership option | Immediate | Separate negotiation | Available after MVP |
| Best for | Buyer with own team | Investor seeking team continuity | Investor wanting staged commitment |

Option 2 costs more than a basic acquisition because it includes both the existing platform and funded MVP development with the engineering team.

---

## Investor Protection

The parties may use milestone payments or escrow.

Possible structure:

1. Mutual NDA
2. Technical due diligence
3. Azure DevOps read-only access
4. Agreed MVP scope and milestones
5. Signed acquisition, IP, services, and/or conversion agreements
6. Initial funding released to the operating entity
7. Monthly reporting on budget and progress
8. Milestone acceptance based on agreed technical criteria
9. Pilot deployment
10. Commercial validation

For an acquisition, escrow can protect source-code transfer and payment.

For a continuing development structure, the team works under a written services agreement with defined deliverables, payment terms, IP provisions, and termination rights.

---

## Use of Funds

- MVP development
- Real telemetry and device integrations
- Proof-engine integration
- Pilot hardware: estimated $500-2,500
- Cloud infrastructure and deployment
- Legal review of evidence admissibility
- Pilot partner acquisition
- QA and security review

---

## Next Steps

1. NDA
2. Technical due diligence
3. Azure DevOps read-only access
4. Demo walkthrough
5. MVP scope and milestones
6. Pilot partner introduction
7. Agreement on structure and terms
8. Legal documentation
9. Funding and project start

---

## Legal Note

All prices, valuations, ownership rights, IP transfers, warranties, conversion terms, and payment conditions are indicative.

They reflect the current view of the founding team and do not constitute legal advice.

Final structure, pricing, and terms are subject to legal, tax, corporate, and IP advice in the relevant jurisdiction — and open to negotiation.

The team is prepared to restructure the transaction if the investor or their legal counsel proposes a clearer, safer, or more standard structure.