# LogiQED SLA DSL

SLA rules are expressed in a simple, versioned format.

## Purpose

Define when a shipment is late, what counts as an exception, and how responsibility is assigned.

## Rule Overview

A rule defines how to calculate a claim. A result is generated separately by the SLA Engine.

Every rule has the same top-level structure:

- `ruleId` and `version` - identity and versioning.
- `claimType` - which claim the rule produces.
- `status` - ACTIVE or DRAFT.
- `trustPolicy` - which sources are required and at what level.
- `inputs` - events consumed by the rule.
- `calculation` - the formula and attribution.
- `enrichment` - whether an external API call is required.

The three examples below show how the same structure covers detention, cargo condition, and route monitoring.

## Rule Definition - Detention

Detention covers waiting time at a warehouse. The rule measures the interval between the truck entering the geofence and the dock being assigned.

If the dock assignment never arrives, the claim is marked INCONCLUSIVE rather than rejected.

```json
    {
      "ruleId": "DETENTION_V1",
      "version": 1,
      "claimType": "DETENTION",
      "status": "ACTIVE",
      "trustPolicy": {
        "minTrustLevel": "E4",
        "attestation": ["SECURE_ENCLAVE", "AUTHENTICATED_API"],
        "requireAll": true
      },
      "inputs": [
        {
          "id": "appointment",
          "source": "booking",
          "event": "AppointmentScheduled"
        },
        {
          "id": "geofence_entry",
          "source": "device",
          "event": "GeofenceEntered"
        },
        {
          "id": "dock_assignment",
          "source": "warehouse_api",
          "event": "DockAssigned",
          "missing": "INCONCLUSIVE"
        },
        {
          "id": "loading_start",
          "source": "warehouse_api",
          "event": "LoadingStarted",
          "missing": "INCONCLUSIVE"
        },
        {
          "id": "warehouse_exit",
          "source": "warehouse_api",
          "event": "WarehouseExited",
          "missing": "INCONCLUSIVE"
        }
      ],
      "calculation": {
        "formula": "waiting_min = (dock_assignment - geofence_entry).minutes",
        "attribution": {
          "warehouse": "waiting_min",
          "carrier": 0
        }
      },
      "enrichment": {
        "required": false
      }
    }
```

## Rule Definition - Cargo Condition

Cargo Condition covers temperature compliance during transport. The rule checks whether the recorded temperature stayed within the contracted range for the entire trip.

The contract range is set per shipment. A small tolerance is applied to account for sensor precision.

The source for this claim must be an attested temperature sensor with a Secure Element. If no sensor reading is received, the claim is INCONCLUSIVE, not failed.

```json
    {
      "ruleId": "CARGO_TEMP_V1",
      "version": 1,
      "claimType": "CARGO_CONDITION",
      "status": "ACTIVE",
      "trustPolicy": {
        "minTrustLevel": "E4",
        "attestation": ["SECURE_ENCLAVE"],
        "requireAll": true
      },
      "inputs": [
        {
          "id": "temperature_reading",
          "source": "device",
          "event": "SensorReading",
          "missing": "INCONCLUSIVE"
        }
      ],
      "calculation": {
        "formula": "valid = min >= (contract_min - tolerance) AND max <= (contract_max + tolerance)",
        "contractRange": {
          "min": 2,
          "max": 8,
          "unit": "C"
        },
        "tolerance": 0.1
      },
      "enrichment": {
        "required": false
      }
    }
```

## Rule Definition - Route Monitoring

Route Monitoring covers in-transit exceptions that pause or shift SLA timing. This rule applies to traffic, but the same structure covers weather, road work, and other route exceptions.

The rule measures the pause between TrafficEntered and TrafficExited. Enrichment is required: the system calls a traffic API when TrafficEntered fires, to confirm the standstill with an independent source.

This is one of the few rules where enrichment is required. In most cases external APIs are not called.

```json
    {
      "ruleId": "TRAFFIC_PAUSE_V1",
      "version": 1,
      "claimType": "TRAFFIC_EXCEPTION",
      "status": "ACTIVE",
      "trustPolicy": {
        "minTrustLevel": "E4",
        "attestation": ["DEVICE"],
        "requireAll": true
      },
      "inputs": [
        {
          "id": "traffic_entered",
          "source": "device",
          "event": "TrafficEntered"
        },
        {
          "id": "traffic_exited",
          "source": "device",
          "event": "TrafficExited"
        }
      ],
      "calculation": {
        "formula": "pause_min = (traffic_exited - traffic_entered).minutes"
      },
      "enrichment": {
        "required": true,
        "type": "TRAFFIC_API",
        "onEvent": "TrafficEntered"
      }
    }
```

The sections below explain how the SLA Engine evaluates a rule and what the result contains. They apply to all three rules, using Detention as the example.

## Evaluation Result

The SLA Engine produces a separate result object. It combines the rule output, the input events, and the segment context where the events occurred.

```json
    {
      "claimId": "0194e0d2-9f1a-7a10-8c1a-2b4e6f8a1c3d",
      "ruleId": "DETENTION_V1",
      "version": 1,
      "evaluatedAt": "2026-08-27T15:00:00Z",
      "tripId": "SHP-802",
      "segmentId": "A-B",
      "segmentLabel": "Kyiv-Zhytomyr",
      "inputEvents": [
        {
          "id": "geofence_entry",
          "time": "11:54",
          "trustLevel": "E4",
          "sourceId": "TRK-GPS-01"
        },
        {
          "id": "dock_assignment",
          "time": "13:02",
          "trustLevel": "E4",
          "sourceId": "WH-API-01"
        }
      ],
      "calculation": {
        "waiting_min": 68,
        "breakdown": [
          {
            "from": "11:54",
            "to": "13:02",
            "label": "waiting_for_dock",
            "minutes": 68,
            "segmentId": "A-B"
          }
        ]
      },
      "attribution": {
        "warehouse_min": 68,
        "carrier_min": 0
      },
      "status": "VALID"
    }
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `claimId` | UUID | Unique identifier of this claim evaluation. Generated by the SLA Engine. |
| `ruleId` | String | Identifier of the rule that was evaluated, for example DETENTION_V1. |
| `version` | Integer | Version of the rule. Increments when the rule changes. |
| `evaluatedAt` | ISO 8601 | Timestamp when the evaluation was performed. Server-side, UTC. |
| `tripId` | String | Identifier of the shipment or trip this claim belongs to. |
| `segmentId` | String | Identifier of the route segment where the evaluated events occurred. Owned by the Event Orchestrator. |
| `segmentLabel` | String | Human-readable name of the segment, for example Kyiv-Zhytomyr. Used in UI and reports. |
| `inputEvents` | Array | Events used as inputs by the rule. Sorted by event time. |
| `inputEvents[].id` | String | Logical input name as defined in the rule, for example geofence_entry. |
| `inputEvents[].time` | String | Event time in the driver's working calendar context. |
| `inputEvents[].trustLevel` | String | Trust level of the source that produced the event, for example E4. |
| `inputEvents[].sourceId` | String | Identifier of the source. Optional but recommended for audit. |
| `calculation` | Object | Output of the rule's formula, plus a breakdown by intervals. |
| `calculation.waiting_min` | Integer | Result of the formula in minutes. |
| `calculation.breakdown` | Array | Human-readable breakdown of how the result was composed. |
| `attribution` | Object | Assignment of the calculated time to responsible parties. |
| `attribution.warehouse_min` | Integer | Minutes attributed to the warehouse. |
| `attribution.carrier_min` | Integer | Minutes attributed to the carrier. |
| `status` | String | One of VALID, INVALID, INCONCLUSIVE. |

### Why segmentId Is in the Result

The rule itself does not depend on segments. DETENTION_V1 computes waiting_min = (dock_assignment - geofence_entry).minutes regardless of where the truck is.

But the result does need segment context:

- **Attribution** - a delay on segment Kyiv-Zhytomyr is a different operational issue than the same delay on Lviv-Krakow.
- **Analytics** - grouping results by segment shows where delays cluster.
- **UI** - the segment label appears in the audit trail and in the executive summary.
- **Corroboration** - other vehicles in the same segment and time window are candidates for confirming this claim.

The segment is owned by the Event Orchestrator. The SLA Engine only records it. It does not compute it.

### Evaluation Order with Segment Context

The SLA Engine processes rules in this order:

1. Collect input events.
2. Sort events by event time.
3. Validate Trust Policy.
4. Execute calculation formula.
5. Apply working calendar and carrier timezone.
6. Attach segment context from the Event Orchestrator.
7. Produce result object.

Step 6 is an enrichment step. If the events span multiple segments (unusual but possible), the result may reference the primary segment or list all segments in the breakdown.

## Exception Types

Six exception types are supported in the MVP. Each has a dedicated rule and a dedicated rule ID.

| Exception Type | Rule ID | Enrichment API |
|----------------|---------|----------------|
| traffic | TRAFFIC_PAUSE_V1 | Traffic API |
| weather | WEATHER_PAUSE_V1 | Weather API |
| vehicle_breakdown | BREAKDOWN_PAUSE_V1 | Roadside assistance API (optional) |
| warehouse_queue | WAREHOUSE_QUEUE_PAUSE_V1 | Warehouse gate API |
| geofence | GEOFENCE_WAIT_V1 | None |
| border_delay | BORDER_DELAY_PAUSE_V1 | Border or customs API |

All six follow the same structure: an entered event, an exited event, a formula that measures the interval, and a trust policy that defines the required source assurance.

The `TRAFFIC_PAUSE_V1` rule shown above is the reference. The other five use the same shape with their own events and APIs.

## Trust Policy

Rules reference Trust Policy, not just Trust Level.

Example policy:

```json
    {
      "policyId": "E4_REQUIRED_V1",
      "version": 1,
      "minTrustLevel": "E4",
      "sources": ["device", "warehouse_api"],
      "corroboration": "REQUIRED",
      "acceptLowerWithWarning": false
    }
```

A claim is valid only if all required sources satisfy the policy.

## Segments and Rules

Rules in this DSL operate on events, not on segments. Segments are a lower-level concept owned by the Event Orchestrator and Route State Machine.

A rule may reference a segment only for attribution in the result, not for its calculation. The calculation always works on event times, not on segment boundaries.

This separation allows:

- One SLA rule per route, regardless of how many segments the route has.
- Reuse of rules across routes with different segment structures.
- Attribution of delays to specific segments without changing the rule.

## Golden Tests

| Case | Input | Expected |
|------|-------|----------|
| Normal detention | 11:54 to 13:02 | 68 minutes, warehouse |
| Midnight crossing | 23:50 to 00:10 | Calendar-adjusted |
| DST | 02:30 to 03:30 | 60 minutes, not 120 |
| Missing dock assignment | No event | INCONCLUSIVE |

## Design Notes

- Rules are versioned. Changes create a new version.
- Rules reference Trust Policy.
- Conclusion is deterministic from input events and rule version.
- Working calendars and carrier timezone are evaluated during SLA calculation.
- External API calls happen only when an incident occurs.
- DSL is machine-readable and AI-friendly.