export default async function handler(req, res) {

  const { type, data } = req.body

  if (type === 1) {
    return res.status(200).json({ type: 1 })
  }

  if (data.name === "balance") {
    return res.json({
      type: 4,
      data: {
        content: "💰 HUBX Balance: 120"
      }
    })
  }

  if (data.name === "leaderboard") {
    return res.json({
      type: 4,
      data: {
        content: "🏆 Leaderboard coming soon"
      }
    })
  }

  if (data.name === "workout") {
    return res.json({
      type: 4,
      data: {
        content: "🏋 Workout recorded!"
      }
    })
  }

}