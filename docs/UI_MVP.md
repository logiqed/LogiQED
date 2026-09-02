# LogiQED UI - MVP Screens

Full product screens beyond the investor demo.

See [UI_DEMO.md](UI_DEMO.md) for the 20 demo screens.

---

## MVP Screens

These screens are part of MVP but not shown in the demo.

### DISPATCHER

21. Workflow Diagram - visual lifecycle diagram.
22. Goods Turnover - goods movement management.

### SHIFT_SUPERVISOR

23. Appeals & Shift Handover - shift handover journal and incident registry.

### AUDITOR

24. Appeals Analytics - analytics for SLA breaches and dispute dynamics.

### ADMIN

25. Org Structure - organizational chart.

---

## Roles

Roles are fully configurable in the admin panel. Any role can be created with any set of permissions.

Chat is available for all roles.

### DISPATCHER

Shipment registry, operational map, workflow management, Driver Incident Reports, chat, notifications. Creates routes and assigns drivers.

### DRIVER

Mobile interface, own trips, telemetry, status updates, chat with dispatcher. Own documents only.

### SLA_ANALYST

SLA policies, working calendars, holiday sets, Driver Incident Reports. Analytics and metrics.

### AUDITOR

Audit journal, reports, SLA compliance, Driver Incident Reports. Read-only access.

### SHIFT_SUPERVISOR

Deadline control, escalations, team management. Shift handovers.

### ADMIN

User, role and permission management. Access rules and endpoint configuration. Audit journal access.

---

### 21 Workflow Diagram

Visual lifecycle diagram.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | SLA | Telemetry | Chat         | 🔔 [EN] [Operator]                        |
+---------------------------------------------------------------------------------------------------------------------------------+
| Workflow > Workflow Diagram                                                             [ Fit to screen ] [ 100% ] [ 🔍 ] [ 📤 ]|
+---------------------------------------------------------------------------------------------------------------------------------+
| Mode: [✓] System transitions   [ ] Reject loops                    | Selected Schema: VERIFIABLE_FREIGHT_CORRIDOR               |
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                           [ New Created ]                                                       |
|                                                      (eFTI Document & Schema Init)                                              |
|                                                                    │                                                            |
|                                             ┌──────────────────────┴──────────────────────┐                                     |
|                                             │ Accept                                      │ Reject                              |
|                                             ▼                                             ▼                                     |
|                                     [ 🟦 Accepted ]                             [ 🟥 Rejected (Final) ]                         |
|                                             │                                             (Penalty Applied)                     |
|                                             │ Next work                                                                         |
|                                             ▼                                                                                   |
|                                     [ 🟧 In progress ] <----------------------- [ 🟩 Completed ]                                |
|                                     (Telemetry Active E4-E5)                   (SLA Met / Evidence Packed)                      |
|                                             │                                             ▲                                     |
|                                             │ Resolve                                     │ Complete                            |
|                                             └──────────────────────┬──────────────────────┘                                     |
|                                                                    │                                                            |
|                                                                    ▼                                                            |
|                                                              [ 🟫 Closed ]                                                      |
|                                                            (Immutable Archive)                                                  |
+---------------------------------------------------------------------------------------------------------------------------------+
```
### 22. Goods Turnover

Goods movement management.

```text

+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Goods Turnover | Telemetry | Chat     | 🔔 [EN] [Operator]                 |
+---------------------------------------------------------------------------------------------------------------------------------+
| Infrastructure > Goods Turnover                                                            [ 🛒 Create Document ]               |
| Goods movement by documents: receipts, issues, transfers and write-offs with approval, posting and a turnover sheet             |
+---------------------------------------------------------------------------------------------------------------------------------+
| Tabs: [ Receipts ] [ Issues ] [ Turnover Sheet ]                                                                                |
+---------------------------------------------------------------------------------------------------------------------------------+
| 📄 Documents                                   | 🔄 Transfers Between Warehouses          | 📊 Reporting                        |
| Goods turnover document journals, drafts,      | Moving goods between warehouses in a     | Turnover sheet by warehouses and    |
| approval, posting, reversal and cancellation.  | single operation or in two phases.       | materials for a specified period.   |
| • Pending creates stock movements              | • Transit warehouse support              | • Data built from posted documents  |
| • Approval configured for document kind        | • Tracked via eFTI / ZK-proof            |                                     |
| [ Receipts ] [ Issues ] [ Write-offs ]         | [ Transfers ] [ In transit ]             | [ Turnover Sheet ]                  |
+---------------------------------------------------------------------------------------------------------------------------------+
| 📚 Dictionaries                                                                                                                 |
| Settings used by goods turnover documents: [ Write-off Reasons ]                                                                |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 23. Appeals & Shift Handover

Shift handover journal and incident registry.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | SLA | Shift Handover | Chat       | 🔔 [EN] [Operator]                     |
+---------------------------------------------------------------------------------------------------------------------------------+
| Shift Handover Record > View: SHP-20260821-C0000001                                    [ Accept the shift ] [ Cancel ] [ Close ]|
+---------------------------------------------------------------------------------------------------------------------------------+
| Number: SHP-20260821-C0000001    | Status: 🟠 Handed over    | Handed over by: Anna Rudenko                                     |
| Handed over: 21.08.2026 21:46:03 | Night shift: 21.08.2026 09:48:00 - 21.08.2026 21:46:03                                       |
| Comment: Shift handover completed. Incidents and pending items checked for each container.                                      |
+---------------------------------------------------------------------------------------------------------------------------------+
| Carry-over appeals / Active Incidents (Search by number or address...)                                                          |
+---------------------------------------------------------------------------------------------------------------------------------+
| ID & Details                                                                                         | Actions                  |
+---------------------------------------------------------------------------------------------------------------------------------+
| • GAS-20260725-00000001 🟣 Completed   🔴 Shift handovers: 2                                         | [ Open the appeal ]      |
|   Registered: 25.07.2026 09:57:00 · Geofence: Berlin Warehouse                                       | [ Resolve the status ]   |
|   Shift comment: Crew on site, work in progress. Supervisor decision: No decision yet                |                          |
+---------------------------------------------------------------------------------------------------------------------------------+
| • GAS-20260725-00000002 🟣 In progress   🔴 Shift handovers: 1                                       | [ Open the appeal ]      |
|   Registered: 26.07.2026 14:14:00 · Geofence: Warsaw Queue                                           | [ Resolve the status ]   |
|   Shift comment: Waiting for materials from maintenance team. Supervisor decision: Pending           |                          |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 24. Appeals Analytics

Analytics for SLA breaches and dispute dynamics.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Analytics | Telemetry | Chat       | 🔔 [EN] [Operator]                    |
+---------------------------------------------------------------------------------------------------------------------------------+
| Appeals Analytics — SLA Breaches & Dispute Dynamics                                      [ 7 days ] [ 30 days ] [ Export ]      |
+---------------------------------------------------------------------------------------------------------------------------------+
| [ Reaction SLA breached: 7 ]  | [ Resolution SLA breached: 10 ] | [ Reaction SLA met: 76.67% ] | [ Resolution SLA met: 66.67% ] |
| 🔴 First reaction: 25.35%     | 🔴 Fallback level: 32.55%       | 🟢 +8.34 pp vs last period   | 🟢 +13.38 pp vs last period    |
+---------------------------------------------------------------------------------------------------------------------------------+
| [ Currently overdue: 12 ]     | [ Average reaction: 6h 23m ]    | [ Average resolution: 16h 15m]| [ P90 reaction: 1d 1h ]       |
| ⚠️ Current state of open cases| 📉 -130.20 min (-38.88%)        | 📉 -118.60 min (-12.22%)     | 📉 -91.20 min (-8.76%)         |
+---------------------------------------------------------------------------------------------------------------------------------+
| SLA Breaches by Period (Comparison of first reaction and full resolution)                                                       |
|   (Bar chart visualization showing peaks on days 12, 18, 21 with breakdown by Reaction vs Resolution breaches)                  |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 25. Org Structure

Organizational chart.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Org Structure | Telemetry | Chat     | 🔔 [EN] [Operator]                  |
+---------------------------------------------------------------------------------------------------------------------------------+
| Org Structure > Org Chart                                                                  [ 🔍 ] [ 100% ] [ ⚙️ ] [ 💾 PNG ]    |
+---------------------------------------------------------------------------------------------------------------------------------+
| ⚠️ Without a head: Administration, Sector №1, Sector №2, Technical Department                                                   |
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                   [ 🏢 Head Office ]                                                            |
|                                                   Admin Administrator                                                           |
|                                                   1 employee                                                                    |
|                                                                │                                                                |
|                         ┌──────────────────────────────────────┼──────────────────────────────────────┐                         |
|                         │                                      │                                      │                         |
|             [ 🏛️ Administration ]                 [ 🎧 Dispatch Service ]               [ ⚙️ Technical Dept. ]                  |
|             0 employees                            Victoria Weber                         0 employees                           |
|                                                                │                                                                |
|                                          ┌─────────────────────┴─────────────────────┐                                          |
|                                          │                                           │                                          |
|                               [ 🏭 Sector №1 ]                          [ 🏭 Sector №2 ]                                        |
|                               15 employees                              15 employees                                            |
+---------------------------------------------------------------------------------------------------------------------------------+
```

---

## Related

- [UI_DEMO.md](UI_DEMO.md) - 20 screens shown in the investor demo
- [ARCHITECTURE.md](ARCHITECTURE.md) - system architecture
- [AUTHORIZATION.md](AUTHORIZATION.md) - roles and permissions model