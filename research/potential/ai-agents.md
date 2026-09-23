# AI Agents

## One Line

External AI agents operate on LogiQED evidence to automate audit, dispute resolution and compliance.

## Problem

Manual review of logistics disputes does not scale.

A typical SLA case takes 8 emails, 3 PDFs, 2 phone calls, and 2 days.

Trained experts are expensive and limited. With freight volume growing, the bottleneck moves from data collection to decision-making.

## Solution

AI agents consume LogiQED claim packages, full packages, and the Evidence Graph to produce recommendations, verdicts, and audit reports, all based on verifiable data.

The agent does not replace the dispatcher. It augments him: reads evidence, applies policy, flags anomalies, suggests attribution. A human remains in the loop.

## How It Works

Agent connects via OpenAPI or webhooks. Reads semantically tagged Evidence Graph. Inspects SLA evaluation, route state machine, and claims. Reads trip and claim Evidence Roots. Produces recommendation, verdict, or alert. Dispatcher reviews, confirms, or rejects.

For a Detention claim:

1. Agent receives webhook `claim.package.created`.
2. Fetches the claim package base via API: claim, rule, sources, timestamps, claim level, decision.
3. Checks if conclusion matches rule. Example: waiting 68 minutes, warehouse.
4. Verifies math, calendar, and missing events.
5. Verifies trip Evidence Root and claim Evidence Root against Arweave anchors.
6. Outputs a structured verdict with confidence score.
7. Dispatcher sees the verdict in UI, accepts or rejects.

If the case goes to dispute, the agent can request a full package and read corroboration results and ZK proof.

The agent never modifies evidence. It only reads and reports.

## What the Agent Reads

From the claim package base:

- Claim ID and type
- Driver report at E0
- Sources with own assurance and role
- Trust policy result
- Claim level
- Decision: confirmed or rejected
- Trip Evidence Root and claim Evidence Root
- Arweave anchor references

From the full package, if the case is disputed:

- Retroactive corroboration result
- Independence check from the Evidence Graph
- Final claim level
- ZK proof reference

## Use Cases

- Automated audit
- Anomaly detection
- Dispute resolution
- Policy compliance
- Predictive maintenance

## Technical Dependencies

- Semantic tags
- OpenAPI and Swagger
- Webhooks: `claim.package.created`, `claim.decision_recorded`, `trip.anchor.created`, `claim.package.full`
- Evidence Graph API
- Route State Machine events
- API keys with scoped read-only permissions

## Integration with Core

- The agent is treated as an external source with own assurance E1, authenticated API.
- It reads the Evidence Graph but does not write to it.
- It reads trip and claim Evidence Roots but does not create or modify them.
- Agent recommendations are logged with agent ID, version, and confidence.
- Human remains in the loop for all decisions.

## Trust Boundary

The agent is a reader, not a source of truth.

- Evidence Roots and anchors are the ground of trust.
- Claim level is computed by the Evidence Builder, not by the agent.
- The agent may recompute a conclusion and compare, but its output is an agent recommendation, not verified evidence.
- All agent output is treated as E1 and is never merged into the Evidence Graph without human review.

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Agent errors or hallucinations | Confidence score, human confirmation, audit trail |
| Prompt injection via evidence data | Treat evidence as untrusted input, strict schemas |
| Agent output mistaken as truth | Distinct Agent Recommendation versus Verified Evidence |
| Privacy concerns | Agents receive pseudonymised, minimal data |
| API abuse | Rate limits, quotas, billing per agent call |
| Agent reads stale data | Agents receive only anchored packages with confirmed Evidence Roots |

## Why Later

Requires a stable public API.

Before MVP: OpenAPI draft, webhooks not stable.

After MVP: OpenAPI and webhooks live, Evidence Graph API available, claim package base and full package retrievable. Pilots can start.

Phase 2: formal Agent SDK and billing.

Criterion to start a pilot: agent resolves a real dispute case in under 10 minutes with over 95 percent alignment with a human expert.

## Status

Research. High priority after MVP.