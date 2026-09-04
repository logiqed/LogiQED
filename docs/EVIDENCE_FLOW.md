# LogiQED Evidence Flow

How evidence is generated at different levels, from clean routes to disputed claims.

## Evidence Levels

| Level | What is generated | When | Cost |
|-------|-------------------|------|------|
| Basic | Signed events + Evidence Root | Every route | ~$0 |
| Disputed | Evidence Package + ZK proof | Only on dispute or SLA exception | ~$0.08 |
| eFTI mode | Evidence Package without ZK, with eIDAS signature and EPCIS | If eFTI requires per-route records | ~$0.02 |

## Clean Route

Every route is closed with signed events and an Evidence Root.

- Events are signed on the device
- Events are hash-chained
- Evidence Root is computed as the Merkle root of event hashes
- The root proves events existed and were not changed

No Evidence Package. No ZK proof. No external API calls.

## Disputed Route

When a dispute or SLA exception occurs, an Evidence Package is generated.

The package contains:

- Claim ID and type
- Signed events with trust levels
- SLA rule version and digest
- Trust policy result
- Evidence Root
- ZK proof
- Arweave anchor

## Evidence Root

Evidence Root is the Merkle root of all canonical event hashes.

It is a single 32-byte hash that proves:

- All events existed at creation time
- Their order was not changed
- No events were added, removed, or modified

If anyone changes a single digit in any event, the Evidence Root changes.

## Where Events Are Stored

Raw events: MS SQL, 30 days retention.

Evidence Root: can be anchored in Arweave or Ethereum to prove time of existence.

## Evidence Package

Evidence Package is an immutable snapshot of a claim, its sources, trust policy result, rule version and proof.

Size: approximately 4 KB.

Storage: Arweave for permanent anchoring.

## Package Signature

Evidence Package is signed by the organization key, not a device key.

Device keys sign events. Organization key signs the final package.

## Verification Without Raw Data

Any party can verify an Evidence Package without access to raw telemetry.

Checks: signature, Evidence Root, rule digest, trust policy result, proof validity.

Raw events stay in operational storage with retention policy.

## Level Transition

Clean route → dispute arises → Evidence Package is assembled from already signed events.

Events are not re-signed. They are packaged with the rule, trust policy result, and proof.

## Cost Model

External APIs are called only when an incident occurs.

ZK proof is generated only for disputed routes.

In normal operation, cost per route is approximately zero.

## Open Question: eFTI Mode

Two options for eFTI compliance from 9 July 2027:

1. Keep as is: package only on dispute. eFTI covered by signed events + Evidence Root.

2. Add eFTI mode: a lightweight package for every route with eIDAS signature and EPCIS events, without ZK proof.

Decision needed before Phase 2.

---

## Related

- [Evidence Package](EVIDENCE.md) — package structure and canonicalization
- [Claims](CLAIMS.md) — claim definitions
- [Trust Levels](TRUST_LEVELS.md) — source assurance levels
- [Data Flow](DATA_FLOW.md) — event pipeline from ingest to verification