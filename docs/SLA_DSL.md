# LogiQED SLA DSL

SLA rules are expressed in a simple, versioned format.

## Purpose

Define when a shipment is late, what counts as an exception, and how responsibility is assigned.

## Rule Structure

### Detention / Warehouse Waiting

```json
{
  "ruleId": "DETENTION_V1",
  "claimType": "Detention",
  "appointment": "12:00",
  "events": [
    {
      "type": "geofence_entry",
      "time": "11:54",
      "trustPolicy": "E4_REQUIRED_V1"
    },
    {
      "type": "dock_assignment",
      "time": "13:02",
      "trustPolicy": "E4_REQUIRED_V1"
    },
    {
      "type": "loading_start",
      "time": "13:18",
      "trustPolicy": "E4_REQUIRED_V1"
    },
    {
      "type": "warehouse_exit",
      "time": "14:11",
      "trustPolicy": "E4_REQUIRED_V1"
    }
  ],
  "result": {
    "verifiedWaitingMin": 68,
    "carrierAttributableMin": 0,
    "warehouseAttributableMin": 68
  },
  "conclusion": "Warehouse responsible for 68 minutes"
}
```

## Cargo Condition

```json
{
  "ruleId": "CARGO_TEMP_V1",
  "claimType": "Cargo Condition",
  "contractRange": {
    "min": 2,
    "max": 8,
    "unit": "C"
  },
  "trustPolicy": "E4_REQUIRED_V1",
  "conclusion": "Committed measurements from E4 sources stayed within range"
}
```

## Exception Types

- `traffic`
- `weather`
- `geofence`
- `vehicle_breakdown`
- `warehouse_queue`
- `border_delay`

## Trust Policy

Rules reference Trust Policy, not just Trust Level.

Example: E4_REQUIRED_V1

A claim is valid only if all required sources satisfy the policy.

## Design Notes

- Rules are versioned. Changes create a new version.
- Rules reference Trust Policy.
- Conclusion is deterministic from input events and rule version.
- DSL is machine-readable and AI-friendly.