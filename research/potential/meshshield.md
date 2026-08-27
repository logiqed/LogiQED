# MeshShield

## One Line

Truck mesh network for theft prevention using collective local awareness.

## Problem

Parking lots, rest stops, and grey zones have no collective security infrastructure.

Each truck is isolated with its own alarm system that can be disabled or ignored. When an incident occurs, no other vehicle nearby is aware, no one else can record evidence, and the fleet operator learns about it hours later.

Cargo theft at parking lots and rest stops is a multibillion-dollar problem. Single-vehicle security is reactive. A network of nearby trucks offers situational awareness that no single truck can have alone.

## Solution

MeshShield turns a parking lot full of trucks into an ad-hoc security mesh.

Each truck runs low-power IoT sensors for vibration, light, and door state. A suspicious event triggers a local alert. The alert broadcasts to nearby trucks via mesh radio, creating a collective security perimeter. Every alert is signed, timestamped, and broadcast. The fleet operator receives a signed event stream.

Even if the attacked truck's systems are compromised, nearby trucks keep recording and relaying evidence. Insurance and police obtain evidence that did not originate from the victim's truck.

## How It Works

Truck sensors detect vibration, light, or door state. Edge detection identifies a suspicious event. A local alert broadcasts via mesh radio. Nearby trucks receive and relay the alert. A signed event stream reaches the fleet operator through any truck with internet. The operator receives an alert and an Evidence Package for insurance or police.

For a typical incident:

1. Twenty trucks parked in the area. MeshShield enabled by all.
2. Thief opens a door.
3. Vibration sensor triggers. Mesh alert sent.
4. Every nearby truck receives the alert, signs it, and relays it.
5. Any truck with internet forwards the signed alert to the fleet operator.
6. Operator sees GPS location, timestamp, sensor details, and camera capture when present.
7. Records are collected as evidence.

Even if the thief cuts power to the victim truck, the signed alert already left the vehicle via neighbors.

## Technical Dependencies

- Local mesh networking such as LoRa or Thread
- Low-power IoT sensors for vibration, light, door state, motion
- In-vehicle hub with secure element and power backup
- Signed events in LogiQED format
- Low-latency local alerting
- Back-haul connectivity through at least one truck with cellular

## Integration with Core

MeshShield adds a new cluster of sources and event types.

- SourceType: MESHSHIELD_NODE
- Trust Level: E3 attested device, then E4 with multi-node corroboration
- AttestationType: SECURE_ELEMENT, TEE, OEM_PKI
- Data: signed alerts, not positions
- Evidence: multi-node alerts form corroboration for a single incident

A single node alert is E2 or E3. When five neighboring trucks sign related alerts in a time window, the combined evidence reaches E4 or E5.

## Use Cases

- Cargo theft detection
- Secure parking improvement
- Insurance claims
- Driver safety
- Fleet management

## Risks and Challenges

| Risk | Mitigation |
|------|------------|
| Mesh radio range too short | Support range and mesh relaying |
| Mesh radio interference | Long-range low-power radio |
| False positives | Sensitivity trained per parking mode |
| Low network density | Alert still sent, operator falls back to camera telemetry |
| Power constraints | Low-power mode, battery backup |

## Why Later

MeshShield requires:

- Hardware deployment per truck
- Minimum fleet density, likely 100+ trucks in one parking zone
- Mesh radio infrastructure and licensing
- Local radio emission regulation

Start with simpler first: signed IoT seals and GPS events already unlock much of the evidence value without radio hardware.

## MVP Path

1. IoT hardware seals on pilot vehicles.
2. Each seal signs and sends events to LogiQED on alert.
3. GPS patterns define parking anomaly thresholds.
4. Prove that a theft event was recorded.
5. Add mesh broadcast only after enough trucks participate.

## Status

Research. On hold until fleet density and radio integration are validated. For MVP, start with core evidence and IoT seals instead.