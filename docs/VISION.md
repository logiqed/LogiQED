# LogiQED Vision

## One Line

LogiQED is the cryptographic evidence layer for physical logistics.

Disputes close by math, not by trust.

## What LogiQED Does

LogiQED turns physical logistics events into independently verifiable business evidence.

Not "the truck was late." But "committed events show geofence entry at 11:54, dock assignment at 13:02, loading start at 13:18, exit at 14:11. Verified waiting: 68 minutes. Warehouse attributable: 68 minutes."

## The Chain

Sensor/device, attestation, timestamp, signature, provenance, rule, claim, proof, Evidence Package.

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
- Fee per Evidence Package
- Fee per SLA claim verification
- Enterprise API access

Value scales with freight volume, not with UI users.

## Core Concepts

### Evidence Package

The final artifact. Links claim, events, sources, trust levels, SLA rule version and proof.

Generated only when a dispute or SLA exception requires proof.

Clean routes are closed with signed events and Evidence Root only.

### Trust Levels

E0–E5. Server-side evaluated confidence for every source.

A signature does not make a source trustworthy.

### Trust Policy

Required assurance for a specific claim.

Example: E4_REQUIRED_V1.

### Evidence Graph

Provenance DAG connecting events, sources, rules and claims.

Records source-of-source provenance.

### SLA Engine

Rules, calendars, holidays and exception attribution.

### Route State Machine

A route is a finite state machine, not a stream of coordinates.

SLA pause is the measured interval between TrafficEntered and TrafficExited.

### On-Demand Oracle

External APIs are called only when an incident occurs.

In normal operation, external API costs are zero.

### Proof Engine

Pluggable proof backend.

Primary: Aligned Layer. Fast, cheap ZK-verification.

Status: mock for MVP, integration in Phase 2.

Alternatives: Groth16, Plonk, STARK, Flock.

### Formal Verification

Primary tool: Lean 4.

Machine-checked proofs for claim rules and SLA mathematics.

Status: research. MVP uses deterministic rules with golden tests.

## What Cryptography Proves

Cryptography does not prove physical truth.

It proves:

- These committed measurements were produced by sources satisfying trust policy E4.
- The data was not changed.
- The rule was executed correctly.

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