# ADR 0002: Storage and Commitments

## Status

Accepted

## Context

LogiQED needs a storage model for evidence events, commitments and proofs.

## Decision

MVP storage:

Operational event storage, canonicalization, Merkle tree, Evidence Root, external timestamp / anchor, Evidence Package.

EigenDA is added only when benchmark shows the need for a separate DA layer.

Arweave is optional for permanent commitments. Raw telemetry is never stored permanently.

## Rationale

- MVP volume does not justify a separate DA layer initially.
- Canonicalization and Merkle commitments provide verifiable Evidence Roots.
- External timestamp or anchor provides immutability without blockchain dependency.
- Pseudonymised data may remain personal data. Permanent storage is privacy-minimized.

## Consequences

- LogiQED is not dependent on EigenDA or Arweave for MVP.
- Evidence Packages are anchored but not stored on-chain by default.
- Adding EigenDA or Arweave is driven by benchmark, not architecture.
- Integration can expand to Eigen stack when scale justifies it.