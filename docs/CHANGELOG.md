# Changelog

## [0.3.0] - 2026-08-27

Architecture updated for event-driven route monitoring and demo preparation.

### Added

- Event-Driven Route Monitoring section in Architecture
- Route State Machine with TrafficEntered and TrafficExited
- Event Orchestrator as Background Service
- On-Demand Oracle pattern
- Enrichment Decider
- Aligned Layer as primary proof backend
- Architectural Principles section
- Module Boundaries table
- Error Handling and Idempotency section
- Testing Strategy section
- Risks and Mitigations section
- Demo Remote project for evidence verification console
- Diagrams: diagram-flow.svg and diagram-system.svg

### Changed

- Redis described as hot read-through cache, not system of record
- Arweave stores compact Evidence Packages only
- Proof Engine updated with Aligned Layer as primary
- Business Model updated with pricing and unit economics
- CLAIMS.md updated with calculation formula and edge cases
- EVIDENCE.md updated with schema, canonicalization, lifecycle
- README updated with diagrams and demo preparation status
- OpenAPI updated with security, error responses, Route State

### Removed

- Flock as a notable dependency

## [0.2.0] - 2026-08-25

Architecture and documentation synchronized.

- EPCIS 2.0 event model
- Trust Policy + Claim Confidence
- Detention and Cargo Condition claims
- Simplified MVP storage
- Flock experimental, not critical dependency