## [0.9.0] - 2026-09-23

Three-level evidence model. Claim packages, trip anchors, and claim level terminology unified across all documents.

### Added

- Three evidence levels: clean route with trip anchor, incident with claim package base, disputed with corroboration and ZK proof
- Trip Evidence Root: Merkle root over all route events, anchored for every route
- Claim Evidence Root: Merkle root over claim events, subtree of the trip root, anchored when a claim closes
- Claim package base: produced for every claim, confirmed or rejected, with decision and claim level
- Full package: produced on dispute request, with corroboration, independence check, and ZK proof when claim level is E3 or higher
- Retroactive corroboration: applied on dispute request, within the raw telemetry retention window
- ZK proof gating: generated only on dispute request, only when the claim level is E3 or higher
- Own assurance vs claim level: separation across TRUST_LEVELS, SYSTEM_MAP, GLOSSARY, ARCHITECTURE, EVENT_PIPELINE
- EPCIS conversion at Ingest entry point: all source formats converted to EPCIS 2.0 before validation
- SYSTEM_MAP.md: new document with trust, state, and evidence layers in one page
- EVENT_PIPELINE.md: new document with vertical flow from device to SLA
- EVIDENCE_FLOW.md: three evidence levels, claim packages, retroactive corroboration, MVP scope
- Evidence Builder stages: on claim close, on route close, on dispute request
- MS SQL storage tables for Evidence Builder: Events, EventHashes, MerkleNodes, EvidenceRoots, ClaimPackages, Anchors
- SLA_DSL.md: primary and corroborating sources in Trust Policy, claim level rules
- WEBHOOKS.md: new event types claim.decision_recorded, claim.package.created, claim.package.full, trip.anchor.created
- OPENAPI.yaml: packageForm, claimLevel, decision, trip and claim roots in EvidencePackage and verify responses
- GLOSSARY.md: Claim Package Base, Full Package, Trip Evidence Root, Claim Evidence Root, Claim Level, Retroactive Corroboration
- ADR 0002: separated Process steps into claim close, route close, and dispute request
- CONTRIBUTING.md: updated improvement areas with claim packages and EPCIS conversion

### Changed

- Terminology: Source Assurance → Own Assurance for source-level evaluation
- Terminology: trustLevel → claimLevel in claim outputs
- Terminology: Evidence Package → claim package base or full package depending on context
- Terminology: Evidence Root → trip Evidence Root or claim Evidence Root depending on scope
- TRUST_LEVELS.md: claim level is the maximum among independent sources, not the minimum
- TRUST_LEVELS.md: corroboration raises the claim level only when the primary source is at E3
- TRUST_LEVELS.md: mobile app max own assurance is E2 (was E1) if it signs the payload
- TRUST_LEVELS.md: two weak sources do not combine into a strong claim
- INGEST.md: Signing Flow with ten steps including EPCIS conversion
- INGEST.md: sourceAssurance is E3 for the reference example (was E4)
- SECURITY.md: Data Handling table with trip anchors, claim anchors, full package anchors
- SECURITY.md: six demo roles synchronized with DEMO.md
- AUTHORIZATION.md: six demo roles synchronized with SECURITY.md and DEMO.md
- EVIDENCE_PACKAGE.md: base package ~2 KB, full package ~4 KB
- EVIDENCE_PACKAGE.md: packageForm, decision, claimLevel, trip and claim roots
- VERIFY.md: verification steps extended to fourteen, trip and claim roots, claim level, decision
- VERIFY.md: base package response with SKIP for corroboration and proof
- DATA_FLOW.md: new BUILD step, three evidence levels
- ARCHITECTURE.md: evidence builder with three moments, evidence roots and anchors
- EVENT_PIPELINE.md: new Stage 10 for Evidence Builder
- SYSTEM_MAP.md: full flow diagram with Evidence Builder, three end-to-end examples
- README.md: three evidence levels, claim packages, anchors, updated docs list
- INVESTORS.md: three evidence levels section, claim level and corroboration section
- OVERVIEW.md: three evidence levels in Evidence Package section, own assurance vs claim level
- GLOSSARY.md: terms updated for evidence roots, claim packages, claim level
- BUSINESS_MODEL.md: three evidence levels in Solution, trip anchor in Competitive Advantage
- PITCH.md: three evidence levels in How It Works, trip anchor in Market
- PLATFORM.md: claim packages and anchors in Evidence Layer, updated Proof Engine
- MVP.md: claim packages, trip anchor, full package in Definition of Done
- PILOT.md: claim packages, trip anchor, three evidence levels in Success Criteria and Deliverables
- ROADMAP.md: claim packages, trip anchor in Phase 1 scope and exit criteria
- SLA_DSL.md: claim level and ZK gating in Design Notes, primary and corroborating sources
- WORKFLOW.md: Evidence Builder delegation, claim packages in rule versioning
- COMMUNICATION.md: trip anchor and claim package in Evidence Integration
- ADR 0001: evidence roots and anchors in Constraints and Module List
- ADR 0002: evidence roots and anchors in Context, Decision, and Process
- DEMO.md: claim packages terminology, mock ZK note, simulated anchors note
- CLAIMS.md: claim level and ZK proof section, claimLevel in output
- VISION.md: three evidence levels, claim package base and full package, chain updated

### Removed

- Source Assurance term for source-level evaluation, replaced with Own Assurance
- Evidence Package term for general use, replaced with claim package base or full package
- Evidence Root term for general use, replaced with trip Evidence Root or claim Evidence Root
- ZK proof for clean routes and rejected claims, now only on dispute request at E3+
- Mock ZK note from EVIDENCE_FLOW design notes, moved to DEMO notes
- "Device" role from AUTHORIZATION demo roles, not a role but a source

## [0.8.0] - 2026-09-22

Trust model, evidence pipeline, and cross-document terminology unified.

### Added

- TRUST_LEVELS.md: Dimensions by Source Type, Source Availability and Fallback, Claim Pipeline and Network Effect
- ARCHITECTURE.md: Claim Pipeline, Source Availability, Extended Evidence Layer, Extended Source Identity
- SLA_DSL.md: Evaluation Result with segmentId, Field Descriptions, three rule examples (Detention, Cargo Condition, Route Monitoring), Segments and Rules section
- DATA_FLOW.md: ORCHESTRATE step, Claim Pipeline, seven dimensions in AUTHENTICATE
- EVIDENCE_PACKAGE.md: Calculation Formula, Attribution table, Lifecycle, enrichmentResponse, verifiedTimestamp
- EVIDENCE_FLOW.md: Evidence Levels simplified, eFTI mode moved to Open Question
- GLOSSARY.md: SourceId, Source Type, Attestation Type, Segment, Proof Backend, SLA Policy/Rule/DSL terms
- WORKFLOW.md: Two State Machines section (Trip Workflow vs Route State Machine)
- VERIFICATION.md: Auth clarification (no X-Telemetry-Key), zkVM options listed
- OPENAPI.yaml: /evidence/ingest, /evidence/verify, EvidenceEventEnvelope, EvidenceIngestResponse

### Changed

- Terminology: DeviceId → SourceId across all documents
- Terminology: X-Device-Key → X-Telemetry-Key across all documents
- Terminology: trustLevel → sourceAssurance in ingest and webhook responses
- Pricing: $0.05-0.15 price, $0.01-0.03 cost, $0.08 average price — unified across BUSINESS_MODEL, INVESTORS, README, EVIDENCE_FLOW
- Dispute cost: $200-500 unified across all documents (was $500-2000 in PILOT)
- MVP budget: $120,000-$165,000 format unified
- Pilot duration: 2-4 weeks of live operation, weeks 11-16 in delivery program
- Team: 9 contributors (removed "up to 8" inconsistency)
- Timeline: pilot weeks 11-14 (real trips), weeks 15-16 (report)
- README, OVERVIEW, PITCH, PLATFORM: Team sections synchronized
- ADR 0001: budget format, dedup key, team list
- ADR 0002: GPS trackers (not trucks), dedup in Process

### Removed

- eFTI mode from Evidence Levels table (moved to Open Question)
- ZK_CLAIMS.md reference, replaced with CLAIMS.md
- Duplicate Evaluation Order section in SLA_DSL
- webhook.disabled event reference in WEBHOOKS
- "Tracker App" and "Third-party GPS app" from source type tables (replaced with ONBOARD_TRACKER, MOBILE_APP, BROWSER)

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