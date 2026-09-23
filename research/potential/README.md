# Future Product Ideas

Draft directions for LogiQED beyond the core evidence layer.

The core remains: signed events, Evidence Graph, SLA Engine, Evidence Builder, three evidence levels, Trust Levels E0-E5, and claim level.

This document is a navigation map. Each idea is described in its own file.

---

## How Ideas Are Selected

| Criterion | Description |
|-----------|-------------|
| Core connection | The idea must strengthen or use the existing Evidence Layer |
| Market demand | Real demand now or within 12–24 months |
| Technical readiness | Can be built on the current stack without major changes |
| Regulatory driver | Uses eFTI, insurance requirements, or similar |
| Feasibility | Does not require expertise we do not have |

Idea statuses:

- Research - studying, no active development
- Prototype - minimal validation exists
- Not planned - outside the near roadmap
- On hold - waiting for an external factor

---

## What the Core Provides

Every idea below builds on the same foundation.

- Signed Event Stream: every event signed by its source.
- Evidence Graph: provenance DAG connecting events, sources, rules, and claims.
- Evidence Builder: assembles claim packages and Evidence Roots at three moments.
- Three evidence levels: trip anchor, claim package base, full package.
- Trust Levels E0-E5: server-side own assurance for every source.
- Claim level: computed from independent sources that confirm the same fact.
- SLA Engine: deterministic rules with working calendars.
- Claim packages: base package for every claim, full package on dispute request.

---

## Categories

| Category | Ideas |
|----------|-------|
| Marketplaces and Services | Border Ready Pack, Marketplace, Warehouse Marketplace |
| Decentralization and DePIN | DePIN Integrations, Soulbound Reputation |
| Physical Devices | MeshShield, Proof-of-Freeze, Black Box |
| Data and AI | Scientific Sensors, HD Maps, AI Agents |
| Cryptography | Post-Quantum Proofs |

---

## Priority Tiers

### Near-Term (Phase 1–2)

Closest to the core, buildable on current architecture.

- **Border Ready Pack** - pre-arrival evidence for cross-border freight. View on existing evidence, 2–3 week build. Reuses trip and claim anchors.
- **Proof-of-Freeze** - cold chain compliance proof. Fast claim candidate. Reuses claim package base and claim level.
- **AI Agents** - automatic dispute resolution. Pilotable after MVP. Consumes full packages and claim levels.

### Mid-Term (Phase 2–3)

Requires client base and operational scale.

- **Marketplace** - verified data and proof marketplace. After 100+ clients and 1M+ packages. Operates on claim packages and Evidence Roots.
- **Warehouse Marketplace** - warehouse slots on evidence. After stable SLA engine. Uses claim level and trust policy results.

### Long-Term (Phase 3+)

Requires fleet scale, new expertise, or ecosystem partnerships.

- **HD Maps** - trucks build high-definition maps for autonomous vehicles. Requires thousands of trucks, CV pipeline, AV relationships.
- **DePIN Integrations** - physical trust infrastructure beyond logistics.
- **Soulbound Reputation** - driver and company reputation from evidence. Builds on claim levels and trust policies.
- **MeshShield** - secure mesh network between devices.
- **Black Box** - independent vehicle data recorder.
- **Scientific Sensors** - verified scientific measurements.

---

## Detailed Files

- [Border Ready Pack](border-ready-pack.md)
- [Marketplace](marketplace.md)
- [DePIN Integrations](depin.md)
- [Scientific Sensors](scientific-sensors.md)
- [Soulbound Reputation](soulbound.md)
- [MeshShield](meshshield.md)
- [Proof-of-Freeze](proof-of-freeze.md)
- [HD Maps](hd-maps.md)
- [Warehouse Marketplace](warehouse-marketplace.md)
- [Black Box](black-box.md)
- [AI Agents](ai-agents.md)
- [Post-Quantum Proofs](post-quantum-proofs.md)

---

## How Ideas Connect to the Core

| Idea | Uses | Builds on |
|------|------|-----------|
| Border Ready Pack | Trip and claim anchors | Cross-border evidence reuse |
| Proof-of-Freeze | Claim package base, claim level | Cold chain claims |
| AI Agents | Full packages, claim levels | Automatic dispute resolution |
| Marketplace | Claim packages, Evidence Roots | Verified data exchange |
| Warehouse Marketplace | Claim level, trust policy result | Warehouse slot booking |
| HD Maps | Signed events from fleet | Map generation |
| Soulbound Reputation | Claim levels, trust policies | Reputation score |
| MeshShield | Signed event stream | Device mesh |
| Black Box | Signed event stream | Vehicle data recorder |
| Scientific Sensors | Evidence Layer | Verified measurements |
| Post-Quantum Proofs | Proof Engine | Crypto-agility |
| DePIN Integrations | Evidence Layer | Physical trust infrastructure |

---

## Principles

- Evidence first. Marketplace later. Autonomy last.
- Every idea connects to the existing Trust Graph.
- No idea should require replacing the core.
- Priority is driven by external demand and regulation.
- Every idea is evaluated by cost and potential revenue.

---

Note: This is a research document, not a development plan. Ideas may change, be postponed, or be removed.