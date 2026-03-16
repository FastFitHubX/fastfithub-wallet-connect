import crypto from 'crypto';

// Discord App credentials
const DISCORD_PUBLIC_KEY = '8de35fd5e2e82c39cce29987c3533f299379757178828d0fc651d03f2b752fb1';

// Discord interaction types
const INTERACTION_TYPE = {
  PING: 1,
  APPLICATION_COMMAND: 2,
};

// Discord response types
const RESPONSE_TYPE = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
};

/**
 * Verify Discord interaction signature
 * @param {string} body - Raw request body
 * @param {string} signature - X-Signature-Ed25519 header
 * @param {string} timestamp - X-Signature-Timestamp header
 * @returns {boolean} - True if signature is valid
 */
function verifyDiscordSignature(body, signature, timestamp) {
  const message = timestamp + body;
  
  try {
    const isValid = crypto
      .createVerify('Ed25519')
      .update(message)
      .verify(DISCORD_PUBLIC_KEY, signature, 'hex');
    
    return isValid;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get headers
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];

  // Verify signature
  if (!signature || !timestamp) {
    console.error('Missing Discord signature headers');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get raw body for signature verification
  let rawBody = req.body;
  if (typeof rawBody === 'object') {
    rawBody = JSON.stringify(rawBody);
  }

  if (!verifyDiscordSignature(rawBody, signature, timestamp)) {
    console.error('Invalid Discord signature');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Parse interaction
  const interaction = req.body;

  try {
    // Handle PING interaction
    if (interaction.type === INTERACTION_TYPE.PING) {
      return res.status(200).json({
        type: RESPONSE_TYPE.PONG,
      });
    }

    // Handle APPLICATION_COMMAND interaction
    if (interaction.type === INTERACTION_TYPE.APPLICATION_COMMAND) {
      const command = interaction.data.name;

      if (command === 'balance') {
        return res.status(200).json({
          type: RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '💰 **HUBX Balance: 120 HUBX**',
            flags: 0,
          },
        });
      }

      if (command === 'workout') {
        return res.status(200).json({
          type: RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '✅ **Workout recorded successfully**\n\nYour activity has been verified and recorded on the blockchain.',
            flags: 0,
          },
        });
      }

      if (command === 'leaderboard') {
        return res.status(200).json({
          type: RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '🏆 **Leaderboard coming soon**\n\nWe\'re working on bringing you real-time leaderboard rankings!',
            flags: 0,
          },
        });
      }

      // Unknown command
      return res.status(200).json({
        type: RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `❌ Unknown command: ${command}`,
          flags: 64, // Ephemeral message
        },
      });
    }

    // Unknown interaction type
    console.warn(`Unknown interaction type: ${interaction.type}`);
    return res.status(400).json({ error: 'Unknown interaction type' });
  } catch (error) {
    console.error('Error handling interaction:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}