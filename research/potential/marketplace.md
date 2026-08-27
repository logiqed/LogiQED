# Marketplace

## One Line

Direct freight marketplace built on top of verified evidence, where trust is established by data, not by brokers.

## Problem

Brokers control freight matching and take 5–10 percent per load.

Shippers cannot easily verify carrier reliability. Carriers cannot easily prove their performance record. Transaction costs are high, pricing is opaque, and there is no way to separate good carriers from bad ones.

## Solution

A freight marketplace where every participant's reputation is backed by verified evidence.

Shippers publish loads. Carriers see loads matched to their verified capacity and historical performance. Smart contracts lock funds, deliveries produce ZK-proofs, and settlement releases automatically.

Trust comes from the Evidence Layer, not from brokers or reviews.

## How It Works

Shipper publishes a load. Carriers see matched loads. Carrier bids or AI dispatcher suggests pricing. Booking locks funds in a smart contract. Delivery produces signed events and an Evidence Package. ZK-proof confirms SLA or condition compliance. Smart contract releases payment automatically.

For a typical load:

1. Shipper creates load: Berlin to Warsaw, 12 tons, 66 cubic meters.
2. Carrier with verified history and available capacity sees the load.
3. Carrier places a bid. AI suggests optimal pricing.
4. Booking is confirmed. Escrow locks payment.
5. Truck performs delivery. Telemetry is signed and hash-chained.
6. Evidence Package includes route, SLA exceptions, and condition data.
7. ZK-proof is generated for disputes or valuable claims.
8. Payment is released. Carrier reputation updates with verified outcome.

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
- Smart contract settlement
- AI dispatcher
- Marketplace API

## Integration with Core

- Evidence Package: proof of delivery for payment and SLA validation
- Trust Levels: carrier reputation from verified trip history
- SLA Engine: exception attribution before payment release
- ZK Proofs: cheap private validation for high-value cases
- Oracle: external verification of traffic and weather

The marketplace is built on top of the evidence layer. It does not weaken core models.

## Challenges and Risks

| Risk | Mitigation |
|------|------------|
| Two-sided liquidity | Focus on one corridor and pilot partners |
| Smart contract bugs | Audited escrow, simple logic |
| Carrier onboarding | Verified pilots first, manual review for early carriers |
| Legal classification | Local entity per region |
| Payment risk | Escrow covers shipper, carrier guaranteed when evidence is valid |

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