# LogiQED Glossary

## Evidence Package

Immutable snapshot connecting a claim, its sources, trust policy result, rule version and proof.

## Source Assurance

Server-side evaluation of a source. Range E0–E5.

## Trust Policy

Required assurance for a specific claim. Example: E4_REQUIRED_V1.

## Claim Confidence

Result of evaluating a claim against its Trust Policy.

## Claim

Verifiable statement evaluated by SLA policy. Examples: Detention, Cargo Condition.

## Provenance

Chain showing how a claim was derived from events, sources and rules.

## Evidence Graph

Directed acyclic graph connecting events, sources, rules and claims. Records source-of-source provenance.

## EPCIS

GS1 EPCIS 2.0. Logistics event language describing what, when, where and why.

## SLA Rule

Versioned rule that defines exceptions and chargeable time.

## Ingest

Entry point for signed EPCIS events.

## eFTI

Electronic Freight Transport Information. EU regulation effective July 9, 2027.

## ZK Proof

Cryptographic proof that a computation was performed correctly without revealing inputs.

## Post-Quantum Ready

Architecture designed to migrate to quantum-resistant algorithms without redesign.

## Flock

Hash-based proof system. Experimental backend in LogiQED. Not a critical dependency.

## EigenDA

Data availability layer. Optional in LogiQED. Added only when benchmark justifies.

## Arweave

Permanent storage for commitments and proofs. Optional in LogiQED.