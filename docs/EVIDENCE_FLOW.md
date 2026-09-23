# LogiQED Evidence Flow

How evidence is generated at different levels, from clean routes to disputed claims.

## Evidence Levels

Three levels of evidence are produced, depending on what happens on the route.

| Level | What is generated | When | Cost |
|-------|-------------------|------|------|
| Clean route | Signed events + Trip Evidence Root + Arweave anchor | Every route | ~$0 |
| Incident | + Evidence Package Base + anchor | When a claim closes (confirmed or rejected) | ~$0.01 |
| Disputed | + Retroactive corroboration + ZK proof + new anchor | On dispute request | ~$0.08 |

Anchor is produced for every route, clean or incident. This protects the data from substitution even if no dispute ever arises.

Evidence Packages Base are produced for every claim, confirmed or rejected. A rejected claim is still a recorded event: the driver pressed the button, the system queried the API, and the outcome was recorded.

## Clean Route

Every route is closed with signed events and an Evidence Root.

- Events are signed on the device.
- Events are hash-chained.
- Evidence Root is computed as the Merkle root of event hashes.
- The Evidence Root is anchored in Arweave.

No Evidence Package Base. No ZK proof. No external API calls.

The anchor proves the data existed at the moment the route closed and has not changed since. This is the foundation for any dispute that may arise later.

## Incident Route

When a claim is opened and closed, an Evidence Package Base is produced.

A claim can be confirmed or rejected.

**Confirmed:** the system's own data and external APIs agree with the driver's report. SLA is paused.

**Rejected:** the system's own data or external APIs contradict the driver's report. SLA continues.

In both cases, the Evidence Package Base is formed when the claim closes. The package records:

- the driver's report at E0
- the system's own data
- the external API response
- the computed claim level
- the final decision
- the reference to the Trip Evidence Root
- the Claim Evidence Root

The Evidence Package Base is anchored in Arweave.

The package is available during the trip. The driver or dispatcher can open it at any time.

Cost: approximately $0.01 per claim, confirmed or rejected.

## Disputed Route

When a dispute or audit requires an Evidence Package Full, the Evidence Builder produces it.

The Evidence Package Full adds to the base:

- Retroactive corroboration from independent sources.
- Independence check in the Evidence Graph.
- Computed claim level.
- ZK proof, when the claim level is E3 or higher.
- New anchor in Arweave.

The proof backend is pluggable: Aligned Layer, Groth16, Plonk, STARK, or zkVM (Lattice Jolt, SP1, RISC Zero). See [Architecture](ARCHITECTURE.md) for the proof pipeline.

### ZK Proof Is Gated by Claim Level

ZK proof is generated only when the claim level is E3 or higher.

Below E3, the package is still produced and anchored, but the ZK proof button is disabled. The UI shows: your trust level is insufficient for ZK proof. E3 or higher is required.

Why: below E3, the source cannot prove device attestation. A ZK proof would confirm a computation over data that is itself not attested. That does not raise the claim to a dispute-ready level.

## Evidence Root

Evidence Root is the Merkle root of canonical event hashes.

It is a single 32-byte hash that proves:

- All events existed at creation time.
- Their order was not changed.
- No events were added, removed, or modified.

If anyone changes a single digit in any event, the Evidence Root changes.

### Two Kinds of Evidence Root

Two kinds of root are produced.

**Trip Evidence Root.** One per route. Covers all events of the route: telemetry positions, segment transitions, claim events.

**Claim Evidence Root.** One per claim. Covers the events related to that claim: the driver report, the system's own data, the external API response, the decision.

The Claim Evidence Root is a subtree of the Trip Evidence Root. Both are anchored separately.

### Canonical Event

Events are canonicalized before hashing.

```json
    {
      "eventType": "TelemetryPosition",
      "sourceId": "TRK-GPS-01",
      "eventTime": "2026-09-22T10:00:00Z",
      "position": { "lat": 52.5200, "lon": 13.4050 },
      "speed": 2,
      "accuracy": 15,
      "sourceSequence": 4721,
      "signature": "..."
    }
```

Canonicalization rules:

1. Fields are sorted alphabetically.
2. Timestamps are in UTC, ISO 8601.
3. Numbers use fixed precision.
4. No whitespace.

Event hash: `SHA-256(canonicalJson)`.

Merkle tree:

    eventHashes = [h1, h2, h3, ..., hN]
    sortedHashes = sort(eventHashes)
    merkleRoot = buildMerkleTree(sortedHashes)
    EvidenceRoot = merkleRoot

## Where Events Are Stored

Raw events: MS SQL, 30 days retention.

Aggregates: MS SQL, 1 year retention.

Evidence Roots and anchors: permanent in Arweave.

## Storage in MS SQL

The Evidence Builder uses the following tables.

| Table | Content | When |
|-------|---------|------|
| Events | Raw events of the route | On ingest |
| EventHashes | SHA-256 of each event | On ingest |
| MerkleNodes | Intermediate Merkle nodes | On route close |
| EvidenceRoots | Trip and claim roots | On close |
| EvidencePackages | Evidence Packages Base and Full | On claim close |
| Anchors | Arweave transaction IDs | After anchor |

The Builder writes to these tables when a claim or route closes.

## Evidence Package

Evidence Package is an immutable snapshot of a claim, its sources, trust policy result, rule version and proof.

Size: approximately 4 KB.

Storage: Arweave for permanent anchoring.

A package exists in two forms:

- Evidence Package Base: produced when a claim closes. Contains events, decision, reference to the Trip Evidence Root. No ZK proof.
- Evidence Package Full: produced on dispute request. Adds corroboration, computed claim level, ZK proof, new anchor.

## Package Signature

Evidence Package is signed by the organization key, not a device key.

Device keys sign events. Organization key signs the final package.

## Verification Without Raw Data

Any party can verify an Evidence Package without access to raw telemetry.

Checks: signature, Evidence Root, rule digest, trust policy result, proof validity.

Raw events stay in operational storage with retention policy.

## Level Transition

Clean route → claim opens → claim closes → Evidence Package Base is anchored.

Evidence Package Base → dispute arises → corroboration and ZK are added → new anchor.

Events are not re-signed. The package references the Trip Evidence Root and the Claim Evidence Root.

## Cost Model

External APIs are called only when an incident occurs.

In MVP, exception detection is manual. The driver presses "Traffic started" and "Traffic ended". The system does not poll external APIs automatically. Automatic polling would be expensive at scale.

ZK proof is generated only for disputed packages at E3 or higher.

| Level | Cost |
|-------|------|
| Clean route | ~$0 |
| Incident, confirmed or rejected | ~$0.01 |
| Disputed | ~$0.08 |

One won dispute at $200-$500 pays for thousands of incident packages.

## Retroactive Corroboration

Corroboration is not requested when a claim closes. It is requested later, on dispute or audit.

The Evidence Builder searches for other vehicles that were on the same segment during the same time window. It does not matter whether those vehicles reported the same exception. What matters is that their data confirms the same physical fact.

For each candidate source, the Evidence Builder uses the own assurance that the source had at the time of the event. It is not recomputed later.

If the candidate source had E3 or higher at that time, corroboration raises the claim level. If the source had E1 or E2, corroboration does not raise the claim above the strongest source.

Retroactive corroboration works within the raw telemetry retention window. Raw positions are kept for 30 days. Aggregates are kept for 1 year. A dispute raised within 30 days can use full raw data. A dispute raised later can use aggregates.

## Package Formed When Claim Closes

The Evidence Package Base is formed when the claim closes, not when it opens.

At that moment the Evidence Builder records:

- Claim ID and type.
- Input events with their source assurance.
- Trust policy result.
- Calculation result.
- Driver decision.
- Reference to the Trip Evidence Root.
- Claim Evidence Root.

The Evidence Package Base does not include corroboration or ZK proof.

The Evidence Package Full is formed on dispute request.

## Anchor for Every Route

The Trip Evidence Root is anchored for every route, clean or incident.

This protects the data from substitution. If anyone changes any event after the route closes, the Trip Evidence Root changes, and the change is detected by comparing with the Arweave anchor.

Even if no dispute ever arises, the anchor is there. If a dispute arises a year later, the data is still provably unchanged.

## Open Question: eFTI Mode

Two options for eFTI compliance from 9 July 2027:

1. Keep as is: Evidence Package Full only on dispute. eFTI covered by signed events + Evidence Root + trip anchor.

2. Add eFTI mode: a lightweight package for every route with eIDAS signature and EPCIS events, without ZK proof.

If option 2 is chosen, the cost would be approximately $0.02 per route, because no ZK proof is generated. The eIDAS signature and EPCIS events are cheaper than the ZK pipeline.

Decision needed before Phase 2.

---

## Related

- [Evidence Package](EVIDENCE.md) — package structure and canonicalization
- [Claims](CLAIMS.md) — claim definitions
- [Trust Levels](TRUST_LEVELS.md) — source assurance levels
- [Data Flow](DATA_FLOW.md) — event pipeline from ingest to verification
- [System Map](SYSTEM_MAP.md) — trust, state, and evidence layers