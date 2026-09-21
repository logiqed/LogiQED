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

Not every source can provide all seven dimensions. A truck tracker, a mobile app and a browser deliver different subsets. This determines the maximum level each source type can reach.

| Dimension | Truck tracker | Mobile app (third-party) | Browser (PWA) |
|-----------|---------------|--------------------------|---------------|
| Identity | Yes | Partial | Partial |
| Authentication | Yes | Yes | Partial |
| Integrity | Yes | **No** | **No** |
| Attestation | Yes | **No** | **No** |
| Metrology | Yes | **No** | **No** |
| Time | Yes | Partial | **No** |
| Provenance | Yes | Partial | **No** |
| **Max level** | **E3** (E4 with corroboration) | **E1** | **E0-E1** |

The server does not ask a source for dimensions it cannot provide. A browser reaches E0 without authentication and E1 with a logged-in session. A third-party mobile app never exceeds E1, because it cannot attest the device or sign the payload. A truck tracker reaches E3, and E4 only with corroboration from an independent source.

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
      "sources": ["device", "warehouse_api"],
      "corroboration": "REQUIRED",
      "acceptLowerWithWarning": false
    }
```

A claim is valid only if all required sources satisfy the policy.

### Typical Trust Level by Claim Type

Different claims require different minimum trust levels. The level is set by policy, not by the source alone.

| Claim type | Typical minTrustLevel | Why |
|-----------|----------------------|-----|
| Detention / Warehouse Waiting | E4 | Requires corroboration - tracker plus warehouse gate |
| Cargo Condition | E4 | Requires tracker plus temperature sensor |
| Road stop | E2 | Single source is enough - the tracker |
| Traffic | E2 | Tracker plus external traffic API, called on demand |
| Position in transit | E1 | Authenticated API is enough |

## Claim Confidence

Claim Confidence is the result of evaluating a specific claim against its Trust Policy.

Example:

- Source A: E4
- Source B: E2
- Policy: E4_REQUIRED_V1
- Result: FAIL

Source B does not satisfy the requirement.

## Provenance and Source Independence

Three sources are not necessarily independent.

GPS and geofence may derive from the same signal.

Rule: E5 is assigned only when the Evidence Graph confirms independence.

| Level | Requirement |
|-------|-------------|
| E4 | Corroboration with another source |
| E5 | Three or more independent sources, confirmed in the Evidence Graph |

Independence is not just different SourceId values. It means the data does not come from the same physical sensor or signal.

## On-Demand Oracle and Trust

External APIs are called only when an incident occurs.

Each call adds a source to the claim.

The Enrichment Decider determines whether external confirmation is required.

## Trust Levels on the Route

A moving truck rarely reaches E4 or E5 for position claims. The reason is physical: GPS, CAN and geofence often come through one gateway - one source, not three.

| Context | Typical level | Why |
|---------|--------------|-----|
| Moving on the road | E1-E2 | Single physical channel, no corroboration |
| At warehouse or border | E3-E4 | External API corroboration |
| Multi-sensor critical claim | E5 | Three independent sources |

E4 and E5 appear at fixed points where external systems join the claim, not on the open road.

## Source Availability and Fallback

A truck may already have onboard GPS. Or it may have none. The system supports both cases, and the choice affects the achievable trust level.

| Situation | Recommended source | Why | Typical level |
|-----------|-------------------|-----|---------------|
| Onboard GPS present | Onboard tracker only | Higher trust, no need for extra app | E3 (E4 with corroboration) |
| No onboard GPS | Third-party app or Tracker App | Only way to get telemetry without hardware | E1-E2 |
| Onboard GPS present, but data needed by multiple systems | Onboard tracker with dual-server | Sends to existing server and LogiQED in parallel | E3 (E4 with corroboration) |
| Onboard GPS present, single-server only | Onboard tracker + local bridge | Forwarding through existing telematics platform | E3 (E4 with corroboration) |

### Why a Second Source Does Not Always Help

Adding a weaker source next to a stronger one does not raise the trust level. Corroboration requires independence, not just two sources.

- Onboard tracker: E3
- Third-party app on the same trip: E1
- Combined: still E3

The weaker source adds no value for trust. It may still be useful for redundancy or for drivers without onboard hardware.

### How Data Reaches LogiQED

Onboard trackers send data to LogiQED in one of three ways:

1. Dual-server configuration - tracker sends to its existing server and to LogiQED in parallel. Nothing on the carrier side changes.
2. Data forwarding - an existing telematics platform forwards the stream to LogiQED. Depends on platform support and protocol.
3. Endpoint replacement - tracker is reconfigured to point at LogiQED. Only used with carrier consent, and only when no other option exists.

The first option is preferred. The carrier keeps existing monitoring, and LogiQED receives its own copy of the stream.

### What This Means for Trust

A source is registered once, with its own capabilities. Adding a second source does not change the first source's dimensions. Each source is evaluated independently, and the claim confidence is the result of applying the trust policy to all required sources.

If a claim requires E4, and the only onboard tracker provides E3, a second weaker source will not satisfy the policy. A genuinely independent source at E3 or higher is required - for example, a warehouse gate API or a second vehicle confirming the same event.

## Claim Pipeline and Network Effect

Every in-transit claim follows the same pipeline. This is the core mechanism that turns a driver's button press into verifiable evidence.

### The Four Steps

1. Driver reports an incident - E0. The claim is a statement, not proof.
2. The system checks its own data - GPS track, CAN bus, telemetry. This confirms the physical situation.
3. The system calls an external API on demand - traffic, weather, road conditions. This adds an independent source.
4. If other vehicles report the same event in the same geofence and time window - corroboration. The claim reaches E4.

### Example: Traffic

| Step | Source | What it confirms | Level |
|------|--------|-----------------|-------|
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

| Vehicles on the segment | Achievable level | Why |
|------------------------|-----------------|-----|
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
      "sourceType": "TRACKER",
      "attestationType": "SECURE_ENCLAVE",
      "firmwareVersion": "1.2.0",
      "revocationStatus": "ACTIVE"
    }
```

The server computes Source Assurance and Trust Policy result.

The client never supplies the trust level.

### Source Types and Who Sends Data

Each source type has its own registration path, authentication method, and typical level.

| Source | Who sends | How it authenticates | Who registers |
|--------|-----------|---------------------|---------------|
| Browser (PWA) | Driver device | Session | Automatic on login |
| Tracker App (mobile) | Driver app | X-Telemetry-Key | Admin issues key |
| Third-party GPS app | Driver app | X-Telemetry-Key | Admin issues key |
| External tracker | Vehicle device | Device certificate | Admin |
| Warehouse API | Partner system | API key | Admin or partner |
| Manual input | Operator | Session | System |

The difference between Tracker App and Third-party GPS app is not who operates it, but who controls the code. Tracker App is issued by LogiQED with a key. A third-party app is any external client that follows the ingestion contract.

### Ingestion Contract for Third-Party Sources

Any client that can send an HTTP request can become a source. The contract is intentionally minimal.

Required:

- HTTP endpoint: POST to the LogiQED ingest URL.
- Header: X-Telemetry-Key: with the secret issued by the admin.
- Body: JSON payload with latitude, longitude, timestamp and accuracy.

Optional, but improves the achievable trust level:

- Signed payload - moves the source from E1 toward E2.
- Device attestation - moves the source toward E3.
- Reported accuracy - enables the Metrology dimension.
- Clock synchronization - enables the Time dimension.

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
6. Compute Source Assessment.
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
      "sources": [
        {
          "sourceId": "device-042",
          "trustLevel": "E4",
          "attestation": "SECURE_ENCLAVE"
        },
        {
          "sourceId": "warehouse-api-01",
          "trustLevel": "E2"
        }
      ]
    }
```

A verifier can check the trust policy result without raw telemetry.

## Design Principles

- Source Assurance is a server-side evaluation, not a client claim.
- The client never supplies the trust level.
- E5 requires independent sources confirmed in the Evidence Graph.
- Claim Confidence is the result of applying Trust Policy, not a separate number.
- Trust levels are combinations of dimensions, not a single value.
- A source is not asked for dimensions it cannot provide.