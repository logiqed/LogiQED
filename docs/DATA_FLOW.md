# Data Flow

## Overview

Physical logistics events become policy-bound business evidence.

This document describes the canonical data flow through LogiQED: from a raw EPCIS event to a verifiable Evidence Package.

---

## Flow

### 1. INGEST

Input: event, JSON or binary, signed by source device or API. Multiple source formats are accepted.

Processing:

- Verify telemetry key.
- Verify signature.
- Deduplication key: SourceId + ClientTimestampUtc + SourceSequence.
- Convert source format to EPCIS 2.0.
- Validate EPCIS structure.
- Reject events older than the retention window.
- Enqueue to the Bounded Channel for downstream processing.

Error handling:

- Invalid signature: reject with 401 Unauthorized.
- Duplicate event: return 200 OK with X-Dedup true, no re-processing.

Sources accepted by Ingest:

- Native clients (browser PWA) send EPCIS 2.0 directly.
- External trackers (Teltonika, Ruptela) send binary packets over TCP or HTTPS.
- Mobile apps (Colota, HookTrace) send JSON.
- Warehouse and customs APIs send their own format.

All of them are converted to GS1 EPCIS 2.0 at this step. After Ingest, the whole system works with a single canonical format.

---

### 2. AUTHENTICATE

- Verify signature, Ed25519 or ML-DSA.
- Look up source identity: SourceId, DeviceKey, OwnAssurance.
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

Output: enriched internal event with SourceIdentity and OwnAssurance.

See [Trust Levels](TRUST_LEVELS.md) for the full model.

---

### 3. PROVENANCE

- Append event to Evidence Graph, a DAG of events, sources, and rules.
- Record source-of-source provenance: who provided the data and who certified the source.

Output: event with provenanceId and graph references.

---

### 4. DECISION

The SLA Engine evaluates the event against active policies.

In MVP, the driver reports exceptions manually. The driver presses "Traffic started" and "Traffic ended". The system does not detect exceptions automatically. Automatic detection would require continuous polling of external APIs.

The claim pipeline:

1. Driver reports an incident - E0. The claim is a statement, not proof.
2. The system checks its own data - GPS track, CAN bus, telemetry. E2.
3. The system calls an external API on demand - traffic, weather, road conditions. E1 or E2.
4. The claim is confirmed or rejected. If confirmed, SLA pauses. If rejected, SLA continues.

Path A: No claim opened.

Route is clean. No external data needed. Close with signed events, trip Evidence Root, and Arweave anchor.

Path B: Claim opened by the driver.

The Enrichment Decider checks if external confirmation is required.

If yes, the On-Demand Oracle is called, such as a traffic API.

A claim package base is produced when the claim closes: confirmed or rejected.

CAN bus is an amplifier, not corroboration. It confirms vehicle state inside one source, but it does not create a new independent source. CAN and GPS typically arrive through the same telematics gateway.

---

### 5. ORCHESTRATE

Event Orchestrator maintains the Route State Machine for each active route.

It decides:

- When to call external enrichment.
- When to transition between route states.
- When to close a claim.
- When to close the route.

Route state is owned by the Orchestrator and persisted to SQL. Redis is a read-through projection for UI reads.

On restart, the Orchestrator rebuilds active routes from SQL, not from Redis. Events are reprocessed from the last checkpoint.

When a claim closes, or when the route closes, the Orchestrator delegates to the Evidence Builder.

Reliability:

- Checkpoints to SQL via RouteStateSnapshots.
- Bounded Channel for backpressure.
- Idempotent processing.

---

### 6. BUILD

The Evidence Builder is called at three moments.

**On claim close:**

1. Collect claim events.
2. Compute claim Evidence Root.
3. Compute claim level.
4. Record decision: confirmed or rejected.
5. Assemble claim package base.
6. Anchor claim root and package in Arweave.

**On route close:**

1. Collect all route events.
2. Compute trip Evidence Root.
3. Anchor trip root in Arweave.

**On dispute request:**

1. Retroactive corroboration.
2. Independence check in Evidence Graph.
3. Compute final claim level.
4. Generate ZK proof if claim level is E3 or higher.
5. Assemble full package.
6. Anchor full package in Arweave.

The Builder writes to MS SQL tables: Events, EventHashes, MerkleNodes, EvidenceRoots, ClaimPackages, Anchors.

---

### 7. COMMIT

Storage decisions:

- Operational events in MS SQL. Retention: raw positions 30 days, 1-hour aggregates 1 year.
- Events canonicalized into a stable byte representation.
- Merkle tree built over canonical event hashes.
- Trip Evidence Root and claim Evidence Roots computed.
- Anchors sent to Arweave.

Base package is approximately 2 KB and contains:

- Claim ID and type
- Driver report at E0
- Sources with own assurance and role
- Trust policy result
- Claim level
- Decision: confirmed or rejected
- Input events or events root
- Trip Evidence Root and claim Evidence Root
- Arweave transaction ID
- Signature (Ed25519)

Full package is approximately 4 KB and adds:

- Corroboration result
- ZK proof, when claim level is E3 or higher
- New Arweave transaction ID

---

### 8. VERIFY

External party, such as shipper, insurer, or smart contract, verifies the claim.

Checks:

- Signature
- Trip Evidence Root against Arweave
- Claim Evidence Root against Arweave
- Trust policy result
- Claim level
- Decision
- ZK-proof when present in the full package

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

The field names match the SLA Engine evaluation result in [SLA DSL](SLA_DSL.md) and the claim output in [Claims](CLAIMS.md).

---

## Storage and Settlement

- Arweave - permanent evidence storage. Trip anchors, claim anchors, and full package anchors are stored here.
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
- A trip Evidence Root is anchored for every route, clean or incident.
- A claim package base is produced for every claim, confirmed or rejected.
- ZK proof is generated only on dispute request, and only when the claim level is E3 or higher.

---

## Related

- [Architecture](ARCHITECTURE.md) - overall system
- [System Map](SYSTEM_MAP.md) - trust, state, and evidence layers
- [Event Pipeline](EVENT_PIPELINE.md) - vertical flow from device to SLA
- [Evidence Flow](EVIDENCE_FLOW.md) - three evidence levels and anchor rules
- [Evidence Package](EVIDENCE.md) - package structure and canonicalization
- [Claims](CLAIMS.md) - claim definitions
- [Trust Levels](TRUST_LEVELS.md) - source assurance levels
- [Ingest API](INGEST_API.md) - endpoint contract and signing flow