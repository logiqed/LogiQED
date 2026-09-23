# LogiQED - Pitch

## One Line

LogiQED is the cryptographic evidence layer for physical logistics. Disputes close on evidence, not on negotiation.

---

## Problem

SLA disputes in freight cost $200-500 per case: lawyers, time, lost customers.

Paper evidence is weak. Coordination is slow. Disputes close by negotiation, not by data.

---

## Solution

LogiQED turns telemetry and trip events into signed Evidence Packages.

A truck arrives at the warehouse. Geofence entry 11:54. Dock assignment 13:02. Loading start 13:18. Warehouse exit 14:11.

Waiting for dock: 68 minutes. Warehouse attributable: 68 minutes. Carrier attributable: 0 minutes.

Target: the dispute closes in 12 minutes instead of 2 days.

---

## How It Works

1. **Signed Event Stream** - devices and APIs produce authenticated events.
2. **Trust Levels E0-E5** - server evaluates own assurance, not client-supplied.
3. **SLA Engine** - deterministic rules with working calendars and exception attribution.
4. **Evidence Builder** - produces Evidence Package Base on claim close, Trip Evidence Root on route close, Evidence Package Full on dispute request.
5. **Anchoring** - Trip and Claim Evidence Roots are anchored in Arweave.
6. **Verification** - any party checks without raw telemetry.

Three levels of evidence are produced:

- **Clean route** - signed events + Trip Evidence Root + Arweave anchor.
- **Incident** - Evidence Package Base + Claim Evidence Root anchor. Confirmed or rejected.
- **Disputed** - retroactive corroboration + ZK proof + new anchor.

ZK proof is generated only on dispute request, and only when the claim level is E3 or higher.

---

## First Two Claims

### Detention / Warehouse Waiting

Appointment 12:00, geofence entry 11:54, dock assignment 13:02, loading start 13:18, exit 14:11.

Result: warehouse attributable 68 minutes.

### Cargo Condition

Contract 2-8°C, EU lane, temperature stayed in range.

Result: VALID.

---

## Market

- eFTI regulation effective 9 July 2027
- Target: mid-sized carriers with temperature-sensitive or time-critical freight
- One Evidence Package Full costs about $0.08
- Trip anchor for every route costs close to zero
- One SLA dispute costs $200-500

---

## Business Model

| Plan | Who | Price |
|------|-----|-------|
| Starter | Small carrier, 1-3 vehicles | $0 base + $0.15/package |
| Pro | Mid carrier, 10-100 vehicles | $99/mo + $10/vehicle + $0.08/package |
| Enterprise | Logistics network | Custom + $0.05/package |

Value scales with freight volume, not with UI users.

---

## Why Now

From 9 July 2027, EU authorities must accept regulatory freight information submitted electronically through certified eFTI platforms.

LogiQED is positioned as evidence infrastructure on top of eFTI.

---

## Team

Senior engineering team from Ukraine.

- [Borys Mulev](https://www.linkedin.com/in/borysmulev/) - Senior C#/.NET Engineer
- [Volodymyr Marenych](https://www.linkedin.com/in/marenich/) - Senior Engineer

15+ years in C# / .NET across multiple domains. Worked together on several production systems.

Planned MVP delivery team: up to 8 contributors across .NET, C++, QA, DevOps, and product management.

Full resumes available on request under NDA.

---

## Status

Blueprint public. Demo available. Looking for pilot partners.

Source code is private. Access after NDA.

---

## Next Step

Pilot with one European carrier. 3-5 vehicles, 50+ trips, one dispute closed.

Evidence Package Base produced for every claim. Trip Evidence Root anchored for every route.

---

## Contact

Email: contact@logiqed.tech

- [X / Twitter](https://x.com/LogiQED)
- [GitHub](https://github.com/logiqed/LogiQED)

Domain: logiqed.tech

---

## More

- [Investor Document](INVESTORS.md) - deal options and budget
- [Business Model](BUSINESS_MODEL.md) - pricing and economics
- [MVP](MVP.md) - 16-week plan
- [Pilot](PILOT.md) - proving value with real trucks
- [Platform](PLATFORM.md) - full platform details