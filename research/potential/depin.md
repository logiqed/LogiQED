# DePIN Integrations

## One Line

Connect LogiQED events to DePIN networks, letting drivers earn from data their trips already produce.

## Problem

Drivers collect valuable data during every trip: road geometry, traffic, connectivity, weather, vehicle telemetry.

Today this data is either discarded or captured by central platforms that pay nothing to the driver.

Drivers have no way to monetize their own route data, even though it has real market value.

## Solution

LogiQED acts as a trusted bridge between drivers and DePIN networks.

A driver's device captures data during a trip. That data is signed, timestamped, and sent to LogiQED ingest. LogiQED routes anonymized, verified data to partner DePIN networks. Partners validate the contribution and pay the driver in tokens or stablecoins.

Every contribution is cryptographically verified: source, time, location, integrity. DePIN networks can trust the data without building their own hardware layer.

## How It Works

Driver device captures data. LogiQED ingest receives the signed event stream. Anonymization and aggregation remove driver identity. Verified data is routed to DePIN partners via webhook or API. The partner verifies the contribution against LogiQED Evidence Root. The driver receives tokens or stablecoins.

For a trip from Berlin to Warsaw:

1. Driver has a LogiQED-enabled dashcam and OBD-II device.
2. The device captures road imagery, speed, and connectivity data.
3. Each data batch is signed by the device and pushed to LogiQED.
4. LogiQED computes a minimal Evidence Package.
5. The anonymized contribution and proof of integrity are sent to the partner.
6. The partner confirms the data covers the claimed segment, time, and hashes match.
7. The driver wallet receives payment.

## Example Integrations

| Network | Data | How It Fits |
|---------|------|-------------|
| Hivemapper | Road mapping, AI dashcam | Verified segments and drive routes |
| DIMO | Vehicle telemetry via OBD-II | Attestation added to vehicle data streams |
| WindChain | Road wind conditions | Signed environmental data from vehicle sensors |
| SignalMap | Cellular coverage data | Connectivity observations with location trust |

## Use Cases

- Driver income per verified road data
- Fleet optimization using DePIN data
- Insurance telematics corroboration
- Smart city and infrastructure data
- Carbon tracking and emission reporting

## Technical Dependencies

- Signed Event Stream
- Device identity with revocation
- Anonymization layer
- AI-friendly API
- Webhooks
- Evidence Graph
- Wallet and payout integration

## Integration with Core

DePIN contribution is another signed event in the LogiQED architecture.

- Event type: DePINContribution
- Source: driver device at E2 or E3
- Data: anonymized telemetry or derived facts
- Proof: Evidence Package with root hash and anchor
- Access: partner receives only the relevant slice

Trust levels:

- Driver data: E2 or E3
- After LogiQED verification: E4
- Partner acceptance: E2 and above, but E4 commands higher payment

## Challenges and Risks

| Risk | Mitigation |
|------|------------|
| Data privacy | Anonymization, differential privacy, per-contribution consent |
| DePIN partner viability | Start with 1–2 established networks |
| Token volatility | Stablecoin payout option |
| Driver identity linking | Pseudonymous wallet IDs |
| Device fragmentation | Support reference hardware first |

## Why Later

DePIN value depends on:

- Stable core evidence layer
- Established DePIN partnerships
- Driver base of at least 100 active drivers
- Token incentive design that avoids regulatory pitfalls

Once LogiQED produces verifiable evidence at scale, DePIN routing is an API integration, not a new product.

## Status

Research. On hold until core MVP is stable and the first DePIN partnership is signed.