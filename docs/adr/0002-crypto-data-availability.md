# ADR 0002: Cryptographic Layer and Data Availability

## Status

Accepted

## Context

LogiQED needs a data availability layer for hashes and proofs of freight evidence.

Options considered: EigenDA, Celestia, Avail, direct L1/L2 storage.

## Decision

Use EigenDA for temporary data availability of evidence hashes and proofs.

Use Arweave for permanent commitments and non-personal manifest.

## Rationale

- EigenDA offers ultra-low gas costs for high-throughput hash workloads.
- Direct synergy with EigenLayer validator ecosystem and $EIGEN staking.
- Flock-class proof systems and Eigen tooling align with LogiQED evidence claims.
- Celestia and Avail introduce an extra trust layer without immediate benefit.
- L1/L2 permanent storage of raw evidence is economically impractical and GDPR-unfriendly.

## Consequences

- LogiQED inherits EigenLayer security assumptions.
- Evidence hashes benefit from low-cost DA at scale.
- Permanent evidence remains in Arweave, separate from operational DA.
- Integration effort focused on one ecosystem: Eigen.