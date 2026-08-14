# LogiQED Trust Levels

Every source of evidence has a trust level. Trust levels turn binary "proof" into graded confidence.

## Levels

| Level | Source |
|-------|--------|
| E0 | User input |
| E1 | Authenticated external API |
| E2 | Signed software source |
| E3 | Attested device |
| E4 | Hardware-backed + corroborated source |
| E5 | Multiple independent trusted sources |

## Why Trust Levels Matter

A signed event does not mean the source is trustworthy. It means someone with a key signed it.

Trust Levels answer:

- Who signed it?
- What type of source is it?
- Is the device attested?
- Is it corroborated by independent sources?

## Example

TrafficDelayClaim

Confidence: E4

Sources: Truck GPS + Traffic Provider + Geofence

This gives insurers, SLA engines, and courts a way to weight evidence instead of accepting or rejecting it.

## MVP Implementation

Minimal source identity fields in MVP:

- SourceId
- DeviceKey
- SourceType
- AttestationType
- TrustLevel
- KeyIssuedAt
- Firmware/AppVersion
- RevocationStatus
- EvidenceConfidence

Full hardware attestation comes in Phase 2.

## TrustLevel Assignment Rules

- Start at E1 for authenticated APIs.
- Start at E2 for signed software sources.
- A device with verified hardware key becomes E3.
- Multiple corroborating independent sources elevate to E4 or E5.

The rules are part of the SLA schema and are versioned.