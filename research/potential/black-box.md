# Black Box

## Idea

Independent driver evidence recorder.

## Problem

Drivers lack their own evidence in disputes.

## How It Works

1. Device records CAN data and dashcam.
2. Data encrypted with driver key.
3. Stored decentralized.
4. Driver controls access.

## Challenge

CAN protocol fragmentation.

Camera hardware diversity.

## Technical Dependencies

- OBD-II / CAN adapter
- External camera
- Secure element
- Decentralized storage

## Attestation Provider

Darkbloom — hardware attestation on Apple Silicon.

Validated model: $102K ARR, 4.5B tokens served, 250 Macs.

Candidate for driver device attestation in Black Box.

## Why Later

Hardware integration is complex.

Start with signed events from smartphone and existing devices.