# LogiQED Ingest API

Ingest is the entry point for physical events.

Every event from an IoT sensor, device, or external API is accepted here, signed, and evaluated.

The client never sends a trust level. The server computes it from source identity, attestation, provenance and corroboration.

## Endpoint

`POST /v1/evidence/ingest`

Headers:

- `Content-Type: application/json`
- `X-Idempotency-Key`: optional, for safe retries
- `X-Telemetry-Key`: source key for devices, mobile apps, and trackers

Rate limiting: 100 requests per minute per source.

Payload size limit: 10 KB. Typical payloads are around 1 KB.

---

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: LogiQED Ingest API
  version: 0.2.0
  description: Entry point for signed EPCIS events. Server evaluates source trust server-side.

servers:
  - url: https://api.logiqed.tech/v1

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
          description: Missing or invalid telemetry key
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
      name: X-Telemetry-Key

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
          description: Unique source identifier. Used by the server as the deduplication component alongside timestamp and sequence.
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
            sourceAssurance:
              type: string
              description: Trust level computed for this specific event, not the base level of the source.
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

1. Verifies telemetry key or source key.
2. Verifies signature over canonical epcisEvent.
3. Validates EPCIS event structure.
4. Deduplicates using SourceId + ClientTimestampUtc + SourceSequence.
5. Looks up source type and attestation type from the source registry. The client never supplies either.
6. Evaluates source identity, attestation, firmware, revocation.
7. Returns 202 with trustEvaluation.

Steps 5 and 6 are server-side only. The client cannot influence them. This follows the rule from Trust Levels: the client never supplies the trust level.

---

## Example Payloads

### EPCIS Object Event

A temperature reading from an onboard sensor.

The event is signed by the device key. The server verifies the signature and evaluates the source.

Example: a refrigerated trailer reports 4.2 °C at a warehouse location.

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

A position update from a tracker, mobile app, or browser.

The event carries latitude and longitude. The server uses it to evaluate geofence entry and route segment transitions.

Example: a truck reports its position at 52.52, 13.40 while in transit.

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

The server returns the event ID, the receipt timestamp, and the trust evaluation for this specific event.

`sourceAssurance` is computed for this event, not the base level of the source. `evaluationStatus` reports whether the trust policy was satisfied.

Example: an E4 source with E4_REQUIRED_V1 policy returns PASS.

```json
    {
      "eventId": "0194e0d2-...",
      "status": "accepted",
      "receivedAt": "2026-08-25T14:00:02.123Z",
      "trustEvaluation": {
        "sourceId": "src_01HZ...",
        "sourceAssurance": "E4",
        "trustPolicy": "E4_REQUIRED_V1",
        "evaluationStatus": "PASS"
      }
    }
```

---

## Design Notes

- Client never supplies trust level or attestation. Server evaluates both.
- EPCIS 2.0 is the event language.
- Signature covers the canonical epcisEvent, not the envelope.
- receivedAt is set by the server, never by the client.
- Payload is minimal. No personal data.
- Ingest records authenticated events only. SLA evaluation happens later.
- Deduplication key: SourceId + ClientTimestampUtc + SourceSequence.
- Retried payloads are safe and idempotent.
- Rate limit: 100 requests per minute per source. This supports 1 packet per second with a 40% buffer.
- Payload size limit: 10 KB. Typical payloads are around 1 KB.
- Error responses include requestId for tracing.