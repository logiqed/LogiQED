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

| Environment | Purpose 										   |
|-------------|----------------------------------------------------|
| Local 	  | Personal development 							   |
| Dev 		  | Shared integration, automatic deployments on merge |
| Stage 	  | Pre-production validation, load tests, acceptance  |
| Prod 		  | Production releases, monitored, no direct changes  |

## Git Flow

Branches:

- main — production-ready code
- dev — integration branch, latest features
- feature/* — new work, branched from dev
- release/* — release preparation, branched from dev
- hotfix/* — emergency fix, branched from main

Rules:

- Feature branches branch from dev and merge back into dev.
- Release branches branch from dev, tagged as vX.Y.Z, merged into main and back into dev.
- Hotfix branches branch from main, merged into main and dev.
- No direct commits to dev, stage, or main.

## Code Review

- Minimum 1 approval for feature branches.
- Minimum 2 approvals for release and hotfix branches.
- Reviewer checks:
  - Code style and analyzers clean
  - Tests added or updated
  - No secrets or generated files
  - Database migrations included when data model changed
  - Documentation updated when public API changed
- Author merges only after approval and green CI.

## Definition of Done

A task is done when:

- Code is written, formatted, and analyzers pass.
- Unit tests cover new logic.
- Integration tests pass.
- Database migration is included and verified.
- Documentation is updated when behavior changed.
- Pull request is approved and merged.
- CI/CD pipeline passes to stage.

## Versioning

Semantic versioning.

Example: 0.1.0, 0.2.0, 1.0.0.

- MAJOR — breaking changes.
- MINOR — new features, backward compatible.
- PATCH — bug fixes.

## Build and Deploy

CI/CD via Azure DevOps Pipelines or GitHub Actions.

Pipeline stages:

- Build
- Test
- Analyze
- Publish
- Deploy to Dev, automatic on merge to dev
- Deploy to Stage, automatic on merge to release
- Deploy to Prod, manual approval from main tag

## Secrets

- Store in Azure Key Vault or GitHub Secrets.
- Never commit secrets to the repository.
- Rotate device keys every 90 days.
- Rotate API keys immediately on suspicion of leak.

## Database Migrations

- EF Core migrations created in the codebase.
- Applied automatically on dev and stage.
- On prod, applied with backup before migration.
- Rollback strategy: restore from backup or forward migration, documented per release.

## Testing Strategy

| Level		   | Tool 		 	| Where | When 					|
|--------------|----------------|-------|-----------------------|
| Unit 		   | xUnit 			| CI 	| On every pull request |
| Integration  | Testcontainers | CI 	| On every pull request |
| E2E          | Playwright     | CI 	| On merge to dev 		|
| Load         | k6 		    | Stage | On merge to release 	|

Property-based tests for geofence and SLA logic.

## Logging

- Seq for structured logs.
- Correlation ID across requests.
- OpenTelemetry for distributed traces.

## Monitoring and Alerting

- Health checks per environment.
- Error tracking.
- Performance metrics.

Metrics:

- telemetry_ingested_total
- sla_paused_seconds_total
- evidence_build_duration_seconds

Alert conditions:

- Error rate above 1% over 5 minutes.
- Health check failed.
- SLA Pause longer than 15 minutes.

## Incident Response

- Detect: alert to on-call engineer.
- Triage: confirm impact, open incident ticket.
- Mitigate: rollback, hotfix, or feature flag.
- Postmortem: within 48 hours, document root cause and action items.

## Principle

Short-lived branches. Code review. Automated builds. Observable systems.