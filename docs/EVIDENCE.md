# LogiQED Evidence Package

Evidence Package is the core output of LogiQED.

It is an immutable snapshot that connects a claim, its sources, the rule that evaluated it, and the proof that verifies it.

## Structure

Evidence Package contains:

- Claim ID
- Claim Type
- Schema Version
- Timestamp
- Sources
- Trust Levels
- Input Events
- SLA Rule Reference
- Conclusion
- Proof Reference
- Non-personal Manifest

## Provenance Chain

The package references an Evidence Graph.

Claim → Events → Sources → Rule → Proof.

## Privacy Design

Permanent storage contains commitments and proofs. Not raw telemetry.

- Evidence Root
- Merkle Commitments
- Proof
- Schema Version
- Timestamps
- Non-personal Manifest

Raw encrypted context data is stored separately in deletable storage.

Deleting raw data or destroying keys does not remove the cryptographic proof that the package existed and was verified.

## Verification

Any party can verify the package without accessing raw telemetry.

They can check:

- Proof validity
- Hash consistency
- Source signatures
- Rule version
- Conclusion correctness

## Example

SLA Exception Package

- Claim: SLA Exception
- Conclusion: No penalty
- Gross Delay: 42 min
- Traffic: 31 min
- Queue: 16 min
- Chargeable Delay: 0 min
- Rule: SLA v3.2
- Proof: VALID
- Confidence: E4