# LogiQED ZK Claims

MVP ships with two cryptographic claims. Not everything. Two high-value claims that close real disputes.

## Claim 1: SLA Exception Claim

Proves that a delay was non-chargeable.

Example:

- Contract ETA: 13:55
- Actual Arrival: 14:37
- Gross Delay: 42 min
- Verified Traffic: 31 min
- Warehouse Queue: 16 min
- Chargeable Delay: 0 min

Result:

- SLA penalty does not apply.

## Claim 2: Cargo Condition Claim

Proves that cargo stayed within contracted conditions.

Example:

- Contract: 2°C ≤ temperature ≤ 8°C
- Trip: EU lane
- Claim: Temperature remained within contracted range during custody interval

Result:

- Proof: VALID

## Why These Two

- Pharma, food, insurance, and shippers understand them instantly.
- They are hash-intensive, fitting Flock-class proof systems.
- They do not reveal raw telemetry.
- They cover the most expensive disputes: delays and cargo condition.

## Claim Definition Format

Each claim is defined by:

- Claim ID
- Version
- Input events required
- Rule reference
- Trust Level requirement
- Expected output

This format becomes the foundation for future claims.