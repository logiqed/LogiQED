# LogiQED Webhooks

Webhooks allow external systems and AI agents to receive events from LogiQED without polling.

## Overview

LogiQED sends signed HTTP POST requests to registered webhook URLs.

Subscribers acknowledge with HTTP 2xx. LogiQED retries on failure.

## Event Types

| Event                     | Description 						 |
|---------------------------|------------------------------------|
| evidence.accepted 		| Signed event ingested and accepted |
| route.state_changed 		| Route State Machine transition     |
| sla.evaluated 			| SLA evaluation completed           |
| claim.verified 			| Claim verification finished        |
| evidence.package.created  | Evidence Package generated         |

## Registering a Webhook

### Endpoint

POST /api/webhooks

### Request

```json
{
  "url": "https://subscriber.example.com/hooks/logiqed",
  "events": ["evidence.accepted", "route.state_changed", "sla.evaluated"],
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
  "events": ["evidence.accepted", "route.state_changed", "sla.evaluated"],
  "secret": "generated-secret-if-created",
  "status": "ACTIVE"
}
```

Important: The secret is shown only once. Store it safely.

### Supporting Endpoints

| Method | Path 							| Description 		  |
|--------|----------------------------------|---------------------|
| GET    | /api/webhooks 	                | List subscriptions  |
| GET    | /api/webhooks/{id}               | Get subscription 	  |
| DELETE | /api/webhooks/{id}               | Remove subscription |
| POST   | /api/webhooks/{id}/rotate-secret | Rotate secret 	  |
| POST   | /api/webhooks/{id}/ping          | Send test event 	  |

## Delivery Format

LogiQED sends HTTP POST with JSON body.

### Headers

| Header 			  | Description               |
|---------------------|---------------------------|
| X-LogiQED-WebhookId | Webhook subscription ID   |
| X-LogiQED-Event 	  | Event type                |
| X-LogiQED-Timestamp | Unix timestamp in seconds |
| X-LogiQED-Signature | HMAC-SHA256 hex           |
| Content-Type 		  | application/json          |

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
- Subscriber receives webhook.disabled event when enabled.

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
      "trustLevel": "E4",
      "trustPolicy": "E4_REQUIRED_V1",
      "evaluationStatus": "PASS"
    }
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