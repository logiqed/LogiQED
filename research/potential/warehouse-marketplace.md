# Warehouse Marketplace

## One Line

Flexible warehouse space leasing with verified access and condition evidence.

## Problem

Long-term warehouse leases create risk and inefficiency.

Shippers must commit to fixed capacity for months or years. Warehouse operators struggle to fill unused slots. Short-term demand spikes cannot be served without expensive manual processes.

There is no trusted marketplace for short-term warehouse capacity.

## Solution

A warehouse marketplace where every slot, access event, and condition state is verified by evidence.

Warehouse operators list available slots. Shippers book short-term capacity. Access and state are verified by LogiQED evidence. Payments settle via smart contract.

Trust comes from verified evidence, not from manual inspection or broker relationships.

## How It Works

Warehouse operators list available slots. Shippers book short-term capacity. Access and state are verified by evidence. Payments settle via smart contract.

For a typical booking:

1. Warehouse operator lists 200 square metres available for 3 days.
2. Shipper books the slot for a short-term storage need.
3. Slot dimensions, condition, and access rules are recorded as signed events with an own assurance E3 for the warehouse operator source.
4. Truck arrives and geofence confirms entry.
5. Cargo is stored. Sensors record condition, such as temperature and humidity.
6. Truck exits. Geofence confirms exit.
7. An Evidence Package Base is assembled with a Claim Evidence Root and an Arweave anchor.
8. Smart contract releases payment based on verified usage.

## Use Cases

- Short-term storage
- Seasonal capacity
- Cross-docking
- Overflow handling
- Last-mile staging

## Technical Dependencies

- Warehouse identity
- Slot management
- Measurement boundary for warehouse state
- Smart contract settlement
- Geofence events
- Condition sensors
- Evidence Package Base with Claim Evidence Root and Arweave anchor

## Integration with Core

Warehouse Marketplace is built on top of the evidence layer.

- Warehouse identity: verified source with own assurance E3 in the Trust Model
- Slot availability: signed state updates
- Access: geofence entry and exit events
- Condition: temperature and humidity sensors, feeding into claim level
- Evidence Package: slot usage events are assembled into an Evidence Package Base. The Claim Evidence Root covers the storage interval.
- Payment: smart contract with evidence-based settlement

The marketplace consumes evidence from the core without weakening it.

For the full model, see [Trust Levels](../../docs/TRUST_LEVELS.md).

## Why Claim Level Matters Here

A warehouse slot is a paid service. Both sides need a confidence signal.

- One-sided evidence, such as a single truck or a single warehouse sensor: claim level E2 or E3.
- Warehouse access confirmed by both the warehouse gate API and the truck geofence, with independent sources: claim level E4.
- Storage condition confirmed by three independent sensors: claim level E5.

Storage disputes are resolved by the claim level attached to the storage interval. A claim at E4 or E5 is dispute-proof. A claim at E2 is a signal, not a settlement basis.

## Challenges and Risks

| Risk | Mitigation |
|------|------------|
| Warehouse onboarding | Start with 1–2 pilot warehouses |
| Legal model | Local entity and clear terms per region |
| Slot availability fraud | Signed slot states with timestamps. Claim level gates acceptance |
| Condition disputes | Condition sensors with Evidence Package Base and claim level |
| Payment risk | Escrow with evidence-based release |
| Warehouse system integration | Thin integration layer. No WMS replacement |

## Why Later

Needs warehouse onboarding and a legal model.

Evidence layer first.

Once detention and cargo condition claims are proven, warehouse slots are a natural extension.

## Status

Research. On hold until evidence layer has production traction and a warehouse partner is identified.