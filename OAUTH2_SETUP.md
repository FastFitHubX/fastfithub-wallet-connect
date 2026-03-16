# Discord OAuth2 Setup Guide

This guide explains how to set up Discord OAuth2 authentication for FastFitHub Wallet.

## Overview

The OAuth2 code grant flow allows users to authenticate with Discord and authorize FastFitHub to access their profile information.

## Architecture

```
User
  │
  ├─ Clicks "Login with Discord"
  │
  ├─ Redirected to: /api/discord/login
  │
  ├─ Redirected to: https://discord.com/api/oauth2/authorize?...
  │
  ├─ User approves permissions
  │
  ├─ Discord redirects to: /api/discord/callback?code=...&state=...
  │
  ├─ Exchange code for access token
  │
  ├─ Fetch user information
  │
  └─ Return user data and token to client
```

## Prerequisites

1. Discord Application created at [Discord Developer Portal](https://discord.com/developers/applications)
2. Application ID: `1482537483815358504`
3. Client Secret: Available in Discord Developer Portal

## Configuration

### 1. Set Environment Variables

Create a `.env.local` file with:

```env
DISCORD_CLIENT_SECRET=your_client_secret_here
DISCORD_REDIRECT_URI=https://your-domain.vercel.app/api/discord/callback
```

### 2. Configure Redirect URI in Discord

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Go to "OAuth2" → "General"
4. Add Redirect URL: `https://your-domain.vercel.app/api/discord/callback`
5. Save changes

### 3. Configure Interactions Endpoint

1. Go to "General Information"
2. Set Interactions Endpoint URL: `https://your-domain.vercel.app/api/discord/interactions`
3. Discord will verify the endpoint with a PING request

## Endpoints

### GET /api/discord/login

Initiates the OAuth2 authorization flow.

**Usage**:
```html
<a href="/api/discord/login">Login with Discord</a>
```

**Flow**:
1. User clicks the link
2. Redirected to Discord authorization page
3. User approves permissions
4. Discord redirects to `/api/discord/callback`

### GET /api/discord/callback

Handles the OAuth2 callback from Discord.

**Parameters**:
- `code`: Authorization code from Discord
- `state`: State parameter for CSRF protection

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "username": "username",
    "discriminator": "0",
    "avatar": "avatar-hash",
    "email": "user@example.com"
  },
  "accessToken": "access-token",
  "expiresIn": 604800
}
```

**Error Response**:
```json
{
  "error": "Failed to exchange authorization code"
}
```

### POST /api/discord/interactions

Handles Discord slash command interactions.

**Headers Required**:
- `X-Signature-Ed25519`: Ed25519 signature
- `X-Signature-Timestamp`: Request timestamp

**Supported Commands**:
- `/balance` - Check HUBX balance
- `/workout` - Record a workout
- `/leaderboard` - View leaderboard

## Scopes

The OAuth2 flow requests the following scopes:

| Scope | Purpose |
| :--- | :--- |
| `identify` | Access user ID and username |
| `email` | Access user email address |

## Security Considerations

1. **Client Secret**: Never expose the client secret in frontend code
2. **State Parameter**: Used to prevent CSRF attacks
3. **Signature Verification**: All interactions are verified using Ed25519 signatures
4. **HTTPS Only**: OAuth2 requires HTTPS in production
5. **Token Storage**: Store access tokens securely (HttpOnly cookies recommended)

## Testing

### Test OAuth2 Login

1. Navigate to `https://your-domain.vercel.app/api/discord/login`
2. You will be redirected to Discord
3. Approve the permissions
4. You will be redirected back to the callback endpoint
5. User data and access token will be returned

### Test Slash Commands

1. Use `/balance` in Discord
2. Use `/workout` in Discord
3. Use `/leaderboard` in Discord

Each command should respond with the appropriate message.

## Troubleshooting

### "Invalid Client ID"

- Verify the client ID is correct: `1482537483815358504`
- Check that the application exists in Discord Developer Portal

### "Redirect URI Mismatch"

- Ensure the redirect URI in Discord matches: `https://your-domain.vercel.app/api/discord/callback`
- Check for trailing slashes or protocol mismatches

### "Invalid Client Secret"

- Verify the client secret in `.env.local`
- Regenerate the client secret in Discord Developer Portal if needed

### "Interactions Endpoint URL Not Responding"

- Verify the endpoint is deployed to Vercel
- Check Vercel logs for errors
- Ensure the URL is correct: `https://your-domain.vercel.app/api/discord/interactions`

## Deployment

### Deploy to Vercel

```bash
git add .
git commit -m "feat: add discord oauth2 authentication"
git push origin main
```

The OAuth2 endpoints will be automatically deployed to Vercel.

### Update Discord Configuration

After deployment:

1. Update the Redirect URI in Discord Developer Portal
2. Update the Interactions Endpoint URL in Discord Developer Portal
3. Test the OAuth2 flow and slash commands

## API Reference

### Token Response

```json
{
  "access_token": "access-token",
  "token_type": "Bearer",
  "expires_in": 604800,
  "refresh_token": "refresh-token",
  "scope": "identify email"
}
```

### User Object

```json
{
  "id": "user-id",
  "username": "username",
  "discriminator": "0",
  "avatar": "avatar-hash",
  "avatar_decoration_data": null,
  "bot": false,
  "system": false,
  "mfa_enabled": true,
  "banner": null,
  "accent_color": null,
  "locale": "en-US",
  "verified": true,
  "email": "user@example.com",
  "flags": 0,
  "premium_type": 0,
  "public_flags": 0
}
```

## Next Steps

1. Deploy to Vercel
2. Update Discord configuration
3. Test OAuth2 login flow
4. Test slash commands
5. Monitor logs for errors

For more information, see the [Discord Developer Documentation](https://discord.com/developers/docs).
