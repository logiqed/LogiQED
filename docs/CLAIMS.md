# LogiQED ZK Claims

MVP ships with two cryptographic claims.

## Claim Definition Format

Each claim follows the same structure:

- Claim ID
- Version
- Input events required
- Rule reference
- Trust Policy requirement
- Expected output
- Edge case handling
- Signature and publication
- Formal verification reference for the rule (optional in MVP)

## Versioning

A claim is verified only with the rule version that was active at the time of the underlying events.

If a rule changes after events were recorded, the claim refers to the old version. The rule version is part of the signed package and cannot be substituted.

Example:

- Events recorded on 2026-08-27 use rule version 1.0.
- Rule updated on 2026-09-15 to version 1.1.
- Claims for 2026-08-27 events still reference version 1.0.
- The verifier checks that the stored version matches the version that was active at the time of the events.

## Claim Level and ZK Proof

A claim carries two distinct values:

- **Own assurance** of each source. Computed in Ingest. Does not change with corroboration.
- **Claim level** of the claim. Computed in the Evidence Builder. Is the maximum among independent sources that confirm the fact.

A claim is produced for every recorded incident, whether the claim is confirmed or rejected.

ZK proof is generated only on dispute request, and only when the claim level is E3 or higher. Below E3, the Evidence Package Base is still produced and anchored, but no ZK proof is generated.

Example:

- Mobile App only (E1): claim level E1. No ZK proof.
- Mobile App (E2, signed): claim level E2. No ZK proof.
- Onboard tracker (E3): claim level E3. ZK proof available.
- Tracker (E3) + tracker (E3): claim level E4. ZK proof available.
- Tracker (E3) + warehouse gate (E2): claim level E4. ZK proof available.

See [Trust Levels](TRUST_LEVELS.md) for the full rules.

---

## Claim 1: Detention / Warehouse Waiting Claim

Deterministic claim based on timestamps, geofences and independent events.

### Inputs

```json
    {
      "claimType": "detention",
      "version": "1.0",
      "inputs": {
        "appointmentTime": "2026-08-27T12:00:00Z",
        "geofenceEntry": "2026-08-27T11:54:00Z",
        "dockAssignment": "2026-08-27T13:02:00Z",
        "loadingStart": "2026-08-27T13:18:00Z",
        "warehouseExit": "2026-08-27T14:11:00Z"
      }
    }
```

![Detention Timeline](images/diagram-detention-timeline.svg)

### Rule

The waiting interval is calculated from the earliest relevant timestamp to the start of loading.

In the reference example:

- Geofence entry: 11:54
- Loading start: 13:18
- Dock assignment: 13:02

Verified waiting is the interval between geofence entry and loading start.

Warehouse-attributable waiting is the interval between geofence entry and dock assignment.

Carrier-attributable waiting is the interval between dock assignment and loading start.

### Output

```json
    {
      "claimId": "det-001",
      "version": "1.0",
      "result": {
        "waiting_min": 68,
        "warehouse_min": 68,
        "carrier_min": 0,
        "breakdown": [
          {
            "from": "11:54",
            "to": "13:02",
            "label": "waiting_for_dock",
            "minutes": 68
          },
          {
            "from": "13:02",
            "to": "13:18",
            "label": "dock_assignment",
            "minutes": 16
          },
          {
            "from": "13:18",
            "to": "14:11",
            "label": "loading",
            "minutes": 53
          }
        ],
        "ruleId": "sla-detention-v1",
        "ruleVersion": "1.0",
        "claimLevel": "E4"
      },
      "signature": "ed25519:...",
      "proof": "zk:..."
    }
```

The field names match the SLA Engine evaluation result in [SLA DSL](SLA_DSL.md). The claim output is a public representation derived from that result.

### Edge Cases

- Geofence crossed twice: the first geofence entry is authoritative for the claim.
- Signal lost inside geofence: loading start is taken from the first signed event after signal restoration.
- Dock assignment earlier than geofence entry: assignment is treated as occurring at geofence entry.
- Warehouse exit missing: claim can be generated with loading start as the closing boundary.
- Late payload: event timestamp is used, not server receive time.
- Clock skew between device and server: device timestamp is used when within the allowed skew window. Beyond the window, the event is flagged and the claim is INCONCLUSIVE.
- Events from different timezones: all timestamps are normalized to UTC before evaluation. The rule operates on UTC values.

### Verification

The claim is verified against the rule version stored in the package.

The verifier checks:

- Timestamp ordering
- Rule version
- Trust policy result
- Claim level
- Signature
- Proof validity, when present
- Formal verification result, when available

---

## Claim 2: Cargo Condition Claim

Proves that committed measurements produced by sources satisfying trust policy E4 remained within contract range during the custody interval.

### Inputs

- Measurements from E4 sources
- Contract range
- Custody interval
- Sensor tolerance

Reference example:

- Contract: 2.0-8.0 °C
- Trip: EU lane
- Tolerance: 0.1 °C

### Rule

All committed measurements must be within the contract range extended by sensor tolerance.

A measurement is valid when:

- value >= minBound - tolerance
- value <= maxBound + tolerance

The claim is VALID only when every committed measurement satisfies the rule.

### Output

```json
    {
      "claimId": "cargo-temp-001",
      "version": "1.0",
      "result": {
        "status": "VALID",
        "contractRange": {
          "min": 2.0,
          "max": 8.0,
          "unit": "C"
        },
        "tolerance": 0.1,
        "rangeCheck": {
          "effectiveMin": 1.9,
          "effectiveMax": 8.1,
          "observedMin": 3.4,
          "observedMax": 7.6,
          "result": "VALID"
        },
        "statistics": {
          "min": 3.4,
          "max": 7.6,
          "avg": 4.2,
          "count": 1440
        },
        "sources": [
          {
            "sourceId": "sensor_01HZ...",
            "ownAssurance": "E4"
          }
        ],
        "ruleId": "cargo-temp-v1",
        "ruleVersion": "1.0",
        "claimLevel": "E4"
      },
      "signature": "ed25519:...",
      "proof": {
        "backend": "ALIGNED_LAYER_MOCK",
        "proofHash": "0x..."
      }
    }
```

### Edge Cases

- Mixed trust levels: only E4 sources are used for the claim.
- Sensor gap: custody interval is covered only where E4 measurements exist.
- Late payload: event timestamp is used, not server receive time.
- Multiple sensors: all E4 sensors must agree within tolerance.
- Tolerance exceeded: if any committed measurement falls outside the effective range, the status is INVALID and the offending measurement is included in the output.
- Source gap beyond threshold: if the coverage of the custody interval by E4 measurements falls below the configured threshold, the status is INCONCLUSIVE.

---

## Why These Two

- Detention claim is deterministic and easy to verify.
- Cargo condition claim covers cold chain.
- Both are valuable for settlement and insurance.

---

## Proof and Signature Format

Both claims carry the same envelope:

- `signature` - Ed25519 signature over the canonical form of the claim.
- `proof` - ZK proof or a reference to the proof backend. Present only when the claim level is E3 or higher, and only in the Evidence Package Full.

In MVP, the proof backend is mocked. The signature is real.

## Formal Verification

Formal verification reference is optional in MVP. When available, it is included as:

```json
    {
      "formalVerification": {
        "reference": "fv-detention-v1.pdf",
        "hash": "0x...",
        "status": "VERIFIED"
      }
    }
```

The verifier checks the reference and hash when the field is present. When absent, the claim is still verifiable by signature and proof.

---

## Related

- [Trust Levels](TRUST_LEVELS.md) - own assurance and claim level
- [Evidence Flow](EVIDENCE_FLOW.md) - three evidence levels and the Interim state
- [Evidence Package](EVIDENCE.md) - package structure
- [Evidence Builder](EVIDENCE_BUILDER.md) - implementation specification and Interim package
- [SLA DSL](SLA_DSL.md) - rule format and evaluation result