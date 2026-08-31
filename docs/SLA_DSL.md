# LogiQED SLA DSL

SLA rules are expressed in a simple, versioned format.

## Purpose

Define when a shipment is late, what counts as an exception, and how responsibility is assigned.

## Rule Definition

A rule defines how to calculate a claim. A result is generated separately by the SLA Engine.

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

## Evaluation Result

The SLA Engine produces a separate result object.

```json
{
  "claimId": "0194e0d2-9f1a-7a10-8c1a-2b4e6f8a1c3d",
  "ruleId": "DETENTION_V1",
  "version": 1,
  "evaluatedAt": "2026-08-27T15:00:00Z",
  "inputEvents": [
    {
      "id": "geofence_entry",
      "time": "11:54",
      "trustLevel": "E4"
    },
    {
      "id": "dock_assignment",
      "time": "13:02",
      "trustLevel": "E4"
    }
  ],
  "calculation": {
    "waiting_min": 68,
    "breakdown": [
      {
        "from": "11:54",
        "to": "13:02",
        "label": "waiting_for_dock",
        "minutes": 68
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

## Cargo Condition

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

## Route Monitoring

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

## Exception Types

- traffic
- weather
- geofence
- vehicle_breakdown
- warehouse_queue
- border_delay

## Trust Policy

Rules reference Trust Policy, not just Trust Level.

Example: E4_REQUIRED_V1

A claim is valid only if all required sources satisfy the policy.

## Evaluation Order

The SLA Engine processes rules in this order:

1. Collect input events.
2. Sort events by event time.
3. Validate Trust Policy.
4. Execute calculation formula.
5. Apply working calendar and carrier timezone.
6. Produce result object.

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