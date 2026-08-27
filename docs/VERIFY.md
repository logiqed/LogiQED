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
- Evidence Root against external anchor

## Endpoint

POST /v1/evidence/verify

## Authentication

Public endpoint. No API key required.

Rate limit: 100 requests per minute per IP.

## Request

### Option A: by package ID

```json
{
  "packageId": "pkg_01HZ..."
}
```

### Option B: full package

```json
{
  "package": {
    "schemaVersion": "1.0",
    "claimId": "...",
    "claimType": "DETENTION",
    "sources": [],
    "inputEvents": [],
    "rule": {
      "id": "DETENTION_V1",
      "version": "1.0",
      "digest": "sha256:..."
    },
    "evidenceRoot": "0x8f3a...",
    "proof": {
      "backend": "ALIGNED_LAYER_MOCK",
      "proofHash": "sha256:..."
    },
    "signature": "ed25519:..."
  }
}
```

## Responses

### 200 Verified

```json
{
  "requestId": "req_01HZ...",
  "packageId": "pkg_01HZ...",
  "schemaVersion": "1.0",
  "result": {
    "status": "VALID",
    "conclusion": "Warehouse attributable: 68 min"
  },
  "checks": {
    "signature": "PASS",
    "evidenceRootMerkle": "PASS",
    "evidenceRootAnchor": "PASS",
    "ruleDigest": "PASS",
    "trustPolicy": "PASS",
    "corroboration": "PASS",
    "proofValidity": "PASS"
  },
  "trustPolicy": {
    "id": "E4_REQUIRED_V1",
    "version": "1.0",
    "evaluationStatus": "PASS"
  },
  "rule": {
    "id": "DETENTION_V1",
    "version": "1.0",
    "digest": "sha256:..."
  },
  "evidenceRoot": "0x8f3a...",
  "externalAnchorRef": "arweave:kT4b...",
  "proof": {
    "backend": "ALIGNED_LAYER_MOCK",
    "circuitId": "detention_claim_v1",
    "version": "1.0",
    "valid": true
  },
  "verifiedAt": "2026-08-25T14:05:00Z"
}
```

### 200 Invalid

```json
{
  "requestId": "req_01HZ...",
  "packageId": "pkg_01HZ...",
  "schemaVersion": "1.0",
  "result": {
    "status": "INVALID",
    "reason": "Evidence Root does not match Merkle commitment"
  },
  "checks": {
    "signature": "PASS",
    "evidenceRootMerkle": "FAIL",
    "evidenceRootAnchor": "PASS",
    "ruleDigest": "PASS",
    "trustPolicy": "PASS",
    "corroboration": "PASS",
    "proofValidity": "PASS"
  },
  "verifiedAt": "2026-08-25T14:05:00Z"
}
```

### 400 Invalid Request

```json
{
  "requestId": "req_01HZ...",
  "error": {
    "code": "INVALID_PACKAGE",
    "message": "Neither packageId nor package provided"
  }
}
```

### 404 Package Not Found

```json
{
  "requestId": "req_01HZ...",
  "error": {
    "code": "PACKAGE_NOT_FOUND",
    "message": "Evidence Package not found"
  }
}
```

### 429 Rate Limit Exceeded

```json
{
  "requestId": "req_01HZ...",
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded. Try again in 60 seconds."
  }
}
```

## Verification Steps

1. Resolve package by packageId or by full package payload.
2. Verify signature with the organization key.
3. Recompute Evidence Root from canonical input events.
4. Verify anchor against externalAnchorRef.
5. Verify rule digest from published rule definition.
6. Verify trust policy from source identities.
7. Verify corroboration from Evidence Graph.
8. Verify proof through the proof backend.
9. Recompute conclusion from rule formula and input events.
10. Log verification with requestId, packageId, result, and verifiedAt.

## Design Notes

- Verification never exposes raw telemetry.
- verifiedAt is set by the server.
- Checks return PASS, FAIL, or SKIP.
- SKIP is used when a check is not applicable.
- Verification results are logged for audit.
- Aligned Layer is the primary proof backend. Mock for MVP.
- Any party can verify independently.