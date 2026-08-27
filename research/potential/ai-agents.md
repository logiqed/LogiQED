# AI Agents

## One Line

External AI agents operate on LogiQED evidence to automate audit, dispute resolution and compliance.

## Problem

Manual review of logistics disputes does not scale.

A typical SLA case takes 8 emails, 3 PDFs, 2 phone calls, and 2 days.

Trained experts are expensive and limited. With freight volume growing, the bottleneck moves from data collection to decision-making.

## Solution

AI agents consume LogiQED Evidence Packages and Evidence Graph to produce recommendations, verdicts and audit reports, all based on verifiable data.

The agent does not replace the dispatcher. It augments him: reads evidence, applies policy, flags anomalies, suggests attribution. A human remains in the loop.

## How It Works

Agent connects via OpenAPI or webhooks. Reads semantically tagged Evidence Graph. Inspects SLA evaluation, route state machine, and claims. Produces recommendation, verdict, or alert. Dispatcher reviews, confirms, or rejects.

For a Detention claim:

1. Agent receives webhook evidence.package.created.
2. Fetches package via API: claim, rule, sources, timestamps.
3. Checks if conclusion matches rule. Example: waiting 68 minutes, warehouse.
4. Verifies math, calendar, and missing events.
5. Outputs a structured verdict with confidence score.
6. Dispatcher sees the verdict in UI, accepts or rejects.

The agent never modifies evidence. It only reads and reports.

## Use Cases

- Automated audit
- Anomaly detection
- Dispute resolution
- Policy compliance
- Predictive maintenance

## Technical Dependencies

- Semantic tags
- OpenAPI and Swagger
- Webhooks
- Evidence Graph API
- Route State Machine events
- API keys with scoped read-only permissions

## Integration with Core

- The agent is treated as an external source with trust level E1, authenticated API.
- It reads the Evidence Graph but does not write to it.
- Agent recommendations are logged with agent ID, version, and confidence.
- Human remains in the loop for all decisions.

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Agent errors or hallucinations | Confidence score, human confirmation, audit trail |
| Prompt injection via evidence data | Treat evidence as untrusted input, strict schemas |
| Agent output mistaken as truth | Distinct Agent Recommendation versus Verified Evidence |
| Privacy concerns | Agents receive pseudonymised, minimal data |
| API abuse | Rate limits, quotas, billing per agent call |

## Why Later

Requires a stable public API.

Before MVP: OpenAPI draft, webhooks not stable.

After MVP: OpenAPI and webhooks live, Evidence Graph API available. Pilots can start.

Phase 2: formal Agent SDK and billing.

Criterion to start a pilot: agent resolves a real dispute case in under 10 minutes with over 95 percent alignment with a human expert.

## Status

Research. High priority after MVP.