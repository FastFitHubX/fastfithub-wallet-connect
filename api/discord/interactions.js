export default function handler(req, res) {

  if (req.body?.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  return res.status(200).json({
    type: 4,
    data: { content: "FastFitHub endpoint working" }
  });

}