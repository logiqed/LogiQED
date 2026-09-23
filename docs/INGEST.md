# LogiQED Ingest API

Ingest is the entry point for physical events.

Every event from an IoT sensor, device, or external API is accepted here, converted to a single canonical format, signed, and evaluated.

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
  description: Entry point for signed events. Source formats are converted to EPCIS 2.0. Server evaluates source trust server-side.

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
              description: Own assurance of the source at the time of this event. This is the source-level assurance, not the claim level. Claim level is computed later by the Evidence Builder.
              example: "E3"
            trustPolicy:
              type: string
              example: "E3_REQUIRED_V1"
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
2. Verifies signature over canonical payload.
3. Deduplicates using SourceId + ClientTimestampUtc + SourceSequence.
4. Converts the source format to EPCIS 2.0. If the source already sends EPCIS, this step is a no-op.
5. Validates the EPCIS structure.
6. Looks up source type and attestation type from the source registry. The client never supplies either.
7. Evaluates source identity, attestation, firmware, revocation.
8. Applies Trust Policy. Computes sourceAssurance: E0-E5.
9. Normalizes and enqueues to the Bounded Channel.
10. Returns 202 with trustEvaluation.

Steps 5 and 6 are server-side only. The client cannot influence them. This follows the rule from Trust Levels: the client never supplies the trust level.

Step 4 handles the format difference. Native clients (browser PWA) send EPCIS 2.0 directly. External trackers send binary packets. Mobile apps send JSON. All are converted to EPCIS 2.0 at this step.

---

## Example Payloads

The browser PWA sends EPCIS 2.0 directly. External trackers (Teltonika, Ruptela) send binary packets over TCP. Mobile apps (Colota, HookTrace) send JSON. Warehouse and customs APIs send their own format.

Ingest converts all of them to EPCIS 2.0 before validation.

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
		  "sourceAssurance": "E3",
		  "trustPolicy": "E3_REQUIRED_V1",
		  "evaluationStatus": "PASS"
		}
    }
```

---

## Design Notes

- Client never supplies trust level or attestation. Server evaluates both.
- EPCIS 2.0 is the canonical event format. Ingest converts all incoming formats to EPCIS 2.0 before validation. If the source already sends EPCIS, conversion is a no-op.
- Signature covers the canonical epcisEvent, not the envelope.
- receivedAt is set by the server, never by the client.
- Payload is minimal. No personal data.
- Ingest records authenticated events only. SLA evaluation happens later.
- Deduplication key: SourceId + ClientTimestampUtc + SourceSequence.
- Retried payloads are safe and idempotent.
- Rate limit: 100 requests per minute per source. This supports 1 packet per second with a 40% buffer.
- Payload size limit: 10 KB. Typical payloads are around 1 KB.
- Error responses include requestId for tracing.

## Why Conversion Happens at Ingest

Ingest is the single entry point. Converting here means:

- The rest of the system works with one format.
- Sources do not need to change their code.
- Validation rules are consistent.
- Canonicalization and hashing operate on a known structure.

Native clients (browser PWA) send EPCIS 2.0 directly. External trackers (Teltonika, Ruptela) send binary packets over TCP or HTTPS. Mobile apps (Colota, HookTrace) send JSON. Warehouse and customs APIs send their own format.

All of them are converted to EPCIS 2.0 at Ingest.