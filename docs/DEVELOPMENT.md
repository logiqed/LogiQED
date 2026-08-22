# Development Process

## IDE

Visual Studio 2026.

## Task Management

Azure DevOps for:

- Backlog
- Tasks
- Bugs
- Sprint planning

## Environments

- Dev: local development
- Stage: integration testing
- Prod: production releases

## Git Flow

- Feature branches from dev
- Pull requests with code review
- Dev merges to stage for testing
- Stage promotes to prod with version tag

## Versioning

Semantic versioning.

Example: 0.1.0, 0.2.0, 1.0.0.

## Build and Deploy

Automated build on merge.

Deploy to stage first.

Production release after validation.

## Logging

Seq for structured logs.

Correlation ID across requests.

## Monitoring

Health checks per environment.

Error tracking.

Performance metrics.

## Principle

Short-lived branches. Code review. Automated builds. Observable systems.