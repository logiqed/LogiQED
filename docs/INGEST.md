# LogiQED Ingest API

Ingest is the entry point for physical events.

Every event from an IoT sensor, device, or external API is accepted here, signed, and evaluated.

The client never sends a trust level. The server computes it from source identity, attestation, provenance and corroboration.

## Endpoint

POST /v1/evidence/ingest

## Request

```yaml
openapi: 3.1.0
info:
  title: LogiQED Ingest API
  version: 0.2.0

paths:
  /v1/evidence/ingest:
    post:
      summary: Submit signed evidence event
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EvidenceEventEnvelope'
      responses:
        '202':
          description: Event accepted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EvidenceIngestResponse'

components:
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
        - receivedAt
        - epcisEvent
      properties:
        sourceId:
          type: string
          example: "sensor_01HZ..."
        keyId:
          type: string
          example: "key_01HZ..."
        signatureAlgorithm:
          type: string
          example: "Ed25519"
        signature:
          type: string
          description: "Signed canonical EPCIS event"
        schemaVersion:
          type: string
          example: "1.0"
        canonicalizationMethod:
          type: string
          example: "JCS"
        receivedAt:
          type: string
          format: date-time
        epcisEvent:
          type: object
          description: "GS1 EPCIS 2.0 event"

    EvidenceIngestResponse:
      type: object
      properties:
        eventId:
          type: string
        status:
          type: string
          example: "accepted"
        trustEvaluation:
          type: object
          properties:
            sourceId:
              type: string
            assuranceLevel:
              type: string
              example: "E4"
            trustPolicy:
              type: string
              example: "E4_REQUIRED_V1"
            evaluationStatus:
              type: string
              example: "PASS"


```		  
## Example Payloads

### EPCIS Object Event

```json
{
  "sourceId": "sensor_01HZ...",
  "keyId": "key_01HZ...",
  "signatureAlgorithm": "Ed25519",
  "signature": "0x...",
  "schemaVersion": "1.0",
  "canonicalizationMethod": "JCS",
  "receivedAt": "2026-08-25T14:00:00Z",
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
  "sourceId": "gps_01HZ...",
  "keyId": "key_01HZ...",
  "signatureAlgorithm": "Ed25519",
  "signature": "0x...",
  "schemaVersion": "1.0",
  "canonicalizationMethod": "JCS",
  "receivedAt": "2026-08-25T14:00:00Z",
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

## Design Notes

- Client never supplies trust level. Server evaluates.
- EPCIS 2.0 is the event language.
- Signature covers the canonical EPCIS event.
- Payload is minimal. No personal data.
- Ingest records authenticated events only. SLA evaluation happens later.