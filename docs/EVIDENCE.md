# LogiQED Evidence Package

Evidence Package is the core output of LogiQED.

It is an immutable snapshot that connects a claim, its sources, the rule that evaluated it, and the proof that verifies it.

## Structure

Evidence Package contains:

- Claim ID and version
- Claim Type
- Schema Version
- Timestamp
- Sources
- Trust Policy result
- Corroboration result
- Input Events
- SLA Rule reference and digest
- Conclusion
- Proof Reference
- Privacy-minimized Public Manifest

## Provenance Chain

The package references an Evidence Graph.

Claim, Events, Sources, Source-of-Source, Rule, Proof.

## Privacy Design

Permanent storage contains commitments and proofs. Not raw telemetry.

Public Manifest is designed to exclude direct identifiers.

Raw encrypted context data is stored separately in deletable storage.

Deleting raw data or destroying keys does not remove the cryptographic proof that the package existed and was verified.

## Verification

Any party can verify the package without accessing raw telemetry.

They can check:

- Proof validity
- Hash consistency
- Source signatures
- Rule version and digest
- Trust policy result
- Conclusion correctness

## Example

Detention Package

- Claim: Detention
- Conclusion: Warehouse attributable: 68 min
- Rule: DETENTION_V1
- Trust Policy: E4_REQUIRED_V1
- Result: PASS
- Proof: VALID