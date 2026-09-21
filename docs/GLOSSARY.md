# LogiQED Glossary

Definitions of LogiQED concepts. For examples and diagrams, see [Architecture](ARCHITECTURE.md) and [Evidence Package](EVIDENCE.md).

## Core Concepts

- **Evidence Package**
  Immutable snapshot connecting a claim, its sources, trust policy result, rule version and proof.
  Generated only when a dispute or SLA exception requires proof.
  Clean routes are closed with signed events and Evidence Root only.

- **Claim**
  Verifiable statement evaluated by SLA policy. Examples: Detention, Cargo Condition.

- **SLA Policy**
  Reaction and resolution targets by scope. Defines when a shipment is late.

- **SLA Rule**
  Versioned rule that defines exceptions and chargeable time. Written in SLA DSL. Example: DETENTION_V1.

- **SLA DSL**
  Domain-specific language for SLA rules. Machine-readable, versioned. See [SLA DSL](SLA_DSL.md).

- **Evidence Root**
  Merkle root over canonical hashes of input events. Proves tamper-evidence without exposing raw telemetry.

- **Canonicalization**
  Normalization of event data: sorted fields, UTC timestamps, fixed precision. Produces a stable hash representation.

- **Source Assurance**
  Server-side evaluation of a source. Range E0-E5. Computed from seven dimensions. See [Trust Levels](TRUST_LEVELS.md).

- **Trust Policy**
  Required assurance for a specific claim. Example: E4_REQUIRED_V1.

- **Claim Confidence**
  Result of evaluating a claim against its Trust Policy. Separate from Source Assurance.

- **Provenance**
  Chain showing how a claim was derived from events, sources and rules.

- **Evidence Graph**
  Directed acyclic graph connecting events, sources, rules and claims.
  Records source-of-source provenance.
  GPS and geofence may derive from the same signal. The graph records this so confidence is not double-counted.
  E5 requires independence confirmed in the graph.

## Trust and Security

- **Trust Levels E0-E5**
  Graded confidence for every source.
  E0 is manual input. E5 is multiple independent trusted sources.
  Evaluated server-side from source identity, key, attestation, firmware, and revocation status.
  The client never supplies the trust level.
  See [Trust Levels](TRUST_LEVELS.md) for the full table and dimensions by source type.

- **Source Type**
  Category of a telemetry source. Values: ONBOARD_TRACKER, MOBILE_APP, BROWSER, WAREHOUSE_API, MANUAL.

- **Attestation Type**
  Hardware or software context confirmation. Values: SECURE_ENCLAVE, TPM, DEVICE_CERTIFICATE, NONE.

- **Deduplication**
  Elimination of duplicate telemetry events using key: SourceId + ClientTimestampUtc + SourceSequence.

- **Idempotency**
  Guarantee that re-processing an event produces the same result without side effects.

- **Post-Quantum Ready**
  Architecture designed to migrate to quantum-resistant algorithms without redesign.
  Implemented via hybrid signatures, Ed25519 + ML-DSA, and crypto-agile signature providers.

## Proofs and Blockchain

- **ZK Proof**
  Cryptographic proof that a computation was performed correctly without revealing inputs.
  Generated for disputed or exception-bound routes only.
  Proof backend is pluggable: Aligned Layer, Groth16, Plonk, STARK, or zkVM options (Lattice Jolt, SP1, RISC Zero).

- **Proof Backend**
  Pluggable component that generates and verifies ZK proofs. Selected by configuration, not by code change.

- **Aligned Layer**
  Primary proof backend. Fast, cheap ZK-verification as AVS on EigenLayer.
  Status: mock for MVP, integration in Phase 2.
  Official website: https://alignedlayer.com/

- **zkVM**
  Zero-knowledge virtual machine. Wraps program execution into a compact ZK proof.
  Options: Lattice Jolt (post-quantum, lattice-based), SP1 (Rust, production-ready), RISC Zero (mature, RISC-V).

- **EigenDA**
  Data availability layer. Optional in LogiQED. Added only when benchmark justifies the need.
  Provider choice behind storage abstraction, not a core dependency.

- **Arweave**
  Permanent storage for commitments and proofs.
  Stores compact Evidence Packages only.
  Raw telemetry is never stored permanently.

- **External Anchor**
  Reference to an external timestamp or anchor, such as an Arweave transaction ID or Ethereum block hash, that verifies the Evidence Root existed at a certain time.

## System Components

- **Ingest**
  Entry point for signed EPCIS events. Accepts data from onboard trackers, mobile apps, browsers, and external systems.

- **Route State Machine**
  Finite state machine that represents a route.
  Key states: InTransit, SegmentEntered, TrafficEntered, SLA_PAUSED, TrafficExited, SLA_RESUMED, SegmentExited, Completed.

- **Segment**
  Bounded section of a route between two points. Events are attributed to the segment where they occurred. Owned by the Event Orchestrator, not by the SLA Engine.

- **Event Orchestrator**
  Background Service that listens to telemetry events, updates route state machines, and decides whether external enrichment is required.
  Owns route state. Persists to SQL. Redis is a read-through projection.

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