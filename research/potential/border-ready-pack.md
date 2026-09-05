# Border Ready Pack

Draft direction for LogiQED beyond the core evidence layer.

Status: Research. Not part of the current roadmap.

---

## The Problem

Cross-border freight currently involves:

- 4–8 hours waiting at border checkpoints
- Paper documents: CMR, invoices, certificates
- Manual temperature verification for cold chain
- Disputes over route, timing, cargo condition
- Limited pre-arrival visibility for customs brokers

A single border delay costs a carrier $100–300 in direct costs plus downstream penalties.

---

## What LogiQED Can Provide

### Route Proof

Signed GPS events, geofences, Evidence Root.

Proves where the truck actually drove and when.

### Temperature Log

Continuous signed log for refrigerated cargo.

Proves the cold chain was maintained for the entire trip.

### eFTI-ready Events

EPCIS 2.0 events with eIDAS-compatible signatures.

Ready for eFTI platforms from 9 July 2027.

### Border Summary

One-page summary for the customs broker.

Route, cargo, temperature status, evidence anchor.

---

## Border Ready Pack

| Component | Content | For |
|-----------|---------|-----|
| Route Proof | GPS events, geofences, Evidence Root | Customs, receiver |
| Temperature Log | Continuous signed log | Receiver, insurance |
| eFTI-ready Events | EPCIS, eIDAS signature | eFTI platforms |
| Border Summary | One page for the broker | Customs broker |

Estimated cost: $0.05–0.10 per route.

---

## Value Proposition

| Today | With LogiQED |
|-------|--------------|
| 4–8 hours at border | Faster document verification |
| Paper CMR, invoices | EPCIS events with eIDAS signature |
| "Where were you" disputes | Signed route proof |
| Manual temperature checks | Automatic signed log |
| No pre-arrival visibility | Pack sent 2–3 hours before arrival |

---

## Target Customer

Mid-sized carriers operating cross-border routes in the EU.

Customs brokers who prepare documentation for multiple carriers.

eFTI platforms looking for verified event sources.

---

## Open Questions

1. Which documents are actually required at borders: CMR, TIR, EX-1, certificates?
2. What needs eIDAS signatures — events, packages, or both?
3. Is NCTS integration required for EU transit?
4. Who is the first partner — carrier, broker, or eFTI platform?

---

## Phases

### Phase 1 — Pilot

- One carrier with cross-border routes
- Generate Border Ready Pack for every route
- Send to broker
- Measure: does the border crossing get faster?

### Phase 2 — Partnership

- Integration with an eFTI platform
- Integration with a customs broker
- Pack accepted automatically

### Phase 3 — Standardization

- Pack recognized by insurers
- Pack used in border dispute resolution

---

## Connection to Core Evidence Layer

Border Ready Pack reuses:

- Signed event stream
- Trust levels E0–E5
- Evidence Root and canonicalization
- EPCIS 2.0 event model

No changes to the core architecture required.

---

## Related

- [Research Overview](README.md)
- [Architecture](../../ARCHITECTURE.md)
- [Evidence Package](../../EVIDENCE.md)