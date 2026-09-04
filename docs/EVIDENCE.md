# LogiQED Evidence Package

Evidence Package is the core output of LogiQED.

It is an immutable snapshot that connects a claim, its sources, the rule that evaluated it, and the proof that verifies it.

---

## Purpose

An Evidence Package is generated only when a dispute or SLA exception requires proof.

Clean routes are closed with signed events and Evidence Root only.

ZK-proof is added only for disputed or exception-bound routes.

---

## Schema Versioning

Each package includes schemaVersion, for example 1.0.

When the schema changes, a new version is created. Verifiers support the previous version during a transition period.

---

## Structure

Evidence Package contains:

| Field | Type | Description |
|-------|------|-------------|
| schemaVersion | string | Schema version |
| claimId | string | Unique claim ID |
| claimVersion | string | Version of the claim definition |
| claimType | enum | DETENTION, CARGO_CONDITION |
| timestamp | string | ISO 8601 UTC |
| sources | array | Source IDs, trust levels, attestation types |
| trustPolicyResult | object | Policy reference, PASS or FAIL, digest |
| corroborationResult | object | Corroborating sources and result |
| inputEvents | array | Canonical event hashes or event IDs |
| ruleRef | object | Rule ID, version, digest |
| conclusion | object | Human-readable and machine-readable result |
| proofRef | object | Proof backend, proof hash, status |
| publicManifest | object | Privacy-minimized public summary |
| evidenceRoot | string | Merkle root of canonical event hashes |
| externalAnchorRef | string | Arweave transaction ID |
| signature | string | Ed25519 signature over canonical bytes |

---

## Calculation Formula

Detention waiting is calculated as:

dockAssignment - geofenceEntry

For the reference example:

13:02 - 11:54 = 68 minutes

| Interval | Calculation | Minutes | Attribution |
|----------|-------------|---------|-------------|
| waiting_for_dock | dockAssignment - geofenceEntry | 68 | warehouse |
| dock_assignment | loadingStart - dockAssignment | 16 | not counted |
| loading | warehouseExit - loadingStart | 53 | not counted |

---

## Canonicalization and Evidence Root

To compute a stable Evidence Root:

1. Each event is normalized.
2. Fields are sorted.
3. Timestamps are UTC.
4. Number precision is fixed.
5. Each normalized event is hashed with SHA-256.
6. Hashes are sorted by byte value.
7. A Merkle tree is built over sorted hashes.
8. The root is the hash of the concatenated top-level hashes.

The same canonicalization is used for the package signature.

---

## Provenance Chain

The package references an Evidence Graph.

Claim, Events, Sources, Source-of-Source, Rule, Proof.

Each node in the graph is hash-linked.

---

## Storage

| Store | Content | Retention |
|-------|---------|-----------|
| MS SQL | Operational events, claims, rules, audit | Raw positions: 30 days. Aggregates: 1 year. Claims: permanent |
| Redis | Hot cache for active routes | Active route lifetime |
| Arweave | Final Evidence Packages | Permanent |
| Deletable storage | Raw encrypted context data | Deletable on request |

Raw telemetry is never stored permanently.

---

## Privacy Design

Permanent storage contains commitments and proofs, not raw telemetry.

Public Manifest excludes:

- Driver name
- Vehicle plate
- Exact GPS coordinates of stops

Public Manifest includes:

- Claim type
- Conclusion summary
- Evidence Root
- Rule reference
- External anchor

Raw encrypted context data is stored separately in deletable storage.

Deleting raw data or destroying keys does not remove the cryptographic proof that the package existed and was verified.

---

## Signature

The package is signed by the organization key, not a device key.

Algorithm: Ed25519, hybrid with ML-DSA, crypto-agile.

---

## Verification

External party can verify without raw telemetry.

Checks:

- Signature against known organization public key
- Evidence Root matches canonical hash of input events
- Rule reference digest matches published rule definition
- Trust policy result matches source trust levels
- Conclusion matches rule formula and input events
- ZK-proof when present

---

## Lifecycle

1. Created - package assembled from inputs, no anchor
2. Signed - organization key signs canonical bytes
3. Anchored - package and Evidence Root sent to Arweave
4. Verified - external party checks the package
5. Retired - raw deletable context deleted, proof package remains

---

## Size Budget

Target: approximately 4 KB per package.

Breakdown:

- JSON metadata: about 1 KB
- Event hashes: about 0.5 KB
- Rule and trust policy: about 0.5 KB
- Signature: about 0.1 KB
- ZK-proof reference: about 1.5-2 KB

---

## Example

Detention Package

- Claim: Detention
- Conclusion: Warehouse attributable: 68 min
- Rule: DETENTION_V1
- Trust Policy: E4_REQUIRED_V1
- Result: PASS
- Proof: VALID
- Evidence Root: 0x8f3a...
- Arweave Transaction: kT4b...

---

## Design Notes

- Each step is signed and hashable.
- Raw telemetry stays in the operational store with retention.
- Permanent layer contains commitments and proofs, not raw telemetry.
- Any step can be independently audited.
- All consumers are idempotent.
- Clean routes close with signed events and Evidence Root only.

---

## Related

- [Evidence Flow](EVIDENCE_FLOW.md) — when each evidence level is generated
- [Claims](CLAIMS.md) — claim definitions
- [Trust Levels](TRUST_LEVELS.md) — source assurance levels
- [Data Flow](DATA_FLOW.md) — event pipeline from ingest to verification