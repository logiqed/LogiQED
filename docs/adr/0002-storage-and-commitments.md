# ADR 0002: Storage and Commitments

## Status

Accepted

## Context

LogiQED needs a storage model for evidence events, commitments and proofs.

Constraints:

- MVP: 3-5 GPS trackers, up to 50 trips, about 1 KB per telemetry packet.
- Raw positions retention: 30 days. Aggregates: 1 year.
- Trip Evidence Root must be anchored for every route, clean or incident.
- Claim package base must be produced and anchored for every claim, confirmed or rejected.
- Storage cost must be predictable at MVP scale.
- Privacy-by-design: raw telemetry is never stored permanently.
- System of record: MS SQL.

Related decision: ADR 0001: Modular Monolith.

## Decision

MVP storage:

- MS SQL as system of record.
- Redis as hot read-through cache for active routes. Never the only copy.
- Operational event storage with retention: raw positions 30 days, aggregates 1 year.
- Canonicalization, Merkle tree, trip Evidence Root, claim Evidence Root, external anchors, claim packages.
- Arweave for permanent commitments: trip anchors, claim anchors, and full package anchors.
- Raw telemetry is never stored permanently.
- EigenDA is added only when benchmark shows the need for a separate DA layer.
- Aligned Layer is the primary proof backend. Mock for MVP.
- Proof backend is pluggable: Groth16, PLONK, STARK, and zkVM options (SP1, RISC Zero, Lattice Jolt).

### Process

1. Event arrives from Ingest. Already validated, signed, and deduplicated (SourceId + ClientTimestampUtc + SourceSequence). Stored in MS SQL.
2. Event is canonicalized. JCS, sorted fields, UTC, fixed precision.
3. Canonical hash is computed.

**On claim close:**

4. Claim events are collected.
5. Claim Evidence Root is computed as Merkle root.
6. Claim package base is assembled.
7. Claim anchor is written to Arweave.

**On route close:**

8. All route events are collected.
9. Trip Evidence Root is computed as Merkle root.
10. Trip anchor is written to Arweave.

**On dispute request:**

11. Retroactive corroboration is applied.
12. Full package is assembled.
13. Full package anchor is written to Arweave.

Raw events are retained per policy, then deleted. Anchors remain permanent in Arweave.

## Rationale

- MVP volume does not justify a separate DA layer.
- Canonicalization and Merkle commitments provide verifiable Evidence Roots.
- External anchor provides immutability without blockchain dependency.
- Redis must never be the only copy of active route state.
- Pseudonymised data may remain personal data. Permanent storage is privacy-minimized.
- Public Manifest excludes driver name, vehicle plate, exact GPS coordinates.
- Hashes and Merkle Root remain. Proof of existence without personal data.

## Consequences

### Positive

- Simple operational model: one SQL database and object storage.
- Predictable costs at MVP scale.
- Full independence from EigenDA and Aligned Layer until needed.
- Evidence Packages are permanent, tamper-evident, verifiable.

### Negative

- MS SQL is a single point of failure for operational data at MVP. Acceptable for pilot.
- Arweave is write-once. Corrections require a new package and a new root.
- Raw telemetry deletion is mandatory. After 30 days, only aggregates and packages remain.
- Redis requires repopulation logic on restart.

### Mitigations

- Backup Evidence Package before Arweave anchor.
- Background job reads hot routes from MS SQL and rebuilds Redis.
- MS SQL backups daily. Point-in-time restore for 7 days.
- Evidence Package contains all proof required. Raw telemetry is not needed for verification.

## Triggers for Adding EigenDA

EigenDA is added when:

- Evidence Root computation exceeds 2 seconds for a batch of 10,000 events.
- Arweave write throughput becomes a bottleneck.
- Pilot partner requires L2 settlement and DA layer availability.

## Alternatives Considered

### Use Arweave for everything

Rejected.

- Write throughput and cost at raw telemetry volume would be prohibitive.
- Arweave is for permanent commitments, not operational storage.
- No query capability for operational workflows.

### Use PostgreSQL instead of MS SQL

Rejected.

- MS SQL is already in the stack.
- Multi-provider support exists via configuration.
- No proven advantage at this scale.

### Use EigenDA from day one

Rejected.

- No load justifying a DA layer at MVP.
- Adds operational complexity and cost.
- Can be added later without data migration.

### Use blockchain for every evidence package

Rejected.

- Blockchain is a trust anchor, not the product.
- Arweave provides immutability with lower cost and complexity.
- On-chain storage is reserved for high-value claims in Phase 2 and later.

## Related Documents

- [Architecture](../ARCHITECTURE.md)
- [MVP](../MVP.md)
- [Evidence Package](../EVIDENCE.md)
- [Evidence Flow](../EVIDENCE_FLOW.md)
- [ADR 0001: Modular Monolith](0001-modular-monolith.md)