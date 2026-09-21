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
- Deduplication key: DeviceId + ClientTimestampUtc + SourceSequence.
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

The server computes Source Assurance across seven dimensions:

- Identity - who the source is.
- Authentication - how the source proves identity.
- Integrity - data validity through hashes and signatures.
- Attestation - hardware or software context confirmation.
- Metrology - calibration and accuracy.
- Time - clock accuracy and synchronization.
- Provenance - origin of the data.

The final level is E0-E5. The client never supplies the trust level.

Output: enriched internal event with SourceIdentity and TrustLevel.

See [Trust Levels](TRUST_LEVELS.md) for the full model.

---

### 3. PROVENANCE

- Append event to Evidence Graph, a DAG of events, sources, and rules.
- Record source-of-source provenance: who provided the data and who certified the source.

Output: event with provenanceId and graph references.

---

### 4. DECISION

The SLA Engine evaluates the event against active policies.

The claim pipeline has four stages:

1. Driver reports - E0. The claim is a statement, not proof.
2. System checks own data - GPS, CAN, telemetry. E2.
3. External API called on demand - traffic, weather, road conditions. E2 with corroboration.
4. Other vehicles confirm the same event - E4.

Path A: No exception.

Route is clean. No external data needed. Close with signed event and Evidence Root.

Path B: Exception triggered, for example TrafficEntered or SegmentDelayDetected.

The Enrichment Decider checks if external confirmation is required.

If yes, the On-Demand Oracle is called, such as a traffic API.

A claim is generated with rule result, trust policy result, and corroboration details.

CAN bus is an amplifier, not corroboration. It confirms vehicle state inside one source, but it does not create a new independent source. CAN and GPS typically arrive through the same telematics gateway.

---

### 5. ORCHESTRATE

Event Orchestrator maintains the Route State Machine for each active route.

It decides:

- When to call external enrichment.
- When to transition between route states.
- When to close the route.

Route state is owned by the Orchestrator and persisted to SQL. Redis is a read-through projection for UI reads.

On restart, the Orchestrator rebuilds active routes from SQL, not from Redis. Events are reprocessed from the last checkpoint.

Reliability:

- Checkpoints to SQL via RouteStateSnapshots.
- Bounded Channel for backpressure.
- Idempotent processing.

---

### 6. COMMIT

- Store operational events in MS SQL.
- Retention: raw positions 30 days, 1-hour aggregates 1 year.
- Canonicalize events into a stable byte representation.
- Build Merkle tree over canonical event hashes.
- Compute Evidence Root.
- Anchor to external timestamp or Arweave.

Evidence Package is approximately 4 KB and contains:

- Claim ID
- Rule ID and version
- Input events or events root
- Trust policy result
- Calculation result
- API response, when enrichment was applied
- Signature (Ed25519)
- ZK proof, when generated
- Arweave transaction ID
- Verified timestamp

---

### 7. VERIFY

External party, such as shipper, insurer, or smart contract, verifies the claim.

Checks:

- Evidence Root against Arweave
- Signature
- Trust policy result
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

Loading is the interval between loading start and warehouse exit, and is not waiting.

Verified waiting is the interval between geofence entry and loading start.

Warehouse-attributable waiting is the interval between geofence entry and dock assignment.

Carrier-attributable waiting is the interval between dock assignment and loading start.

Result:

| Field | Minutes |
|-------|---------|
| waiting_min | 68 |
| warehouse_min | 68 |
| carrier_min | 0 |

The field names match the SLA Engine evaluation result in [SLA DSL](SLA_DSL.md) and the claim output in [ZK Claims](CLAIMS.md).

---

## Storage and Settlement

- Arweave - permanent evidence storage. Evidence Packages and proof roots are anchored here.
- EigenDA - optional DA layer. Added only when benchmark shows the need. Provider choice behind storage abstraction, not a core dependency.
- L2 settlement - future consideration, not in MVP scope.

---

## Design Notes

- Each step is signed and hashable.
- Raw telemetry stays in the operational store with retention.
- Permanent layer contains commitments and proofs, not raw telemetry.
- Any step can be independently audited.
- All consumers are idempotent. Retries are safe.
- The client never supplies the trust level. The server computes it.