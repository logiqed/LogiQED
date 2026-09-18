# LogiQED Demo Access

Interactive demo of the LogiQED platform.

**URL:** https://demo.logiqed.tech/login

No signup required. Credentials are provided below.

---

## What You Can Do

The demo is the working system, not a mockup.

- Log in as any of six roles
- Open Evidence Packages
- Verify signed events, Evidence Root, rule digest, trust policy result, proof reference
- Run the full flow: driver reports incident -> dispatcher confirms -> SLA pauses -> Evidence Package generated -> auditor verifies

The auditor view is the strongest demo — it shows independent verification of the package without access to raw telemetry.

---

## Credentials

| User | Password | Role | Access |
|------|----------|------|--------|
| administrator@test.local | 1qazXSW@ | Administrator | Main, Administration, Telemetry Devices |
| sla.analyst@test.local | 1qazXSW@ | SLA Analyst | Main, SLA |
| dispatcher@test.local | 1qazXSW@ | Dispatcher | Main, Incidents, Resources, Notifications, Workflow |
| driver@test.local | 1qazXSW@ | Driver | Main, Incidents, My Position |
| shift.supervisor@test.local | 1qazXSW@ | Shift Supervisor | Main, Incidents, Shift Handover, Resources, Org Structure |
| auditor@test.local | 1qazXSW@ | Auditor | Main, Incidents, Audit Journal |

Six seeded roles show how navigation and permissions are generated rather than hardcoded. Each account sees a different application.

---

## Recommended Flow

**For the auditor view** (strongest demo):

1. Log in as auditor@test.local
2. Open "Evidence Packages" from the main menu
3. Open any package → Package View
4. Click "Verify" — every check returns PASS, FAIL, or SKIP

**For the full incident flow:**

1. Log in as driver@test.local
2. Report an incident from the mobile view
3. Log in as dispatcher@test.local
4. Confirm the incident
5. Open Evidence Packages — a new package has been generated
6. Log in as auditor@test.local and verify it

---

## Notes

- This is a demo environment. All data is synthetic.
- The architecture is designed for real signed events from attested hardware — that's what the pilot stage covers.
- No personal data. No live telemetry.
- For a guided walkthrough with your own scenario, contact contact@logiqed.tech — we run live demos for pilot partners and investors.

---

## Related

- [README](README.md) — project overview
- [Architecture](ARCHITECTURE.md) — technical foundation
- [Investor Memorandum](INVESTORS.md) — capital allocation and deal options