# LogiQED Verification

Verification allows any party to check an Evidence Package without accessing raw telemetry.

## What Can Be Verified

- Proof validity
- Hash consistency
- Source signatures
- Rule version and digest
- Trust policy result
- Corroboration result
- Conclusion correctness

## Endpoint

`POST /v1/evidence/verify`

## Request

```yaml
openapi: 3.1.0
info:
  title: LogiQED Verification API
  version: 0.2.0

paths:
  /v1/evidence/verify:
    post:
      summary: Verify Evidence Package
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/VerificationRequest'
      responses:
        '200':
          description: Verification result
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/VerificationResult'

components:
  schemas:
    VerificationRequest:
      type: object
      required: [packageId]
      properties:
        packageId:
          type: string

    VerificationResult:
      type: object
      properties:
        claimType:
          type: string
        claimVersion:
          type: string
        result:
          type: string
        rule:
          type: object
          properties:
            id:
              type: string
            version:
              type: string
            digest:
              type: string
        trustPolicy:
          type: object
          properties:
            id:
              type: string
            version:
              type: string
            result:
              type: string
        corroboration:
          type: object
          properties:
            result:
              type: string
        evidenceRoot:
          type: string
        proof:
          type: object
          properties:
            backend:
              type: string
            circuitId:
              type: string
            version:
              type: string
            valid:
              type: boolean
        schemaVersion:
          type: string
        verifiedAt:
          type: string
          format: date-time
```

## Example Request

```json
{
  "packageId": "pkg_01HZ..."
}
```

## Example Result

```json
{
  "claimType": "Detention",
  "claimVersion": "1.0",
  "result": "Warehouse attributable: 68 min",
  "rule": {
    "id": "DETENTION_V1",
    "version": "1.0",
    "digest": "0x..."
  },
  "trustPolicy": {
    "id": "E4_REQUIRED",
    "version": "1.0",
    "result": "PASS"
  },
  "corroboration": {
    "result": "PASS"
  },
  "evidenceRoot": "0x...",
  "proof": {
    "backend": "Groth16",
    "circuitId": "detention_claim_v1",
    "version": "1.0",
    "valid": true
  },
  "schemaVersion": "1.0",
  "verifiedAt": "2026-08-25T14:05:00Z"
}
```

## Design Notes

- Verification never exposes raw telemetry.
- Proof validity is checked against committed inputs.
- Trust policy result is checked server-side.
- Any party can verify independently.
