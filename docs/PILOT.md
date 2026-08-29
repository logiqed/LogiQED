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

- 3 or more vehicles and 50 or more trips with signed events.
- Route State Machine reacts to TrafficEntered and TrafficExited.
- SLA engine resolves exceptions automatically.
- Two claims verified end-to-end with mock proof backend.
- At least one real commercial dispute settled using Evidence Package instead of the legacy manual process.

### Before and After

| Metric 				  | Before                            | After                                  |
|-------------------------|-----------------------------------|----------------------------------------|
| Time to resolve dispute | 2 days, 8 emails, 3 PDFs, 2 calls | 12 minutes                             |
| Cost 					  | $500–2000 						  | $5–10                                  |
| Transparency 			  | Low                               | Full, Evidence Root, signature, anchor |

## Budget

| Item 							 | Estimate  |
|--------------------------------|-----------|
| GPS trackers, 3–5 			 | $300–500  |
| Temperature sensors, 2–3 		 | $150–300  |
| Traffic and Weather API 		 | $0–100    |
| Partner compensation, optional | $0–1500   |
| Total 						 | $500–2500 |

## Team and Responsibilities

| Role 						  | Tasks 													  |
|-----------------------------|-----------------------------------------------------------|
| Technical Lead, Senior .NET | Integration, route state machine, evidence pipeline       |
| Data Engineer 	          | MS SQL, deduplication, metrics, exports                   |
| DevOps 				      | CI/CD, monitoring, alerts, environments                   |
| Account Manager or Founder  | Partner search, NDA, hardware installation, coordination  |

## Legal and Compliance

- NDA signed before data exchange.
- EU pilot follows GDPR.
- Driver data used only within pilot scope and deleted after.
- Reports contain anonymized aggregates only.

## Pilot Timeline

| Weeks | Focus 	  | Output 											  |
|-------|-------------|---------------------------------------------------|
| 1–2   | Preparation | Partner found, NDA signed, hardware installed 	  |
| 3–6   | Integration | Data flowing, route state machine working 		  |
| 7–10  | Claims      | Detention and Cargo Condition verified end-to-end |
| 11–14 | Pilot       | 50 or more trips, at least one dispute closed     |
| 15–16 | Report      | Case study and metrics 					          |

## Risks and Mitigations

| Risk 							| Mitigation                                |
|-------------------------------|-------------------------------------------|
| Connectivity lost during trip | Device buffers locally, uploads later     |
| GPS inaccurate at warehouse   | Geofence and timestamp cross-check 		|
| Sensor not calibrated  	    | Verify sensor documentation before pilot  |
| Partner uses legacy system    | Manual fallback during pilot 				|

## Deliverables

- Signed Event Stream
- Evidence Graph for each trip
- Evidence Packages for Detention and Cargo Condition
- Benchmarks for proof generation
- Pilot report with case study
- Optional: Lean 4 formal proof for one claim rule, research only

## Next Step

Find pilot partner: shipper, 3PL, insurer or freight forwarder who makes penalty or payout decisions.

Expected effect: pilot proves a dispute closes in 12 minutes instead of 2 days.