# ADR 0001: Modular Monolith for MVP

## Status

Accepted

## Context

LogiQED starts as a pilot MVP for evidence infrastructure in physical logistics.

The team:

- 2 Senior C# Engineers — platform and evidence pipeline
- 1 Senior Data Engineer — MS SQL, analytics, event storage design
- 1 Senior Systems/C++ Engineer — ZK integration, performance, attestation
- DevOps Engineer — infrastructure, deployment, monitoring

## Decision

Use a modular monolith on C# Blazor / ASP.NET Core.

## Consequences

- Faster development and deployment
- Simpler operations
- Clear internal module boundaries
- Microservices can be extracted later at natural boundaries: telemetry ingestion, prover workers, AI execution

## Alternatives Considered

- Microservices from day one: rejected. Too much operational overhead for a pilot.
- Serverless: rejected. Less control over evidence pipeline.