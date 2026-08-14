# LogiQED Security

## Reporting

Security issues should be reported privately to the project maintainers.

Do not open public issues for vulnerabilities.

## Key Management

- Device keys are generated on the device and stored in platform-protected storage.
- Keys are not exported in plaintext.
- Hybrid signature scheme: Ed25519 + ML-DSA.
- Crypto-agile design: signature providers are pluggable.

## Data Handling

- Raw telemetry is not stored permanently.
- Permanent storage contains hashes, proofs, and non-personal manifests.
- Encrypted context data is stored separately in deletable storage.
- Key destruction does not remove the cryptographic proof.

## Source Attestation

Every source has:

- SourceId
- DeviceKey
- SourceType
- AttestationType
- TrustLevel
- Firmware/AppVersion
- RevocationStatus

## Trust Levels

Sources are ranked E0–E5. Higher levels require stronger attestation and corroboration.

## Webhook Security

Webhooks are signed by LogiQED. Subscribers must verify signatures before processing.

## Design Principles

- Privacy-by-design
- Least privilege
- No raw telemetry in permanent storage
- Every proof independently verifiable