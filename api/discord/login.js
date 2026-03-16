/**
 * Discord OAuth2 Login Redirect
 * Redirects user to Discord authorization page
 */

const DISCORD_CLIENT_ID = '1482537483815358504';
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || 'https://your-domain.vercel.app/api/discord/callback';

// OAuth2 scopes
const SCOPES = ['identify', 'email'];

export default async function handler(req, res) {
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Generate authorization URL
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES.join(' '),
    state: Math.random().toString(36).substring(7), // Simple state for CSRF protection
  });

  const authorizationUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;

  // Redirect to Discord authorization page
  return res.redirect(307, authorizationUrl);
}
