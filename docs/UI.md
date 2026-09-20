# LogiQED UI

ASCII wireframes for the demo and full product.

## Roles Flexibility

Roles are fully configurable in the admin panel.

Any role can be created with any set of permissions. There are no hardcoded roles in the system.

Examples: Driver, Dispatcher, SLA Analyst, Auditor, Shift Supervisor, Administrator.

An Administrator can create a custom role with limited access to any combination of menus, backend endpoints and policies.

## UI Visibility

Navigation and screens are permission-driven.

Menu items are shown or hidden automatically based on the effective permissions of the current user.

If a role does not have permission for a module, the module is not shown in navigation and direct access is denied on the backend.

There is no fixed UI layout per role. The same platform adapts to each role automatically.

## Demo Scope

The demo shows the full flow: delay, exception, evidence and proof.

Chat is available for all roles.

Demo roles:

- ADMIN: Users, Roles, Permissions, Rules & Endpoints, Audit Journal, Chat
- SLA_ANALYST: SLA Overview, SLA Policy, Working Calendar, Driver Incident Reports, Chat
- DISPATCHER: Registry, Map, Workflow, Workflow Diagram, Evidence Packages, Package View, Dashboard, Notifications, Driver Incident Reports, Chat
- DRIVER: Mobile Driver View, Telemetry, Chat
- AUDITOR: Home (Executive Summary), Incidents (read-only), Evidence Packages, Trust sources, Audit Journal, Chat
- SHIFT_SUPERVISOR: Departments, Department kinds, Employees, Positions, Duty roster, Duty shifts, Org chart, Chat

The demo starts with DRIVER reporting a traffic incident. DISPATCHER confirms the report. System pauses SLA and generates Evidence Package. AUDITOR reviews the case.

SLA policy and users are pre-configured before the demo. ADMIN screens are shown only if the audience asks about role management.

> Demo data, proof values and attestation details are simulated for MVP presentation.

For live incident simulation, an optional remote console is available - see Demo Remote Console at the end of this document.

## Demo Screens

These screens are shown in the demo:

1. Driver Incident Reports
2. Incident View
3. Registry
4. Map
5. Evidence Packages
6. Package View
7. Dashboard
8. Mobile Driver View
9. Telemetry
10. SLA Overview
11. Edit SLA Policy
12. Edit Working Calendar
13. Workflow & Status Engine
14. Workflow Diagram
15. Notification Rules
16. Chat
17. Departments
18. Department Kinds
19. Employees
20. Positions
21. Duty Roster
22. Duty shifts
23. Org Chart
24. Administration Hub
25. Users Management
26. Roles
27. Permissions
28. Rules & Endpoints
29. Executive Summary (Auditor)
30. Audit Journal
31. Audit Record Details

## Short Demo

Core screens for a carrier conversation: 1–5. Seven minutes.

1. Driver Incident Reports - the result
2. Registry - the context
3. Map - the operation
4. Evidence Packages - all proofs across shipments
5. Package View - one package with ZK proof

Screens 6–31 are shown only if the audience asks.

---


## 1. Driver Incident Reports

Registry of all driver incident reports.

Each report shows trip, driver, reason, reported time, confirmed time, closed time, duration, status, evidence package and result.

Reasons: Traffic, Warehouse Queue, Geofence wait, Weather, Vehicle breakdown.

Status:

- Verifying - system checks the report.
- Confirmed - SLA paused, penalty 0.
- Rejected - SLA continued, penalty applied.
- Closed - driver closed the incident, SLA resumed.

Evidence Package is linked for every confirmed, rejected or closed case.

Used by SLA Analyst, Dispatcher and Auditor to review all exception situations.

```text
+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Driver incident reports                                                                                       	   | [ Excel (.xlsx) > ] [ 📥 Download ]     |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 🟢 30 Confirmed     |   🔴 4 Rejected     |   🟠 1 Verifying     |   🟢 88% Success rate                                        		                         |
+---------------------------------------------------------------------------------------------------------------------------------------0------------------------+
| Page size 20 > | [ Combine filters: AND / OR ] |                       		   	 [ 📊 Columns ] [ 🔄 Refresh ] [ ⚙️ Reset filters ] [ 🔀 Reset sorting ]     |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Trip         	  | Driver          |  Reason         |    Reported  |    Confirmed |    Closed    |    Duration |    Status   |    Evidence     |     Result    |
+-----------------+-----------------+-----------------+--------------+--------------+--------------+-------------+-------------+-----------------+---------------+
| SHP-20260901-07 | Brooks Daniel J.| Traffic         | 01.09.2026   | 01.09.2026   | 01.09.2026   | 0 min       | 🟢 Closed   | pkg_6e973c75a35a| 🟢 Penalty 0  |
| SHP-20260901-07 | Brooks Daniel J.| Vehicle breakdn | 01.09.2026   | -            | -            | -           | 🔴 Rejected | pkg_a4ea5b4b40d8| 🔴 Penalty app|
| SHP-20260901-07 | Brooks Daniel J.| Traffic         | 01.09.2026   | 01.09.2026   | 01.09.2026   | 2 min       | 🟢 Closed   | pkg_6ddcd7f77610| 🟢 Penalty 0  |
| SHP-20260831-08 | Nowicki Rafal P.| Geofence wait   | 01.09.2026   | -            | -            | 25 min      | 🟠 Verifying| -               | ⚪ Pending    |
| SHP-20260901-07 | Brooks Daniel J.| Traffic         | 01.09.2026   | 01.09.2026   | 01.09.2026   | 60 min      | 🟢 Closed   | pkg_d1ded753229f| 🟢 Penalty 0  |
| SHP-20260829-01 | Petrauskas D. J.| Warehouse queue | 30.08.2026   | 30.08.2026   | 30.08.2026   | 68 min      | 🟢 Closed   | -               | 🟢 Penalty 0  |
| SHP-20260829-05 | Melnyk Vadym Y. | Weather         | 30.08.2026   | 30.08.2026   | 30.08.2026   | 27 min      | 🟢 Closed   | pkg_f962281aabcc| 🟢 Penalty 0  |
| SHP-20260829-02 | Sorensen Lars E.| Geofence wait   | 30.08.2026   | 30.08.2026   | 30.08.2026   | 34 min      | 🟢 Closed   | -               | 🟢 Penalty 0  |
| SHP-20260829-06 | Costa Bruno Nun.| Vehicle breakdn | 29.08.2026   | 29.08.2026   | 30.08.2026   | 41 min      | 🟢 Closed   | pkg_0710430c797a| 🔴 Penalty app|
| SHP-20260829-03 | Balog Zoltan G. | Warehouse queue | 29.08.2026   | 29.08.2026   | 30.08.2026   | 48 min      | 🟢 Closed   | pkg_04d7035efdda| 🟢 Penalty 0  |
+-----------------+-----------------+-----------------+--------------+--------------+--------------+-------------+-------------+-----------------+---------------+
| Page 1 of 2 | 20 of 35 records                                                                                                  	         < [1] [2] >         |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

### 2. Incident View

Opened from Driver Incident Reports by clicking a trip.

Shows report details, review status, review rule with fingerprint, and review progress.

Buttons: Open the trip, Evidence package, Close.

```text
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Freight > Incidents > View > SHP-20260901-00000007                                                      	   	 | [EN] [🌙] [🔔] [ 👤 Foster Emily Rose ] |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Trip Incident                                                                                       	| [ Open the trip ] [ Evidence package ] [ Close ] |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| 🔽 Report                                                                                                                                                |
|   Trip           | SHP-20260901-00000007             | Reported             | 01.09.2026 22:21:09                                                        |
|   Driver         | Brooks Daniel James               | Reported by          | Brooks Daniel James                                                        |
|   Reason         | Traffic                           | Reported at location | 49.956000, 23.165000                                                       |
|   Duration       | 0 min                             |                      |                                                                            |
|   Reporter note  | zxc                               |                      |                                                                            |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| 🔽 Review                                                                                                                                                |
|   Status         | 🟢 Closed                         | Result               | 🟢 Penalty 0                                                               |
|   Confirmed      | 01.09.2026 22:21:19               | Reviewed by          | Harper Olivia Grace                                                        |
|   Rejected       | -                                 | Credited             | 0 min                                                                      |
|   Closed         | 01.09.2026 22:21:33               | Liable party         | External                                                                   |
|   Decision reason| -                                 |                      |                                                                            |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| 🔽 Review rule                                                                                                                                           |
|   Rule           | TRAFFIC_PAUSE_V1 v1                                                                                                                   |
|   Fingerprint    | 1014f937fe0ab5a2d8362a250331ff4105c0ee12c459c466a7f899ba91e92e37                                                   | [ 📋 Copy ]      |
|   *The code and version name the rule, the fingerprint proves its content was not swapped*                                                               |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| 🔽 Review progress                                                                                                                         [ 🟢 Closed ] |
|   [ Confirm ] [ Reject ] [ Close ]                                                                                                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
```

### 3. Registry

Freight registry with filters for active, delayed, exception and verified shipments.

```text
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                                                      | 🔔 [Operator] [EN]    |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Freight Registry                                                                                         | Export Evidence  |  Generate Report      |
| Filter: [ Active (24) ] [ Delayed (3) ] [ Exception (5) ] [ Verified (142) ]                             [ Search trip, hash, device... ] [ + New ] |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| ID      | Route              | Carrier        | Trust  | Status       | SLA Deadline      | Proof Status     | Workflow                             |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| SHP-802 | Berlin -> Warsaw   | TransLog Sp.   | 🟢 E4  | In Transit   | 22.08.2026 18:00 | 🔒 Evidence Ready| Created-Pickup-Transit-Delivered      |
| SHP-803 | Paris -> Lyon      | EuroFreight    | 🟡 E2  | Delayed      | 22.08.2026 14:30 | ⚠️ Exception     | Created-Pickup-Transit-•Delayed       |
| SHP-804 | Rotterdam -> Vienna| Apex Logistics | 🟢 E5  | Delivered    | 21.08.2026 19:15 | 🔒 Valid ZK      | Created-Pickup-Transit-Delivered      |
| SHP-805 | Madrid -> Valencia | Iberia Trans   | 🟠 E1  | Under Review | 22.08.2026 21:00 | ⏳ Proof Pending | Created-Pickup-•UnderReview           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                        [ Page 1 of 36 ] [<] [1] 2 3 [>]                                                             |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
```

### 4. Map

Operational control map with active trips queue, interactive map and selected trip details.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                    | 🔔 [Operator] [EN]                  |
+---------------------------------------------------------------------------------------------------------------------------------+
| Operational Control Map - eFTI Freight Corridor                                                                                 |
+---------------------------------------------------------------------------------------------------------------------------------+
| [Active Trips Queue (12)]      | [Interactive Map View]                                   | [Selected Trip Details]             |
| Filter: [All] [Delayed] [On Sch] |                                                          | -----------------------           |
|                                |   [Berlin Warehouse] 🏢                                  | Trip: TRK-42 (Berlin -> Warsaw)     |
| 🔴 TRK-42: Berlin - Warsaw     |       \                                                  | Driver: Hans Mueller                |
|    SLA breached by 42m         |        \                                                 |                                     |
|    Cause: 🚦 Traffic A-B       |         \..---..---..---. (Dashed Route)                 | Timeline:                           |
|                                |        (🔴 Red Zone: A-B Traffic)                        | Pickup -> Transit -> 📍 Current     |
| 🟢 TRK-19: Paris - Lyon        |                 \                                        |                                     |
|    SLA in 1h 12m               |                  \      🚛 [TRK-42]                      | SLA Rule: v3                        |
|                                |                   \     (+42m, Traffic A-B)              | Chargeable Delay: 0 min             |
| 🟢 TRK-08: Rotterdam - Vienna  |                    \                                     |                                     |
|    SLA in 4h 05m               |                     [ Warsaw Warehouse] 🏢               | Trust Level: E4                     |
|                                |                                                          | Onboard CAN bus, signed             |
|                                |                                                          |                                     |
|                                |                                                          | [ View Full Evidence Package ]      |
|                                |                                                          | [ Verify Proof ]                    |
|                                |                                                          | [ Export Evidence ]                 |
+---------------------------------------------------------------------------------------------------------------------------------+
| Legend: 🟢 On time, 🔴 Delayed, 🟡 At risk    |   Summary: 12 active, 3 delayed, 9 on schedule                                  |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 5. Evidence Packages

Registry of all Evidence Packages across shipments.

Shows package, trip, claim type, conclusion, trust level, trust policy result, proof status, package status, assembly date, verification date.

Filters: All, Verified, Awaiting verification, Policy failed.

Package statuses:

- Verified - package assembled and proof checked
- Anchored - package assembled, proof not yet verified
- Policy failed - trust policy not satisfied

```text
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | [ All ] [ Verified ] [ Awaiting verification ] [ Policy failed ]                                                                              [ 👁️ View ] |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 🟢 33 Policy passed     |   🔴 1 Failed     |   🟠 0 Insufficient data     |   🟢 97% Passed share     | Evidence packages for dispute resolution                      |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Page size 20 > | [ Combine filters: AND / OR ]                        | [ 📊 Columns ] [ 🔄 Refresh ] [ ⚙️ Reset filters ] [ 🔀 Reset sorting ]                        |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Package         | Trip            | Claim           | Conclusion           | Trust    |  Trust policy   | Proof    |    Package status |    Assembled  |     Verified  |
+-----------------+-----------------+-----------------+----------------------+----------+-----------------+----------+-------------------+---------------+---------------+
| pkg_357d72ece685| SHP-20260719-01 | Cargo condition | Cargo condition. BREA| 🟢 E4    | 🟢 Pass         | 🟢 Valid | 🟢 Verified       | 01.09.2026    | 01.09.2026    |
| pkg_ce2594372767| SHP-20260618-01 | Cargo condition | Cargo condition. BREA| 🟢 E4    | 🟢 Pass         | 🟢 Valid | 🟢 Verified       | 01.09.2026    | 01.09.2026    |
| pkg_b0f2945a0f54| SHP-20260617-02 | Cargo condition | Cargo condition. BREA| 🟠 E3    | 🔴 Fail         | 🟢 Valid | 🟢 Verified       | 01.09.2026    | 01.09.2026    |
| pkg_d4c42d15d58c| SHP-20260830-09 | Cargo condition | Cargo condition. BREA| 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | -             |
| pkg_5c5b77148ac7| SHP-20260827-04 | Road stop       | Road stop: 106 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | -             |
| pkg_9093b6d96157| SHP-20260827-01 | Road stop       | Road stop: 113 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | -             |
| pkg_af96f36c16f8| SHP-20260827-02 | Road stop       | Road stop: 127 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | 🟢 Verified       | 01.09.2026    | 01.09.2026    |
| pkg_9ebb525379a4| SHP-20260827-03 | Road stop       | Road stop: 141 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | -             |
| pkg_ad2aac24b6h2| SHP-20260819-00 | Road stop       | Road stop: 148 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | -             |
| pkg_0ca866e75eba| SHP-20260819-01 | Road stop       | Road stop: 155 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | -             |
+-----------------+-----------------+-----------------+----------------------+----------+-----------------+----------+-------------------+---------------+---------------+
| Page 1 of 2 | 20 of 34 records                                                                                                                      < [1] [2] >        |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

---

### 6. Package View

Inspection of a single Evidence Package with embedded ZK proof.

Opened from Evidence Packages list via [View], or from Incident View via [Evidence package].

*Demo version:*

- Proof data is simulated
- Verification contract: Simulated (MVP)
- Verification time: 42 ms is a placeholder
- Proof values are random hex strings

*Production version:*

- Proof generated by real proof engine
- Verification contract: on-chain or aligned backend
- Verification time measured from real proof
- Proof values are real cryptographic output

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| ZK Proof Inspector - Shipment SHP-802                                                                                     [X]   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Claim Type: Detention / Warehouse Waiting (Traffic Congestion)                                                                         |
| Verification Contract: Simulated (MVP)                                                                                          |
+---------------------------------------------------------------------------------------------------------------------------------+
| Public Inputs:                                                                                                                  |
|   • Trip ID: hash(SHP-802)                                                                                                      |
|   • Geofence Bounding Box: [52.5200, 13.4050] (Berlin-Warsaw Corridor)                                                          |
|   • Max Allowed Speed threshold: 5 km/h                                                                                         |
|   • Time Window: 22.08.2026 10:00 - 12:30 UTC                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Zero-Knowledge Proof Data (Groth16 / Plonk):                                                                                    |
|   [ 0x7b2a9f1c4e8d3b2a1f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a ]                                                        |
|   [ 0x3f1e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e ]                                                        |
+---------------------------------------------------------------------------------------------------------------------------------+
| Verification Result: 🟢 SUCCESS (Valid Proof)  |  Verification Time: 42 ms          [ Copy Proof ] [ Export ZK JSON ] [ Close ] |
+---------------------------------------------------------------------------------------------------------------------------------+
```

## How ZK Proofs Work in Demo

### Generation Flow

1. Driver reports an incident, such as traffic.
2. The report appears in the demo remote console.
3. Dispatcher clicks **Confirm** or **Reject**.
4. The decision is sent to the main platform.
5. Dispatcher clicks **Evidence**.
6. The main platform generates an Evidence Package with a ZK proof.

### What Is Generated

| Action | Evidence Package | ZK Proof |
|--------|-----------------|----------|
| Confirm only | No | No |
| Reject only | No | No |
| Confirm + Evidence | Yes | Yes |
| Reject + Evidence | Yes | Yes |

### Key Rule

ZK proofs exist only for disputes.

If the dispatcher does not click Evidence, no dispute package is created.

Clean routes have no ZK proof. They close with signed events and Evidence Root only.

### Where to See Results

- **Evidence Packages** - screen 5, shows all generated packages
- **Package View** - screen 6 shows one package with ZK proof

### Navigation

- From Evidence Packages (screen 5): click [View] → opens Package View
- From Incident View: click [Evidence package] → opens Package View

---

## Examples: ZK Proofs and Evidence Packages

### Example 1: Confirm Traffic

Driver reports traffic on segment A-B.

Dispatcher clicks **Confirm**.

Dispatcher clicks **Evidence**.

**Evidence Package:**
```json
{
  "packageId": "pkg_981247190248192a",
  "shipmentId": "SHP-802",
  "claimType": "Traffic",
  "decision": "Confirmed",
  "slaResult": "Paused",
  "penalty": 0,
  "evidenceRoot": "0x8f4c21a9e7b13...1a",
  "createdAt": "2026-08-22T14:15:00Z"
}
```

**ZK Proof:**
```text
Claim Type: Traffic Exception
Verification Result: SUCCESS (Valid Proof)
Verification Time: 42 ms
```

**Conclusion:** SLA paused. Penalty 0. Driver protected.

---

### Example 2: Reject Traffic

Driver reports traffic on segment A-B.

Dispatcher clicks **Reject**.

Dispatcher clicks **Evidence**.

**Evidence Package:**
```json
{
  "packageId": "pkg_981247190248193b",
  "shipmentId": "SHP-803",
  "claimType": "Traffic",
  "decision": "Rejected",
  "slaResult": "Continued",
  "penalty": "Applied",
  "evidenceRoot": "0x3b1e...8c",
  "createdAt": "2026-08-22T16:45:00Z"
}
```

**ZK Proof:**
```text
Claim Type: Traffic Exception
Verification Result: SUCCESS (Valid Proof)
Verification Time: 42 ms
```

**Conclusion:** SLA continued. Penalty applied. Driver not protected.

---

### Summary

| Decision | Evidence Package | ZK Proof | Result |
|----------|-----------------|----------|--------|
| Confirm + Evidence | Created | Valid | SLA paused, penalty 0 |
| Reject + Evidence | Created | Valid | SLA continued, penalty applied |
| No Evidence clicked | Not created | Not created | No dispute package |

### 7. Dashboard

Executive dashboard with KPI, disputes, trust distribution and anchors.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                               | 🔔 [Operator] [EN]       |
+---------------------------------------------------------------------------------------------------------------------------------+
| Dashboard    [ Overview ] [ Disputes ] [ Trust ] [ Anchors ]                                              [ Last 30 Days ]      |
+---------------------------------------------------------------------------------------------------------------------------------+
| Overview                                                                                                                        |
|   ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐                |
|   │ Total Shipments: 1,420 │  │ Active in Transit: 142 │  │ Exceptions Resolved: 28│  │ Valid ZK Proofs: 1,392 │                |
|   │ 🟢 +12% vs last month  │  │ 🚛 On schedule: 114    │  │ ⚠️ Auto-resolved: 28   │  │ 🔒 100% Verified       │                |
|   └────────────────────────┘  └────────────────────────┘  └────────────────────────┘  └────────────────────────┘                |
+---------------------------------------------------------------------------------------------------------------------------------+
| [ Disputes ]                                                                                                                    |
|   • Average Dispute Close Time: 12 minutes (down from 45 days)                                                                  |
|   • Total Penalties Fairly Excluded: €34,500                                                                                    |
|   • eFTI Compliance Rate: 99.8%                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------------------+
| [ Trust ]                                                                                                                       |
|   • E5 (Encrypted/Post-Q): 45%                                                                                                  |
|   • E4 (Secure Onboard):  40%                                                                                                   |
|   • E2-E3 (Standard GPS): 12%                                                                                                   |
|   • E1 (Manual/Fallback):  3%                                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| [ Anchors ]                                                                                                                     |
|   [PKG-8821] Berlin->Warsaw | Hash: 0x8f4c...1a | Arweave TX: 0x12...99 | Status: Verified                                      |
|   [PKG-8822] Paris->Lyon    | Hash: 0x3b1e...8c | Arweave TX: 0x44...55 | Status: Verified                                      |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 8. Mobile Driver View (Demo)

Driver screen for the demo scenario.

### Clickable elements

**Active Trip: SHP-802**
Opens full shipment details: route, status, documents, event history.

**Device Trust Level: E4**
Opens attestation details. Simulated for MVP demo.

Production version uses real device attestation via TPM or Secure Element.

**Report Incident / Delay**

Opens the Report Incident form.

After submit, button states:

- Verifying... - system checks the report.
- Close Incident - report confirmed, SLA paused.
- Report Incident / Delay - report rejected, SLA remains active.

Driver receives notification for both confirmed and rejected cases.

**Sign Delivery / Handover**
Opens the Sign Delivery form shown below.

### Non-clickable elements

**Status: In Transit**
Indicator only.

**GPS: Active**
Indicator only.

**Arrival**
Information only.

**Delay**
Information only.

When SLA is paused, the SLA block shows Status: Paused with the reason.

```text
+---------------------------------------+
| 📱 LogiQED Driver           🔔 [ EN ] |
+---------------------------------------+
| Active Trip: SHP-802                  |
| Berlin -> Warsaw                      |
| Status: [ 🟢 In Transit ]             |
+---------------------------------------+
| 📍 Current Location & Telemetry       |
| • GPS: Active (Lat: 52.52, Lon: 13.40)|
| • Device Trust Level: 🟢 E4 (Secure)  |
+---------------------------------------+
| ⏱️ SLA                                |
| • Deadline: 22.08.2026 18:00          |
| • Delay: 0 min                        |
+---------------------------------------+
| Quick Actions                         |
| [ 📸 Report Incident / Delay ]        |
| [ ✍️ Sign Delivery / Handover ]       |
+---------------------------------------+
| [ Trip List ]         [ Profile ]     |
+---------------------------------------+
```

When SLA is paused:

```text
| ⏱️ SLA                              |
| • Deadline: 22.08.2026 18:00        |
| • Status: Paused (Traffic)          |
| • Delay: 0 min                      |
```

### Device Trust Level: E4 

```text
+---------------------------------------+
| Device Trust Level: E4                |
+---------------------------------------+
| Source: Onboard CAN bus               |
| Device: Scania R450 (AB-777-CD)       |
|                                       |
| Attestation: Secure boot verified     |
| Firmware digest: 0x...                |
| Key: hardware-backed, not exportable  |
|                                       |
| Corroboration: GPS + CAN + gateway    |
| Evidence Confidence: High             |
+---------------------------------------+
```

### Report Incident form

Reason is required. Comment and photo are optional.

Reason determines what the system verifies:
- Traffic - GPS track and Traffic API.
- Warehouse Queue - warehouse geofence.
- Weather - weather data.
- Vehicle Breakdown - vehicle telemetry.

```text
+---------------------------------------+
| Report Incident / Delay               |
+---------------------------------------+
| Trip: SHP-802                         |
|                                       |
| Reason: *                             |
| [ Traffic ] [ Warehouse Queue ]       |
| [ Weather ] [ Vehicle Breakdown ]     |
|                                       |
| Comment (optional):                   |
| [ Add comment ]                       |
|                                       |
| Photo (optional):                     |
| [ 📸 Add photo ]                      |
|                                       |
| [ Submit Report ]                     |
+---------------------------------------+
```

### Sign Delivery / Handover form

Confirms delivery and completes the SLA.

Photo proves the cargo was delivered.

Recipient signature proves the receiving party accepted it.

Confirm Delivery finalizes the trip and generates the Evidence Package.

```text
+---------------------------------------+
| Sign Delivery / Handover              |
+---------------------------------------+
| Trip: SHP-802                         |
| Berlin -> Warsaw                      |
|                                       |
| Delivery confirmation:                |
| • Arrived at: 22.08.2026 17:50        |
| • Location: Warsaw Warehouse          |
|                                       |
| [ 📸 Photo of delivered cargo ]       |
| [ ✍️ Recipient signature ]            |
|                                       |
| [ Confirm Delivery ]                  |
+---------------------------------------+
```

### 9. Telemetry

Self-reporting and device monitoring.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Notifications | Telemetry | Chat    | 🔔 [EN] [Operator]                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Telemetry > My Location                                                                                                         |
+---------------------------------------------------------------------------------------------------------------------------------+
| While reporting is on, this device tells the dispatcher where you are.                                                          |
|                                                                                                                                 |
|   ┌─────────────────────────────────────────────────────────┐                                                                   |
|   │ 🟢 Reporting is on         [ 🛑 Stop reporting ]        │                                                                   |
|   │ Last reported: just now    Coordinates: 52.5200, 13.4050│                                                                   |
|   │ Reporting interval: 15 sec (server controlled)          │                                                                   |
|   └─────────────────────────────────────────────────────────┘                                                                   |
|                                                                                                                                 |
| WHAT TO KEEP IN MIND                                                                                                            |
|   While reporting is on, the screen does not go dark as long as it is open.                                                     |
|   Minimizing the tab or letting the screen go dark stops reporting, and the dispatcher sees your last point with its age.       |
|   This is a browser limit. In the background it reports location to no one.                                                     |
|   To report for a whole shift with the screen off, you need a tracker app; the administrator issues a key for it in the list    |
|   of telemetry devices.                                                                                                         |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 10. SLA Overview

SLA policies, working calendars and holiday sets.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | SLA | Telemetry | Chat         |	    🔔 [EN] [SLA_ANALYST]                 |
+---------------------------------------------------------------------------------------------------------------------------------+
| CONFIGURATION > SLA                                                                                                     [ ⏱️ ]  |
| Service level policies, working calendars and holidays.                                                                         |
+---------------------------------------------------------------------------------------------------------------------------------+
| Tabs: [ SLA policies ] [ Working calendars ] [ Holiday sets ]                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| ⏱️ SLA policies                                | 📅 Working calendars                     | 🏖️ Holiday sets                     |
| Reaction and resolution targets by scope.      | Working hours by weekday and time zone.  | Named sets of non-working days for  |
|                                                |                                          | calendar.                           |
| [ SLA policies ]                               | [ Working calendars ]                    | [ Holiday sets ]                    |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 11. Edit SLA Policy

Detailed editor for a specific SLA policy with reaction, resolution and scope.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | SLA | Telemetry | Chat            | 🔔 [EN] [Admin User]                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| SLA > SLA policies > Edit SLA policy                                                     [ Save ] [ Save and close ] [ Close ]  |
+---------------------------------------------------------------------------------------------------------------------------------+
| General information                                                                                                             |
|   Code *: [ EMERGENCY-A1-CRITICAL ]                                 Calendar type:    [ Calendar time (24-7) ] >                |
|   Reaction (min) *: [ 5  ]                                          Working calendar: [ -- Default --     ] >                   |
|   Resolution (min) *: [ 30 ]                                        Valid from:       [ _ _._ _._ _ _ _      ] 📅               |
|   On-site arrival (min): [ 20 ]                                     Valid to:         [ _ _._ _._ _ _ _      ] 📅               |
|   Active: [✓]                                                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Scope                                                                                                                           |
|   Dimension: [ Enter the dimension                   ]    Value: [ Enter the value                     ]  [ + Add ] [ Remove ]  |
|   [ Page size: 20 ]  [ Combine filters: AND / OR ]                                           [ 🔄 Refresh ] [ ⚙️ Reset ] [ ↗️ ]  |
|   ----------------------------------------------------------------------------------------------------------------------------- |
|   Dimension                                                                              | Value                                |
|   ----------------------------------------------------------------------------------------------------------------------------- |
|   Category                                                                               | A1                                   |
|   Type                                                                                   | A                                    |
|   Priority                                                                               | CRITICAL                             |
|   Page 1 of 1 (3 of 3 items)                                                                                                    |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 12. Edit Working Calendar

Editor for working hours by weekday, time zone and holiday sets.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | SLA | Telemetry | Chat         | 🔔 [EN] [Admin User]                      |
+---------------------------------------------------------------------------------------------------------------------------------+
| SLA > Working calendars > Edit calendar                                                  [ Save ] [ Save and close ] [ Close ]  |
+---------------------------------------------------------------------------------------------------------------------------------+
| General Information                                                                                                             |
|   Code *: [ DEFAULT ]                                                                                                           |
|   Name *: [ Standard calendar ]                                                                                                 |
|   Time zone *: [ (UTC+03:00) Kyiv]                                                                                              |
|   Holiday sets: [ Select holiday sets ]                                                                                         |
|   Default: [✓]                                                                                                                  |
+---------------------------------------------------------------------------------------------------------------------------------+
| Working hours                                                                                                                   |
|   Monday      [ 09:00 ] ✕ - [ 18:00 ] ✕ [✓] ✕  [ + Add Interval ]                                                               |
|   Tuesday     [ 09:00 - 18:00 ] ✕              [ + Add Interval ]                                                               |
|   Wednesday   [ 09:00 - 18:00 ] ✕              [ + Add Interval ]                                                               |
|   Thursday    [ 09:00 - 18:00 ] ✕              [ + Add Interval ]                                                               |
|   Friday      [ 09:00 - 18:00 ] ✕              [ + Add Interval ]                                                               |
|   Saturday    Day off                          [ + Add Interval ]                                                               |
|   Sunday      Day off                          [ + Add Interval ]                                                               |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 13. Workflow & Status Engine

Trip lifecycle management with visual pipeline and timers.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | SLA | Telemetry | Chat              | 🔔 [EN] [Operator]                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Workflow > Trip Statuses > Edit Status: [ IN_TRANSIT ]                                   [ Save ] [ Save & Close ] [ Close ]    |
+---------------------------------------------------------------------------------------------------------------------------------+
| SLA timer behavior: Run  |  Pipeline-mixture: First reaction  |  Color: [ #F3F4F6 ]                                             |
+---------------------------------------------------------------------------------------------------------------------------------+
| Stage Lifecycle / Visual Pipeline:                                                                                              |
|   (O) Created ────> (O) Picked Up ────> (•) In Transit [Active] ────> ( ) Delivered                                             |
+---------------------------------------------------------------------------------------------------------------------------------+
| Timers and escalations                                                                                                          |
|   • Code: LONG_IN_PROGRESS           Action: Timer escalation    Offset, min: 40    Order: 1    Active: [✓]   [Delete]          |
|     Base date: Status entry moment                               Working calendar: Calendar time (24-7)                         |
|   • Code: ARRIVAL_DEADLINE_BREACHED  Action: Evidence Generation Offset, min: 0     Order: 2    Active: [✓]   [Delete]          |
|     Base date: SLA arrival deadline                              Working calendar: Calendar time (24-7)                         |
|   • Code: RESOLUTION_DEADLINE_BREACH Action: Auto-Close Dispute  Offset, min: 0     Order: 2    Active: [✓]   [Delete]          |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 14. Workflow Diagram

Visual lifecycle diagram for a trip.

Shows the full state machine: statuses as nodes, transitions as arrows. System transitions, user transitions, and reject loops are configurable.

Click a status to select, double-click to edit. Click a transition label to edit the transition.

Used by Dispatcher to configure the workflow without code.

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

### 15. Notification Rules Engine

Rules for automatic notifications.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Notifications | Telemetry | Chat    | 🔔 [EN] [Operator]                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Notifications > Notification Rules > Edit Notification Rule                              [ Save ] [ Save & Close ] [ Close ]    |
+---------------------------------------------------------------------------------------------------------------------------------+
| Name: Incident Report Notice - Driver & Carrier                                                                                   |
| Description: Notifies responsible parties when an exception rule triggers and penalty protection is applied.                    |
+---------------------------------------------------------------------------------------------------------------------------------+
| Match conditions                                                                                                                |
|   [ Page size: 20 ]  [ Combine filters: AND / OR ]                                         [ 🔄 Refresh ] [ ⚙️ Reset filters ]  |
|   ----------------------------------------------------------------------------------------------------------------------------- |
|   Attribute: incident_status == CONFIRMED                                                                                |
+---------------------------------------------------------------------------------------------------------------------------------+
| Recipients                                                                                                                      |
|   Recipient kind: [ Responsible user / Carrier Dispatcher ]                                                      [ + Add ]      |
+---------------------------------------------------------------------------------------------------------------------------------+
| Delivery channels                                                                                                               |
|   [✓] In-app notification     [✓] Email     [ ] SMS     [✓] Device push (Driver PWA)     [✓] External conversation (Chat)       |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 16. Chat

Communication with attachments and evidence packages.

```text
+----------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                      | Status: [🟢 Online] [Realtime ⚡]  |
+----------------------------------------------------------------------------------------------------------------------------------+
| Active Chats (4)                 | TRK-42: Berlin -> Warsaw (Driver: Hans Mueller)                           [📋 Trip #802 Info] |
| [C+] [🔄]                        | --------------------------------------------------------------------------------------------- |
| -------------------------------- |                                                                                               |
| 🟢 TRK-42 (Berlin-Warsaw) [2]    |   [ Attachment: Warehouse Geofence Photo Entry ]                                              |
|    Photo, 11:44                  |   [ 📁 Download Archive (2.4 MB) ]                       [ 22.08 11:44 ]                      |
|                                  |                                                                                               |
| ⚪ Victoria Weber (TransLog Sp.) |   🎵 Driver Voice Note: Delayed at Berlin loading dock due to heavy traffic.                  |
|    Audio, 12:18                  |   [▶ ─────────●─────── 01:24 / 03:59 ] [🔊 ───●─]        [ 22.08 12:18 ]                      |
|                                  |                                                                                               |
| 🤖 SLA Support [Bot]             |   👤 Dispatcher:                                                                              |
|    Image, 07:37                  |   Acknowledged. Automatically triggering SLA exception rule for queue delay.                  |
|                                  |                                                                                               |
| ⚪ Tetiana Bondarenko            |   📄 **eFTI_Consignment_Note_802.pdf**                                                        |
|    Document, 22.05               |      304.3 KB · application/pdf                        [👁️ Preview] [📥 Download]             |
|                                  |                                                                                               |
|                                  |   📦 **Evidence_Package_PKG8821.json** [🔒 Verified]                                          |
|                                  |      45.1 KB · cryptographic proof             [👁️ Preview] [📥 Download]                     |
+----------------------------------------------------------------------------------------------------------------------------------+
| 📎 [ + Attach Evidence ] [ Type a message or attach files... ]                                                 [ 🎤 ] [ ➡️ ]     |
+----------------------------------------------------------------------------------------------------------------------------------+
```

---

### 17. Departments

Org structure - departments list.

Shift Supervisor sees all departments with their kind, parent department, head, phone, employee count, and subordinate count.

Columns: Name, Code, Kind, Parent dept, Head, Primary phone, Employees, Subordinates, Active.

Actions: Create, Audit, View, Edit, Delete.

```text
+------------------------------------------------------------------------------------------------------------------------------------------------+
| << Org structure > Departments                                  				     [ EN English ] [🔔13] [⚙] [MAS Miller Andrew Scott]        |
+------------------------------------------------------------------------------------------------------------------------------------------------+
| Departments                                                                                                                [ + Create ]        |
+------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                              				          [ Audit ] [ View ] [ Edit ] [ Delete ]     |
+------------------------------------------------------------------------------------------------------------------------------------------------+
| Page size: 20 | Combine filters [AND] [OR]                          				     [ Refresh ] [ Reset filters ] [ Reset sorting ]         |
+------------------------------------------------------------------------------------------------------------------------------------------------+
| Name                  | Code       | Kind          | Parent dept  | Head                 | Primary phone   | Employees | Subordinates | Active |
+------------------------------------------------------------------------------------------------------------------------------------------------+
| Administration        | ADMIN      | Administration| Head Office  | Bennett Alice Claire |                 | 1         | 0            | Yes    |
| Compliance & Evidence | COMPLIANCE | Department    | Head Office  | Coleman Sophia Jane  | +48 22 500 10 04| 2         | 0            | Yes    |
| Dispatch Office       | DISPATCH   | Service       | Head Office  | Miller Andrew Scott  | +48 22 500 10 02| 5         | 0            | Yes    |
| Fleet Department      | FLEET      | Department    | Head Office  | Kruger Martin Otto   | +48 22 500 10 03| 2         | 0            | Yes    |
| Head Office           | HQ         | Branch        | -            | Reid Thomas Edward   | +48 22 500 10 01| 1         | 4            | Yes    |
+------------------------------------------------------------------------------------------------------------------------------------------------+
| Page 1 of 1 | 5 of 5 records                                                                       				 [ << ] [ < ] 1 [ > ] [ >> ] |
+------------------------------------------------------------------------------------------------------------------------------------------------+
```

### 18. Department kinds

Dictionary of department kinds used in the org structure.

Each kind has a name, code, and can be assigned to one or more departments. Examples: Branch, Department, Service, Administration.

Actions: Create, Audit, View, Edit, Delete.

```text
+--------------------------------------------------------------------------------------------------------------------------------------+
| << Org structure > Department kinds                                	   [ EN English ] [🔔13] [⚙] [MAS Miller Andrew Scott]        |
+--------------------------------------------------------------------------------------------------------------------------------------+
| Department kinds                                                                             		               [ + Create ]        |
+--------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                           [ Audit ] [ View ] [ Edit ] [ Delete ]     |
+--------------------------------------------------------------------------------------------------------------------------------------+
| Page size: 20 | Combine filters [AND] [OR]                            	   [ Refresh ] [ Reset filters ] [ Reset sorting ]         |
+--------------------------------------------------------------------------------------------------------------------------------------+
| Name                  | Code           | Departments   | Order         | Active                                                      |
+--------------------------------------------------------------------------------------------------------------------------------------+
| Branch                | BRANCH         | 1             | 0             | Yes                                                         |
| Administration        | ADMINISTRATION | 1             | 10            | Yes                                                         |
| Department            | DEPARTMENT     | 2             | 20            | Yes                                                         |
| Service               | SERVICE        | 1             | 30            | Yes                                                         |
| Sector                | SECTOR         | 0             | 40            | Yes                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------+
| Page 1 of 1 | 5 of 5 records                                                                       	   [ << ] [ < ] 1 [ > ] [ >> ] |
+--------------------------------------------------------------------------------------------------------------------------------------+
```

### 19. Employees

Registry of all employees in the organization.

Each employee record shows full name, department, position, work phone, personal phone, email, and active status.

Employees are linked to departments and positions, and can be assigned to duty shifts.

Actions: Create, Audit, View, Edit, Delete.

```text
+----------------------------------------------------------------------------------------------------------------------------------------------+
| << Org structure > Employees                                       			   [ EN English ] [🔔13] [⚙] [MAS Miller Andrew Scott]        |
+----------------------------------------------------------------------------------------------------------------------------------------------+
| Employees                                                  		                                                       [ + Create ]        |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                             				                        [ Audit ] [ View ] [ Edit ] [ Delete ]     |
+----------------------------------------------------------------------------------------------------------------------------------------------+
| Page size: 20 | Combine filters [AND] [OR]                           				   [ Refresh ] [ Reset filters ] [ Reset sorting ]         |
+----------------------------------------------------------------------------------------------------------------------------------------------+
| Full name             | Department       | Position            | Work phone      | Personal phone  | Email address                  | Active |
+----------------------------------------------------------------------------------------------------------------------------------------------+
| Bennett Alice Claire  | Administration   | System Administrator| +48 22 500 10 01| +380931401001   | administrator@test.local       | Yes    |
| Brooks Daniel James   | Fleet Department | Driver              | +48 22 500 10 03| +380931401004   | driver@test.local              | Yes    |
| Coleman Sophia Jane   | Compliance & Evid| Auditor             | +48 22 500 10 04| +380931401006   | auditor@test.local             | Yes    |
| Foster Emily Rose     | Dispatch Office  | Dispatcher          | +48 22 500 10 02| +380931401003   | dispatcher@test.local          | Yes    |
| Harper Olivia Grace   | Compliance & Evid| SLA Analyst         | +48 22 500 10 04| +380931401002   | sla.analyst@test.local         | Yes    |
| Keller Lukas Erik     | Dispatch Office  | Dispatcher          | +48 22 500 10 02| +380931401009   | dispatcher4@test.local         | Yes    |
| Kruger Martin Otto    | Fleet Department | Head of Department  | +48 22 500 10 03| +380931401010   | fleet.manager@test.local       | Yes    |
| Miller Andrew Scott   | Dispatch Office  | Head of Department  | +48 22 500 10 02| +380931401005   | shift.supervisor@test.local    | Yes    |
| Reid Thomas Edward    | Head Office      | Managing Director   | +48 22 500 10 01| +380931401011   | director@test.local            | Yes    |
| Sandoval Marta Elena  | Dispatch Office  | Dispatcher          | +48 22 500 10 02| +380931401008   | dispatcher3@test.local         | Yes    |
| Whitaker Nathan Paul  | Dispatch Office  | Dispatcher          | +48 22 500 10 02| +380931401007   | dispatcher2@test.local         | Yes    |
+----------------------------------------------------------------------------------------------------------------------------------------------+
| Page 1 of 1 | 11 of 11 records                                                  				                   [ << ] [ < ] 1 [ > ] [ >> ] |
+----------------------------------------------------------------------------------------------------------------------------------------------+
```

### 20. Positions

Dictionary of positions used in the organization.

Each position has a name, code, managerial flag, and employee count. Examples: Driver, Dispatcher, Auditor, Head of Department, Managing Director.

Actions: Create, Audit, View, Edit, Delete.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| << Org structure > Positions                                                                                                   [ + Create ]        |
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                                                      [ Audit ] [ View ] [ Edit ] [ Delete ]     |
+---------------------------------------------------------------------------------------------------------------------------------+
| Page size: 20 | Combine filters [AND] [OR]                              [ Refresh ] [ Reset filters ] [ Reset sorting ]         |
+---------------------------------------------------------------------------------------------------------------------------------+
| Name                  | Code           | Managerial position | Employees     | Active                                           |
+---------------------------------------------------------------------------------------------------------------------------------+
| Auditor               | AUDITOR        | No                  | 1             | Yes                                              |
| Dispatcher            | DISPATCHER     | No                  | 4             | Yes                                              |
| Driver                | DRIVER         | No                  | 1             | Yes                                              |
| Head of Department    | HEAD           | Yes                 | 2             | Yes                                              |
| Managing Director     | DIRECTOR       | Yes                 | 1             | Yes                                              |
| SLA Analyst           | SLA_ANALYST    | No                  | 1             | Yes                                              |
| System Administrator  | SYSADMIN       | No                  | 1             | Yes                                              |
+---------------------------------------------------------------------------------------------------------------------------------+
| Page 1 of 1 | 7 of 7 records                                                                       [ << ] [ < ] 1 [ > ] [ >> ]  |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 21. Duty roster

Monthly roster of duty shifts per employee.

Shows the current period, employees on duty right now, and a grid of employees × days. Each cell can hold a day shift, night shift, or full day.

Dispatchers can be assigned to shifts, and the system shows who is on duty at any moment.

Actions: Generate, Edit mode, Remove.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| << Org structure > Duty roster                                     [ EN English ] [🔔13] [⚙] [MAS Miller Andrew Scott]         |
+---------------------------------------------------------------------------------------------------------------------------------+
| Department: [ Dispatch Office v ]  Month: [ < September > ]  Year: [ 2026 ] [ > ]  [ Current period ]          [ Generate ]     |
+---------------------------------------------------------------------------------------------------------------------------------+
| Edit mode: (o) Day shift  ( ) Night shift  ( ) Full day  (x) Remove     Pick a duty shift and click the roster cells.           |
+---------------------------------------------------------------------------------------------------------------------------------+
| On duty right now (1) as of 20.09.2026 20:26                                                Position: [ All positions v ]       |
| Sandoval Marta Elena  Night shift                                                                                               |
| Dispatcher · Dispatch Office  (20.09.2026 20:00 - 21.09.2026 08:00)  📞 +48 22 500 10 02                                        |
+---------------------------------------------------------------------------------------------------------------------------------+
| Employee              | TU 1 | WE 2 | TH 3 | FR 4 | SA 5 | SU 6 | MO 7 | TU 8 | WE 9 | TH 10| FR 11| SA 12| SU 13| MO 14| ...   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Miller Andrew Scott   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |       |
| Head of Department    |      |      |      |      |      |      |      |      |      |      |      |      |      |      |       |
| Foster Emily Rose     |      | [DS] | [NS] |      |      |      | [DS] | [NS] |      |      |      | [DS] | [NS] |      |       |
| Dispatcher            |      |      |      |      |      |      |      |      |      |      |      |      |      |      |       |
| Keller Lukas Erik     | [NS] |      | [DS] | [NS] |      |      |      | [DS] | [NS] |      |      |      | [DS] | [NS] |       |
| Dispatcher            |      |      |      |      |      |      |      |      |      |      |      |      |      |      |       |
| Sandoval Marta Elena  |      |      |      | [DS] | [NS] |      |      |      | [DS] | [NS] |      |      |      | [DS] |       |
| Dispatcher            |      |      |      |      |      |      |      |      |      |      |      |      |      |      |       |
| Whitaker Nathan Paul  |      | [DS] | [NS] |      |      |      | [DS] | [NS] |      |      |      | [DS] | [NS] |      |       |
| Dispatcher            |      |      |      |      |      |      |      |      |      |      |      |      |      |      |       |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 22. Duty shifts

Dictionary of duty shift types used in the roster.

Each shift has a name, code, time of day, number of duties, order, and active flag. Examples: Day shift (08:00–20:00), Night shift (20:00–08:00), Full day (08:00–08:00).

Actions: Create, Audit, View, Edit, Delete.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| << Org structure > Duty shifts                                     [ EN English ] [🔔13] [⚙] [MAS Miller Andrew Scott]         |
+---------------------------------------------------------------------------------------------------------------------------------+
| Duty shifts                                                                                                 [ + Create ]        |
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                                                     [ Audit ] [ View ] [ Edit ] [ Delete ]      |
+---------------------------------------------------------------------------------------------------------------------------------+
| Page size: 20 | Combine filters [AND] [OR]                            [ Refresh ] [ Reset filters ] [ Reset sorting ]           |
+---------------------------------------------------------------------------------------------------------------------------------+
| Name                  | Code           | Time of day         | Duties        | Order         | Active                           |
+---------------------------------------------------------------------------------------------------------------------------------+
| 🟢 Day shift          | DAY            | 08:00 - 20:00       | 30            | 0             | Yes                              |
| 🔵 Night shift        | NIGHT          | 20:00 - 08:00 (+1)  | 30            | 10            | Yes                              |
| 🟣 Full day           | FULLDAY        | 08:00 - 08:00 (+1)  | 0             | 20            | Yes                              |
+---------------------------------------------------------------------------------------------------------------------------------+
| Page 1 of 1 | 3 of 3 records                                                                        [ << ] [ < ] 1 [ > ] [ >> ] |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 23. Org chart

Visual hierarchy of departments and employees.

Shows the full org structure as a tree: Head Office at the top, departments below, with heads and employee counts. Inactive departments can be hidden.

Navigation: drag to pan, Ctrl+mouse wheel to zoom. Click a department to select it, double-click to edit.

Actions: Fit, 100%, Zoom in, Zoom out, Export PNG.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| << Org structure > Org chart                                       [ EN English ] [🔔14] [⚙] [MAS Miller Andrew Scott]         |
+---------------------------------------------------------------------------------------------------------------------------------+
| Org chart                                                                                                                       |
+---------------------------------------------------------------------------------------------------------------------------------+
| [ ] Inactive departments                                            [ Fit ] [ 100% ] [ 🔍+ ] [ 🔍- ] [ 📥 PNG ]                 |
+---------------------------------------------------------------------------------------------------------------------------------+
| Departments: 5   Employees: 11   Drag to pan, Ctrl+mouse wheel to zoom   Click a department to select it, double-click to edit  |
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                 |
|                                                                                                                                 |
|                                                  +---------------------------+                                                  |
|                                                  | BRANCH                    |                                                  |
|                                                  | Head Office               |                                                  |
|                                                  | 👤 Reid Thomas Edward     |                                                  |
|                                                  | 📞 +48 22 500 10 01       |                                                  |
|                                                  | [ 1 emp. ]                |                                                  |
|                                                  +-------------+-------------+                                                  |
|                                                                |                                                                |
|                                                                |                                                                |
|                             +---------------------+---------------------+-----------+-----------+                               |                      
|                             |                     |                     |                       |                               |
|                             |                     |                     |                       |                               |
|                       +-----+-------------+ +-----+-------------+ +-----+-------------+   +-----+-------------+                 |
|                       | ADMINISTRATION    | | SERVICE           | | DEPARTMENT        |   | DEPARTMENT        |                 |
|                       |                   | |                   | |                   |   |                   |                 |
|                       | Administration    | | Dispatch Office   | | Fleet Department  |   | Compliance & Evid |                 |
|                       |                   | |                   | |                   |   |                   |                 |
|                       | 👤 Bennett Alice  | | 👤 Miller Andrew  | | 👤 Kruger Martin  |   | 👤 Coleman Sophia |                 |
|                       |    Claire         | |    Scott          | |    Otto           |   |    Jane           |                 |
|                       |                   | |                   | |                   |   |                   |                 |
|                       |                   | | 📞 +48 22 500 10  | | 📞 +48 22 500 10  |   | 📞 +48 22 500 10  |                 |
|                       |                   | |    02             | |    03             |   |    04             |                 |
|                       |                   | |                   | |                   |   |                   |                 |
|                       | [ 1 emp. ]        | | [ 5 emp. ]        | | [ 2 emp. ]        |   | [ 2 emp. ]        |                 |
|                       +-------------------+ +-------------------+ +-------------------+   +-------------------+                 |
|                                                                                                                                 |
|                                                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------------------+
```

---

### 24. Administration Hub

Users, roles, permissions, access rules and endpoints in one workspace.

```text
+---------------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Administration | Telemetry | Chat    | 🔔 [EN] [ADMIN]                           |
+---------------------------------------------------------------------------------------------------------------------------------------+
| Administration > Overview                                                                                                  [ 🛡️ ]     |
| Users, roles, permissions, access rules and system endpoints in one workspace.                                                        |
| Tabs: [ Users ] [ Roles ] [ Permissions ]                                                                                             |
+---------------------------------------------------------------------------------------------------------------------------------------+
| 👤 Users                                       | 🔑 Roles                                 | 🛡️ Permissions                            |
| System user accounts, their data, accesses     | User roles for centralized management of | System permissions used to control        |
| and role assignments.                          | access sets and system permissions.      | access to functions, pages and operations.|
+---------------------------------------------------------------------------------------------------------------------------------------+
| 📋 Rules                                       | 🔌 Endpoints                             | 📊 Audit journal                          |
| Access and behavior rules that define how      | System endpoints for checking, matching  | User actions across the system: who,      |
| permissions and restrictions are applied.      | and configuring API access rules.        | when, from where and with what result.    |
+---------------------------------------------------------------------------------------------------------------------------------------+
```

### 25. Users Management

User accounts with roles, contacts and status.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Administration > Users                                                      [ ➕ Create ] [ 🗑️ Delete ] [ ✏️ Edit ]|
+---------------------------------------------------------------------------------------------------------------------------------+
| Page size: 20  | [ Combine filters: AND / OR ]                                       [ 🔄 Refresh ] [ ⚙️ Reset filters ]        |
+---------------------------------------------------------------------------------------------------------------------------------+
| Full name             | Phone number    | Email address              | Department         | Position          | Blocked         |
+---------------------------------------------------------------------------------------------------------------------------------+
| Hans Mueller          | +49 30 12345601 | driver.berlin@logiqed.eu   | Sector 1           | Driver            | No              |
| Victoria Weber        | +49 30 12345602 | dispatcher@logiqed.eu      | Dispatch Service   | Dispatcher        | No              |
| Anna Rudenko          | +49 30 12345603 | analyst@logiqed.eu         | Head Office        | SLA Analyst       | No              |
| Michael Hoffmann      | +49 30 12345604 | driver.hamburg@logiqed.eu  | Sector 2           | Driver            | No              |
| Tetiana Bondarenko    | +49 30 12345605 | auditor@logiqed.eu         | Compliance         | Auditor           | No              |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 26. Roles

System roles with access separation.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Administration > Roles                                                      [ ➕ Create ] [ 🗑️ Delete ] [ ✏️ Edit ]|
+---------------------------------------------------------------------------------------------------------------------------------+
| Code                      | Name                | Description                                                          | System |
+---------------------------------------------------------------------------------------------------------------------------------+
| ADMIN                     | Administrator       | User, role and permission management                                 | Yes    |
| SLA_ANALYST               | SLA Analyst         | SLA policies, metrics and performance dashboards                     | No     |
| DISPATCHER                | Dispatcher          | Route assignment, shipment registry and fleet dispatch               | No     |
| DRIVER                    | Driver              | Mobile interface, status updates and own documents                   | No     |
| SHIFT_SUPERVISOR          | Shift Supervisor    | Deadline control, escalations and team management                    | No     |
| AUDITOR                   | Auditor             | Audit journal, reports and SLA compliance                            | No     |
+---------------------------------------------------------------------------------------------------------------------------------+
```
### 27. Permissions

Granular permissions for subsystems.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Administration > Permissions                                                [ ➕ Create ] [ 🗑️ Delete ] [ ✏️ Edit ]|
+---------------------------------------------------------------------------------------------------------------------------------+
| Code                      | Name                                   | Description                         | Subsystem            |
+---------------------------------------------------------------------------------------------------------------------------------+
| Access.Manage             | Access management                      | User and role administration        | Administration       |
| Addresses.Read            | Address registry: read                 | Address registry access             | Address registry     |
| Telemetry.Stream          | Telemetry live data feed               | Real-time GPS/IoT tracking stream   | Telemetry subsystem  |
| ZkProof.Verify            | Zero-knowledge proof verification      | Freight compliance cryptography     | Verification engine  |
| Appeals.Write             | Appeals: write                         | Incident report registration        | Appeals subsystem    |
+---------------------------------------------------------------------------------------------------------------------------------+
```
### 28. Rules & Endpoints

API routing rules and endpoint matching.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Administration > Rules & Endpoints                                          [ ➕ Create rule ] [ 🔍 Test API ]     |
+---------------------------------------------------------------------------------------------------------------------------------+
| Name                      | Permission code        | Enabled | Priority | HTTP method | Route prefix                            |
+---------------------------------------------------------------------------------------------------------------------------------+
| api:Telemetry:Get         | Telemetry.Stream       | Yes     | 50       | GET         | /api/v1/Telemetry/GetActiveStream       |
| api:Appeals:Update        | Appeals.Write          | Yes     | 50       | POST        | /api/v1/Appeals/BulkUpdate              |
| api:Workflows:Execute     | Workflow.Manage        | Yes     | 50       | POST        | /api/v1/Workflows/Execute               |
+---------------------------------------------------------------------------------------------------------------------------------+
```
---

### 29. Executive Summary (Auditor)

Executive summary for the auditor: trips in period, active in transit, exceptions resolved, valid proofs, and what is already anchored outside the system. Includes tabs for Disputes, Trust, and Anchors, plus a "Needs attention" list of overdue shipments.

```text
+--------------------------------------------------------------------------------------------------------------------------------------+
| << Main > Home                                                                [ EN English ] [🔔] [⚙] [CS Coleman Sophia Jane]      |
+--------------------------------------------------------------------------------------------------------------------------------------+
| Executive summary                                                                   Updated at 20.09.2026 22:26                      |
| How trips are running, what disputes cost, what claims rest on and what is already anchored outside [ Trips ] [ Delays ] [ Evidence ]|
+--------------------------------------------------------------------------------------------------------------------------------------+
| From                       | To                         | Grouping                                                                   |
| [ 21.08.2026         ] [x] | [ 20.09.2026         ] [x] | [ By days  > ] 															   |
| [ 7 days ] [ 30 days ] [ 90 days ] [ Year ] 																						   |
+--------------------------------------------------------------------------------------------------------------------------------------+
| [ Overview ] [ Disputes ] [ Trust ] [ Anchors ]                                                                                      |
+--------------------------------------------------------------------------------------------------------------------------------------+
| Trips in period       | Active in transit   | Exceptions resolved | Valid proofs                                                     |
| 62                    | 12                  | 31                  | 100%                                                             |
| 120 all time          | 1 on schedule       | 1 awaiting review   | 11 of 11 needing one; 90 do not                                  |
| [ graph ]             | [ graph ]           | [ graph ]           | [ graph ]                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------+
| HOW IT RUNS                                                    										      [ PNG ] [ CSV ] [ ⛶ ]    |
| Trips: registered and delivered                                                                                                      |
| The bar is every trip movement in the interval: registered plus delivered. The lines show what it is made of, lateness is a          |
| share of the delivered, not a separate series                                                                                        |
| (o) Total  (o) Registered  (o) Delivered  (o) Of those, late                                                                         |
|                                                                                                                                      |
|  20 |                                                                                                                                |
|     |                                                                                                                                |
|  15 |                                                                                                                                |
|     |                                                                                                                                |
|  10 |                                                                                                                                |
|     |                                                                                                                                |
|   5 |                                                                                                                                |
|     |                                                                                                                                |
|   0 +--------------------------------------------------------------------------------------------------------------------------------|
|                                                                                                                                      |
+--------------------------------------------------------------------------------------------------------------------------------------|
| DISTRIBUTION                                                    											  [ PNG ] [ CSV ] [ ⛶ ]    |
| Trip statuses                                                                                                                        |
| Trips of the period by process status. Status names come from the process itself, so an installation with its own process will       |
| show its own names                                                                                                                   |
| (o) Delivered  (o) Departed  (o) Cancelled  (o) Created  (o) Picked up                                                               |
|                                                                                                                                      |
+--------------------------------------------------------------------------------------------------------------------------------------|
| Needs attention                                                                                                     Showing 8 of 23  |
+--------------------------------------------------------------------------------------------------------------------------------------|
| 🟡 SHP-20260916-00000001  Overdue by 3 d 10 h 40 min                                                                                 |
| 🟡 SHP-20260916-00000007  Overdue by 3 d 9 h 40 min                                                                                  | 
| 🟡 SHP-20260916-00000005  Overdue by 1 d 6 h 20 min                                                                                  |
| 🟡 SHP-20260916-00000011  Overdue by 1 d 5 h 20 min                                                                                  |
| 🟡 SHP-20260916-00000003  Overdue by 1 d 2 h 0 min                                                                                   |
| 🟡 SHP-20260917-00000006  Overdue by 10 h 37 min                                                                                     |
| 🟡 SHP-20260917-00000012  Overdue by 9 h 37 min                                                                                      |
| 🟡 SHP-20260917-00000008  Delay unreviewed for 1 d 23 h 48 min · Geofence wait                                                       |
+--------------------------------------------------------------------------------------------------------------------------------------|
|                                                                                                                                      |
+--------------------------------------------------------------------------------------------------------------------------------------+
```

### 30. Audit Journal

User actions and system events.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Administration > Audit journal                                                    [ 📊 Export ] [ 🔍 Filter ]      |
+---------------------------------------------------------------------------------------------------------------------------------+
| Action date         | User full name      | User email address         | Action    | Result | Endpoint              | Records   |
+---------------------------------------------------------------------------------------------------------------------------------+
| 24.08.2026 01:47:26 | System Admin        | admin@logiqed.eu           | Sign In   | Success| /api/v1/Auth/Login    | 0         |
| 24.08.2026 03:42:54 | Hans Mueller        | driver.berlin@logiqed.eu   | Creation  | Success| /api/v1/Telemetry/... | 1         |
| 24.08.2026 01:44:34 | System              | System                     | Update    | Success| -                     | 46        |
| 24.08.2026 01:44:32 | Anna Rudenko        | analyst@logiqed.eu         | Export    | Success| /api/v1/Analytics/... | 120       |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 31. Audit Record Details

Detailed audit record: request body in JSON and a field-level change table (before / after). Shows target entities, changed entities, and every modified field. Every modification is traceable.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| Audit record details                                                                                                      [ X ] |
+---------------------------------------------------------------------------------------------------------------------------------+
| Target entities: 1   Changed entities: 1                                                                                        |
+---------------------------------------------------------------------------------------------------------------------------------+
| Request body                                                                                                              [ v ] |
| +-----------------------------------------------------------------------------------------------------------------------------+ |
| | {                                                                                                                           | |
| |   "shipmentId": "01a05eff-3565-7d7f-b3ae-79980bffff02",                                                                     | |
| |   "reason": 0,                                                                                                              | |
| |   "durationMinutes": 30,                                                                                                    | |
| |   "comment": "Accident on the road. Big traffic jam.",                                                                      | |
| |   "latitude": 51.235000,                                                                                                    | |
| |   "longitude": 23.750000                                                                                                    | |
| | }                                                                                                                           | |
| +-----------------------------------------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------------------------------+
| Changes                                                                                                                         |
|                                                                                      Id: 722 f7d38-2600-4157-8b8a-0d6d87a4c42   |
| Trip incident (Created)                                                                                                         |
| +--------------------------------+--------------------------------+---------------------------------------------------------+   |
| | Field                          | Before                         | After                                                   |   |
| +--------------------------------+--------------------------------+---------------------------------------------------------+   |
| | Driver                         | -                              | 01a05eff-3238-75ed-a8b3-283b06eb5a0f                    |   |
| | Delay reason                   | -                              | Traffic                                                 |   |
| | Review state                   | -                              | Verifying                                               |   |
| | Reported at                    | -                              | 02.09.2026 01:47:52                                     |   |
| | Reported by                    | -                              | Brooks Daniel James                                     |   |
| | Duration, min                  | -                              | 30                                                      |   |
| | Credited, min                  | -                              | 0                                                       |   |
| | Held the deadlines             | -                              | No                                                      |   |
| | Liable party                   | -                              | External                                                |   |
| | Reporter note                  | -                              | Accident on the road. Big traffic jam.                  |   |
| | Latitude                       | -                              | 51.235000                                               |   |
| | Longitude                      | -                              | 23.750000                                               |   |
| +--------------------------------+--------------------------------+---------------------------------------------------------+   |
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                       [ Close ] |
+---------------------------------------------------------------------------------------------------------------------------------+
```

---

## Demo Remote Console (optional)

A separate Blazor project: `LogiQED.DemoRemote`.

The remote console is a dispatcher tool for live demo simulation. It is not part of the main product. The public demo runs without it. The console is optional: it is only used when the audience wants to simulate a driver incident live. Without the console, the incident flow is shown as pre-recorded data.

Access is provided on request via email.

Three actions per incident:

- **Confirm** - SLA paused, penalty 0
- **Reject** - SLA continues, penalty applied
- **Evidence** - generate and verify Evidence Package

The console talks to the main platform via API. Every decision is sent to the main system, not simulated locally.

After Evidence is clicked, the console shows the package number, verification result, and real verification time in milliseconds.

Used in the demo to show the full flow: driver reports → dispatcher decides → evidence generated → proof verified.

Request access: contact@logiqed.tech