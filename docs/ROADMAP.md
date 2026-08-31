# LogiQED Roadmap

## Principle

Evidence first. Marketplace later. Autonomy last.

The real moat: validated source identities, evidence schemas, SLA claim library, eFTI/EPCIS compatibility, insurer acceptance, settlement precedents.

---

## Phase 0 — Blueprint and Demo Preparation

Now.

Goal: finalize architecture and prepare a demo.

Exit criteria:

- OpenAPI draft
- Two diagrams: data flow and system architecture
- Evidence Package specification
- Demo ready for a 10-minute presentation
- Pilot partner identified

Output: investor pitch and pilot partner search.

---

## Phase 1 — Pilot MVP

Timeline: 3–4 months. Budget: $170–200K.

Goal: prove that Evidence Package closes a real commercial dispute.

Scope:

- Shipment and trip domain model
- GPS and mobile tracking
- Cold-chain temperature
- Signed Event Stream
- Evidence Graph
- Route State Machine
- Event Orchestrator
- On-Demand Oracle
- SLA Engine
- Exception attribution
- Evidence Package
- Two ZK claims with mock proof backend
- e-documents
- OpenAPI and webhooks

Exit criteria:

Must have:

- 3 or more real vehicles and 50 or more trips
- Route State Machine reacts to TrafficEntered and TrafficExited
- Two claims verified end-to-end
- Evidence Package accepted by pilot partner

Stretch:

- At least one real commercial dispute settled using Evidence Package

Business result:

- First 2–3 pilot or paying clients
- Real cost of evidence package processing
- Feedback on SLA schemas and rules

---

## Phase 2 — Integrations and Scale

Timeline: 6–9 months after pilot. Budget estimate: $210–360K.

Monthly rate stays $35–40K regardless of team size. The team self-manages and expands internally.

Goal: turn pilot into a commercial product.

Priorities:

P0 Critical:

- eFTI compliance tooling
- Real Aligned Layer integration
- Device attestation and hardware-backed identity
- SignalR Redis backplane

P1 Important:

- Full EPCIS 2.0 compatibility
- Insurance API pilot with 1–2 insurers
- Orchestrator extraction to microservice when load exceeds 5000 devices
- Warehouse slot management pilot

P2 Optional:

- EigenDA if benchmark shows need

Exit criteria:

- 10 or more commercial clients
- Verified eFTI integration
- 1–2 insurers connected via API

---

## Phase 3 — Ecosystem

Timeline: 18 months and later.

Entry condition: 100 or more clients, stable revenue.

Ideas by value:

A. Marketplace on trust graph

B. Insurance integrations

C. DePIN integrations

Research only until validated.

---

## eFTI Timeline

| Date | Event |
|------|-------|
| 2026 | Pilot ready, technology demonstrated |
| 9 July 2027 | EU accepts eFTI, market moves to electronic documents |
| 2028 | eFTI becomes mandatory, LogiQED operates as infrastructure |

LogiQED must be ready when the market arrives.

---

## Phase Transition Criteria

| Transition | Criteria |
|-----------|----------|
| Phase 0 to 1 | Demo, pilot partner identified |
| Phase 1 to 2 | One dispute closed, pilot complete, 2–3 clients in pipeline |
| Phase 2 to 3 | 100 or more clients, stable revenue |