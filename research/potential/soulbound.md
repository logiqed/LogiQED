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
3. Evidence Graph accumulates verified history.
4. Score is computed from on-time delivery, SLA compliance, safety events, and feedback.
5. The score is issued as a soulbound credential linked to the carrier identity.
6. Shippers and marketplaces query the score before booking.

The carrier cannot sell or transfer the reputation. It is bound to the verified identity.

## Reputation Sources

- On-time delivery
- SLA compliance
- Safety events
- Warehouse feedback
- Sensor data quality

## Use Cases

- Carrier selection
- Driver incentives
- Warehouse performance tracking
- Insurance pricing
- Marketplace trust

## Technical Dependencies

- Evidence Graph
- Trust Levels
- Smart contracts
- Identity layer
- Privacy-preserving score computation

## Integration with Core

Soulbound Reputation is a derived product from the Evidence Graph.

- Source: verified history of signed events
- Storage: soulbound credential, non-transferable
- Access: partners query score with consent
- Privacy: detailed evidence stays private, score is public

The score is only as strong as the evidence behind it.

## Challenges and Risks

| Risk | Mitigation |
|------|------------|
| Score manipulation | Derive only from signed, verified events |
| Privacy leakage | Public score, private evidence |
| Identity fragmentation | Bind score to verified identity |
| Gaming the system | Multi-factor scoring, anomaly detection |
| Regulatory | GDPR and data protection compliance |

## Why Later

Reputation becomes valuable after network usage.

First prove that the evidence layer works.

Once verified trips accumulate, reputation is a natural by-product.

## Status

Research. On hold until the evidence layer has production traction.