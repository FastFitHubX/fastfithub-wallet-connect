export default async function handler(req, res) {

  const body = req.body;

  // Discord verification
  if (body.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  const command = body.data.name;

  if (command === "workout") {
    return res.status(200).json({
      type: 4,
      data: { content: "🏋️ Workout recorded!" }
    });
  }

  if (command === "balance") {
    return res.status(200).json({
      type: 4,
      data: { content: "💰 Balance coming soon." }
    });
  }

  if (command === "leaderboard") {
    return res.status(200).json({
      type: 4,
      data: { content: "🏆 Leaderboard coming soon." }
    });
  }

}