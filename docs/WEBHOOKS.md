# LogiQED Webhooks

Webhooks allow external systems and AI agents to receive events from LogiQED without polling.

## How It Works

LogiQED sends HTTP POST requests to registered webhook URLs.

## Event Types

- `evidence.accepted`
- `sla.evaluated`
- `claim.verified`
- `evidence.package.created`

## Webhook Request

```yaml
openapi: 3.1.0
info:
  title: LogiQED Webhook API
  version: 0.1.0

paths:
  /v1/webhooks/evidence:
    post:
      summary: Evidence webhook
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/WebhookPayload'
      responses:
        '200':
          description: Webhook received

components:
  schemas:
    WebhookPayload:
      type: object
      properties:
        eventType:
          type: string
          example: "evidence.accepted"
        eventId:
          type: string
        shipmentId:
          type: string
        timestamp:
          type: string
          format: date-time
        data:
          type: object
          description: "Event-specific data"
        signature:
          type: string
          description: "LogiQED signature of the webhook payload"
```
## Example Webhook

```json
{
  "eventType": "evidence.accepted",
  "eventId": "event_01HZ...",
  "shipmentId": "shipment_01HZ...",
  "timestamp": "2026-08-14T08:30:00Z",
  "data": {
    "trustLevel": "E3"
  },
  "signature": "0x..."
}
```

## Security

Webhooks are signed by LogiQED. Subscribers verify the signature before processing.

## Design Notes

- Webhooks are best-effort. Retry logic is handled by the subscriber.
- Payloads are minimal. No raw telemetry.
- Webhook endpoints are registered via API and can be rotated.