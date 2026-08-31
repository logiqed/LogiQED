# Data Flow

## Overview

Physical logistics events become policy-bound business evidence.

This document describes the canonical data flow through LogiQED: from a raw EPCIS event to a verifiable Evidence Package.

---

## Flow

### 1. INGEST

Input: EPCIS event, JSON, signed by source device or API.

Processing:

- Validate schema.
- Deduplication key: DeviceId + ClientTimestamp + SourceSequence.
- Reject events older than the retention window.
- Enqueue to RabbitMQ for downstream processing.

Error handling:

- Invalid signature: reject with 401 Unauthorized.
- Duplicate event: return 200 OK with X-Dedup true, no re-processing.

---

### 2. AUTHENTICATE

- Verify signature, Ed25519 or ML-DSA.
- Look up source identity: SourceId, DeviceKey, TrustLevel.
- Evaluate trust policy server-side.

Trust levels E0–E5 are assigned per TRUST_LEVELS.md.

Output: enriched internal event with SourceIdentity and TrustLevel.

---

### 3. PROVENANCE

- Append event to Evidence Graph, a DAG of events, sources, and rules.
- Record source-of-source provenance: who provided the data and who certified the source.

Output: event with provenanceId and graph references.

---

### 4. DECISION

The SLA Engine evaluates the event against active policies.

Path A: No exception.

Route is clean. No external data needed. Close with signed event and Evidence Root.

Path B: Exception triggered, for example TrafficEntered or SegmentDelayDetected.

The Enrichment Decider checks if external confirmation is required.

If yes, the On-Demand Oracle is called, such as a traffic API.

A claim is generated with rule result, trust policy result, and corroboration details.

---

### 5. COMMIT

- Store operational events in MS SQL.
- Retention: raw positions 30 days, 1-hour aggregates 1 year.
- Canonicalize events into a stable byte representation.
- Build Merkle tree over canonical event hashes.
- Compute Evidence Root.
- Anchor to external timestamp or Arweave.

Evidence Package is approximately 4 KB and contains:

- Claim ID
- Events root
- Rule ID
- Result
- Signature
- Arweave transaction
- Verified timestamp

---

### 6. VERIFY

External party, such as shipper, insurer, or smart contract, verifies the claim.

Checks:

- Evidence Root against Arweave
- Signature
- ZK-proof when generated

Raw telemetry is not required for verification.

---

## Example: Detention Claim

Inputs:

| Event | Time |
|-------|------|
| Appointment | 12:00 |
| Geofence entry | 11:54 |
| Dock assignment | 13:02 |
| Loading start | 13:18 |
| Warehouse exit | 14:11 |

Rule:

Waiting for dock is the interval between geofence entry and dock assignment.

Dock assignment is the interval between dock assignment and loading start.

Loading is not waiting.

Verified waiting is the interval between geofence entry and loading start.

Carrier attributable is the interval between dock assignment and loading start.

Warehouse attributable is the interval between geofence entry and dock assignment.

Result:

- Verified waiting: 68 minutes
- Carrier attributable: 0 minutes
- Warehouse attributable: 68 minutes

---

## Optional Later

- EigenDA for evidence hashes at scale
- Arweave for permanent commitments
- L2 settlement

---

## Design Notes

- Each step is signed and hashable.
- Raw telemetry stays in the operational store with retention.
- Permanent layer contains commitments and proofs, not raw telemetry.
- Any step can be independently audited.
- All consumers are idempotent. Retries are safe.