# Post-Quantum Proofs

## Status

Research. Draft direction for LogiQED beyond the core evidence layer. Not part of the current MVP roadmap.

---

## Why Post-Quantum Matters

LogiQED already commits to post-quantum readiness:

- Hybrid signatures: Ed25519 + ML-DSA
- Crypto-agile signature providers

But signatures are only one part of the stack. The proof system itself must also survive the quantum transition.

Classical ZK systems (Groth16, Plonk) rely on elliptic curve cryptography. A sufficiently powerful quantum computer could break them.

---

## zkVM Landscape

Three production-grade zkVM options are available today:

### Lattice Jolt (a16z crypto)

- Post-quantum zkVM, lattice-based
- Released September 2026
- 2–3x faster than previous Jolt
- Proof size: 65–80 KB
- Runs on CPU and GPU
- Repository: https://github.com/a16z/jolt

**Why it matters:** the only zkVM today that is post-quantum by design. Lattice-based, not curve-based.

### SP1 (Succinct Labs)

- Rust-based zkVM
- Production-ready, audited
- Strong EVM integration
- Repository: https://github.com/succinctlabs/sp1

**Why it matters:** the most mature option for Ethereum-aligned proofs. If EVM settlement matters, SP1 is the safe choice.

### RISC Zero

- Rust-based zkVM
- Full RISC-V emulation
- Mature ecosystem
- Repository: https://github.com/risc0/risc0

**Why it matters:** battle-tested, stable, well-documented. Best for teams that value reliability over novelty.

---

## Proof Pipeline for LogiQED

1. Business logic (claim rules, SLA math) is written in pure Rust.
2. Any zkVM (Jolt / SP1 / RISC Zero) wraps execution into a compact ZK proof.
3. The proof is submitted to Aligned Layer, where the operator network verifies validity cheaply via an Ethereum smart contract.

This pipeline is provider-agnostic. Swap the zkVM, keep the rest.

ZK proof is generated only on dispute request, and only when the claim level is E3 or higher. Post-quantum proofs follow the same gating.

---

## Where ZK Proofs Fit in the Evidence Layer

ZK proof is one artifact inside the full package. It is not the evidence itself.

The evidence is:

- The trip Evidence Root, anchored in Arweave for every route.
- The claim package base, anchored in Arweave for every claim, confirmed or rejected.
- The claim level, computed from independent sources.

ZK proof is added on top of a full package to prove that the computation was performed correctly over the committed inputs, without revealing raw telemetry.

Post-quantum proofs strengthen this layer for the cases where the proof itself must survive the quantum transition. The rest of the evidence flow does not change.

For the full model, see [Evidence Flow](../../docs/EVIDENCE_FLOW.md).

---

## Alignment with LogiQED Architecture

The Provider Abstraction principle already covers this:

- Proof backends sit behind interfaces.
- Crypto-agility means signatures, hashes, and proofs can be replaced without changing the product.
- EigenLayer is an integration choice, not a dependency.

Post-quantum proofs are the logical next step after post-quantum signatures.

---

## What Would Change

If Lattice Jolt (or a similar lattice-based zkVM) matures:

- Add it as a proof backend option in the Proof Engine.
- Run the same claim rules through both classical and post-quantum backends.
- Offer post-quantum proofs for full packages on high-value claims (insurance, court disputes).

No changes to the core architecture. Only a new backend behind the existing interface.

---

## Timeline

- Now: research. Monitor Lattice Jolt and similar projects.
- Phase 2: evaluate zkVM integration for real claims.
- Phase 3: offer post-quantum proofs for high-value claims.

---

## Open Questions

1. What is the real performance gap between lattice-based and curve-based zkVMs?
2. Do insurers or courts need post-quantum proofs today, or is this a future concern?
3. Is there a regulatory driver (EU PQC guidance, NIST standards) that would accelerate adoption?

---

## Related

- [Research Overview](README.md)
- [Architecture](../../ARCHITECTURE.md)
- [Evidence Flow](../../EVIDENCE_FLOW.md)
- [Evidence Package](../../EVIDENCE.md)
- [Trust Levels](../../TRUST_LEVELS.md)