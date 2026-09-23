# LogiQED Authentication and Authorization

Custom identity subsystem for LogiQED.

Hybrid stateful JWT authentication with server-managed sessions, multi-stage login, contextual security policies, 2FA, trusted devices, refresh-token rotation, and RBAC / permissions.

## Key Principles

- JWT is not the sole source of truth.
- Server session exists with its own TokenVersion.
- Session can be revoked independently of JWT expiration.
- Authentication and authorization are separated.
- Roles and permissions are fully configurable. No hardcoded roles.

## Login Flow

- Capture client context: IP, User-Agent, device cookie, ClientDeviceId.
- Validate account state: blocking, lockout.
- Verify password.
- Evaluate security policy: IP allow-list, CIDR, new IP, new device.
- Select login stage: Authenticated, RequiresTwoFactorVerification, RequiresTwoFactorEnrollment.
- Create server session, issue access and refresh tokens.
- Restore client state in Blazor.

## Login Stages

- Authenticated: full access token + refresh token.
- RequiresTwoFactorVerification: TempToken then TOTP / recovery / SMS / email.
- RequiresTwoFactorEnrollment: EnrollmentToken then TOTP setup.

## Account Protection

- Administrative blocking: IsBlocked, BlockedAt, BlockedReason.
- Password lockout: LoginFailedCount, LoginLockedUntil.
- 2FA lockout: TwoFactorFailedCount, TwoFactorLockedUntil.
- Independent thresholds for password and second factor.

## Adaptive Login Policies

- IP allow-list and CIDR rules.
- New IP requires 2FA.
- New device requires 2FA.
- Trusted device may skip 2FA.

## Two-Factor Authentication

- TOTP primary flow.
- SMS OTP and Email OTP.
- Recovery codes stored as SHA-256 hashes.
- TOTP secret encrypted with AES-256-GCM.
- OTP codes stored only as hashes.

## Trusted Devices

- Random device token, only hash stored.
- Bound to ClientDeviceIdHash.
- Trust requires cookie hash + ClientDeviceIdHash + unexpired record.
- Cookie copying alone does not bypass 2FA.

## Server Sessions and Access Tokens

- SessionEntity stores user, fingerprint, IP, TokenVersion, revoke state.
- Access JWT carries identity, roles, session id, token version.
- RefreshTokenEntity stores hash, session binding, fingerprint, expiry, revoke state.

## Refresh-Token Rotation

- Refresh token is a random value, only hash stored.
- Bound to session and client fingerprint.
- Rotation chain detects reuse.
- Grace window for concurrent Blazor circuits.
- Session revocation increments TokenVersion and revokes refresh tokens.

## Blazor UI Persistence

- AccessTokenHandler adds token to API calls.
- SessionRefreshService refreshes proactively 30 seconds before expiry.
- RefreshTokenHandler retries 401 once after forced refresh.
- AuthSyncHost syncs logout across tabs via BroadcastChannel and localStorage.

## Authorization

- UserEntity has roles and direct permissions.
- Effective roles and effective permissions calculated centrally.
- Authentication and authorization are separate concerns.
- Navigation, screens, and backend endpoints are generated from effective permissions.
- Any custom role can be created with any combination of permissions.

## Permission-Driven UI

Workflows, roles, and UI are connected.

An administrator can create a new role and assign it any combination of permissions.

The UI adapts to the role automatically:

- Menu items are shown or hidden based on effective permissions
- Screens are generated from permissions
- Backend endpoints enforce the same permissions

### Example: Border Control Role

An administrator creates a role **Border Control** with permissions:

- `Registry.Read` - view trip registry, read-only
- `Evidence.Read` - view Evidence Packages and Evidence Roots
- `Incidents.Read` - view incident reports

Result:

- The Border Control user sees only these three sections in the navigation
- No write buttons
- No admin panel
- No telemetry access
- No chat access

The same platform serves both the dispatcher and the border control officer, without a separate build or separate configuration per role.

See [Workflow](WORKFLOW.md) for how statuses and transitions integrate with permissions.

## Default Demo Roles

Six seeded roles show how navigation and permissions are generated rather than hardcoded.

| Role | Access |
|------|--------|
| Administrator | Users, Roles, Permissions, Rules & Endpoints, Audit Journal |
| SLA Analyst | SLA policies, Working Calendar, Driver Incident Reports |
| Dispatcher | Registry, Map, Incidents, Workflow, Evidence Packages |
| Driver | Mobile Driver View, Telemetry, Incidents |
| Shift Supervisor | Org structure: departments, employees, duty roster |
| Auditor | Evidence Packages, Trust sources, Audit Journal. Verify, export. |

## Security Properties

- Password hashing and lockout.
- Adaptive login policies.
- 2FA isolation.
- Secret protection: encrypted TOTP secret, hashed tokens.
- Session revocation.
- Refresh hardening.
- Client resilience.
- RBAC separation.
- Fully configurable roles without hardcoded permissions.
- Evidence access is separate from operational access. Auditor and Border Control roles can view Evidence Packages without access to raw telemetry.