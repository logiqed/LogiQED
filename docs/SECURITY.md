# Security

## Key Management

Device keys are generated on the device and stored in platform-protected storage.

Keys are not exported in plaintext.

Crypto-agile signature suite: ECDSA-P256, Ed25519, ML-DSA, SLH-DSA.

## Data Handling

Raw telemetry is stored in object storage with retention policies.

Permanent storage contains commitments and proofs, not raw operational data.

Public Manifest is designed to exclude direct identifiers.

Pseudonymised data may remain personal data if a link can be restored with additional information.

## Source Attestation

Physical asset attestation uses TPM 2.0, Secure Element, OEM PKI and meter certificates.

Compute attestation uses Intel TDX, AMD SEV-SNP, vTPM and workload identity.

## Integrity

Every event is signed.

Source-local sequence with optional previous event hash.

Merkle commitments with signed root.

## Verification

Claims are independently verifiable.

Verification does not require access to raw telemetry.

## Design Principles

- Privacy-by-design
- Least privilege
- No raw telemetry in permanent storage
- Every claim is policy-bound