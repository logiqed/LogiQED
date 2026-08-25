# Data Flow

## Overview

Physical logistics events become policy-bound business evidence.

## Flow

1. **INGEST**
   Source sends signed EPCIS event to LogiQED Ingest API.

2. **AUTHENTICATE**
   Signature verified. Source identity checked. Trust evaluated server-side.

3. **PROVENANCE**
   Event added to Evidence Graph with source-of-source provenance.

4. **DECISION**
   SLA policy evaluates events.
   Claim generated with rule result, trust policy result and corroboration.

5. **COMMIT**
   Operational store, canonicalization, Merkle commitment, Evidence Root, external timestamp or anchor, Evidence Package.

6. **VERIFY**
   External party verifies claim without raw telemetry.

## Example: Detention Claim

Appointment: 12:00

Geofence entry: 11:54

Dock assignment: 13:02

Loading start: 13:18

Warehouse exit: 14:11

Result:

- Verified waiting: 68 minutes
- Carrier attributable: 0 minutes
- Warehouse attributable: 68 minutes

## Optional Later

- EigenDA for evidence hashes at scale
- Arweave for permanent commitments
- L2 settlement

## Design Notes

- Each step is signed and hashable.
- Raw telemetry stays in operational store with retention.
- Permanent layer contains commitments and proofs, not raw telemetry.
- Any step can be independently audited.