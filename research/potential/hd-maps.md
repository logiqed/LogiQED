# HD Maps

## One Line

Trucks build high-definition maps for autonomous vehicles using verified route data.

## Problem

Autonomous trucks need constantly updated road data: lane geometry, signage, road surface, construction zones.

Traditional HD map providers rely on dedicated mapping fleets, which are expensive to operate and slow to update.

LogiQED already has trucks with cameras and sensors producing signed, geotagged data on every trip.

## Solution

LogiQED turns the existing truck fleet into a crowd-sourced HD mapping network.

Cameras and sensors capture road conditions during regular trips. Data is signed, geotagged, and aggregated into HD map layers. These layers are packaged as verifiable data products and sold to autonomous vehicle developers.

Every contribution is a claim package base with a claim Evidence Root and an Arweave anchor. AV developers can trust the data without running their own fleet.

## How It Works

Truck cameras and sensors capture road data during a normal trip. LogiQED receives the signed event stream. A computer vision pipeline extracts map features. Features are aggregated into HD map layers per region. Each layer update gets a claim package base with a claim Evidence Root. AV developers receive layers via marketplace or API.

For a daily route:

1. Truck drives Berlin to Warsaw.
2. Camera captures lane markings, signs, road surface, construction zones.
3. Each frame is signed and pushed to LogiQED.
4. Computer vision extracts lane boundaries, sign locations, surface quality.
5. Features are aggregated per road segment.
6. A claim package base covers each segment update, with claim Evidence Root and anchor.
7. The AV developer receives the layer package with full provenance.

## Map Layers

| Layer | Description |
|-------|-------------|
| Lane geometry | Lane boundaries, width, curvature |
| Signage | Traffic sign locations and condition |
| Road surface quality | Roughness, potholes, asphalt type |
| Construction zones | Temporary road changes |
| Connectivity coverage | Cellular and Wi-Fi signal along route |

## Use Cases

- AV simulation
- Route planning
- Fleet safety
- Insurance analytics
- Smart city contracts

## Technical Dependencies

- Camera fleet
- Computer vision pipeline
- Evidence Graph
- Data marketplace
- Large-scale storage for raw data before aggregation
- Trip and claim Evidence Roots
- Arweave anchoring for layer updates

## Integration with Core

HD map data is a derived product from the LogiQED event stream.

- Source: truck cameras and sensors
- Own assurance: E2 signed app, then E3 attested device
- Claim level: E2 to E4 depending on how many independent trucks confirm the same feature
- Raw data: stored with retention policies
- Processed data: aggregated features, signed with claim Evidence Root and anchored
- Product: map layer packages sold via marketplace

When multiple trucks cross the same segment and produce the same map features, the claim level rises. A layer update confirmed by three independent trucks can reach E5. This gives AV developers a graded confidence signal on every map feature.

For the full model, see [Trust Levels](../../docs/TRUST_LEVELS.md).

## Why Claim Level Matters Here

HD maps are a data product. AV developers will pay more for data they can trust more.

- A layer update confirmed by one truck: claim level E2. Base price.
- Confirmed by an attested truck: E3. Higher price.
- Confirmed by two independent trucks: E4.
- Confirmed by three independent trucks: E5. Premium price.

The claim level becomes the pricing signal for the data product. No separate scoring system is needed.

## Challenges and Risks

| Risk | Mitigation |
|------|------------|
| Privacy | Blur PII from images, aggregate, minimize retention |
| Data quality | Require multi-pass consensus. Claim level rises with independent confirmations |
| Storage cost | Aggregate near real-time, store only features |
| Computer vision accuracy | Validate against ground truth in pilot regions |
| Competition | Focus on niche logistics corridors first |
| False data injection | Claim level requires independent sources. E4 and E5 cannot be faked by one device |

## Why Later

Requires:

- Large fleet of thousands of trucks
- Computer vision expertise
- AV developer relationships
- Marketplace infrastructure

After the evidence layer has production scale, HD maps are a high-margin data product. Not needed for pilot or MVP.

## Status

Research. Not planned for Phase 1–2. Revisit when fleet scale and data volume justify investment.