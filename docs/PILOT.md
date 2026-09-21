# Pilot Plan

## Goal

Prove that LogiQED produces trustworthy evidence and settles a real commercial dispute.

## Position in the Delivery Program

The pilot is the final phase of MVP delivery, not a separate project.

| Phase | Weeks | Focus |
|-------|-------|-------|
| MVP delivery | 1-13 | Build the system |
| Pilot preparation | 10-12 | Partner search, hardware, legal review |
| Pilot execution | 13-16 | Real trips, evidence, dispute |

The pilot overlaps with the last weeks of MVP. This is intentional - the system is validated against real data before MVP acceptance.

See [MVP Plan](MVP.md) for the full program.

## Scope

- Partner: mid-sized carrier with 10-50 vehicles who faces SLA penalties and needs verifiable evidence.
- Hardware: 3-5 GPS trackers, 2-3 temperature sensors.
- Period: 4 weeks of real trips after integration.
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
   - Committed measurements from E4 sources stayed within 2-8°C.

## Route Monitoring

- Route State Machine tracks every trip.
- TrafficEntered pauses SLA.
- TrafficExited resumes SLA.
- External API calls happen only when an incident occurs.

## Success Criteria

**Must have:**

- 3 or more vehicles and 50 or more trips with signed events.
- Route State Machine reacts to TrafficEntered and TrafficExited.
- SLA engine resolves exceptions automatically.
- Two claims verified end-to-end with mock proof backend.
- Evidence Package exported for external review and accepted by pilot partner as valid evidence.

**Shared goal with pilot partner:**

- At least one real commercial dispute settled or prepared for settlement using the Evidence Package.
- Case study documenting the outcome and the pilot partner's feedback.

Dispute closure depends on the pilot partner's commercial situation, not only on the system. It is treated as a shared goal, not a one-sided commitment.

### Before and After

| Metric | Before | After |
|--------|--------|-------|
| Time to resolve dispute | 2 days, 8 emails, 3 PDFs, 2 calls | Target: 12 minutes |
| Dispatcher hours per dispute | 4-8 hours | 15 minutes |
| Cost per dispute | $200-500 | $0.08 per Evidence Package |
| Transparency | Low | Full, Evidence Root, signature, anchor |

## Budget

Pilot costs are part of the MVP non-engineering budget, covered in the [Investor Memorandum](INVESTORS.md).

| Item | Estimate |
|------|----------|
| GPS trackers, 3-5 | $300-500 |
| Temperature sensors, 2-3 | $150-300 |
| Traffic and Weather API | $0-100 |
| Partner compensation, optional | $0-1500 |
| Legal review of evidence admissibility | $5,000-$10,000 |

Total: approximately $5,500-$12,500 within the MVP non-engineering budget.

The legal review is the largest item. It is part of the non-engineering budget in [MVP](MVP.md).

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

The pilot overlaps with the last weeks of MVP delivery.

| Weeks | Focus | Output |
|-------|-------|--------|
| 1-2 | Preparation | Partner found, NDA signed, hardware installed, legal review completed |
| 3-6 | Integration | Data flowing, route state machine working, Evidence Root publishing daily |
| 7-10 | Claims | Detention and Cargo Condition verified end-to-end |
| 11-14 | Pilot | 50 or more trips, at least one dispute prepared for settlement |
| 15-16 | Report | Case study, metrics, legal assessment |

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

## Next Step

Find the first pilot partner: a mid-sized carrier with 10-50 vehicles who faces SLA penalties.

Long-term pilot partners: shippers, 3PLs, insurers, and freight forwarders who make or influence penalty decisions.

Expected effect: pilot proves a dispute closes in minutes instead of days, with evidence admissible in court.

---

## Related

- [MVP Plan](MVP.md) - full delivery program
- [Investor Memorandum](INVESTORS.md) - capital allocation and non-engineering budget
- [Evidence Package](EVIDENCE.md) - package structure and verification
- [Trust Levels](TRUST_LEVELS.md) - source assurance E0-E5