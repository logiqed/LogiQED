# Marketplace

## Idea

Direct freight marketplace built on top of verified evidence.

## Problem

Brokers control freight matching. Carriers pay 5–10% per load. Shippers lack direct access to verified carriers.

## How It Works

1. Shipper publishes load with route, weight, volume, timeline, budget.
2. Carriers see loads matched to their location and capacity.
3. AI dispatcher suggests optimal routes and pricing.
4. Booking locks funds in smart contract.
5. Delivery produces ZK proof.
6. Settlement releases payment automatically.

## Technical Dependencies

- Signed Event Stream
- Evidence Graph
- SLA Engine
- Smart contract settlement
- AI dispatcher

## Why Later

Marketplace needs liquidity on both sides.

Evidence layer must prove delivery verification first.

## MVP Path

Evidence layer first. Marketplace built once carriers and shippers trust the proof.