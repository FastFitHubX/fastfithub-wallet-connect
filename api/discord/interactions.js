// api/discord/interactions.js
export const config = { api: { bodyParser: true } };

export default function handler(req, res) {
  // Accept POST only
  if (req.method !== "POST") return res.status(200).send("OK");

  const body = req.body || {};
  // Discord verification ping
  if (body.type === 1) return res.status(200).json({ type: 1 });

  // handle interaction command type
  if (body.type === 2) {
    const cmd = body.data?.name;
    if (cmd === "workout") {
      return res.status(200).json({ type: 4, data: { content: "🏋️ Workout recorded!" }});
    }
    if (cmd === "balance") {
      return res.status(200).json({ type: 4, data: { content: "💰 Balance coming soon." }});
    }
    if (cmd === "leaderboard") {
      return res.status(200).json({ type: 4, data: { content: "🏆 Leaderboard coming soon." }});
    }
  }

  return res.status(200).json({ type: 4, data: { content: "OK" }});
}