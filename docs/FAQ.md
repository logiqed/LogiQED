# LogiQED Overview

## What LogiQED Is

LogiQED is a cryptographic evidence layer for physical logistics.

It turns physical logistics events into independently verifiable business evidence.

## What LogiQED Proves

LogiQED proves that committed measurements produced by sources satisfying a trust policy were not changed, and that a rule was executed correctly over them.

It does not claim to prove physical truth directly.

## Evidence Package

An immutable snapshot linking a claim, its sources, trust policy result, rule version and proof.

## Trust Levels

Trust Levels E0–E5 describe Source Assurance.

They are not an enum supplied by the client. The server evaluates source identity, key, attestation, firmware and revocation status.

## Trust Policy

A Trust Policy defines the required assurance for a specific claim.

Example: E4_REQUIRED_V1.

## Claim Confidence

Claim Confidence is the result of evaluating a claim against its Trust Policy.

It is separate from Source Assurance.

## First Claims

1. Detention / Warehouse Waiting Claim.
2. Cargo Condition Claim.

## Why Detention First

Detention is deterministic: timestamps, geofences, events and rule. No traffic causality debate.

## Marketplace

LogiQED is evidence infrastructure. Marketplace may come later on top of the trust graph.

## Blockchain Role

Blockchain is a trust anchor. It is not the product.

MVP storage uses canonicalization, Merkle commitments, Evidence Root and external timestamp or anchor.

EigenDA and Arweave are optional later.

## EPCIS

LogiQED uses GS1 EPCIS 2.0 as the logistics event language.

EPCIS describes what, when, where and why in supply chain events.

LogiQED adds verifiable trust and claim evaluation on top.

## eFTI Window

From 9 July 2027, EU authorities must accept regulatory freight information submitted electronically through certified eFTI platforms.

LogiQED positions as evidence infrastructure on top of eFTI.

## Target Pilot Partner

Shipper, 3PL, insurer or freight forwarder who makes penalty or payout decisions.

## MVP

Budget $170–200K. Timeline 3–4 months.

## Flock

Flock is an experimental proving backend. Proof backend is pluggable.

## Contact

For investment, acquisition or pilot partnership: LogiQED@gmail.com