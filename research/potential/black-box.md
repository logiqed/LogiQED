# Black Box

## One Line

Independent driver evidence recorder that gives drivers their own verifiable data in disputes.

## Problem

Drivers are on the losing side of SLA disputes because they have no evidence of their own.

Fleet telematics belongs to the company. Dashcam footage belongs to the warehouse or disappears. The driver has a smartphone, a statement, and a phone call.

In a dispute, the driver is the only party without data.

## Solution

A dedicated hardware recorder that captures independent evidence directly from the vehicle, under the driver's control.

- Records CAN bus data and dashcam video.
- Encrypts everything with the driver's key.
- Stores evidence in a decentralized way.
- Driver controls who can access what, and when.

The driver becomes a first-class evidence source with trust level E3 or E4.

## How It Works

Vehicle CAN and OBD-II data flows into the Black Box. Dashcam video flows into the same device. All data is signed and encrypted with the driver's key. Evidence is replicated to decentralized storage.

For a typical dispute:

1. Driver connects the Black Box to the vehicle.
2. Recorder captures CAN data and video.
3. All data is signed by the device and encrypted.
4. Evidence is replicated to decentralized storage.
5. When a dispute arises, the driver grants access to a specific time window.
6. Verifier checks that data is signed, tamper-evident, and originally generated at the event time.

The driver never hands over the entire archive. Only the relevant window.

## Use Cases

- SLA disputes
- Driver exoneration
- Cargo condition corroboration
- Insurance reconstruction
- Fleet audit

## Technical Dependencies

- OBD-II and CAN adapter
- External camera
- Secure element
- Decentralized storage
- Companion app
- Hardware clock synchronization

## Integration with Core

A Black Box is another source in the LogiQED Trust Model.

- SourceType: TRACKER or BLACK_BOX
- Trust Level: E3 attested device, then E4 with corroborating source
- AttestationType: SECURE_ENCLAVE, TEE, TPM2.0, OEM_PKI
- Data: signed EPCIS events and video references

Evidence from Black Box can corroborate carrier telematics and satisfy E4 or E5 trust requirements.

Video is never uploaded permanently. Only signed commitments and proof references enter the Evidence Graph.

## Challenges

| Challenge | Mitigation |
|-----------|------------|
| CAN fragmentation | Support OBD-II and J1939 first |
| Camera diversity | Standardize on one vendor for MVP |
| Hardware cost | Start with one validated design |
| Driver key loss | Recovery key split 2-of-3 |
| Regulatory and GDPR | Region-specific config, audio off by default |

## Attestation Provider

Darkbloom provides hardware attestation on Apple Silicon.

Validated model:

- $102K ARR
- 4.5B tokens served
- 250 Macs under attestation

Candidate for driver device attestation in Black Box, specifically for the companion app running on the driver's iPhone or Mac, not for the hardware module itself.

## Why Later

Hardware integration is complex: certification, supply chain, firmware, regulatory.

MVP starts with signed events from smartphones and existing devices.

Black Box becomes relevant when:

- 10 or more pilot carriers use LogiQED
- A partner requests driver-side evidence
- Insurance partners ask for independent event records

## Status

Research. On hold, revisit after Phase 2.