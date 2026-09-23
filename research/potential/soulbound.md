# Soulbound Reputation

## One Line

Non-transferable reputation for drivers, carriers and warehouses built from verified evidence.

## Problem

Reputation in logistics is fragmented and easy to fake.

Reviews can be bought. Paper records can be forged. A carrier with a history of delays can present itself as reliable. A warehouse with repeated detention issues can hide behind manual reports.

There is no shared, verifiable record of actual performance.

## Solution

Soulbound Reputation is derived entirely from signed evidence.

Every action produces signed evidence. Evidence accumulates in the Evidence Graph. A reputation score is derived from verified history. The score is stored as a soulbound credential that cannot be transferred or sold. Marketplaces and partners use the score for decisions.

Reputation is not claimed. It is proven.

## How It Works

Every action produces signed evidence. Evidence accumulates in the Evidence Graph. A reputation score is derived from verified history. The score is stored as a soulbound credential. Marketplace and partners use the score for decisions.

For a carrier:

1. Carrier completes 500 trips.
2. Each trip produces signed events: departure, arrival, SLA compliance, exceptions.
3. Every claim on a trip produces an Evidence Package Base with a claim level and a Claim Evidence Root.
4. Trip Evidence Root is anchored for every route.
5. Evidence Graph accumulates verified history.
6. Score is computed from on-time delivery, SLA compliance, safety events, and feedback.
7. The score is issued as a soulbound credential linked to the carrier identity.
8. Shippers and marketplaces query the score before booking.

The carrier cannot sell or transfer the reputation. It is bound to the verified identity.

## Reputation Sources

- On-time delivery, from Trip Evidence Roots and SLA evaluations
- SLA compliance, from confirmed and rejected claim ratios
- Claim level distribution, from corroboration strength
- Safety events, from signed incident reports
- Warehouse feedback, from signed communication records
- Sensor data quality, from own assurance of sources

Each source is a derivative of the evidence layer. None of it is a review score.

## Why Claim Level Matters Here

Reputation is only as strong as the evidence behind it. Claim level is the confidence signal.

- A claim with claim level E2 has weak corroboration. It counts toward reputation, but with low weight.
- A claim with claim level E4 or E5 is dispute-proof. It counts with high weight.
- A rejected claim at E2 does not damage reputation significantly. A rejected claim at E4 does, because the evidence is strong.

Two carriers with the same number of claims can have very different reputation, depending on the claim level distribution.

For the full model, see [Trust Levels](../../docs/TRUST_LEVELS.md).

## Use Cases

- Carrier selection
- Driver incentives
- Warehouse performance tracking
- Insurance pricing
- Marketplace trust

## Technical Dependencies

- Evidence Graph
- Trust Levels
- Trip and Claim Evidence Roots
- Evidence Packages
- Smart contracts
- Identity layer
- Privacy-preserving score computation

## Integration with Core

Soulbound Reputation is a derived product from the Evidence Graph.

- Source: verified history of signed events, Trip Evidence Roots, and Evidence Packages
- Storage: soulbound credential, non-transferable
- Access: partners query score with consent
- Privacy: detailed evidence stays private, score is public

The score is only as strong as the evidence behind it.

## Challenges and Risks

| Risk | Mitigation |
|------|------------|
| Score manipulation | Derive only from signed, verified events. Claim level gates the weight of each event |
| Privacy leakage | Public score, private evidence |
| Identity fragmentation | Bind score to verified identity |
| Gaming the system | Multi-factor scoring, anomaly detection, claim level weighting |
| Regulatory | GDPR and data protection compliance |
| Sybil attacks | Identity is verified by the Identity layer, not self-declared |

## Why Later

Reputation becomes valuable after network usage.

First prove that the evidence layer works.

Once verified trips accumulate, reputation is a natural by-product.

## Status

Research. On hold until the evidence layer has production traction.