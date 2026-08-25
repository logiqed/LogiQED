# LogiQED Trust Model

## Source Assurance

Every source is evaluated across identity, authentication, integrity, attestation, metrology, time, provenance and completeness.

| Level | Source |
|-------|--------|
| E0 | user input |
| E1 | authenticated external API |
| E2 | signed software source |
| E3 | attested device |
| E4 | hardware-backed + corroborated source |
| E5 | multiple independent trusted sources |

Source Assurance is not an enum supplied by the client. It is the server-side evaluation of source identity, key, certificate, attestation, firmware and revocation status.

## Trust Policy

A Trust Policy defines the required assurance for a specific claim.

Example: E4_REQUIRED_V1

Claim can be evaluated only if all required sources satisfy the policy.

## Claim Confidence

Claim Confidence is the result of evaluating a claim against its Trust Policy.

It is separate from Source Assurance.

One source may be E4, but a specific claim based on that source may still have low confidence if corroboration is missing.

## Provenance

Trust Levels are not just an enum. They form Trust Policy + Provenance Graph.

Three sources are not necessarily independent. GPS and geofence may derive from the same signal.

Evidence Graph records provenance of the source of the source.

## MVP Implementation

Minimal source identity fields:

- SourceId
- KeyId
- SourceType
- AttestationType
- Firmware/AppVersion
- RevocationStatus

Server computes assurance and trust policy result. Client never supplies trust level.