# LogiQED Ingest API

Ingest is the entry point for physical events.

Every event from an IoT sensor, device, or external API is accepted here, signed, and assigned a Trust Level.

## Endpoint

`POST /v1/evidence/ingest`

## Request

```yaml
openapi: 3.1.0
info:
  title: LogiQED Ingest API
  version: 0.1.0

paths:
  /v1/evidence/ingest:
    post:
      summary: Submit signed evidence event
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EvidenceIngestRequest'
      responses:
        '202':
          description: Event accepted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EvidenceIngestResponse'

components:
  schemas:
    EvidenceIngestRequest:
      type: object
      required:
        - sensorId
        - eventType
        - timestamp
        - signature
        - payload
      properties:
        sensorId:
          type: string
          example: "sensor_01HZ..."
        eventType:
          type: string
          example: "temperature_reading"
        timestamp:
          type: string
          format: date-time
        signature:
          type: string
          description: "Signed hash of payload"
        trustLevel:
          type: string
          enum: [E1, E2, E3, E4, E5]
        payload:
          type: object
          description: "Sensor data"

    EvidenceIngestResponse:
      type: object
      properties:
        eventId:
          type: string
        status:
          type: string
          example: "accepted"
        trustLevel:
          type: string
```		  
## Example Payloads

### Temperature Sensor

```json
{
  "sensorId": "sensor_01HZ...",
  "eventType": "temperature_reading",
  "timestamp": "2026-08-14T08:30:00Z",
  "signature": "0x...",
  "trustLevel": "E3",
  "payload": {
    "cargoId": "shipment_01HZ...",
    "temperatureC": 3.2,
    "humidityPercent": 55.0
  }
}
```

### GPS Event

```json
{
  "sensorId": "sensor_01HZ...",
  "eventType": "gps_position",
  "timestamp": "2026-08-14T08:31:00Z",
  "signature": "0x...",
  "trustLevel": "E3",
  "payload": {
    "shipmentId": "shipment_01HZ...",
    "latitude": 52.2297,
    "longitude": 21.0122
  }
}
```

## Design Notes

- Trust Level is assigned at ingest and stored with the event.
- Payload is kept minimal. No personal data.
- Signature verifies the source signed the payload hash.
- Ingest does not evaluate SLA. It only records authenticated events.