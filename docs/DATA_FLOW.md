# LogiQED Data Flow

## Overview

Physical events become cryptographic evidence.

## Flow

1. **INGEST**
   Sensor or device sends signed event to LogiQED Ingest API.

2. **AUTHENTICATE**
   Signature verified. Source identity checked. Trust Level assigned.

3. **PROVENANCE**
   Event added to Signed Event Stream. Linked into Evidence Graph.

4. **DECISION**
   SLA Engine evaluates events against rule version.
   Exceptions attributed: traffic, weather, geofence, vehicle, warehouse.

5. **PROOF**
   Claim evaluated.
   ZK proof generated for supported claims.
   Evidence Package created.

6. **PERSIST**
   Operational data in MS SQL.
   Temporary hashes and proofs in EigenDA.
   Permanent commitments and manifest in Arweave.

7. **VERIFY**
   External party verifies Evidence Package without raw telemetry.

## Example

GPS event + traffic API + geofence event

SLA rule v3.2

Gross delay: 42 min
Traffic: 31 min
Queue: 16 min
Chargeable delay: 0 min

Claim: SLA Exception
Conclusion: No penalty
Trust Level: E4

Evidence Package

## Design Notes

- Each step is signed and hashable.
- No raw telemetry in permanent storage.
- Any step can be independently audited.