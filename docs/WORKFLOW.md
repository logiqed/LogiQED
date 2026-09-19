# Workflow Engine

Configurable process engine for logistics operations.

## Purpose

A workflow in LogiQED is a state machine with transitions, timers, escalations, and conditional logic.

Dispatchers and admins configure workflows from the admin panel — without code, without rebuild, without deploy.

## Core Principle

Logistics processes change daily.

A warehouse changes its detention policy. A new escalation rule appears. A status needs a different timer.

The system should adapt to the process, not the other way around.

LogiQED workflow engine is a visual constructor. Changes apply instantly.

---

## Workflow Diagram

The Workflow Diagram is the visual editor for trip lifecycle.

For a given entity (for example, Trip), it shows:

- All statuses as nodes
- All transitions as arrows between statuses
- Transition types: User transition, System transition, Backward transition

Navigation:

- Drag — pan
- Ctrl+wheel — zoom
- Click a status — select
- Double-click a status — edit
- Click a transition label — edit the transition

Validation:

- Unreachable statuses are flagged
- Statuses without a path to a final status are flagged
- The diagram shows whether the process is complete

---

## Status Configuration

Each status has:

### Main Information

- **Code** — internal identifier, e.g. `PICKED_UP`
- **Definition** — entity type, e.g. `Trip`
- **Order** — display order
- **SLA timer behavior** — None, Run, Pause
- **Pipeline milestone** — internal milestone code
- **Color** — visual color on the diagram

### Stage Flags

- **Initial** — entry point of the process
- **Active work** — status represents active operation
- **Waiting** — status represents waiting state
- **Resolved** — status indicates resolution
- **Terminal** — final status
- **Sideline** — outside the main path

### Translations

- Name per language
- Subtitle per language
- Used for displaying statuses in the UI

---

## Timers and Escalations

A timer is armed when an instance enters a status and pushes a definition action when it is due. Leaving the status cancels its timers. Several timers with different offsets are escalation steps.

Each timer has:

- **Code** — e.g. `ARRIVAL_DEADLINE_BREACHED`
- **Action** — Timer escalation, Notification, Evidence generation
- **Offset, min** — time after base date
- **Order** — order of escalation steps
- **Base date** — reference event, e.g. `ArrivalDeadlineDate`
- **Working calendar** — 24/7 or business hours
- **Active** — enabled or disabled

Example: `ARRIVAL_DEADLINE_BREACHED` fires when the arrival deadline is breached. Action: timer escalation. Base date: arrival deadline.

---

## Condition Groups

Conditions define when a transition is allowed, when a timer fires, or when a notification is sent.

The condition builder supports:

- **Field comparison** — compare a field to a value
- **Domain condition** — predefined domain-specific check
- **Condition group** — nested group with its own AND/OR logic
- **NOT** — logical negation

Logic operators:

- **AND** — all conditions must be true
- **OR** — at least one condition must be true
- **NOT** — inverts the result

An empty group is interpreted as "always satisfied".

---

## Transitions

### User Transition

Initiated manually by an operator. For example, a dispatcher moves a trip from Picked up to Departed.

### System Transition

Triggered automatically by a condition. For example, a trip moves to Delivered when the route completes.

### Backward Transition

Allows returning to a previous status. For example, a trip can move back from Departed to Picked up if a loading error is detected.

---

## No Rebuild, No Deploy

Changes apply instantly:

- A dispatcher changes an SLA timer — notifications trigger immediately
- An admin adds a new routing condition — it takes effect in seconds
- A status color or translation is updated — UI reflects it immediately

No developer in the loop.
No waiting for the next release.

---

## Workflow and Roles

New statuses and transitions may require new permissions.

When a workflow changes:

- A new status may require a new permission code
- A new transition may require a new role or permission
- The UI is regenerated to reflect the updated process

This keeps the workflow, permissions, and UI synchronized without a rebuild.

See [Authorization](AUTHORIZATION.md) for the full role and permission model.

---

## Rule Versioning

Every workflow change is versioned.

When a rule changes:

- A new version is created
- The previous version remains for audit
- Evidence Packages reference the rule version that was active at the time of the events

---

## Audit

Every workflow action is auditable:

- Status change — who, when, from which status to which
- Timer fire — which timer, when, with what outcome
- Condition evaluation — which condition, result
- Notification sent — channel, recipient, status

---

## Integration

The Workflow Engine is used by:

- Route State Machine — trip lifecycle
- SLA Engine — timer and escalation logic
- Notifications — trigger rules
- Evidence — rule versioning

---

## API

See [OpenAPI](../OPENAPI.yaml) for workflow endpoints.

---

## Related

- [Architecture](ARCHITECTURE.md) — overall system
- [Authorization](AUTHORIZATION.md) — roles and permissions
- [SLA DSL](SLA_DSL.md) — rule definition format
- [Communication](COMMUNICATION.md) — notification delivery
- [UI Demo](UI_DEMO.md) — workflow screens