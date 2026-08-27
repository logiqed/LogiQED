# LogiQED Ingest API

Ingest is the entry point for physical events.

Every event from an IoT sensor, device, or external API is accepted here, signed, and evaluated.

The client never sends a trust level. The server computes it from source identity, attestation, provenance and corroboration.

## Endpoint

POST /v1/evidence/ingest

Headers:

- Content-Type: application/json
- X-Idempotency-Key: optional, for safe retries
- X-Device-Key: device key for tracker devices

Rate limiting: 100 requests per minute per source.

Payload size limit: 10 KB.

---

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: LogiQED Ingest API
  version: 0.2.0
  description: Entry point for signed EPCIS events. Server evaluates source trust server-side.

servers:
  - url: https://api.logiqed.dev/v1

paths:
  /evidence/ingest:
    post:
      summary: Submit signed evidence event
      operationId: ingestEvidenceEvent
      security:
        - ApiKeyAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EvidenceEventEnvelope'
      responses:
        '202':
          description: Event accepted for processing
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EvidenceIngestResponse'
        '400':
          description: Invalid payload or signature format
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: Missing or invalid device key
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '409':
          description: Duplicate event
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '413':
          description: Payload too large
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '429':
          description: Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-Device-Key

  schemas:
    EvidenceEventEnvelope:
      type: object
      required:
        - sourceId
        - keyId
        - signatureAlgorithm
        - signature
        - schemaVersion
        - canonicalizationMethod
        - epcisEvent
      properties:
        sourceId:
          type: string
          description: Unique source identifier
          example: "src_01HZ..."
        keyId:
          type: string
          description: Identifier of the signing key
          example: "key_01HZ..."
        signatureAlgorithm:
          type: string
          enum: [Ed25519, ML-DSA]
          example: "Ed25519"
        signature:
          type: string
          description: Base64 signature over canonical epcisEvent JSON
          example: "MEUCIQD..."
        schemaVersion:
          type: string
          example: "1.0"
        canonicalizationMethod:
          type: string
          enum: [JCS]
          example: "JCS"
        epcisEvent:
          type: object
          description: "GS1 EPCIS 2.0 event"

    EvidenceIngestResponse:
      type: object
      properties:
        eventId:
          type: string
          format: uuid
          example: "0194e0d2..."
        status:
          type: string
          example: "accepted"
        receivedAt:
          type: string
          format: date-time
          description: Server time of receipt in UTC
        trustEvaluation:
          type: object
          properties:
            sourceId:
              type: string
            trustLevel:
              type: string
              example: "E4"
            trustPolicy:
              type: string
              example: "E4_REQUIRED_V1"
            evaluationStatus:
              type: string
              enum: [PASS, FAIL, INSUFFICIENT_DATA]
              example: "PASS"
            evaluatedAt:
              type: string
              format: date-time

    ErrorResponse:
      type: object
      required: [error]
      properties:
        error:
          type: object
          properties:
            code:
              type: string
              example: "INVALID_SIGNATURE"
            message:
              type: string
              example: "Signature verification failed"
            requestId:
              type: string
              description: Correlation ID for tracing
```
---

## Signing Flow

Client:

1. Builds epcisEvent JSON object.
2. Canonicalizes using JCS.
3. Signs canonical bytes with the assigned key.
4. Sends envelope with signature, keyId, and sourceId.

Server:

1. Verifies device key or source key.
2. Verifies signature over canonical epcisEvent.
3. Validates EPCIS event structure.
4. Deduplicates using DeviceId + ClientTimestampUtc + SourceSequence.
5. Evaluates source identity, attestation, firmware, revocation.
6. Returns 202 with trustEvaluation.

---

## Example Payloads

### EPCIS Object Event

```json
{
  "sourceId": "src_01HZ...",
  "keyId": "key_01HZ...",
  "signatureAlgorithm": "Ed25519",
  "signature": "MEUCIQD...",
  "schemaVersion": "1.0",
  "canonicalizationMethod": "JCS",
  "epcisEvent": {
    "eventType": "ObjectEvent",
    "eventTime": "2026-08-25T14:00:00Z",
    "action": "OBSERVE",
    "bizLocation": {
      "id": "urn:epc:id:sgln:0614141.00001.0"
    },
    "sensorData": {
      "temperature": {
        "value": 4.2,
        "unit": "C"
      }
    }
  }
}
```

### EPCIS Event with Geo Location

```json
{
  "sourceId": "src_01HZ...",
  "keyId": "key_01HZ...",
  "signatureAlgorithm": "Ed25519",
  "signature": "MEUCIQD...",
  "schemaVersion": "1.0",
  "canonicalizationMethod": "JCS",
  "epcisEvent": {
    "eventType": "ObjectEvent",
    "eventTime": "2026-08-25T14:00:00Z",
    "action": "OBSERVE",
    "bizLocation": {
      "id": "urn:epc:id:sgln:0614141.00002.0"
    },
    "geoLocation": {
      "lat": 52.52,
      "lon": 13.40
    }
  }
}
```

### Response

```
{
  "eventId": "0194e0d2-...",
  "status": "accepted",
  "receivedAt": "2026-08-25T14:00:02.123Z",
  "trustEvaluation": {
    "sourceId": "src_01HZ...",
    "trustLevel": "E4",
    "trustPolicy": "E4_REQUIRED_V1",
    "evaluationStatus": "PASS"
  }
}
```

---

## Design Notes

- Client never supplies trust level. Server evaluates.
- EPCIS 2.0 is the event language.
- Signature covers the canonical epcisEvent, not the envelope.
- receivedAt is set by the server, never by the client.
- Payload is minimal. No personal data.
- Ingest records authenticated events only. SLA evaluation happens later.
- Deduplication key: DeviceId + ClientTimestampUtc + SourceSequence.
- Retried payloads are safe and idempotent.
- Rate limit: 100 requests per minute per source.
- Payload size limit: 10 KB.
- Error responses include requestId for tracing.