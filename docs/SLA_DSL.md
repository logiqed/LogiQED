# LogiQED SLA DSL

SLA rules are expressed in a simple, versioned format.

## Purpose

Define when a shipment is late, what counts as an exception, and how responsibility is assigned.

## Rule Structure

```json
{
  "ruleId": "SLA_V3.2",
  "claimType": "SLA Exception",
  "eta": "13:55",
  "arrival": "14:37",
  "grossDelayMin": 42,
  "exceptions": [
    {
      "type": "traffic",
      "durationMin": 31,
      "trustLevel": "E4"
    },
    {
      "type": "warehouse_queue",
      "durationMin": 16,
      "trustLevel": "E3"
    }
  ],
  "chargeableDelayMin": 0,
  "conclusion": "No penalty"
}
```

## Exception Types

- `traffic`
- `weather`
- `geofence`
- `vehicle_breakdown`
- `warehouse_queue`
- `border_delay`

## Design Notes

- Rules are versioned. Changes create a new version.
- Exceptions require Trust Level.
- Conclusion is deterministic from input events and rule version.
- DSL is machine-readable and AI-friendly.