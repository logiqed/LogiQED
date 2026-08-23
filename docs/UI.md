# LogiQED UI

ASCII wireframes for the LogiQED platform.

MVP focuses on: Registry, Map, SLA Engine, Evidence Package, ZK Proof Inspector, Dashboard, Mobile Driver View.

Full product scope includes 16 screens.

## UI Notes

- 16 screens covering full product scope.
- Light and dark themes supported across all screens.
- Designed for desktop operators and mobile drivers.

## 1. Registry

Freight registry: filters for active, delayed, exception, verified, table with trust levels, proof status, workflow, export.

```text
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                                   | 🔔 [Operator] [EN]                                         |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Freight Registry                                                                                                                                    |
| Filter: [ Active (24) ] [ Delayed (3) ] [ Exception (5) ] [ Verified (142) ]                             [ Search trip, hash, device... ] [ + New ] |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| ID      | Route              | Carrier        | Telemetry | Status       | SLA Arrival      | Proof Status     | Workflow                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| SHP-802 | Berlin -> Warsaw   | TransLog Sp.   | 🟢 E4     | In Transit   | 22.08.2026 18:00 | 🔒 Evidence Ready| Created-Pickup-Transit-Delivered   |
| SHP-803 | Paris -> Lyon      | EuroFreight    | 🟡 E2     | Delayed      | 22.08.2026 14:30 | ⚠️ Exception     | Created-Pickup-Transit-•Delayed    |
| SHP-804 | Rotterdam -> Vienna| Apex Logistics | 🟢 E5     | Delivered    | 21.08.2026 19:15 | 🔒 Valid ZK      | Created-Pickup-Transit-Delivered   |
| SHP-805 | Madrid -> Valencia | Iberia Trans   | 🟠 E1     | Under Review | 22.08.2026 21:00 | ⏳ Proof Pending | Created-Pickup-•UnderReview        |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Export Evidence | Generate Report                                            [ Page 1 of 36 ] [<] [1] 2 3 [>]                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+
```

## 2. Map

Operational control map: active trips queue, interactive map with routes and geofences, selected trip details, SLA status, trust level, evidence actions.

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
## 3. Workflow & Status Engine

Trip lifecycle management: statuses, visual pipeline Created → Picked Up → In Transit → Delivered, timers and escalations.

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
## 4. SLA Engine

Rule builder: AND/OR/NOT conditions, field comparisons, domain conditions, timers, resulting action, execution history.

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
## 5. Evidence Package

Associated e-Documents and cryptographic evidence package: package ID, SLA result, key telemetry events with hashes, signature chain, Arweave Tx, package hash.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                             | 🔔 [Operator] [EN]         |
+---------------------------------------------------------------------------------------------------------------------------------+
| Shipment SHP-802 > Documents & Evidence Package                 [ Export PDF ] [ View Proof ] [ Verify Package ]                |
+---------------------------------------------------------------------------------------------------------------------------------+
| 📄 Associated e-Documents                       | 📦 Cryptographic Evidence Package (Immutable Snapshot)                        |
| -------------------------                       | ----------------------------------------------------------------------------- |
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
## 6. ZK Proof Inspector

Proof inspection: claim type, public inputs, proof data, verification result, verification time, copy proof, export ZK JSON.

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
| Verification Result: 🟢 SUCCESS (Valid Proof)  |  Verification Time: 42 ms              [ Copy Proof ] [ Export ZK JSON ] [ Close ] |
+---------------------------------------------------------------------------------------------------------------------------------+
```
## 7. Dashboard

Executive overview: total shipments, active in transit, exceptions resolved, valid ZK proofs, financial impact, trust level distribution, recent immutable anchors.

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

[ Disputes ]
+---------------------------------------------------------------------------------------------------------------------------------+
| Dispute Resolution & Financial Impact                                                                                           |
|   • Average Dispute Close Time: 12 minutes (down from 45 days)                                                                  |
|   • Total Penalties Fairly Excluded: €34,500                                                                                    |
|   • eFTI Compliance Rate: 99.8%                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------------------+

[ Trust ]
+---------------------------------------------------------------------------------------------------------------------------------+
| System Trust Distribution                                                                                                       |
|   • E5 (Encrypted/Post-Q): 45%                                                                                                  |
|   • E4 (Secure Onboard):  40%                                                                                                   |
|   • E2-E3 (Standard GPS): 12%                                                                                                   |
|   • E1 (Manual/Fallback):  3%                                                                                                   |
+---------------------------------------------------------------------------------------------------------------------------------+

[ Anchors ]
+---------------------------------------------------------------------------------------------------------------------------------+
| Recent Immutable Anchors (Arweave / Storage)                                                                                    |
|   [PKG-8821] Berlin->Warsaw | Hash: 0x8f4c...1a | Arweave TX: 0x12...99 | Status: Verified                                      |
|   [PKG-8822] Paris->Lyon    | Hash: 0x3b1e...8c | Arweave TX: 0x44...55 | Status: Verified                                      |
+---------------------------------------------------------------------------------------------------------------------------------+
```
## 8. Mobile Driver View

Driver screen for active trip, telemetry, SLA protection and quick actions.

Active Trip opens full shipment details: route, status, documents, event history.

Device Trust Level opens attestation details:

- Source: Onboard CAN bus
- Device: Scania R450 (AB-777-CD)
- Attestation: Secure boot verified
- Firmware digest: 0x...
- Key: hardware-backed, not exportable
- Corroboration: GPS + CAN + gateway signed
- Evidence Confidence: High

Penalty Protection opens the active exclusion rule:

- Rule: TRAFFIC_OR_QUEUE_EXCLUSION
- Version: v3.2
- Status: Active
- Condition: telemetry.speed < 5 km/h AND geofence.type == "WAREHOUSE_QUEUE" AND source.trust_level >= E3
- Result: Chargeable delay = 0 min. No penalty applied. Evidence Package auto-generated.

eFTI Documents are clickable: preview or download.

Quick Actions:

- Report Incident / Delay — opens form with photo, comment and reason.
- Sign Delivery / Handover — opens signature form.
- Sync Telemetry Ping — manually sends coordinates.

AI Copilot / Dispatcher Chat opens chat with dispatcher.

Trip List shows all trips. Profile shows driver documents, rating and settings.

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
## 9. Chat
Communication: chat list, attachments including photo, audio, documents, evidence packages, verified status, attach evidence button.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | SLA Engine | Evidence | Chat                 | Status: [🟢 Online] [Realtime ⚡]      |
+---------------------------------------------------------------------------------------------------------------------------------+
| Active Chats (4)                 | TRK-42: Berlin -> Warsaw (Driver: Hans Mueller)                          [📋 Trip #802 Info] |
| [C+] [🔄]                        | -------------------------------------------------------------------------------------------- |
| -------------------------------- |                                                                                              |
| 🟢 TRK-42 (Berlin-Warsaw) [2]    |   [ Attachment: Warehouse Geofence Photo Entry ]                                             |
|    Photo, 11:44                  |   [ 📁 Download Archive (2.4 MB) ]                      [ 22.08 11:44 ]                      |
|                                  |                                                                                              |
| ⚪ Victoria Weber (TransLog Sp.) |   🎵 Driver Voice Note: Delayed at Berlin loading dock due to heavy traffic.                 |
|    Audio, 12:18                  |   [▶ ─────────●─────── 01:24 / 03:59 ] [🔊 ───●─]        [ 22.08 12:18 ]                     |
|                                  |                                                                                              |
| 🤖 SLA Support [Bot]             |   👤 Dispatcher:                                                                             |
|    Image, 07:37                  |   Acknowledged. Automatically triggering SLA exception rule for queue delay.                 |
|                                  |                                                                                              |
| ⚪ Tetiana Bondarenko            |   📄 **eFTI_Consignment_Note_802.pdf**                                                       |
|    Document, 22.05               |      304.3 KB · application/pdf                       [👁️ Preview] [📥 Download]             |
|                                  |                                                                                              |
|                                  |   📦 **Evidence_Package_PKG8821.json** [🔒 Verified]                                         |
|                                  |      45.1 KB · cryptographic proof             [👁️ Preview] [📥 Download]                    |
+---------------------------------------------------------------------------------------------------------------------------------+
| 📎 [ + Attach Evidence ] [ Type a message or attach files... ]                                                [ 🎤 ] [ ➡️ ]     |
+---------------------------------------------------------------------------------------------------------------------------------+
```
## 10. Notification Rules Engine

Notification rules: match conditions, recipients, delivery channels: in-app, email, SMS, push, chat.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Notifications | Telemetry | Chat   | 🔔 [EN] [Operator]                    |
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
## 11. Telemetry & My Location Hub

Self-reporting and device monitoring.

Employee browser starts or stops reporting. Shows current state, last reported coordinates, age of last submission and geolocation errors.

Server controls reporting interval. Wake Lock API keeps screen awake when possible.

Continuous background reporting with screen off is handled by tracker application with a device key.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Notifications | Telemetry | Chat   | 🔔 [EN] [Operator]                   |
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
## 12. Workflow Diagram

Visual lifecycle diagram: New Created, Accepted, Rejected, In Progress, Completed, Closed.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | SLA | Telemetry | Chat         | 🔔 [EN] [Operator]                   |
+---------------------------------------------------------------------------------------------------------------------------------+
| Workflow > Workflow Diagram                                                                [ Fit to screen ] [ 100% ] [ 🔍 ] [ 📤 ]|
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
## 13. Appeals & Shift Handover

Shift handover journal and incident registry: statuses, comments, supervisor decisions.

```
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | SLA | Shift Handover | Chat       | 🔔 [EN] [Operator]                     |
+---------------------------------------------------------------------------------------------------------------------------------+
| Shift Handover Record > View: SHP-20260821-C0000001                                      [ Accept the shift ] [ Cancel ] [ Close ]|
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
## 14. Appeals Analytics

Dispute analytics: SLA breaches, average reaction and resolution times, P90, period comparison, chart.

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
## 15. Org Structure
Organizational chart: departments, employees, contacts.

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
## 16. Goods Turnover

Goods movement management: receipts, issues, transfers, write-offs, turnover sheet.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| LogiQED    | Dashboard | Map | Registry | Workflow | Goods Turnover | Telemetry | Chat    | 🔔 [EN] [Operator]                  |
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