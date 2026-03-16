export default async function handler(req, res) {

  // Discord ping verification
  if (req.body?.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  // Handle slash commands
  if (req.body?.type === 2) {

    const command = req.body.data.name;

    if (command === "workout") {
      return res.status(200).json({
        type: 4,
        data: {
          content: "🏋️ Workout recorded!"
        }
      });
    }

    if (command === "balance") {
      return res.status(200).json({
        type: 4,
        data: {
          content: "💰 Balance coming soon"
        }
      });
    }

    if (command === "leaderboard") {
      return res.status(200).json({
        type: 4,
        data: {
          content: "🏆 Leaderboard coming soon"
        }
      });
    }

  }

  return res.status(200).json({ type: 4, data: { content: "OK" } });

}