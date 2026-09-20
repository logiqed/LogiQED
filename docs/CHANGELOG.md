## [0.7.1] - 2026-09-20

Demo screen count updated. Team section refined.

### Changed

- README.md: "32 screens" → "30+ screens" (number will grow as more role screens are added)
- README.md: Team section refined — planned MVP delivery team noted
- INVESTORS.md: Execution Roadmap step 3 updated to "30+ live UI screens across 6 roles"
- ROADMAP.md: Demo screen count aligned with README
- UI_DEMO.md: Auditor role expanded — Home, Incidents, Evidence Packages, Trust sources
- AUTHORIZATION.md: Auditor role aligned with UI_DEMO
- DEMO.md: Auditor credentials row updated

## [0.7.0] - 2026-09-19

Operational platform documented. Research restructured. Investor memo finalized.

### Added

- WORKFLOW.md — configurable process engine, visual editor, condition groups, permission-driven UI
- COMMUNICATION.md — chats, IP telephony, notifications, delivery journal, audit
- DEMO.md — credentials, recommended flow, auditor view guide
- Operational Platform section in INVESTORS.md (Workflow, Identity, Communication)
- "Beyond the MVP" section in INVESTORS.md
- "From MVP to Pilot" bridge section in INVESTORS.md
- Priority Tiers in research/potential/README.md (near-term, mid-term, long-term)
- "Why Hasn't the Carrier Already Fixed This?" in border-ready-pack.md
- "What the Pilot Proves" section in border-ready-pack.md
- Modules section in README.md with descriptions of all core subsystems
- Demo Access link in INVESTORS.md Status

### Changed

- INVESTORS.md: raise-first framing, preferred path in Status, three options reordered
- INVESTORS.md: Execution Roadmap step 3 now reflects workflow, identity, communication
- border-ready-pack.md: ROI split into sourced per-route and modeled fleet-level
- border-ready-pack.md: commercial/legal framing separated
- ROADMAP.md: Phase 1 budget $120–165K, Phase 2 $35K/mo and $210–315K
- ROADMAP.md: Phase 1 dispute "prepared for settlement" as shared goal
- AUTHORIZATION.md: Permission-Driven UI moved under Authorization, Border Control example added
- MVP.md: linked to Pilot as one delivery program, budget aligned
- PILOT.md: linked to MVP as final phase, budget linked to MVP non-engineering
- README.md: Modules section added, Docs list cleaned
- ADR 0001: budget updated to $120–165K, Workflow and Communication modules added
- ADR 0002: pluggable proof backend note added

### Removed

- API section from COMMUNICATION.md (endpoints not yet in OpenAPI)

## [0.6.2] - 2026-09-14

Custom Mediator documented.

### Added

- MEDIATOR.md — contracts, dispatch, registration, prewarm, advantages over MediatR
- Custom Mediator section to PLATFORM.md Core Modules

### Changed

- ARCHITECTURE.md: MediatR → Custom Mediator with reference to MEDIATOR.md
- README.md: Tech Stack updated with .NET 10 and Custom Mediator
- INVESTORS.md: Custom Mediator added to What We Have

## [0.6.1] - 2026-09-10

Proof Engine expanded. Investor and overview docs aligned.

### Added

- zkVM options to Proof Engine: Lattice Jolt, SP1, RISC Zero
- Proof pipeline description: Rust logic → zkVM → Aligned Layer
- Provider Abstraction reference to Proof Engine section
- AUTHORS.md clarifying commit attribution

### Changed

- Aligned Layer link: docs.alignedlayer.com → alignedlayer.com
- INVESTORS.md: status to Demo available, full name Volodymyr Marenych
- PITCH.md: status to Demo available
- OVERVIEW.md: Proof Engine updated with zkVM options
- GLOSSARY.md: Aligned Layer link, zkVM term, ZK Proof pluggable backend
- PLATFORM.md: Proof Engine updated, Architecture link fixed
- VISION.md: Proof Engine updated with zkVM options
- VERIFY.md: proof backend pluggable in Design Notes
- ROADMAP.md: Phase 0 marked complete
- OpenAPI and INGEST.md: domain api.logiqed.tech

## [0.6.0] - 2026-09-05

Demo available. Documentation aligned with product state.

### Added

- EVIDENCE_FLOW.md — evidence levels, Evidence Root, package flow, eFTI mode question
- EPCIS and eFTI section to README and OVERVIEW
- Provider Abstraction principle to Architecture
- No special hardware note to Trust Levels in OVERVIEW
- Evidence creation flow to Evidence Package section in OVERVIEW
- Related links between EVIDENCE.md and EVIDENCE_FLOW.md

### Changed

- README status badge: Demo Preparation → Demo Available
- README status: 32 screens, 6 roles, live walkthroughs on request
- Index.html: EPCIS and eFTI compatibility in What is LogiQED section

## [0.5.0] - 2026-08-31

Focus shift: detention first, removed research noise.

### Removed

- Lean 4 formal verification from Architecture, Claims, Evidence, Trust Model, Verification, MVP, Roadmap
- PowerQED from platform positioning
- AI Integration section from platform pitch
- Token section from platform pitch
- Research/potential folder from public focus
- Build and test badges from README
- 330+ tables metric from public docs

### Changed

- Business Model: realistic package counts for disputes only
- Competitors: Transporeon, FourKites, project44 instead of SAP, VeChain
- README: "Source code is private, access after NDA"
- PLATFORM: simplified to focus on detention claim
- ROADMAP: removed Lean 4 and AI from Phase 2

## [0.4.0] - 2026-08-29

Formal verification and research ideas updated.

## [0.3.0] - 2026-08-27

Architecture updated for event-driven route monitoring and demo preparation.

## [0.2.0] - 2026-08-25

Architecture and documentation synchronized.