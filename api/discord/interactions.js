export default async function handler(req, res) {

  const interaction = req.body

  // Discord ping check
  if (interaction.type === 1) {
    return res.status(200).json({ type: 1 })
  }

  const command = interaction.data.name

  if (command === "balance") {
    return res.status(200).json({
      type: 4,
      data: {
        content: "💰 HUBX Balance: 120 HUBX"
      }
    })
  }

  if (command === "leaderboard") {
    return res.status(200).json({
      type: 4,
      data: {
        content: "🏆 Leaderboard coming soon"
      }
    })
  }

  if (command === "workout") {
    return res.status(200).json({
      type: 4,
      data: {
        content: "💪 Workout recorded"
      }
    })
  }

}