# LogiQED Architecture

## General Approach

Modular monolith on C# Blazor. Microservices are a Phase 2 concern.

For a pilot MVP, a modular monolith is the right trade-off. Natural computational boundaries are split later: telemetry ingestion, prover workers, AI execution.

## Backend & Frontend

- C# Blazor Server / WebAssembly — single stack.
- ASP.NET Core — REST API, OpenAPI, webhooks.
- Entity Framework Core + MS SQL Server — operational data, analytics.

## Evidence Layer

- Signed Event Stream
- Evidence Graph
- SLA Engine
- Evidence Package
- Trust Levels E0–E5

## Blockchain and ZK

- Flock-class proof systems — hash-intensive workloads. Runs on x86 Linux. Post-quantum proving already 3x faster on Mac, x86 ceiling still open. Benchmarks on real LogiQED circuits.
- EigenDA — temporary data availability.
- Arweave — permanent commitments and proofs.
- Arbitrum Stylus — smart contracts for settlement and arbitration (Phase 2).

## Proof Verification

Hash-based SNARKs for post-quantum Ethereum are formally verified through Lean 4 via Yukon Research and Ethereum Foundation.

Ethereum Foundation and zkSecurity run a $1M proximity challenge to establish strong security bounds.

LogiQED adopts formally verified proof backends when production ready.

## Privacy and Storage

- MS SQL — operational data.
- EigenDA — temporary hashes and proofs.
- Arweave — Evidence Root, Merkle commitments, proof, schema version, timestamps, non-personal manifest.

Raw encrypted telemetry is stored separately in deletable storage. Deleting data or destroying keys does not remove the cryptographic proof.

## Source Identity & Trust

Minimal attestation in MVP:

- SourceId
- DeviceKey
- SourceType
- AttestationType
- TrustLevel
- KeyIssuedAt
- Firmware/AppVersion
- RevocationStatus
- EvidenceConfidence

Trust Levels:

| Level | Source |
|-------|--------|
| E0 | user input |
| E1 | authenticated external API |
| E2 | signed software source |
| E3 | attested device |
| E4 | hardware-backed + corroborated source |
| E5 | multiple independent trusted sources |

## Security

- Hybrid signatures: Ed25519 + ML-DSA.
- Crypto-agile signature providers.
- Pluggable proof backend.
- Device attestation — Phase 2.

## AI-Friendly Foundation

- Semantic tags on all entities.
- OpenAPI / Swagger — documented API.
- Webhooks — event-driven model for external agents.

## Scaling

- MVP: monolith, one server, MS SQL.
- Phase 2: microservices for ingestion, prover workers, AI execution.
- Phase 3: geo-distribution, own EigenDA nodes.