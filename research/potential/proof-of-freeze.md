# Proof-of-Freeze

## One Line

Autonomous cargo lockdown when tampering is detected, even without connectivity.

## Problem

Cargo is most vulnerable when connectivity is lost.

In tunnels, remote roads, or during signal jamming, the cloud cannot help. A thief can cut a trailer door, open it, and disappear before any alert reaches the fleet operator.

Even with telematics, the gap between detection and response is minutes. In that window, cargo is gone.

## Solution

Proof-of-Freeze is a hardware device that detects tampering at the edge and acts immediately, without waiting for cloud instructions.

A local AI model identifies attack patterns: cutting, opening, impact, unusual vibration. When an attack is detected, the device autonomously engages hardware locks, freezing the cargo compartment. The decision and proof are generated locally, signed with a hardware secure element, and uploaded when connectivity returns.

The device is not a sensor that reports. It is a guardian that acts.

## How It Works

Edge sensors detect cutting, opening, impact, or vibration. A local AI model confirms an attack pattern. An autonomous decision is made without cloud. Hardware locks engage. Local proof is generated. Proof uploads when connectivity returns.

For a typical attack scenario:

1. Truck is parked in a remote location. Connectivity drops.
2. Thief attempts to cut the rear door lock.
3. Cutting sensor detects the attack pattern.
4. Edge AI confirms this is an attack, not road vibration.
5. Hardware locks engage within milliseconds.
6. Device generates a signed event with timestamp, sensor data, and action taken.
7. When connectivity returns, the proof uploads to LogiQED.
8. Fleet operator and insurer receive an Evidence Package Base with a Claim Evidence Root and an Arweave anchor.

## Use Cases

- Theft prevention
- Attack evidence
- Cargo integrity
- Remote area protection
- Insurance premium reduction

## Technical Dependencies

- Edge AI model
- Hardware secure element
- Local proof generation
- Signed event stream
- Hardware locks with fail-safe behavior
- Power management with battery backup
- Opportunistic upload via cellular, satellite, or mesh
- Evidence Package Base with Claim Evidence Root and Arweave anchor

## Integration with Core

Proof-of-Freeze is a hardware source in the LogiQED Trust Model.

- SourceType: TAMPER_PROOF_DEVICE
- Own assurance: E3 attested device, then E4 with corroboration
- AttestationType: SECURE_ELEMENT, TEE
- Data: signed events for attack detected and locks engaged
- Evidence: attack attempt proof for claims and insurance
- Evidence Package: events from the device are assembled into an Evidence Package Base. The Claim Evidence Root covers all events for this attack.

A single Proof-of-Freeze event is E3. When a neighboring vehicle, a fixed camera, or a parking facility sensor confirms the same event, the claim level rises to E4 or E5.

For the full model, see [Trust Levels](../../docs/TRUST_LEVELS.md).

## Delayed Upload and Evidence Integrity

Connectivity may return hours or days after the attack. This does not weaken the evidence.

- Every event is signed at the moment it happens, using the device's secure element.
- The signature binds the event to the device and to the time of the attack.
- The signature does not depend on the cloud or on the upload moment.
- When the event reaches LogiQED, the Trip Evidence Root and the Claim Evidence Root are computed over the canonical event stream.
- Anchors in Arweave record the time when the Evidence Roots were committed.

A verifier can confirm that the event was produced by the device at the recorded time, not fabricated during upload.

## Use Cases Beyond Theft

- Dispute over seal integrity at delivery
- Evidence that a door remained closed during transit
- Corroboration for temperature claims, when the sensor is on the same door
- Insurance claim for cargo condition

## Challenges and Risks

| Risk | Mitigation |
|------|------------|
| False positives | AI model trained on real-world data |
| Safety certification | Lock mechanisms must not endanger people |
| Power consumption | Battery backup with standby |
| Hardware failure | Redundant sensors, self-test |
| Manual override | Driver key or authorized bypass with audit trail |
| Legal liability | Label as anti-tamper device, not life-safety system |
| Delayed upload | Signature at the moment of the event. Cloud is not required |
| Device compromise | Secure element protects the signing key. Tamper detection invalidates the key |

## Why Later

Proof-of-Freeze requires:

- Hardware engineering and certification
- Edge AI model development
- Electro-mechanical lock integration
- Safety and liability assessment

Earlier value comes from detection and alerts. Lockdown is the later, harder phase.

## MVP Path

1. Detection device with sensors and edge AI, no locks.
2. Device detects tampering and sends signed event when connectivity is available.
3. LogiQED receives event and triggers alerts.
4. Validate detection accuracy with pilot fleet.
5. Add autonomous lock after detection is reliable and certified.

## Status

Research. On hold, revisit when detection MVP is proven and safety certification path is clear.