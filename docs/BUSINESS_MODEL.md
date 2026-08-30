# Business Model

## Problem

SLA disputes in logistics are slow, expensive, and subjective.

A single dispute can cost a carrier $200–500 in legal fees, staff time, and lost client trust.

## Solution

LogiQED turns telemetry and trip events into signed Evidence Packages.

A dispute closes by math in minutes, not by email threads over weeks.

## Pricing

Pricing follows industry habits: a base platform fee plus a per-vehicle component, and a per-evidence package fee.

| Plan | Who | Price | Includes |
|------|-----|-------|----------|
| Starter | Small carrier, 1–3 vehicles | $0 base + $0.15/package | Up to 100 packages/month |
| Pro | Mid carrier, 10–100 vehicles | $99/month + $10/vehicle + $0.08/package | Up to 5,000 packages, priority verification |
| Enterprise | Logistics network, 100+ vehicles | Custom base + $0.05/package | API, dedicated SLA, support |

Example: a carrier with 20 vehicles pays $99 + $200 = $299/month base, plus $0.08 per package.

## Unit Economics

### Pro: mid-sized carrier, 20 vehicles, 5,000 routes/month

| Metric | Value |
|--------|-------|
| ARPU | $299 + (5,000 × $0.08) = $699/month |
| Fixed COGS | $50/month infrastructure and support |
| Variable COGS | $0.01 per package ZK verification + $0.005 per package archive |
| Total COGS | $50 + (5,000 × $0.015) = $125/month |
| Gross margin | ~82% |
| CAC | ~$200 |
| Payback period | Under 1 month |

### Enterprise: 200 vehicles, 50,000 routes/month

| Metric | Value |
|--------|-------|
| ARPU | $2,000 + (50,000 × $0.05) = $4,500/month |
| Total COGS | $250 + (50,000 × $0.015) = $1,000/month |
| Gross margin | ~78% |

Cost per evidence package is approximately $0.01–0.03.

Sale price per package is $0.05–0.15 depending on plan.

Gross margin per package is 70–85%.

## Why Pricing Works

A single SLA dispute costs $200–500.

One Evidence Package costs $0.08–0.10.

One won dispute pays for several months of Pro subscription.

The pain is orders of magnitude larger than the price.

## Customer Segments

| Segment | Pain | Readiness to pay | Priority |
|---------|------|------------------|----------|
| Mid-sized carriers, 10–100 vehicles | SLA disputes, penalties, manual evidence | High | First |
| Shippers | SLA transparency, automated reporting | Medium | Second |
| Insurers | Incident investigation | High but slow sales cycle | Third |
| Freight forwarders | Integration and reporting | Medium | Later |

MVP focus: mid-sized carriers with temperature-sensitive or time-critical freight.

## Why TMS Platforms Are Partners, Not Competitors

TMS platforms such as Trans.eu and CargoWise handle operations: tracking, documents, reporting.

They do not provide cryptographic evidence, ZK proofs, or post-quantum signatures.

LogiQED integrates with TMS via API, adding a proof layer on top of their operational data.

This creates a channel, not a conflict.

## Sales Channels

- Direct sales: LinkedIn, Transport Logistic, LogiMAT.
- Partnerships: TMS integrations such as Trans.eu, CargoWise; telematics platforms such as Wialon.
- Product-led growth: free Starter tier, upsell to Pro.

Sales funnel target: 100 leads, 20 demos, 5 pilots, 2 paying clients.

## Competitive Advantage

A single Evidence Package costs about $0.08.

That is cheaper than an SMS and thousands of times cheaper than one dispute.

A client recovers the Pro subscription on the first resolved dispute.

No TMS provider offers ZK-backed, post-quantum-ready evidence infrastructure.

## Cost Structure

- R&D: 60%
- Sales and Marketing: 25%
- Infrastructure: 10%
- Administrative: 5%

## Pilot KPIs

| Metric | Target |
|--------|--------|
| Pilot carriers | 5–10 |
| Evidence Packages processed | 50,000 |
| ARPU | $300/month |
| Disputes resolved without legal | 90%, stretch 100% for clear SLA breaches |
| NPS | Above 40 |

## Why Now

From 9 July 2027, EU eFTI requires electronic freight transport information for regulatory acceptance.

eFTI standardizes document formats but does not solve data trust.

LogiQED adds the proof layer: who did what, when, and with what evidence.

When a dispute arises about delay or damage, there is cryptographic proof, not just a document.

## Long-Term

Phase 1: eFTI compliance tooling, 2026–2027. Target: 100 clients, 1M packages.

Phase 2: Insurance API integrations, 2027–2028. Target: 5 insurance partners.

Phase 3: Trust marketplace on top of the evidence graph, 2028+.

## Principle

Verifiable freight infrastructure scales with freight volume, not with users.