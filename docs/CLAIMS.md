# LogiQED ZK Claims

MVP ships with two cryptographic claims.

## Claim 1: Detention / Warehouse Waiting Claim

Deterministic claim based on timestamps, geofences and independent events.

Example:

- Appointment: 12:00
- Truck geofence entry: 11:54
- Dock assignment: 13:02
- Loading start: 13:18
- Warehouse exit: 14:11

Result:

- Verified waiting: 68 minutes
- Carrier attributable: 0 minutes
- Warehouse attributable: 68 minutes

No philosophical debate about traffic causality. Timestamps, geofences, events and rule.

## Claim 2: Cargo Condition Claim

Proves that committed measurements produced by sources satisfying trust policy E4 remained within contract range.

Example:

- Contract: 2–8°C
- Trip: EU lane
- Claim: Committed measurements from E4 sources stayed within 2–8°C during custody interval

Result:

- Proof: VALID

## Why These Two

- Detention claim is deterministic and easy to verify.
- Cargo condition claim covers cold chain.
- Both are valuable for settlement and insurance.

## Claim Definition Format

- Claim ID
- Version
- Input events required
- Rule reference
- Trust Policy requirement
- Expected output