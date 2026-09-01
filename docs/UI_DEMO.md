# LogiQED UI Demo

ASCII wireframes for the investor demo.

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
- DISPATCHER: Registry, Map, Workflow, Evidence Packages, Package View, Dashboard, Notifications, Driver Incident Reports, Chat
- DRIVER: Mobile Driver View, Telemetry, Chat
- AUDITOR: Audit Journal, Driver Incident Reports, Chat

The demo starts with DRIVER reporting a traffic incident. DISPATCHER confirms the report. System pauses SLA and generates Evidence Package. AUDITOR reviews the case.

SLA policy and users are pre-configured before the demo. ADMIN screens are shown only if the audience asks about role management.

> Demo data, proof values and attestation details are simulated for MVP presentation.

## Demo Screens

These screens are shown in the investor demo:

1. Driver Incident Reports
2. Registry
3. Map
4. Evidence Packages
5. Package View
6. Dashboard
7. Mobile Driver View
8. Telemetry
9. SLA Overview
10. Edit SLA Policy
11. Edit Working Calendar
12. Workflow & Status Engine
13. Notification Rules
14. Chat
15. Administration Hub
16. Users Management
17. Roles
18. Permissions
19. Rules & Endpoints
20. Audit Journal

## Short Demo

Core screens for a carrier conversation: 1–5. Seven minutes.

1. Driver Incident Reports — the result
2. Registry — the context
3. Map — the operation
4. Evidence Packages — all proofs across shipments
5. Package View — one package with ZK proof

Screens 6–20 are shown only if the audience asks.


## 1. Driver Incident Reports

Registry of all driver incident reports.

Each report shows trip, driver, reason, reported time, confirmed time, closed time, duration, status, evidence package and result.

Reasons: Traffic, Warehouse Queue, Geofence wait, Weather, Vehicle breakdown.

Status:

- Verifying — system checks the report.
- Confirmed — SLA paused, penalty 0.
- Rejected — SLA continued, penalty applied.
- Closed — driver closed the incident, SLA resumed.

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
| SHP-20260901-07 | Brooks Daniel J.| Vehicle breakdn | 01.09.2026   | —            | —            | —           | 🔴 Rejected | pkg_a4ea5b4b40d8| 🔴 Penalty app|
| SHP-20260901-07 | Brooks Daniel J.| Traffic         | 01.09.2026   | 01.09.2026   | 01.09.2026   | 2 min       | 🟢 Closed   | pkg_6ddcd7f77610| 🟢 Penalty 0  |
| SHP-20260831-08 | Nowicki Rafal P.| Geofence wait   | 01.09.2026   | —            | —            | 25 min      | 🟠 Verifying| —               | ⚪ Pending    |
| SHP-20260901-07 | Brooks Daniel J.| Traffic         | 01.09.2026   | 01.09.2026   | 01.09.2026   | 60 min      | 🟢 Closed   | pkg_d1ded753229f| 🟢 Penalty 0  |
| SHP-20260829-01 | Petrauskas D. J.| Warehouse queue | 30.08.2026   | 30.08.2026   | 30.08.2026   | 68 min      | 🟢 Closed   | —               | 🟢 Penalty 0  |
| SHP-20260829-05 | Melnyk Vadym Y. | Weather         | 30.08.2026   | 30.08.2026   | 30.08.2026   | 27 min      | 🟢 Closed   | pkg_f962281aabcc| 🟢 Penalty 0  |
| SHP-20260829-02 | Sorensen Lars E.| Geofence wait   | 30.08.2026   | 30.08.2026   | 30.08.2026   | 34 min      | 🟢 Closed   | —               | 🟢 Penalty 0  |
| SHP-20260829-06 | Costa Bruno Nun.| Vehicle breakdn | 29.08.2026   | 29.08.2026   | 30.08.2026   | 41 min      | 🟢 Closed   | pkg_0710430c797a| 🔴 Penalty app|
| SHP-20260829-03 | Balog Zoltan G. | Warehouse queue | 29.08.2026   | 29.08.2026   | 30.08.2026   | 48 min      | 🟢 Closed   | pkg_04d7035efdda| 🟢 Penalty 0  |
+-----------------+-----------------+-----------------+--------------+--------------+--------------+-------------+-------------+-----------------+---------------+
| Page 1 of 2 | 20 of 35 records                                                                                                  	         < [1] [2] >         |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

## Incident View

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
|   Rejected       | —                                 | Credited             | 0 min                                                                      |
|   Closed         | 01.09.2026 22:21:33               | Liable party         | External                                                                   |
|   Decision reason| —                                 |                      |                                                                            |
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

### 2. Registry

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

### 3. Map

Operational control map with active trips queue, interactive map and selected trip details.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                    | 🔔 [Operator] [EN]                  |
+---------------------------------------------------------------------------------------------------------------------------------+
| Operational Control Map — eFTI Freight Corridor                                                                                 |
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

- Verified — package assembled and proof checked
- Anchored — package assembled, proof not yet verified
- Policy failed — trust policy not satisfied

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
| pkg_d4c42d15d58c| SHP-20260830-09 | Cargo condition | Cargo condition. BREA| 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | —             |
| pkg_5c5b77148ac7| SHP-20260827-04 | Road stop       | Road stop: 106 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | —             |
| pkg_9093b6d96157| SHP-20260827-01 | Road stop       | Road stop: 113 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | —             |
| pkg_af96f36c16f8| SHP-20260827-02 | Road stop       | Road stop: 127 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | 🟢 Verified       | 01.09.2026    | 01.09.2026    |
| pkg_9ebb525379a4| SHP-20260827-03 | Road stop       | Road stop: 141 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | —             |
| pkg_ad2aac24b6h2| SHP-20260819-00 | Road stop       | Road stop: 148 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | —             |
| pkg_0ca866e75eba| SHP-20260819-01 | Road stop       | Road stop: 155 min   | 🟢 E4    | 🟢 Pass         | 🟢 Valid | ⚪ Anchored       | 01.09.2026    | —             |
+-----------------+-----------------+-----------------+----------------------+----------+-----------------+----------+-------------------+---------------+---------------+
| Page 1 of 2 | 20 of 34 records                                                                                                                      < [1] [2] >        |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

---

## Demo Remote Console

Separate Blazor project: LogiQED.DemoRemote.

A dispatcher console for live demo simulation. Three actions per incident:

- **Confirm** — SLA paused, penalty 0
- **Reject** — SLA continues, penalty applied
- **Evidence** — generate and verify Evidence Package

The console talks to the main platform via API. Every decision is sent to the main system, not simulated locally.

After Evidence is clicked, the console shows the package number, verification result, and real verification time in milliseconds.

Used in the demo to show the full flow: driver reports → dispatcher decides → evidence generated → proof verified.

### Package View

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
| ZK Proof Inspector — Shipment SHP-802                                                                                     [X]   |
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

- **Evidence Packages** — screen 4, shows all generated packages
- **Package View** — screen 5, shows one package with ZK proof

### Navigation

- From Evidence Packages (screen 4): click [View] → opens Package View
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

### 6. Dashboard

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

### 7. Mobile Driver View (Demo)

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

- Verifying... — system checks the report.
- Close Incident — report confirmed, SLA paused.
- Report Incident / Delay — report rejected, SLA remains active.

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
- Traffic — GPS track and Traffic API.
- Warehouse Queue — warehouse geofence.
- Weather — weather data.
- Vehicle Breakdown — vehicle telemetry.

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

### 8. Telemetry

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

### 9. SLA Overview

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
### 10. Edit SLA Policy

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

### 11. Edit Working Calendar

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

### 12. Workflow & Status Engine

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

### 13. Notification Rules Engine

Rules for automatic notifications.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Notifications | Telemetry | Chat    | 🔔 [EN] [Operator]                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Notifications > Notification Rules > Edit Notification Rule                              [ Save ] [ Save & Close ] [ Close ]    |
+---------------------------------------------------------------------------------------------------------------------------------+
| Name: Incident Report Notice — Driver & Carrier                                                                                   |
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

### 14. Chat

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

### 15. Administration Hub

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
### 16. Users Management

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

### 17. Roles

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
### 18. Permissions

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
### 19. Rules & Endpoints

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
### 20. Audit Journal

User actions and system events.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Administration > Audit journal                                                    [ 📊 Export ] [ 🔍 Filter ]      |
+---------------------------------------------------------------------------------------------------------------------------------+
| Action date         | User full name      | User email address         | Action    | Result | Endpoint              | Records   |
+---------------------------------------------------------------------------------------------------------------------------------+
| 24.08.2026 01:47:26 | System Admin        | admin@logiqed.eu           | Sign In   | Success| /api/v1/Auth/Login    | 0         |
| 24.08.2026 03:42:54 | Hans Mueller        | driver.berlin@logiqed.eu   | Creation  | Success| /api/v1/Telemetry/... | 1         |
| 24.08.2026 01:44:34 | System              | System                     | Update    | Success| —                     | 46        |
| 24.08.2026 01:44:32 | Anna Rudenko        | analyst@logiqed.eu         | Export    | Success| /api/v1/Analytics/... | 120       |
+---------------------------------------------------------------------------------------------------------------------------------+
```

---

## MVP Screens

Full product screens beyond demo: Workflow Diagram, Goods Turnover, Appeals & Shift Handover, Appeals Analytics, Org Structure.

See [UI_MVP.md](UI_MVP.md).

