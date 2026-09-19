# LogiQED - Border Ready Pack

## Status

Research. Draft direction. Not part of the current MVP roadmap.

Detailed economics and timeline are provided so investors can evaluate the opportunity - not because this is scheduled for development.

---

## The Problem

Cross-border freight in the EU involves:

- 4–8 hours waiting at border checkpoints
- Paper documents: CMR, invoices, certificates
- Manual temperature verification for cold chain
- Disputes over route, timing, cargo condition
- Limited pre-arrival visibility for customs brokers

A single border delay costs a carrier **$100–300** in direct costs plus downstream penalties.

---

## Market Context

- **eFTI Regulation (EU) 2020/1056** - legal framework in force since August 2020
- Full application: **9 July 2027** - Member State authorities must accept electronic freight data shared via certified eFTI platforms
- eFTI is **voluntary for operators**: there is no obligation to go digital. But once an operator shares data via a certified platform, authorities are **legally required to accept it** - early adopters gain the advantage
- Remaining implementing specifications (platform certification rules) to be adopted **by December 2026**
- Anticipated savings: **€1 billion/year** in operational and administrative costs for the EU transport sector (European Commission estimate)
- Cross-border disputes cost **$200–500 per case** to resolve manually

Source: [European Commission - The eFTI Regulation](https://transport.ec.europa.eu/transport-themes/logistics-and-multimodal-transport/efti-regulation_en)

---

## Regulatory Timeline

| Date | Milestone | Impact on LogiQED |
|------|-----------|-------------------|
| Aug 2020 | Regulation (EU) 2020/1056 enters into force | Legal foundation exists |
| Jan 2025 | First implementing acts in force | Member States start building IT systems |
| Jan 2026 | eFTI platforms may begin preparing for operations | Market entry window opens |
| **Dec 2026** | **Remaining certification specs adopted** | **Certification requirements finalized - positioning must happen now** |
| **9 Jul 2027** | **Full application** | **Authorities must accept eFTI-compliant data - demand spikes** |

**Timing thesis:** certification rules land in 3 months. Carriers and brokers will spend 2027 scrambling for compliant evidence sources. LogiQED's Evidence Package (EPCIS 2.0 + eIDAS signatures) is designed to slot into this ecosystem before the scramble starts.

---

## What LogiQED Provides

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

## Border Ready Pack - Components

| Component | Content | For |
|-----------|---------|-----|
| Route Proof | GPS events, geofences, Evidence Root | Customs, receiver |
| Temperature Log | Continuous signed log | Receiver, insurance |
| eFTI-ready Events | EPCIS 2.0, eIDAS signature | eFTI platforms |
| Border Summary | One page for the broker | Customs broker |

Estimated cost: **$0.05–0.10 per route**.

---

## Value Proposition

| Today | With LogiQED | Impact |
|-------|--------------|--------|
| 4–8 hours at border | Faster document verification, queue remains | Medium |
| Paper CMR, invoices | EPCIS events with eIDAS signature | High |
| "Where were you" disputes | Signed route proof | High |
| Manual temperature checks | Automatic signed log | High |
| No pre-arrival visibility | Pack sent 2–3 hours before arrival | Medium |

Note: Border Ready Pack reduces document verification time, not physical queue waiting. Savings depend on how much of the delay is document-related vs infrastructure-related.

---

## ROI Calculation

### Per-route Saving (Sourced)

Per cross-border route (EU):

| Cost today | Cost with LogiQED | Saving |
|------------|-------------------|--------|
| Document verification delay: $50–150 | Reduced 30–50% | $15–75 |
| Dispute resolution: $200–500 | $0.08 (evidence closes dispute) | $200–500 |
| Document prep: $15–30/hr × 2h | $0 (auto-generated) | $30–60 |
| **Total per route** | **$0.08** | **$245–635** |

The $200–500 dispute resolution figure is the sourced input for this table. It is the observed cost of resolving a cross-border dispute manually, and it is the number the pilot is designed to replace with a measured one.

### Fleet-level Projection (Modeled)

Annual for a fleet of 50 vehicles doing 200 cross-border routes per year (10,000 routes):

| | Today | With LogiQED | Saving |
|--|-------|--------------|--------|
| Document verification delays | $500K–$1.5M | $250K–$1M | $250K–$500K |
| Disputes | $2M–$5M | $8K | ~$2M–$5M |
| Document prep | $60K–$120K | $0 | $60K–$120K |
| **Total** | **$2.56M–$6.62M** | **$258K–$1.01M** | **$2.3M–$5.6M** |

This table is a projection, not a measurement. It extrapolates the per-route figures above across 10,000 routes.

The dispute line assumes every dispute in the year is resolved by evidence rather than negotiated manually, which is the ceiling case rather than the expected case.

The per-route figures are sourced; the annual totals are modeled from them.

### Why Hasn't the Carrier Already Fixed This?

An investor who does the math will ask this question. The answer has three parts:

1. **The cost is invisible until it lands.** A carrier does not book a "$200–500 dispute" line item. It shows up as a dispatcher losing half a day, a claim negotiated down, a customer who quietly stops tendering the lane. Nobody owns that number internally.

2. **The fix requires a standard that does not exist yet.** Every tool today produces data the carrier controls. Counterparties and insurers do not accept it as a basis for settlement. That is why disputes get negotiated rather than settled by data.

3. **The blocker is not willingness - it is credibility.** Self-reported data does not carry the same weight as evidence that both sides can independently verify. LogiQED provides that verifiable evidence.

Note: whether signed evidence has formal legal standing is a matter for legal review and depends on jurisdiction. The commercial point above is what drives the market decision today.

### What the Pilot Proves

The pilot converts the projection into a measurement.

On live commercial routes, the pilot records the actual cost of resolving each dispute before and after Evidence Packages are in use: hours spent, documents exchanged, calls held, and the settlement outcome.

The output is a measured per-dispute cost, which replaces the $200–500 input and re-derives the fleet-level number from observed data.

Until that measurement exists, the fleet-level figure should be read as the size of the opportunity, not as a saving a carrier has realized.

---

## Competitive Landscape

| Solution | What it does | What it lacks |
|----------|-------------|---------------|
| Traditional brokers | Manual document prep | No cryptographic proof, no real-time verification |
| eFTI platforms (upcoming) | Document exchange | No evidence layer, no dispute resolution |
| Telematics (Samsara, Geotab) | GPS tracking | No signed evidence, no SLA engine, no border focus |
| Chainlink oracles | Data feeds | No logistics-specific evidence, no eFTI compliance |
| In-house solutions | Custom internal tools | High cost, no inter-carrier standard, no cryptographic verification |

**LogiQED advantage:** Only solution that combines signed GPS events, temperature logs, eFTI-ready EPCIS events, and cryptographic dispute resolution in one package.

---

## Revenue Model

| Tier | Price per pack | Routes/mo | Pack revenue/mo | Pack revenue/yr |
|------|---------------|-----------|-----------------|-----------------|
| Starter | $0.10 | 100 | $10 | $120 |
| Growth | $0.08 | 500 | $40 | $480 |
| Enterprise | $0.05 | 2,000 | $100 | $1,200 |

Additional revenue streams:

- API access: **$500/month** per broker
- eFTI platform integration: **$2,000–5,000** one-time setup
- Premium SLA monitoring: **$50/month** per vehicle

Realistic revenue per broker-client:

| Client type | API | Packs/mo | SLA monitoring | Total/mo |
|-------------|-----|----------|----------------|----------|
| Small broker | $500 | 100 ($10) | - | **$510** |
| Mid broker | $500 | 500 ($40) | - | **$540** |
| Enterprise | $500 | 2,000 ($100) | 10 vehicles ($500) | **$1,100** |

At 20 broker-clients (mixed): **~$15K MRR → ~$180K ARR** - realistic Year 1 target.

---

## Target Customer

- Mid-sized carriers operating cross-border routes in the EU
- Customs brokers who prepare documentation for multiple carriers
- eFTI platforms looking for verified event sources

---

## Research Tasks

| # | Question | Who to ask | Deadline |
|---|----------|-----------|----------|
| 1 | Which documents are required at borders: CMR, TIR, EX-1? | Customs broker (existing contact) | Week 1 |
| 2 | Does eFTI require eIDAS signature on events or packages? | eFTI regulatory working group | Week 2 |
| 3 | Is NCTS integration required for EU transit? | IT contact at a customs agency | Week 2 |
| 4 | Who is the first pilot partner - carrier or broker? | Existing network | Week 3 |
| 5 | What is the legal weight of a signed Evidence Package in EU transport law? | Legal counsel | Week 4 |

---

## Strategic Questions (post-research)

1. Should Border Ready Pack be a separate product or a feature of Evidence Package?
2. Do we build customs broker integrations in-house or via API partners?
3. Is there a market for pre-eFTI compliance, or wait for the 2027 mandate?

---

## Phases

### Phase 1 - Research

- Answer open questions
- Identify pilot partner
- Validate legal framework

### Phase 2 - Pilot

- One carrier with cross-border routes
- Generate Border Ready Pack for every route
- Send to broker
- Measure: does the border crossing get faster?

### Phase 3 - Partnership

- Integration with an eFTI platform
- Integration with a customs broker
- Pack accepted automatically

### Phase 4 - Scale

- Pack recognized by insurers
- Pack used in border dispute resolution
- 500+ routes/month

---

## Timeline

> **Note:** Timeline assumes MVP funding secured (Q4 2026).

| Phase | Duration | Prerequisite | Output |
|-------|----------|-------------|--------|
| Research | 4 weeks | None | Answered questions, pilot partner identified |
| Pilot | 2–4 weeks | MVP ready | 50+ routes with Border Ready Pack |
| Partnership | 2–3 months | Pilot success | Integration with eFTI platform or broker |
| Scale | 6+ months | Partnership | 500+ routes/month, revenue positive |

---

## Connection to Core Evidence Layer

Border Ready Pack is **not a new module** - it's a **view** on existing evidence.

| Component | Reuses | Changes needed |
|-----------|--------|---------------|
| Route Proof | Signed event stream, Evidence Root | None |
| Temperature Log | Signed event stream, trust levels E0–E5 | None |
| eFTI Events | EPCIS 2.0 event model, canonicalization | Add eIDAS signature wrapper |
| Border Summary | Evidence Package, canonicalization | New template, no new logic |

**Development effort: 2–3 weeks.** Not months. The core is already built.

---

## Open Questions

1. Does the pack actually reduce border time, or just improve dispute resolution?
2. Will customs authorities accept pre-arrival evidence, or is it only for the broker?
3. What is the legal weight of signed evidence in EU transport law?
4. Is eIDAS signature on events sufficient, or does the full package need it?

---

## Related

- [Research Overview](README.md)
- [Architecture](../../ARCHITECTURE.md)
- [Evidence Package](../../EVIDENCE.md)