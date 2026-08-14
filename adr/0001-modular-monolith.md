# ADR 0001: Modular Monolith for MVP

## Status

Accepted

## Context

LogiQED starts as a pilot MVP for evidence infrastructure in physical logistics.

The team is small: 3 C# developers + 1 systems/C++ engineer + DevOps.

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