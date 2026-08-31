# LogiQED Glossary

Definitions of LogiQED concepts. For examples and diagrams, see ARCHITECTURE.md and EVIDENCE.md.

## Core Concepts

- **Evidence Package**
  Immutable snapshot connecting a claim, its sources, trust policy result, rule version and proof.
  Generated only when a dispute or SLA exception requires proof.
  Clean routes are closed with signed events and Evidence Root only.

- **Claim**
  Verifiable statement evaluated by SLA policy. Examples: Detention, Cargo Condition.

- **SLA Rule**
  Versioned rule that defines exceptions and chargeable time.

- **Evidence Root**
  Merkle root over canonical hashes of input events. Proves tamper-evidence without exposing raw telemetry.

- **Canonicalization**
  Normalization of event data: sorted fields, UTC timestamps, fixed precision. Produces a stable hash representation.

- **Source Assurance**
  Server-side evaluation of a source. Range E0–E5.

- **Trust Policy**
  Required assurance for a specific claim. Example: E4_REQUIRED_V1.

- **Claim Confidence**
  Result of evaluating a claim against its Trust Policy.

- **Provenance**
  Chain showing how a claim was derived from events, sources and rules.

- **Evidence Graph**
  Directed acyclic graph connecting events, sources, rules and claims.
  Records source-of-source provenance.
  GPS and geofence may derive from the same signal. The graph records this so confidence is not double-counted.

## Trust and Security

- **Trust Levels E0–E5**
  Graded confidence for every source.
  E0 is user input. E5 is multiple independent trusted sources.
  Evaluated server-side from source identity, key, attestation, firmware, and revocation status.

- **Deduplication**
  Elimination of duplicate telemetry events using key: DeviceId + ClientTimestampUtc + SourceSequence.

- **Idempotency**
  Guarantee that re-processing an event produces the same result without side effects.

- **Post-Quantum Ready**
  Architecture designed to migrate to quantum-resistant algorithms without redesign.
  Implemented via hybrid signatures, Ed25519 + ML-DSA, and crypto-agile signature providers.

## Proofs and Blockchain

- **ZK Proof**
  Cryptographic proof that a computation was performed correctly without revealing inputs.
  Generated for disputed or exception-bound routes only.

- **Aligned Layer**
  Primary proof backend. Fast, cheap ZK-verification as AVS on EigenLayer.
  Status: mock for MVP, integration in Phase 2.
  Official developer documentation: https://docs.alignedlayer.com/

- **EigenDA**
  Data availability layer. Optional in LogiQED. Added only when benchmark justifies the need.

- **Arweave**
  Permanent storage for commitments and proofs.
  Stores compact Evidence Packages only.
  Raw telemetry is never stored permanently.

- **External Anchor**
  Reference to an external timestamp or anchor, such as an Arweave transaction ID or Ethereum block hash, that verifies the Evidence Root existed at a certain time.

## System Components

- **Ingest**
  Entry point for signed EPCIS events.

- **Route State Machine**
  Finite state machine that represents a route.
  Key states: InTransit, TrafficEntered, SLA_PAUSED, TrafficExited, SLA_RESUMED, Completed.

- **Event Orchestrator**
  Background Service that listens to telemetry events, updates route state machines, and decides whether external enrichment is required.

- **On-Demand Oracle**
  Pattern where external APIs are called only when an incident occurs.
  In normal operation, external API costs are zero.

- **Enrichment Decider**
  Pure function that determines whether an event requires external confirmation.

- **EPCIS**
  GS1 EPCIS 2.0. Logistics event language describing what, when, where and why.
  LogiQED adds verifiable trust and claim evaluation on top.

## Regulation

- **eFTI**
  Electronic Freight Transport Information. EU regulation effective July 9, 2027.
  Requires electronic freight documents in cross-border logistics.