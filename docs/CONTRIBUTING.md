# Contributing to LogiQED

Thank you for your interest in LogiQED.

> Project status: Blueprint. Closed source for now.
> We are not accepting public code contributions yet. This may change after the pilot.
> At this stage, we welcome feedback, questions, and discussions from potential partners, researchers, and contributors.

---

## Code of Conduct

Be direct. Be technical. Be respectful.

No hype. No spam. No token talk.

If you observe unacceptable behavior, contact maintainers directly.

---

## Ways to Contribute

### 1. Reporting Documentation Errors

Found a typo, broken link, or unclear section?

Open an issue with the label `documentation`. Please include:

- File path and section
- What is wrong
- Suggested fix if you have one

### 2. Asking Questions

Create a GitHub issue with the label `question`.

Before asking, check the existing FAQ and Architecture. Your question may already be answered.

### 3. Suggesting Improvements

We are especially interested in feedback on:

- Evidence Layer, trust levels, provenance graph
- Claim definitions, especially edge cases
- SLA DSL grammar and semantics
- Telemetry ingestion and deduplication logic
- Event-Driven Route Monitoring
- Lean 4 formal verification approach

Use the issue label `improvement`.

### 4. Invited Contributions

Pull requests are currently accepted only from invited contributors.

If you believe your change fits the roadmap:

1. Open an issue describing your proposal.
2. Wait for a maintainer response.
3. If approved, you will be invited to submit a pull request.

Unsolicited pull requests are not accepted at this stage.

---

## Pull Request Process

For invited contributors:

1. Fork the repository.
2. Create a feature branch.
3. Write clean, minimal code. Follow existing style.
4. Add or update tests when relevant.
5. Update documentation if behavior changes.
6. Run the test suite locally.
7. Open a pull request with a clear description:

- What problem does it solve
- How was it tested
- Which issue does it close

All pull requests require at least one maintainer approval.

---

## Development Setup

LogiQED is a C# Blazor modular monolith.

Prerequisites:

- .NET SDK
- MS SQL Server or PostgreSQL
- Redis 7+
- RabbitMQ 3.12+

Local run:

git clone https://github.com/logiqed/logiqed.git
cd logiqed
dotnet restore
dotnet run --project src/LogiQED.Web.API

If Redis or RabbitMQ are unavailable, the system falls back to in-memory implementations for local development.

See DEVELOPMENT.md for details.

---

## License

By contributing, you agree that your contributions will be licensed under the project license.

This repository is currently not open source. A license will be added when the project moves to public beta.

---

## Contact

- GitHub Issues
- Email: LogiQED@gmail.com
- X / Twitter: @LogiQED

Maintainers typically respond within 2–3 business days.