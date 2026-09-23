# LogiQED Vision

## One Line

LogiQED is the cryptographic evidence layer for physical logistics.

Disputes close on evidence, not on negotiation.

## What LogiQED Does

LogiQED turns physical logistics events into independently verifiable business evidence.

Not "the truck was late." But "committed events show geofence entry at 11:54, dock assignment at 13:02, loading start at 13:18, exit at 14:11. Verified waiting: 68 minutes. Warehouse attributable: 68 minutes."

## The Chain

Sensor/device, attestation, timestamp, signature, provenance, rule, claim, trip Evidence Root, claim Evidence Root, anchor.

## Problem

Current logistics disputes are resolved through manual investigation: emails, PDFs, phone calls and trust in aggregator databases.

LogiQED replaces that process with cryptographically verifiable evidence.

## Why Now

From 9 July 2027, EU authorities must accept electronic freight transport information, eFTI, as the default.

Logistics will need verifiable digital evidence at scale.

LogiQED is positioned as evidence infrastructure on top of eFTI.

## Target Customer

Carriers, shippers, freight forwarders, insurers and compliance teams who make penalty or payout decisions.

## Business Model

- Platform fee per carrier or shipper
- Fee per full package
- Fee per SLA claim verification
- Enterprise API access

Trip anchors are produced for every route at no additional cost to the customer.

Value scales with freight volume, not with UI users.

## Core Concepts

### Three Evidence Levels

The evidence layer produces three levels of evidence:

- **Clean route** - signed events + trip Evidence Root + Arweave anchor.
- **Incident** - claim package base + claim anchor. Confirmed or rejected.
- **Disputed** - retroactive corroboration + ZK proof + new anchor.

The trip Evidence Root is anchored for every route, clean or incident. This protects the data from substitution even if no dispute ever arises.

ZK proof is generated only on dispute request, and only when the claim level is E3 or higher.

### Claim Package Base and Full Package

The base package is produced when a claim closes, confirmed or rejected. It records the driver's report, the system's own data, the external API response, the claim level, and the decision.

The full package is produced on dispute request. It adds retroactive corroboration, an independence check, and a ZK proof when the claim level is E3 or higher.

### Trust Levels

E0-E5. Server-side evaluated own assurance for every source.

Own assurance is the level of a single source. It does not change with corroboration.

A claim level is the level of a claim, formed from one or more independent sources. It is the maximum level among independent sources that confirm the same fact.

A signature does not make a source trustworthy.

### Trust Policy

Required assurance for a specific claim.

Example: E4_REQUIRED_V1.

### Evidence Graph

Provenance DAG connecting events, sources, rules and claims.

Records source-of-source provenance. Used for independence checks and E5 verification.

### SLA Engine

Rules, calendars, holidays and exception attribution.

### Route State Machine

A route is a finite state machine, not a stream of coordinates.

SLA pause is the measured interval between the entered and exited events of a claim.

In MVP, exceptions are reported by the driver. The system does not poll external APIs continuously.

### On-Demand Oracle

External APIs are called only when a claim opens.

In normal operation, external API costs are zero.

### Proof Engine

Pluggable proof backend.

Primary: Aligned Layer. Fast, cheap ZK-verification as AVS on EigenLayer.

Status: mock for MVP, integration in Phase 2.

Alternatives: Groth16, Plonk, STARK, zkVM options (Lattice Jolt, SP1, RISC Zero).

## What Cryptography Proves

Cryptography does not prove physical truth.

It proves:

- These committed measurements were produced by sources satisfying trust policy E4.
- The data was not changed.
- The rule was executed correctly.
- The Evidence Roots match the anchors.

It does not prove:

- The temperature was really 4.2 °C.

## First Claims

1. Detention / Warehouse Waiting Claim
2. Cargo Condition Claim

## Positioning

eFTI handles regulatory transport information. LogiQED adds verifiable provenance, claims and business evidence on top.

LogiQED is evidence infrastructure for logistics, not a blockchain marketplace.

## Principle

Authenticated events, provenance, rules, claims, evidence, settlement.

Blockchain and ZK strengthen the system. They are not the product.