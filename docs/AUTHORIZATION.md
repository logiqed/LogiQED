# LogiQED Authentication and Authorization

Custom identity subsystem for LogiQED.

Hybrid stateful JWT authentication with server-managed sessions, multi-stage login, contextual security policies, 2FA, trusted devices, refresh-token rotation, and RBAC / permissions.

## Key Principles

- JWT is not the sole source of truth.
- Server session exists with its own TokenVersion.
- Session can be revoked independently of JWT expiration.
- Authentication and authorization are separated.

## Login Flow

1. Capture client context: IP, User-Agent, device cookie, ClientDeviceId.
2. Validate account state: blocking, lockout.
3. Verify password.
4. Evaluate security policy: IP allow-list, CIDR, new IP, new device.
5. Select login stage: Authenticated, RequiresTwoFactorVerification, RequiresTwoFactorEnrollment.
6. Create server session, issue access and refresh tokens.
7. Restore client state in Blazor.

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

## Security Properties

- Password hashing and lockout.
- Adaptive login policies.
- 2FA isolation.
- Secret protection: encrypted TOTP secret, hashed tokens.
- Session revocation.
- Refresh hardening.
- Client resilience.
- RBAC separation.