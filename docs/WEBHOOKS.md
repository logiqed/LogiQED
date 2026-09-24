# LogiQED Webhooks

Webhooks allow external systems and AI agents to receive events from LogiQED without polling.

## Overview

LogiQED sends signed HTTP POST requests to registered webhook URLs.

Subscribers acknowledge with HTTP 2xx. LogiQED retries on failure.

## Event Types

| Event                       | Description                                                    |
|-----------------------------|----------------------------------------------------------------|
| evidence.accepted           | Signed event ingested and accepted                             |
| route.state_changed         | Route State Machine transition                                 |
| claim.decision_recorded     | Claim closed as confirmed or rejected                          |
| sla.evaluated               | SLA evaluation completed                                       |
| evidence.package.base       | Evidence Package Base produced and anchored                    |
| evidence.package.interim    | Evidence Package Interim produced with a claim level change    |
| evidence.package.full       | Evidence Package Full produced on dispute request              |
| claim.verified              | Claim verification finished                                    |
| trip.anchor.created         | Trip Evidence Root produced and anchored                       |

## Registering a Webhook

### Endpoint

`POST /api/webhooks`

### Request

```json
    {
      "url": "https://subscriber.example.com/hooks/logiqed",
      "events": ["evidence.accepted", "route.state_changed", "evidence.package.base"],
      "secret": "optional-client-generated-secret",
      "description": "Alerts for dispatch team"
    }
```

If secret is not provided, LogiQED generates one and returns it once.

### Response

```json
    {
      "webhookId": "wh_01HZ...",
      "url": "https://subscriber.example.com/hooks/logiqed",
      "events": ["evidence.accepted", "route.state_changed", "evidence.package.base"],
      "secret": "generated-secret-if-created",
      "status": "ACTIVE"
    }
```

Important: The secret is shown only once. Store it safely.

### Supporting Endpoints

| Method | Path                             | Description         |
|--------|----------------------------------|---------------------|
| GET    | /api/webhooks                    | List subscriptions  |
| GET    | /api/webhooks/{id}               | Get subscription    |
| DELETE | /api/webhooks/{id}               | Remove subscription |
| POST   | /api/webhooks/{id}/rotate-secret | Rotate secret       |
| POST   | /api/webhooks/{id}/ping          | Send test event     |

## Delivery Format

LogiQED sends HTTP POST with JSON body.

### Headers

| Header              | Description               |
|---------------------|---------------------------|
| X-LogiQED-WebhookId | Webhook subscription ID   |
| X-LogiQED-Event     | Event type                |
| X-LogiQED-Timestamp | Unix timestamp in seconds |
| X-LogiQED-Signature | HMAC-SHA256 hex           |
| Content-Type        | application/json          |

### Body

```json
    {
      "schemaVersion": "1.0",
      "eventId": "evt_01HZ...",
      "eventType": "route.state_changed",
      "occurredAt": "2026-08-25T09:15:00Z",
      "data": {
        "shipmentId": "shp_01HZ...",
        "from": "InTransit",
        "to": "SLA_PAUSED",
        "reason": "TrafficEntered"
      }
    }
```

## Signature Verification

Subscribers must verify the signature before processing.

Signature is HMAC-SHA256 of timestamp + "." + rawBody.

The signature is computed over the raw request body bytes, not the parsed JSON. Any whitespace or field reordering changes the signature.

Verify the timestamp is not older than 5 minutes.

Use constant-time comparison.

## Retry Policy

| Attempt | Delay       |
|---------|-------------|
| 1st     | 1 minute    |
| 2nd     | 5 minutes   |
| 3rd     | 30 minutes  |

After 3 failures:

- Webhook marked DEGRADED.
- Event goes to dead-letter queue.
- No further deliveries attempted until the webhook is manually re-enabled.

## Idempotency

LogiQED may deliver the same event more than once.

Subscribers must deduplicate by eventId.

## Timeouts

LogiQED waits 10 seconds for an HTTP response.

If no response, retry per policy.

## Security

- HTTPS is required for webhook URLs.
- Payloads are signed with HMAC-SHA256.
- Secrets are stored hashed server-side.
- Secrets can be rotated without downtime.
- Webhook URLs are validated with SSRF protection.
- Payloads are minimal and contain no raw telemetry.

## Example: Evidence Accepted

```json
    {
      "schemaVersion": "1.0",
      "eventId": "evt_01HZ...",
      "eventType": "evidence.accepted",
      "occurredAt": "2026-08-25T08:30:00Z",
      "data": {
        "shipmentId": "shp_01HZ...",
        "sourceId": "src_01HZ...",
        "trustEvaluation": {
          "sourceAssurance": "E3",
          "trustPolicy": "E3_REQUIRED_V1",
          "evaluationStatus": "PASS"
        }
      }
    }
```

## Example: Claim Decision Recorded

```json
    {
      "schemaVersion": "1.0",
      "eventId": "evt_01HZ...",
      "eventType": "claim.decision_recorded",
      "occurredAt": "2026-08-25T10:00:00Z",
      "data": {
        "shipmentId": "shp_01HZ...",
        "claimId": "clm_01HZ...",
        "claimType": "TRAFFIC",
        "decision": "CONFIRMED",
        "claimLevel": "E2"
      }
    }
```

## Example: Evidence Package Base Created

```json
    {
      "schemaVersion": "1.0",
      "eventId": "evt_01HZ...",
      "eventType": "evidence.package.base",
      "occurredAt": "2026-08-25T10:05:00Z",
      "data": {
        "shipmentId": "shp_01HZ...",
        "claimId": "clm_01HZ...",
        "packageId": "pkg_01HZ...",
        "packageForm": "BASE",
        "claimLevel": "E2",
        "claimEvidenceRoot": "0x4b12...",
        "claimExternalAnchorRef": "arweave:kT4c..."
      }
    }
```

## Example: Evidence Package Interim Produced

```json
    {
      "schemaVersion": "1.0",
      "eventId": "evt_01HZ...",
      "eventType": "evidence.package.interim",
      "occurredAt": "2026-08-25T12:40:00Z",
      "data": {
        "shipmentId": "shp_01HZ...",
        "claimId": "clm_01HZ...",
        "packageForm": "INTERIM",
        "previousClaimLevel": "E3",
        "claimLevel": "E4",
        "newSourcesSinceLastRun": 1,
        "corroborationRunAt": "2026-08-25T12:40:00Z"
      }
    }
```

## Example: Evidence Package Full Created

```json
    {
      "schemaVersion": "1.0",
      "eventId": "evt_01HZ...",
      "eventType": "evidence.package.full",
      "occurredAt": "2026-08-25T18:10:00Z",
      "data": {
        "shipmentId": "shp_01HZ...",
        "claimId": "clm_01HZ...",
        "packageId": "pkg_01HZ...",
        "packageForm": "FULL",
        "claimLevel": "E4",
        "proofAvailable": true,
        "claimEvidenceRoot": "0x4b12...",
        "claimExternalAnchorRef": "arweave:kT4c..."
      }
    }
```

## Example: Trip Anchor Created

```json
    {
      "schemaVersion": "1.0",
      "eventId": "evt_01HZ...",
      "eventType": "trip.anchor.created",
      "occurredAt": "2026-08-25T18:00:00Z",
      "data": {
        "shipmentId": "shp_01HZ...",
        "tripEvidenceRoot": "0x8f3a...",
        "tripExternalAnchorRef": "arweave:kT4b..."
      }
    }
```

## Example: SLA Evaluated

```json
    {
      "schemaVersion": "1.0",
      "eventId": "evt_01HZ...",
      "eventType": "sla.evaluated",
      "occurredAt": "2026-08-25T10:00:00Z",
      "data": {
        "shipmentId": "shp_01HZ...",
        "ruleId": "DETENTION_V1",
        "ruleVersion": "1.0",
        "conclusion": "Warehouse attributable: 68 min",
        "confidence": "PASS"
      }
    }
```

## Example: Claim Verified

```json
    {
      "schemaVersion": "1.0",
      "eventId": "evt_01HZ...",
      "eventType": "claim.verified",
      "occurredAt": "2026-08-25T14:05:00Z",
      "data": {
        "claimId": "clm_01HZ...",
        "claimType": "DETENTION",
        "claimLevel": "E4",
        "decision": "CONFIRMED",
        "result": "VALID"
      }
    }
```

## Design Notes

- Webhooks are for real-time events, not archival.
- Delivery is best-effort. Use the API for confirmation.
- Events are also retrievable via REST API.
- Payloads are backward compatible. New fields are additive.
- Subscribers can filter by event type at registration.
- Dead-letter events can be replayed via API.
- Trip Evidence Root anchors and Evidence Package Base are produced for every route and every claim.
- `evidence.package.interim` is emitted only when the claim level changes compared to the previous CorroborationRun. Re-running the Interim without a claim level change does not emit a webhook. This avoids webhook noise during the route while keeping subscribers informed of meaningful claim level transitions.

## Related

- [Evidence Flow](EVIDENCE_FLOW.md) - three evidence levels and the Interim state
- [Evidence Builder](EVIDENCE_BUILDER.md) - implementation specification and Interim package
- [Evidence Package](EVIDENCE.md) - package structure
- [Communication](COMMUNICATION.md) - delivery journal and audit
- [OpenAPI](OPENAPI.yaml) - REST endpoints