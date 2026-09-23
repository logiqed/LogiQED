# Marketplace

## One Line

Direct freight marketplace built on top of verified evidence, where trust is established by data, not by brokers.

## Problem

Brokers control freight matching and take 5–10 percent per load.

Shippers cannot easily verify carrier reliability. Carriers cannot easily prove their performance record. Transaction costs are high, pricing is opaque, and there is no way to separate good carriers from bad ones.

## Solution

A freight marketplace where every participant's reputation is backed by verified evidence.

Shippers publish loads. Carriers see loads matched to their verified capacity and historical performance. Smart contracts lock funds, deliveries produce claim packages and Evidence Roots, and settlement releases automatically.

Trust comes from the Evidence Layer, not from brokers or reviews.

## How It Works

Shipper publishes a load. Carriers see matched loads. Carrier bids or AI dispatcher suggests pricing. Booking locks funds in a smart contract. Delivery produces signed events, a trip Evidence Root, and one or more claim packages. A full package with ZK proof confirms SLA or condition compliance on dispute. Smart contract releases payment automatically.

For a typical load:

1. Shipper creates load: Berlin to Warsaw, 12 tons, 66 cubic meters.
2. Carrier with verified history and available capacity sees the load.
3. Carrier places a bid. AI suggests optimal pricing.
4. Booking is confirmed. Escrow locks payment.
5. Truck performs delivery. Telemetry is signed and hash-chained.
6. Trip Evidence Root is anchored at route close. A claim package base is produced for every claim on the route.
7. If a dispute arises, a full package with corroboration and ZK proof is produced.
8. Payment is released. Carrier reputation updates with verified outcome.

## What the Marketplace Sees

The marketplace does not read raw telemetry. It reads the evidence layer.

From the trip:

- Trip Evidence Root and anchor
- SLA evaluation result
- Final route state
- Confirmed and rejected claim list

From each claim:

- Claim type and claim level
- Decision: confirmed or rejected
- Trust policy result
- Claim Evidence Root and anchor

From a disputed claim:

- Full package with corroboration
- Independence check result
- ZK proof reference

## Use Cases

- Spot freight
- Contract freight
- Shipper of record
- Insured freight
- Reputation built from verified deliveries

## Technical Dependencies

- Signed Event Stream
- Evidence Graph
- SLA Engine
- Evidence Builder
- Trip and claim Evidence Roots
- Claim packages
- Smart contract settlement
- AI dispatcher
- Marketplace API
- Webhooks: `claim.package.created`, `claim.decision_recorded`, `trip.anchor.created`

## Integration with Core

- Trip Evidence Root: proof of delivery for payment
- Claim packages: SLA validation, condition compliance
- Claim level: carrier reputation from verified trip history
- Trust Levels: source assurance E0–E5 for every contribution
- SLA Engine: exception attribution before payment release
- Full packages with ZK proof: private validation for high-value disputes
- Evidence Graph: independence check for corroboration

The marketplace is built on top of the evidence layer. It does not weaken core models.

## Reputation from Verified Deliveries

Every completed trip produces a trip Evidence Root and, when claims are present, claim packages.

The marketplace reads these artifacts to build carrier reputation.

- Number of clean routes
- Number of confirmed claims
- Number of rejected claims
- Average claim level across disputes
- Trust policy pass rate
- Anchor coverage: percentage of routes with a valid trip anchor

Reputation is not a review score. It is a derivative of verifiable evidence.

## Challenges and Risks

| Risk | Mitigation |
|------|------------|
| Two-sided liquidity | Focus on one corridor and pilot partners |
| Smart contract bugs | Audited escrow, simple logic |
| Carrier onboarding | Verified pilots first, manual review for early carriers |
| Legal classification | Local entity per region |
| Payment risk | Escrow covers shipper, carrier guaranteed when evidence is valid |
| Disputed delivery | Full package with corroboration and ZK proof resolves the case |

## Why Later

A marketplace needs liquidity on both sides: thousands of loads and carriers.

Without liquidity, an empty marketplace has zero value.

The evidence layer must first prove itself in a pilot. Carriers and shippers need to trust the proof before they trust a platform built on it.

## MVP Path

1. Evidence layer first.
2. Verify delivery for 3–5 pilot carriers and 1–2 shippers.
3. Prove that disputes close by math.
4. Build the marketplace on that trust.

## Status

Research. Not planned before Phase 3. Depends on evidence layer traction.