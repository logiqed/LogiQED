# Evidence Builder

Implementation specification for the Evidence Builder component.

## Purpose

The Evidence Builder assembles evidence artifacts at three moments:

- On claim close
- On route close
- On dispute request

The Builder is called by the Event Orchestrator on claim close and route close. It is called by the dispute handler on dispute request.

## Responsibilities

- Collect events related to a claim or route
- Compute claim Evidence Root and trip Evidence Root
- Assemble claim package base
- Assemble full package on dispute request
- Anchor roots and packages in Arweave
- Write to MS SQL tables

## Three Moments

### On Claim Close

Trigger: Route State Machine closes a claim, confirmed or rejected.

Input:

- Claim ID and type
- Claim events
- Driver report
- Sources with own assurance
- Trust policy result
- Decision: confirmed or rejected

Steps:

1. Collect claim events.
2. Compute claim Evidence Root.
3. Compute claim level from the own assurance of the sources that confirm the fact. No corroboration at this stage.
4. Record decision.
5. Assemble claim package base.
6. Anchor claim root and package in Arweave.

Output: claim package base, anchored.

### On Route Close

Trigger: Route State Machine closes the route.

Input: all route events.

Steps:

1. Collect all route events.
2. Compute trip Evidence Root.
3. Anchor trip root in Arweave.

Output: trip anchor.

### On Dispute Request

Trigger: operator, auditor, or driver requests a full package.

Input: claim package base.

Steps:

1. Retroactive corroboration. Search for independent sources within the raw telemetry retention window.
2. Independence check in the Evidence Graph.
3. Compute final claim level, including corroboration. This may be higher than the base claim level.
4. Generate ZK proof if claim level is E3 or higher.
5. Assemble full package.
6. Anchor full package in Arweave.

Output: full package, anchored.

ZK proof is generated only when the claim level is E3 or higher. Below E3, the full package is still assembled and anchored, but no ZK proof is produced.

## Claim Level Computation

The claim level is the maximum level among independent sources that confirm the same fact.

Two conditions must be satisfied for corroboration to raise a claim to E4:

1. Primary source must be at E3 or higher.
2. Corroborating source must be at E2 or higher.

Below these thresholds, the claim stays at the level of the strongest source.

See [Trust Levels](TRUST_LEVELS.md) for the full rules and examples.

## Canonicalization

Events are canonicalized before hashing.

1. Each event is normalized.
2. Fields are sorted alphabetically.
3. Timestamps are UTC, ISO 8601.
4. Number precision is fixed.
5. No whitespace.

Canonical event example:

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

Event hash: `SHA-256(canonicalJson)`.

## Merkle Tree Construction

    eventHashes = [h1, h2, h3, ..., hN]
    sortedHashes = sort(eventHashes)
    merkleRoot = buildMerkleTree(sortedHashes)
    EvidenceRoot = merkleRoot

Two kinds of Evidence Root:

**Claim Evidence Root.** Merkle root over events related to one claim. Subtree of the trip root.

**Trip Evidence Root.** Merkle root over all events of the route.

Both roots are anchored separately in Arweave.

## MS SQL Tables

The Evidence Builder writes to the following tables.

| Table | Content | When |
|-------|---------|------|
| Events | Raw events of the route | On ingest |
| EventHashes | SHA-256 of each event | On ingest |
| MerkleNodes | Intermediate Merkle nodes | On route or claim close |
| EvidenceRoots | Trip and claim roots | On close |
| ClaimPackages | Claim package bases and full packages | On claim close or dispute request |
| Anchors | Arweave transaction IDs | After anchor |

## Interface with Orchestrator

The Event Orchestrator calls the Builder at two moments:

1. After a claim closes.
2. After the route closes.

The Orchestrator passes:

- Trip ID
- Claim ID (on claim close)
- Decision (confirmed or rejected)
- Event list

The Builder returns:

- Claim package base (on claim close)
- Trip anchor reference (on route close)

## Interface with Dispute Handler

The dispute handler calls the Builder on dispute request.

The dispute handler passes:

- Claim ID
- Request source (operator, auditor, driver)

The Builder returns:

- Full package
- Anchor reference
- ZK proof reference, if generated

## Idempotency

The Builder is idempotent. Re-processing the same claim or route produces the same Evidence Root and the same anchor.

If the Builder is called twice for the same claim, the second call returns the existing package and anchor. No duplicate anchor is written.

## Failure Handling

If the Builder fails before anchoring:

- The package is written to MS SQL.
- The anchor is not written.
- The Builder retries on the next trigger.

If the Builder fails after anchoring:

- The package and anchor are recorded.
- The Builder returns success on retry.

If Arweave is unavailable:

- The package is written to MS SQL.
- The anchor is queued for retry.
- The Builder marks the package as `anchored = false`.

## Trigger Summary

| Trigger | Caller | Output |
|---------|--------|--------|
| Claim close | Event Orchestrator | Claim package base, claim anchor |
| Route close | Event Orchestrator | Trip anchor |
| Dispute request | Dispute handler | Full package, full anchor, ZK proof |

## Related

- [Evidence Flow](EVIDENCE_FLOW.md) - three evidence levels and when each is produced
- [Evidence Package](EVIDENCE.md) - package structure
- [Trust Levels](TRUST_LEVELS.md) - own assurance, claim level, corroboration
- [System Map](SYSTEM_MAP.md) - trust, state, and evidence layers in one page
- [Data Flow](DATA_FLOW.md) - canonical event flow through all stages
- [Architecture](ARCHITECTURE.md) - modules and boundaries