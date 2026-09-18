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
- Run the full flow: driver reports incident → dispatcher confirms → SLA pauses → Evidence Package generated → auditor verifies

The auditor view is the strongest demo — it shows independent verification of the package without access to raw telemetry.

---

## Credentials

All demo accounts use the same password pattern.

| Role | Email | Password |
|------|-------|----------|
| Super Administrator | admin@test.local | P@ssw0rd! |
| Administrator | administrator@test.local | 1qazXSW@ |
| SLA Analyst | sla.analyst@test.local | 1qazXSW@ |
| Dispatcher | dispatcher@test.local | 1qazXSW@ |
| Driver | driver@test.local | 1qazXSW@ |
| Shift Supervisor | shift.supervisor@test.local | 1qazXSW@ |
| Auditor | auditor@test.local | 1qazXSW@ |

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

- All data is synthetic. The demo runs on simulated evidence data.
- The architecture is designed for real signed events from attested hardware — that's what the pilot stage covers.
- No personal data. No live telemetry.
- Live walkthroughs available on request: contact@logiqed.tech

---

## Related

- [README](../README.md) — project overview
- [Architecture](ARCHITECTURE.md) — technical foundation
- [Investor Memorandum](INVESTORS.md) — capital allocation and deal options