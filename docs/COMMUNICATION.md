# Communication

Communication layer for dispatcher, driver, and system events.

## Purpose

LogiQED treats communication as part of the evidence layer.

Every notification and every chat message has a delivery record: sent, delivered, read, failed, with timestamps and reasons.

When a dispute starts with "I didn't receive the warning", the system answers with a verifiable record.

---

## Chats

### Types

- **Direct chat** between dispatcher and driver
- **Group chat** auto-created for each trip
- **Additional group chats** created by dispatcher for specific purposes

### Auto-creation

When a trip is created, a group chat is automatically created between the assigned driver and dispatcher.

The dispatcher can then invite additional participants - for example, a warehouse worker for loading coordination, a customs broker for cross-border trips, or a mechanic for vehicle issues.

### Message Status

Full messenger behavior, similar to Telegram:

| Status | Indicator | Meaning |
|--------|-----------|---------|
| Sent | One check | Message accepted by the server |
| Delivered | Two checks | Message reached the recipient's device |
| Read | Two blue checks | Message opened by the recipient |

### Attachments

- Images
- Documents
- Voice notes
- Files of any type

### Reactions

- Emoji reactions on messages
- GIF support
- Full emoji picker

### Full Chat Experience

LogiQED chat is a complete messenger, not a limited comment box:

- Multiple participants per chat
- Read receipts
- Attachments and media
- Reactions and GIFs
- Full message history
- Integration with trip context - every chat is linked to the trip it belongs to

---

## IP Telephony

LogiQED includes a pluggable IP telephony module.

The module is provider-agnostic. The current integration is with [CallWay](https://callway.com.ua/) - a Ukrainian contact-center platform with 15+ years of experience and 200+ deployed projects.

### Current Status

The module is **enabled but disabled by default** for the pilot.

Reason: the system is already complex, and voice communication is not part of the core evidence flow. Adding telephony at the MVP stage would increase operational surface without proportional value.

### What It Provides

- Inbound and outbound calls
- Call recording
- Agent queue management
- Multichannel support - call can continue in chat or email
- CRM integration
- Analytics and performance tracking

### Architecture

The telephony module is pluggable:

- Provider interface is defined
- CallWay integration is implemented and can be enabled by configuration
- Alternative providers can be added without changing the core

### When It Would Be Enabled

IP telephony is available for activation when:

- Pilot partners require voice confirmation for disputes
- Regulatory context requires recorded voice evidence
- Volume justifies the added operational surface

The module is present in the codebase and integrated. Enabling it is a configuration decision, not a development project.

---

## Notifications

### Channels

- Device push
- In-app notification
- Email (optional)
- SMS (optional)

### Triggering Events

- Trip deadline breached
- Incident report submitted
- Claim confirmed or rejected
- Evidence Package Base generated
- Trip anchor created
- Evidence Package Full generated on dispute request
- Route State Machine transition

### Delivery Statuses

| Status | Meaning |
|--------|---------|
| Sent | Notification dispatched |
| Delivered | Recipient received it |
| Read | Recipient opened it |
| Skipped | Not delivered; reason recorded |
| Failed | Delivery attempt failed |
| Pending | Awaiting delivery |

---

## Delivery Journal

Every notification is logged with:

- Event type
- Recipient
- Channel
- Status
- Attempts
- Timestamp
- Reason (if skipped or failed)

Example:

| Event | Recipient | Channel | Status | Attempts | Reason |
|-------|-----------|---------|--------|----------|--------|
| Trip deadline breached | driver@test.local | Device push | Skipped | 1 | Recipient not authorized |
| Trip deadline breached | driver@test.local | In-app | Sent | 1 | - |

---

## Audit

Every communication action is auditable:

- Notification sent - logged with timestamp and channel
- Notification delivered - logged with recipient and time
- Notification read - logged with timestamp
- Notification skipped or failed - logged with reason
- Chat message sent, delivered, read - logged per participant
- Attachment uploaded - logged with type and size
- Reaction added - logged per message

The audit trail is part of the evidence layer. Any delivery claim can be independently verified.

---

## Evidence Integration

Chat messages and notifications become part of the evidence layer.

- Message status is verifiable
- Delivery journal is auditable
- Both are linked to the trip and claim

Chat and notification records are included in the Trip Evidence Root. When an Evidence Package Base is produced, the relevant communication records are referenced in the Evidence Package Base.

When a dispute starts, the system shows:

- Which channel was used
- When the message was sent
- Whether it was delivered
- Whether it was read
- Why it was skipped or failed, if applicable

---

## Related

- [Architecture](ARCHITECTURE.md) - overall system
- [Evidence Flow](EVIDENCE_FLOW.md) - three evidence levels and anchor rules
- [Evidence Package](EVIDENCE.md) - how communication becomes evidence
- [Webhooks](WEBHOOKS.md) - external event delivery
- [UI](UI.md) - chat and notification screens