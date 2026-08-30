# Pilot Plan

## Goal

Prove that LogiQED produces trustworthy evidence and settles a real commercial dispute.

## Scope

- Partner: carrier with 10–50 vehicles or a 3PL that pays penalties for delays or transports temperature-sensitive freight.
- Hardware: 3–5 GPS trackers, 2–3 temperature sensors.
- Period: 2–4 weeks of real trips after integration.
- Location: EU lane.

## Data Sources

- Smartphone GPS for the driver
- Temperature sensor for cargo condition
- Traffic API, called only on incident
- Weather API, called only on incident
- Warehouse geofence events

## Claims to Prove

1. Detention / Warehouse Waiting Claim
   - Appointment, geofence entry, dock assignment, loading start, exit.
   - Warehouse attributable waiting, carrier attributable 0.

2. Cargo Condition Claim
   - Committed measurements from E4 sources stayed within 2–8°C.

## Route Monitoring

- Route State Machine tracks every trip.
- TrafficEntered pauses SLA.
- TrafficExited resumes SLA.
- External API calls happen only when an incident occurs.

## Success Criteria

Must have:

- 3 or more vehicles and 50 or more trips with signed events.
- Route State Machine reacts to TrafficEntered and TrafficExited.
- SLA engine resolves exceptions automatically.
- Two claims verified end-to-end with mock proof backend.
- Evidence Package exported for external review, accepted by pilot partner, and documented for potential legal challenge.

Stretch:

- At least one real commercial dispute settled using Evidence Package instead of the legacy manual process.

### Before and After

| Metric | Before | After |
|--------|--------|-------|
| Time to resolve dispute | 2 days, 8 emails, 3 PDFs, 2 calls | 12 minutes |
| Dispatcher hours per dispute | 4–8 hours | 15 minutes |
| Cost | $500–2000 | $5–10 |
| Transparency | Low | Full, Evidence Root, signature, anchor |

## Budget

| Item | Estimate |
|------|----------|
| GPS trackers, 3–5 | $300–500 |
| Temperature sensors, 2–3 | $150–300 |
| Traffic and Weather API | $0–100 |
| Partner compensation, optional | $0–1500 |

Total: $500–2500. Not included in MVP budget.

## Team and Responsibilities

| Role | Tasks |
|------|-------|
| Technical Lead, Senior .NET | Integration, route state machine, evidence pipeline |
| Data Engineer | MS SQL, deduplication, metrics, exports |
| C++ Engineer | Proof backend, performance |
| QA Engineer | Testing, validation |
| DevOps | CI/CD, monitoring, alerts, environments |
| Account Manager or Founder | Partner search, NDA, hardware installation, coordination |

## Legal and Compliance

- NDA signed before data exchange.
- EU pilot follows GDPR.
- Driver data used only within pilot scope and deleted after.
- Reports contain anonymized aggregates only.
- Evidence Layer follows eIDAS standards for electronic signatures.
- Evidence Root is published daily to an open registry, such as Ethereum testnet, for external verification.
- Independent third party reviews Evidence Root and signatures at each pilot milestone.
- Legal expert validates evidence admissibility before pilot launch.

## Pilot Timeline

Pilot overlaps with the last weeks of MVP.

| Weeks | Focus | Output |
|-------|-------|--------|
| 1–2 | Preparation | Partner found, NDA signed, hardware installed, legal review completed |
| 3–6 | Integration | Data flowing, route state machine working, Evidence Root publishing daily |
| 7–10 | Claims | Detention and Cargo Condition verified end-to-end |
| 11–14 | Pilot | 50 or more trips, at least one dispute closed |
| 15–16 | Report | Case study, metrics, legal assessment |

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Connectivity lost during trip | Device buffers locally, uploads later |
| GPS inaccurate at warehouse | Geofence and timestamp cross-check |
| Sensor not calibrated | Verify sensor documentation before pilot |
| Partner uses legacy system | Manual fallback during pilot |
| Legal or regulatory delay in eFTI | Focus on voluntary SLA disputes first |
| Court does not recognize evidence | eIDAS-compliant signatures, legal review before pilot, third-party verification |

## Deliverables

- Signed Event Stream
- Evidence Graph for each trip
- Evidence Packages for Detention and Cargo Condition
- Benchmarks for proof generation
- Pilot report with case study
- Legal assessment of evidence admissibility
- Optional: Lean 4 formal proof for one claim rule, research only

## Next Step

Find pilot partner: shipper, 3PL, insurer or freight forwarder who makes penalty or payout decisions.

Expected effect: pilot proves a dispute closes in 12 minutes instead of 2 days, with evidence admissible in court.