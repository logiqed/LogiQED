# LogiQED UI

ASCII wireframes for the LogiQED platform.

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

The demo shows the full flow: SLA setup, shipment creation, delay, exception, evidence and proof.

Chat is available for all roles.

Demo roles:

- ADMIN: Users, Roles, Permissions, Rules & Endpoints, Audit Journal, Chat
- SLA_ANALYST: SLA Overview, SLA Policy, Working Calendar, Rule Builder, Chat
- DISPATCHER: Registry, Map, Workflow, Evidence Package, ZK Proof Inspector, Dashboard, Notifications, Chat
- DRIVER: Mobile Driver View, Telemetry, Chat
- AUDITOR: Audit Journal, Chat

The demo starts with ADMIN creating roles and users. Then SLA_ANALYST creates SLA policy and exception rule. DISPATCHER creates shipment and tracks delay. DRIVER reports telemetry. System generates evidence. AUDITOR reviews the case.

> Demo data, proof values and attestation details are simulated for MVP presentation.

## Demo Screens

These screens are shown in the investor demo:

1. Administration Hub
2. Users Management
3. Roles
4. Permissions
5. Rules & Endpoints
6. Audit Journal
7. SLA Overview
8. Edit SLA Policy
9. Edit Working Calendar
10. SLA Rule Builder
11. Registry
12. Map
13. Workflow & Status Engine
14. Evidence Package
15. ZK Proof Inspector
16. Dashboard
17. Notification Rules
18. Chat
19. Mobile Driver View
20. Telemetry

## MVP Screens

These screens are part of MVP but not shown in the demo.

### DISPATCHER

21. Workflow Diagram — visual lifecycle diagram.
22. Goods Turnover — goods movement management.

### SHIFT_SUPERVISOR

23. Appeals & Shift Handover — shift handover journal and incident registry.

### AUDITOR

24. Appeals Analytics — analytics for SLA breaches and dispute dynamics.

### ADMIN

25. Org Structure — organizational chart.

## Roles

Roles are fully configurable in the admin panel. Any role can be created with any set of permissions.

Chat is available for all roles.

### ADMIN

User, role and permission management. Access rules and endpoint configuration. Audit journal access.

### SLA_ANALYST

SLA policies, working calendars, holiday sets, exception rules. Analytics and metrics.

### DISPATCHER

Shipment registry, operational map, workflow management, chat, notifications. Creates routes and assigns drivers.

### DRIVER

Mobile interface, own trips, telemetry, status updates, chat with dispatcher. Own documents only.

### SHIFT_SUPERVISOR

Deadline control, escalations, team management. Shift handovers.

### AUDITOR

Audit journal, reports, SLA compliance. Read-only access.

---

## ADMIN Screens

> Demo data, proof values and attestation details are simulated for MVP presentation.

### 1. Administration Hub

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
### 2. Users Management

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

### 3. Roles

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
### 4. Permissions

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
### 5. Rules & Endpoints

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
### 6. Audit Journal

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

## SLA_ANALYST Screens

### 7. SLA Overview

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
### 8. Edit SLA Policy

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

### 9. Edit Working Calendar

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

### 10. SLA Rule Builder

Rule builder for exception attribution.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                     | 🔔 [Operator] [EN]                 |
+---------------------------------------------------------------------------------------------------------------------------------+
| SLA Rule Builder > Exception Attribution Rule #3              [ Test Rule ] [ Simulate ] [ Save ] [ Save & Close ] [ Delete ]   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Rule Name: TRAFFIC_OR_QUEUE_EXCLUSION                                                             Version: v3.2                 |
| Description: Automatically excludes driver penalty if delay is caused by external traffic congestion or warehouse queue.        |
+---------------------------------------------------------------------------------------------------------------------------------+
| Working Calendar                                                                                                                |
|   Calendar: [ 24/7 ]  [ Business hours ]  [ Custom ]      Timezone: [ UTC+1 Berlin ]                                            |
|   Holiday Set: [ EU Logistics 2026 ]                        Next holiday: 03.10.2026 (German Unity Day)                         |
+---------------------------------------------------------------------------------------------------------------------------------+
| Timers and escalations                                                                                                          |
|   Code: ARRIVAL_DEADLINE_BREACHED     Action: Timer escalation          Offset, min: 0      Order: 1   Active: [✓]  [Delete]    |
|   Code: SLA_CONDITION_CHECK           Action: Evidence Generation       Offset, min: 15     Order: 2   Active: [✓]  [Delete]    |
+---------------------------------------------------------------------------------------------------------------------------------+
| Arming condition                                                                                                                |
|   [ AND ] [ OR ]   [ ! NOT ]   [ + Field comparison ]   [ + Domain condition ]   [ + Condition group ]                          |
|   > telemetry.speed < 5 km/h  AND  geofence.type == "WAREHOUSE_QUEUE"  AND  source.trust_level >= E3  AND  event.timestamp      |
+---------------------------------------------------------------------------------------------------------------------------------+
| Resulting Action                                                                                                                |
|   > Chargeable delay = 0 min. No penalty applied.                                                                               |
|   > Linked Evidence Package ID: PKG-8821   |   Proof Status: Ready                                                              |
+---------------------------------------------------------------------------------------------------------------------------------+
| Rule Execution History (Last 30 days)                                                                                           |
|   · Triggered: 142 times    · Exceptions Created: 28    · Success Rate: 100%    · Last Triggered: Today, 14:22 (Trip SHP-803)   |
+---------------------------------------------------------------------------------------------------------------------------------+
```

## DISPATCHER Screens

### 11. Registry

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

### 12. Map

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

### 14. Evidence Package

Associated e-Documents and cryptographic evidence package.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                     | 🔔 [Operator] [EN]                 |
+---------------------------------------------------------------------------------------------------------------------------------+
| Shipment SHP-802 > Documents & Evidence Package                 [ Export PDF ] [ View Proof ] [ Verify Package ]                |
+---------------------------------------------------------------------------------------------------------------------------------+
| 📄 Associated e-Documents                       | 📦 Cryptographic Evidence Package (Immutable Snapshot)                        |
| -------------------------                       | -------------------------------------------------------------                 |
| • eFTI_Consignment_Note_802.pdf                 | • Package ID: pkg_981247190248192a                                            |
|   Status: [ eFTI Compliant ]  [👁️ View]         | • Created: 22.08.2026 14:15 UTC                                               |
| • Customs_Clearance_Declaration.xml             | • SLA Result: Chargeable Delay: 0 min. Penalty: Not Applied                   |
|   Status: [ Verified ]        [👁️ View]         |                                                                               |
| • Temperature_Log_2-8C.csv                      | Key Telemetry Events:                                                         |
|   Status: [ Valid Range ]     [👁️ View]         | ├─ GPS_PING (Lat: 52.52, Lon: 13.40, Hash: 0x1f...a3)                         |
| • Delivery_Receipt_Signed.pdf                   | ├─ GEOFENCE (Berlin Warehouse, Entry, Hash: 0x4e...b2)                        |
|   Status: [ Signed ]          [👁️ View]         | └─ TEMP_READING (4.2°C, Normal, Hash: 0x9c...f1)                              |
|                                                 |                                                                               |
| [ + Upload Document ]                           | Signature Chain & Provenance:                                                 |
|                                                 | ├─ Device Ed25519: [ Valid ]                                                  |
|                                                 | └─ Gateway ML-DSA (Post-Quantum): [ Valid ]                                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| 🔗 Arweave Tx: 0x8f4c21a9e7b13...1a  |  Package Hash: sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855   |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 15. ZK Proof Inspector

Inspection of a single cryptographic proof.

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
| Claim Type: SLA Exception Excluded (Traffic Congestion)                                                                         |
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

### 16. Dashboard

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

### 17. Notification Rules Engine

Rules for automatic notifications.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Notifications | Telemetry | Chat    | 🔔 [EN] [Operator]                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Notifications > Notification Rules > Edit Notification Rule                              [ Save ] [ Save & Close ] [ Close ]    |
+---------------------------------------------------------------------------------------------------------------------------------+
| Name: SLA Exception Notice — Driver & Carrier                                                                                   |
| Description: Notifies responsible parties when an exception rule triggers and penalty protection is applied.                    |
+---------------------------------------------------------------------------------------------------------------------------------+
| Match conditions                                                                                                                |
|   [ Page size: 20 ]  [ Combine filters: AND / OR ]                                         [ 🔄 Refresh ] [ ⚙️ Reset filters ]  |
|   ----------------------------------------------------------------------------------------------------------------------------- |
|   Attribute: trip_status  ==  EXCEPTION_EXCLUDED                                                                                |
+---------------------------------------------------------------------------------------------------------------------------------+
| Recipients                                                                                                                      |
|   Recipient kind: [ Responsible user / Carrier Dispatcher ]                                                      [ + Add ]      |
+---------------------------------------------------------------------------------------------------------------------------------+
| Delivery channels                                                                                                               |
|   [✓] In-app notification     [✓] Email     [ ] SMS     [✓] Device push (Driver PWA)     [✓] External conversation (Chat)       |
+---------------------------------------------------------------------------------------------------------------------------------+
```

### 18. Chat

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

## DRIVER Screens

### 19. Mobile Driver View

Driver screen for active trip, telemetry, SLA protection and quick actions.

### Clickable elements

**Active Trip: SHP-802**
Opens full shipment details: route, status, documents, event history.

**Device Trust Level: E4**
Opens attestation details.

*Simulated for MVP demo:*

- Source: Onboard CAN bus
- Device: Scania R450 (AB-777-CD)
- Attestation: Secure boot verified
- Firmware digest: 0x...
- Key: hardware-backed, not exportable
- Corroboration: GPS + CAN + gateway signed
- Evidence Confidence: High

*Production version:*

- Source: signed telemetry from onboard device
- Device: registered in telemetry subsystem with SourceCode + ExternalId
- Attestation: real device attestation via TPM / Secure Element
- Firmware digest: verified against signed firmware
- Key: hardware-backed, non-exportable
- Corroboration: multiple independent signed sources
- Evidence Confidence: calculated from real assurance vector

**Penalty Protection: Active**
Opens the active exclusion rule.

*Simulated for MVP demo:*

- Rule: TRAFFIC_OR_QUEUE_EXCLUSION
- Version: v3.2
- Status: Active
- Condition: telemetry.speed < 5 km/h AND geofence.type == "WAREHOUSE_QUEUE" AND source.trust_level >= E3
- Result: Chargeable delay = 0 min. No penalty applied. Evidence Package auto-generated.

*Production version:*

- Rule from SLA Engine, versioned and signed
- Condition evaluated against signed events
- Result: automatic evidence generation and penalty exclusion

**Auto-Exclusion Rule: Active**
Opens the same active rule details as Penalty Protection.

**Onboard CAN bus: Connected**
Opens device diagnostics: connection status, last sync, firmware version, error codes.

**eFTI Documents**
Each document is clickable.

- Consignment Note (e-CMR): preview or download.
- Temperature Log: opens temperature graph for the trip.

**Report Incident / Delay**
Opens form with photo, comment and reason.

**Sign Delivery / Handover**
Opens signature form.

**Sync Telemetry Ping**
Manually sends coordinates to the dispatcher.

**Open Chat (1 new message)**
Opens chat with dispatcher. Shows unread message.

**Trip List**
Opens list of all driver trips.

**Profile**
Opens driver profile: documents, rating, settings.

### Non-clickable elements

**Status: In Transit**
Indicator only. Shows current trip status.

**GPS: Active**
Indicator only. Shows that GPS reporting is on.

**Target Arrival: 22.08.2026 18:00**
Information only. Shows planned arrival time.

**Status: On Schedule (Delay = 0 min)**
Information only. Shows current SLA status.

```text
+---------------------------------------+
| 📱 LogiQED Driver               [ EN ]|
+---------------------------------------+
| Active Trip: SHP-802                  |
| Berlin -> Warsaw                      |
| Status: [ 🟢 In Transit ]             |
+---------------------------------------+
| 📍 Current Location & Telemetry       |
| • GPS: Active (Lat: 52.52, Lon: 13.40)|
| • Device Trust Level: 🟢 E4 (Secure)  |
| • Onboard CAN bus: Connected          |
+---------------------------------------+
| ⏱️ SLA & Exception Protection         |
| • Target Arrival: 22.08.2026 18:00    |
| • Status: On Schedule (Delay = 0 min) |
| • Penalty Protection: Active          |
| • Auto-Exclusion Rule: Active (v3)    |
+---------------------------------------+
| 📄 eFTI Documents                     |
| • Consignment Note (e-CMR): [Signed]  |
| • Temperature Log: [2.4°C - Normal]   |
+---------------------------------------+
| Quick Actions                         |
| [ 📸 Report Incident / Delay ]        |
| [ ✍️ Sign Delivery / Handover ]       |
| [ 🔄 Sync Telemetry Ping ]            |
+---------------------------------------+
| 💬 AI Copilot / Dispatcher Chat       |
| [ Open Chat (1 new message) ]         |
+---------------------------------------+
| [ Trip List ]         [ Profile ]     |
+---------------------------------------+
```
### 20. Telemetry

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

## MVP Screens

Full product scope beyond demo.

### DISPATCHER

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

### SHIFT_SUPERVISOR

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

### AUDITOR

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

### ADMIN

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