# LogiQED Trust Model

## Source Assurance

Source Assurance is a server-side evaluation of a source across seven dimensions:

1. Identity - who the source is
2. Authentication - how the source proves identity
3. Integrity - data validity through hashes and signatures
4. Attestation - hardware or software context confirmation
5. Metrology - calibration and accuracy
6. Time - clock accuracy and synchronization
7. Provenance - origin of the data

Each dimension is evaluated independently. The final level is a combination of dimensions, not a single value.

### Dimensions by Source Type

Not every source can provide all seven dimensions. A truck tracker, a mobile app and a browser deliver different subsets. This determines the maximum own assurance each source type can reach.

| Dimension | Truck tracker | Mobile app (third-party) | Browser (PWA) |
|-----------|---------------|--------------------------|---------------|
| Identity | Yes | Partial | Partial |
| Authentication | Yes | Yes | Partial |
| Integrity | Yes | **No** | **No** |
| Attestation | Yes | **No** | **No** |
| Metrology | Yes | **No** | **No** |
| Time | Yes | Partial | **No** |
| Provenance | Yes | Partial | **No** |
| **Max own assurance** | **E3** | **E2** | **E0-E1** |

Own assurance is the level of a single source. It does not change with corroboration.

A claim formed from independent sources can be higher than any single source. Two sources at E3 produce a claim at E4. Three independent sources produce E5. See Claim Level and Corroboration below.

A browser will never reach E3. A truck tracker reaches E3. A third-party mobile app reaches E2 if it signs the payload with a key. Without signing, it stays at E1. It cannot reach E3 because it cannot prove device attestation from Secure Enclave or StrongBox. Most third-party apps do not implement either.

### Trust Levels

| Level | Description |
|-------|-------------|
| E0 | Manual input, basic authentication |
| E1 | Authenticated external API |
| E2 | Signed software source |
| E3 | Attested device, TPM or Secure Element |
| E4 | E3 plus corroboration with another source |
| E5 | E4 plus three or more independent sources |

![Trust Levels](images/diagram-trust-levels.svg)

## Trust Policy

```json
    {
      "policyId": "E4_REQUIRED_V1",
      "version": 1,
      "minTrustLevel": "E4",
      "primarySource": {
        "type": "device",
        "minLevel": "E3"
      },
      "corroboratingSources": [
        {
          "type": "warehouse_api",
          "minLevel": "E2"
        },
        {
          "type": "another_device",
          "minLevel": "E3"
        }
      ],
      "corroboration": "REQUIRED",
      "independence": "REQUIRED"
    }
```

A claim is valid only if all required sources satisfy the policy.

### Typical Trust Level by Claim Type

Different claims require different minimum trust levels. The level is set by policy, not by the source alone.

| Claim type | Typical minTrustLevel | Primary source | Corroborating source |
|-----------|----------------------|----------------|---------------------|
| Detention / Warehouse Waiting | E4 | Tracker (E3) | Warehouse gate API (E2) |
| Cargo Condition | E4 | Tracker (E3) | Temperature sensor with Secure Element (E3) |
| Road stop | E2 | Tracker (E3) | None |
| Traffic | E2 | Tracker (E3) | Traffic API (E1), context only |
| Position in transit | E1 | Any authenticated source | None |

The claim level is the maximum level among independent sources, not the minimum.

## Claim Confidence

Claim Confidence is the result of evaluating a specific claim against its Trust Policy.

The claim level is the maximum level among independent sources that confirm the fact.

Example:

- Source A: E4 (primary)
- Source B: E2 (corroborating)
- Policy: E4_REQUIRED_V1
- Claim level: E4
- Result: PASS

Counter-example:

- Source A: E3 (primary)
- No independent source reaches E3
- Policy: E4_REQUIRED_V1
- Claim level: E3
- Result: FAIL

## Provenance and Source Independence

Three sources are not necessarily independent.

GPS and geofence may derive from the same signal.

Rule: E5 is assigned only when the Evidence Graph confirms independence.

| Level | Requirement |
|-------|-------------|
| E4 | Corroboration with another source |
| E5 | Three or more independent sources, confirmed in the Evidence Graph |

Independence is not just different SourceId values. It means the data does not come from the same physical sensor or signal.

## Claim Level and Corroboration

A claim is formed from one or more independent sources that confirm the same fact.

### Claim Level Rule

The claim level is the **maximum** level among independent sources that confirm the fact.

It is not the minimum. Weaker sources do not pull the level down.

Examples:

| Sources | Corroboration | Claim level |
|---------|--------------|-------------|
| Mobile App only (E1, unsigned) | — | E1 |
| Mobile App only (E2, signed) | — | E2 |
| Mobile App (E1) + Mobile App (E1) | Yes | E1 |
| Mobile App (E2) + Mobile App (E2) | Yes | E2 |
| Mobile App (E1) + Tracker (E3) | Yes | E3 |
| Tracker (E3) only | — | E3 |
| Tracker (E3) + Tracker (E3) | Yes | E4 |
| Tracker (E3) + Warehouse gate (E2) | Yes | E4 |
| Tracker (E3) + Traffic API (E1) | Yes | E3 |

### When to Ignore a Weak Source

A weak source is ignored when a stronger independent source confirms the same fact.

Ignoring prevents weaker sources from pulling the claim level down.

Example: a driver has both a mobile app and an onboard tracker. The tracker provides E3. The mobile app provides E1. The claim level is E3. The mobile app is ignored.

### When a Weak Source Matters

A weak source is the primary source when no stronger source confirms the fact.

Example: a driver with only a mobile app reports a traffic jam. No tracker is nearby. Claim level = E1. It is enough for operational tracking, not for dispute resolution.

### What Corroboration Requires

Two conditions must be satisfied for corroboration to raise a claim to E4:

1. **Primary source must be at E3 or higher.** A claim below E3 stays at the level of the strongest source.
2. **Corroborating source must be at E2 or higher.** A source at E1 adds context but does not raise the claim to E4.

Below these thresholds, the claim stays at the level of the strongest source.

Examples:

| Primary source | Corroborating sources | Claim level | Comment |
|---------------|----------------------|-------------|---------|
| E1 | none | E1 | Single source |
| E1 | E1 | E1 | Corroboration does not raise. Strongest source is E1 |
| E1 | E1 + E1 | E1 | Three weak sources still do not raise |
| E2 | none | E2 | Single source |
| E2 | E2 | E2 | Corroboration does not raise. Strongest source is E2 |
| E2 | E3 | **E3** | Corroboration does not raise. Primary is below E3, so claim stays at the strongest source level, which is E3 |
| E3 | none | E3 | Single attested source |
| E3 | E1 (traffic API) | E3 | Corroboration does not raise. E1 is below the E2 threshold |
| E3 | E2 (warehouse gate) | **E4** | Corroboration raises. Primary E3, corroborating E2 |
| E3 | E2 + E2 | **E4** | Primary E3, two corroborating at E2. Claim level E4, not E5 |
| E3 | E3 | **E4** | Corroboration raises. Both sources at E3 |
| E3 | E3 + E3 | **E5** | Three independent sources at E3, confirmed in the Evidence Graph |

Notes:

- **Own assurance of each source does not change.** A source registered as E2 stays at E2 in the source registry. Only the claim level is affected.
- **Claim level is one value for the whole claim.** It is not "E3 for machine A, E4 for machine B". It is the maximum level among independent sources that confirm the fact.
- **A weaker source is ignored** when a stronger independent source confirms the same fact. Example: a tracker at E3 plus a mobile app at E1 produces an E3 claim. The mobile app does not pull the claim level down, but it does not raise it either.

The claim level is monotonically non-decreasing over time. A later corroboration run cannot find fewer independent sources than an earlier one. The final claim level in the Evidence Package Full is never lower than the claim level in an earlier Evidence Package Interim.

See [Evidence Builder](EVIDENCE_BUILDER.md) for the full statement.

### Where Corroboration Is Requested

Corroboration is applied by the Evidence Builder.

Two moments:

- **During the route, after claim close.** Available as an Evidence Package Interim run. This produces an updated claim level for operational decisions, before the Trip Evidence Root is finalized. The result is stored as a CorroborationRun record. It is not anchored and does not modify Evidence Package Base.
- **On dispute request, after route close.** Produces the final claim level used in the Evidence Package Full. This is the level that appears in the signed, anchored artifact.

Corroboration is not applied by Ingest API, State Machine, or Orchestrator.

### External APIs and Corroboration

External APIs are not called during corroboration.

Their responses were captured at claim open by the On-Demand Oracle and recorded as events in Evidence Package Base. Corroboration reads those existing events plus any independent sources already present in MS SQL and the Evidence Graph.

The corroboration operation is therefore local: a SQL lookup plus an Evidence Graph traversal. It is lightweight and can be re-run on demand.

See [Evidence Builder](EVIDENCE_BUILDER.md) for the pre-check query, the CorroborationRun storage, and the reuse of Interim at Full assembly.

The Evidence Builder:

1. Applies the Trust Policy for the claim.
2. Requests corroboration from independent sources.
3. Checks independence in the Evidence Graph.
4. Computes the claim level.
5. Produces Claim Confidence.

Retroactive corroboration works within the raw telemetry retention window. Raw positions are kept for 30 days. Aggregates are kept for 1 year.

### Why Weak Sources Do Not Combine

Corroboration confirms a fact. It does not make unsigned data signed.

- Five mobile apps reporting the same event without signing are still five E1 sources.
- Corroboration is not arithmetic. Attestation is a hardware property, not a count.

This protects against collusion among weak sources. A hundred E1 sources cannot simulate one E3 source.

### Independence Check

Two sources are not necessarily independent. Both may go through the same gateway.

The Evidence Graph records the source-of-source for each event. If two sources share a gateway, corroboration fails the independence check and the level remains at the primary source level.

## On-Demand Oracle and Trust

External APIs are called only when a claim opens.

Each call adds a source to the claim.

The Enrichment Decider determines whether external confirmation is required.

In MVP, exceptions are reported by the driver. The system does not poll external APIs continuously.

Once the API response is recorded, it becomes part of the claim events and is included in Evidence Package Base. Later corroboration uses the recorded response; it does not re-query the API.

## Trust Levels on the Route

A moving truck rarely reaches E4 or E5 for position claims. The reason is physical: GPS, CAN and geofence often come through one gateway - one source, not three.

| Context | Typical claim level | Why |
|---------|--------------------|-----|
| Moving on the road | E1-E2 | Single physical channel, no corroboration |
| At warehouse or border | E3-E4 | External API corroboration |
| Multi-sensor critical claim | E5 | Three independent sources |

E4 and E5 appear at fixed points where external systems join the claim, not on the open road.

## Source Availability and Fallback

A truck may already have onboard GPS. Or it may have none. The system supports both cases, and the choice affects the achievable own assurance.

| Situation | Recommended source | Why | Own assurance |
|-----------|-------------------|-----|---------------|
| Onboard GPS present | Onboard tracker only | Higher trust, no need for extra app | E3 |
| No onboard GPS | Third-party mobile app | Only way to get telemetry without hardware | E1 (E2 with signed payload) |
| Onboard GPS present, but data needed by multiple systems | Onboard tracker with dual-server | Sends to existing server and LogiQED in parallel | E3 |
| Onboard GPS present, single-server only | Onboard tracker + local bridge | Forwarding through existing telematics platform | E3 |

Own assurance is the level of a single source. It does not change with corroboration.

A claim formed from independent sources can be higher. A claim confirmed by a second vehicle or an external gate reaches E4. Three independent sources reach E5. See Claim Level and Corroboration above.

### Why a Second Source Does Not Always Help

Adding a weaker source next to a stronger one does not raise the trust level. Corroboration requires independence and a minimum level.

- Onboard tracker: E3
- Third-party mobile app on the same trip: E1
- Combined: still E3

The weaker source adds no value for trust. It may still be useful for redundancy or for drivers without onboard hardware.

### How Data Reaches LogiQED

Onboard trackers send data to LogiQED in one of three ways:

1. Dual-server configuration - tracker sends to its existing server and to LogiQED in parallel. Nothing on the carrier side changes.
2. Data forwarding - an existing telematics platform forwards the stream to LogiQED. Depends on platform support and protocol.
3. Endpoint replacement - tracker is reconfigured to point at LogiQED. Only used with carrier consent, and only when no other option exists.

The first option is preferred. The carrier keeps existing monitoring, and LogiQED receives its own copy of the stream.

### What This Means for Trust

A source is registered once, with its own capabilities. Each source is evaluated independently.

The claim level is the maximum level among independent sources that confirm the same fact.

See [Claim Level and Corroboration](#claim-level-and-corroboration) for the full rules and examples.

## Claim Pipeline and Network Effect

Every in-transit claim follows the same pipeline. This is the core mechanism that turns a driver's button press into verifiable evidence.

### The Four Steps

1. Driver reports an incident - E0. The claim is a statement, not proof.
2. The system checks its own data - GPS track, CAN bus, telemetry. This confirms the physical situation. E2.
3. The system calls an external API on demand - traffic, weather, road conditions. This adds an independent source. E1 or E2.
4. The claim is confirmed or rejected. If confirmed, SLA pauses. If rejected, SLA continues.

If other vehicles report the same event in the same segment and time window, retroactive corroboration raises the claim level on dispute request.

The same pipeline applies to all six exception types. Only the trigger and the external API differ.

| Exception | Own data | External API |
|-----------|----------|--------------|
| Traffic | GPS speed, CAN | Traffic API |
| Weather | GPS speed, route deviation | Weather API |
| Vehicle Breakdown | CAN, engine state | Roadside assistance API (optional) |
| Warehouse Queue | GPS inside warehouse geofence | Warehouse gate API |
| Geofence Wait | GPS inside geofence, time in zone | None |
| Border Delay | GPS inside border geofence, time in zone | Border or customs API |

CAN bus is an amplifier, not corroboration. It confirms vehicle state inside one source, but it does not create a new independent source. CAN and GPS typically arrive through the same telematics gateway.

### Example: Traffic

| Step | Source | What it confirms | Claim level |
|------|--------|-----------------|-------------|
| 1 | Driver | "There is a traffic jam" | E0 |
| 2 | GPS + CAN | Vehicle is stationary, engine running, brake pressed | E2 |
| 3 | Traffic API | Congestion confirmed on the segment | E2 (corroboration) |
| 4 | Other vehicles | Same standstill in the same place | E4 |

### CAN as Amplifier, Not Corroboration

CAN bus confirms vehicle state: speed, engine, brake, gear. It strengthens the claim inside one source, but it does not create a new independent source. CAN and GPS typically arrive through the same telematics gateway.

- CAN confirms the truck is stationary with engine running - a strong signal for a traffic standstill.
- CAN does not raise the trust level on its own.
- Corroboration still requires an external source: a traffic API, or another vehicle.

### The Network Effect

The pipeline scales with the number of vehicles in the system.

| Vehicles on the segment | Achievable claim level | Why |
|------------------------|-----------------------|-----|
| One vehicle, no API | E2 | Single source |
| One vehicle + traffic API | E2 | External confirmation |
| Two or more vehicles + API | E4 | Independent corroboration |

More vehicles produce more corroboration. One driver alone in the field reaches E2. Five vehicles on the same route reach E4 - not because the system changed, but because independent sources appeared naturally.

### Why This Matters

The evidence layer becomes stronger as the network grows. Each new vehicle is not just another customer - it is another potential corroboration source for every other vehicle on the same route.

This is the structural advantage of LogiQED. Trust is not declared. It is earned through independent confirmation, and the cost of confirmation drops with every vehicle added.

## MVP Implementation

### Source Identity Model

```json
    {
      "sourceId": "sensor_01HZ...",
      "keyId": "key_01HZ...",
      "sourceType": "ONBOARD_TRACKER",
      "attestationType": "SECURE_ENCLAVE",
      "firmwareVersion": "1.2.0",
      "revocationStatus": "ACTIVE"
    }
```

The server computes Own Assurance and Trust Policy result.

The client never supplies the trust level.

### Source Types and Who Sends Data

Each source type has its own registration path, authentication method, and typical own assurance.

| Source | Who sends | How it authenticates | Who registers |
|--------|-----------|---------------------|---------------|
| Browser (PWA) | Driver device | Session | Automatic on login |
| Mobile app (third-party) | Driver app | X-Telemetry-Key | Admin issues key |
| Onboard tracker | Vehicle device | Device certificate | Admin |
| Warehouse API | Partner system | API key | Admin or partner |
| Manual input | Operator | Session | System |

LogiQED does not build its own mobile app. Any third-party mobile application that follows the ingestion contract can become a source. The app controls the code. LogiQED controls the key and the ingestion endpoint.

### Ingestion Contract for Third-Party Sources

Any client that can send an HTTP request can become a source. The contract is intentionally minimal.

Required:

- HTTP endpoint: `POST` to the LogiQED ingest URL.
- Header: `X-Telemetry-Key` with the secret issued by the admin.
- Body: JSON payload with `latitude`, `longitude`, `timestamp` and `accuracy`.

Optional, but improves the achievable own assurance:

- Signed payload - adds Integrity, moves the source from E1 to E2.
- Reported accuracy - enables the Metrology dimension.
- Clock synchronization - enables the Time dimension.

Device attestation from Secure Enclave or StrongBox is theoretically possible but not implemented by any common third-party GPS logger. It would move the source to E3.

Recommended clients for pilots:

- iOS: HookTrace, FlowLocate, PostLocation - support custom HTTP endpoint, custom headers, background operation.
- Android: Colota and similar open-source loggers - support self-hosted endpoints, custom headers, offline buffering.

The same contract is used by LogiQED-owned clients, including the in-house warehouse module. A warehouse does not have to replace its WMS. LogiQED adds a thin integration layer - a webhook, a local edge agent, or a certified connector - that forwards selected events to the ingest endpoint.

## Evaluation Process

1. Receive event.
2. Verify signature.
3. Check identity, key, and certificate.
4. Check attestation when available.
5. Build provenance.
6. Compute Own Assurance.
7. Apply Trust Policy.
8. Produce Claim Confidence.

## Result in Evidence Package

```json
    {
      "trustPolicyResult": {
        "policyId": "E4_REQUIRED_V1",
        "version": 1,
        "result": "PASS",
        "evaluatedAt": "2026-08-27T15:00:00Z"
      },
      "claimLevel": "E4",
      "sources": [
        {
          "sourceId": "device-042",
          "ownAssurance": "E3",
          "attestation": "SECURE_ENCLAVE",
          "role": "primary"
        },
        {
          "sourceId": "warehouse-api-01",
          "ownAssurance": "E2",
          "role": "corroborating"
        }
      ]
    }
```

A verifier can check the trust policy result without raw telemetry.

Note: `ownAssurance` is the level of each source. `claimLevel` is the level of the whole claim, computed as the maximum among independent sources.

## ZK Proof Gating

ZK proof is generated only on dispute request, and only when the claim level is E3 or higher.

Below E3, the Evidence Package Base is still produced and anchored, but no ZK proof is generated.

Example:

- Mobile App only (E1): claim level E1. No ZK proof.
- Mobile App (E2, signed): claim level E2. No ZK proof.
- Onboard tracker (E3): claim level E3. ZK proof available.
- Tracker (E3) + tracker (E3): claim level E4. ZK proof available.

## Three Evidence Levels

| Level | What is produced | When |
|-------|------------------|------|
| Clean route | Signed events + Trip Evidence Root + Arweave anchor | Every route |
| Incident | + Evidence Package Base + Claim Evidence Root anchor | Every claim, confirmed or rejected |
| Disputed | + retroactive corroboration + ZK proof + new anchor | On dispute request |

The Trip Evidence Root is anchored for every route, clean or incident. This protects the data from substitution even if no dispute ever arises.

An Evidence Package Base is produced for every claim, confirmed or rejected.

An Evidence Package Interim can be assembled during the route, after claim close and before route close. It carries a current claim level based on the independent sources found so far, and does not modify Evidence Package Base.

## Design Principles

- Source Assurance is a server-side evaluation, not a client claim.
- The client never supplies the trust level.
- E5 requires independent sources confirmed in the Evidence Graph.
- Claim Confidence is the result of applying Trust Policy, not a separate number.
- Trust levels are combinations of dimensions, not a single value.
- A source is not asked for dimensions it cannot provide.
- A claim level is the maximum among independent sources, not the minimum.
- Corroboration requires at least one source at E3. Below E3, corroboration does not raise the level.
- Weak sources are ignored when a stronger independent source confirms the fact.
- Corroboration is a local operation. External APIs are not called during corroboration; their responses are already recorded in Evidence Package Base.
- ZK proof is generated only on dispute request, and only when the claim level is E3 or higher.

## Related

- [System Map](SYSTEM_MAP.md) - trust, state, and evidence in one page
- [Evidence Flow](EVIDENCE_FLOW.md) - three evidence levels and anchor rules
- [Evidence Builder](EVIDENCE_BUILDER.md) - Corroboration Preview and interim package specification
- [Architecture](ARCHITECTURE.md) - modules and boundaries
- [Event Pipeline](EVENT_PIPELINE.md) - vertical flow from device to SLA
- [SLA DSL](SLA_DSL.md) - rule format and evaluation result