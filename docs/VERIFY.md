# LogiQED Verification

Verification allows any party to check an Evidence Package without accessing raw telemetry.

## What Can Be Verified

- Proof validity
- Hash consistency
- Source signatures
- Rule version
- Conclusion correctness
- Trust Level

## Endpoint

`POST /v1/evidence/verify`

## Request

```yaml
openapi: 3.1.0
info:
  title: LogiQED Verification API
  version: 0.1.0

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
      required:
        - packageId
      properties:
        packageId:
          type: string
          example: "pkg_01HZ..."

    VerificationResult:
      type: object
      properties:
        packageId:
          type: string
        isValid:
          type: boolean
        claimType:
          type: string
        conclusion:
          type: string
        ruleVersion:
          type: string
        trustLevel:
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
  "packageId": "pkg_01HZ...",
  "isValid": true,
  "claimType": "SLA Exception",
  "conclusion": "No penalty",
  "ruleVersion": "v3.2",
  "trustLevel": "E4",
  "verifiedAt": "2026-08-14T08:35:00Z"
}
```

## Design Notes

- Verification never exposes raw telemetry.
- Proof validity is checked against committed inputs.
- Conclusion correctness is checked against the SLA rule version.
- Any party can verify independently.