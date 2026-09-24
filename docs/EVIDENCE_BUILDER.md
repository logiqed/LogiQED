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
- Compute Claim Evidence Root and Trip Evidence Root
- Assemble Evidence Package Base
- Assemble Evidence Package Interim during the route, after claim close
- Assemble Evidence Package Full on dispute request
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
2. Compute Claim Evidence Root.
3. Compute claim level from the own assurance of the sources that confirm the fact. No corroboration at this stage.
4. Record decision.
5. Assemble Evidence Package Base.
6. Anchor Claim Evidence Root and Evidence Package Base in Arweave.

Output: Evidence Package Base, anchored.

### On Route Close

Trigger: Route State Machine closes the route.

Input: all route events.

Steps:

1. Collect all route events.
2. Compute Trip Evidence Root.
3. Anchor Trip Evidence Root in Arweave.

Output: Trip Evidence Root anchor.

### On Dispute Request

Trigger: operator, auditor, or driver presses Generate full package in the UI.

Input: Evidence Package Base, optional Evidence Package Interim.

Steps:

1. Retroactive corroboration. Search for independent sources within the raw telemetry retention window.
2. Independence check in the Evidence Graph.
3. Compute final claim level, including corroboration. This may be higher than the base claim level.
4. Generate ZK proof if claim level is E3 or higher.
5. Assemble Evidence Package Full.
6. Anchor Evidence Package Full in Arweave.

Output: Evidence Package Full, anchored.

ZK proof is generated only when the claim level is E3 or higher. Below E3, the Evidence Package Full is still assembled and anchored, but no ZK proof is produced.

## Corroboration Preview (Evidence Package Interim)

Between claim close and route close, the operator can assemble an Evidence Package Interim.

Purpose: give the operator a current claim level during the route, before the Trip Evidence Root is finalized.

Properties:

- External APIs are not called. Their responses were already captured in Evidence Package Base at claim open.
- Reads only events already present in MS SQL and the Evidence Graph.
- Runs as a lightweight local operation: SQL lookup plus Evidence Graph traversal.
- Is not anchored. Does not modify Evidence Package Base.
- Is stored as a CorroborationRun record linked to the claim.
- Can be re-run by the operator at any time.

The Evidence Package Interim does not replace Evidence Package Base. It is an additional artifact on top of Base, available until route close.

### Pre-check before re-run

Before re-running corroboration, the system performs a lightweight SQL check.

The check answers one question: have new independent sources appeared since the last run?

Query:

    SELECT COUNT(DISTINCT e.sourceId) AS NewSources
    FROM Events e
    WHERE e.segmentId = @segmentId
      AND e.eventTimeUtc BETWEEN @windowStartUtc AND @windowEndUtc
      AND e.ingestedAt > @lastRunMaxIngestedAtUtc
      AND e.sourceId NOT IN (
          SELECT sourceId
          FROM CorroborationKnownSources
          WHERE claimId = @claimId
      );

Result:

- 0 new sources: re-run not required. The UI shows "No new sources".
- 1 or more new sources: re-run recommended. The UI shows "N new sources, refresh recommended".

The operator can re-run at any time, regardless of the check result. The check is an optimization, not a gate.

### Storage

CorroborationRun record in MS SQL:

| Field | Type | Notes |
|-------|------|-------|
| RunId | uuid | |
| ClaimId | uuid | |
| RunAtUtc | datetime | |
| SourcesScanned | int | |
| SourcesMatched | int | |
| ClaimLevel | string | |
| MaxIngestedAtUtc | datetime | Watermark for the pre-check |
| KnownSourceIds | json | Sources already seen in this run |
| CorroborationResult | json | Full result payload |

Evidence Package Base is immutable after anchoring. The CorroborationRun is stored separately and referenced by ClaimId.

### Use at Full package assembly

When Evidence Package Full is assembled after route close:

1. The system reads the latest CorroborationRun for the claim.
2. The pre-check is run again to detect late-loaded sources.
3. If new sources exist, corroboration is re-run and the result is used.
4. If no new sources exist, the latest CorroborationRun is used as-is.
5. ZK proof is generated if claim level is E3 or higher.
6. Evidence Package Full is assembled and anchored.

External APIs are never called during corroboration, at preview or at Full assembly. Their responses are part of Evidence Package Base.

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

**Claim Evidence Root.** Merkle root over events related to one claim. Subtree of the Trip Evidence Root.

**Trip Evidence Root.** Merkle root over all events of the route.

Both roots are anchored separately in Arweave.

## MS SQL Tables

The Evidence Builder writes to the following tables.

| Table | Content | When |
|-------|---------|------|
| Events | Raw events of the route | On ingest |
| EventHashes | SHA-256 of each event | On ingest |
| MerkleNodes | Intermediate Merkle nodes | On route or claim close |
| EvidenceRoots | Trip and Claim Evidence Roots | On close |
| EvidencePackages | Evidence Packages Base and Full | On claim close or dispute request |
| CorroborationRuns | Evidence Package Interim runs | On corroboration preview |
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

- Evidence Package Base (on claim close)
- Trip Evidence Root anchor reference (on route close)

## Interface with Dispute Handler

The dispute handler calls the Builder on dispute request.

The dispute handler passes:

- Claim ID
- Request source (operator, auditor, driver)

The Builder returns:

- Evidence Package Full
- Anchor reference
- ZK proof reference, if generated

## Interface with Interim

The operator calls the Builder during the route, after claim close.

The operator passes:

- Claim ID

The Builder returns:

- Evidence Package Interim
- Updated claim level
- New sources count since the last run

## Idempotency

The Builder is idempotent. Re-processing the same claim or route produces the same Evidence Root and the same anchor.

If the Builder is called twice for the same claim, the second call returns the existing package and anchor. No duplicate anchor is written.

CorroborationRun is not idempotent across time: a later run may find new sources. Each run is stored separately.

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

If corroboration fails during Interim:

- The previous CorroborationRun remains the latest valid one.
- The operator sees an error and can retry.

## Trigger Summary

| Trigger | Caller | Output |
|---------|--------|--------|
| Claim close | Event Orchestrator | Evidence Package Base, Claim Evidence Root anchor |
| Interim preview | Operator | Evidence Package Interim, updated claim level |
| Route close | Event Orchestrator | Trip Evidence Root anchor |
| Dispute request | Dispute handler | Evidence Package Full, Evidence Package Full anchor, ZK proof |

## Related

- [Evidence Flow](EVIDENCE_FLOW.md) - three evidence levels and when each is produced
- [Evidence Package](EVIDENCE.md) - package structure
- [Trust Levels](TRUST_LEVELS.md) - own assurance, claim level, corroboration
- [System Map](SYSTEM_MAP.md) - trust, state, and evidence layers in one page
- [Data Flow](DATA_FLOW.md) - canonical event flow through all stages
- [Architecture](ARCHITECTURE.md) - modules and boundaries