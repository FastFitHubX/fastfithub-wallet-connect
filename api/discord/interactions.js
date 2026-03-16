import { verifyKey } from "discord-interactions";

export const config = {
  api: { bodyParser: false }
};

const PUBLIC_KEY = "8de35fd5e2e82c39cce29987c3533f299379757178828d0fc651d03f2b752fb1";

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {

  const rawBody = await buffer(req);
  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];

  const isValid = verifyKey(
    rawBody.toString(),
    signature,
    timestamp,
    PUBLIC_KEY
  );

  if (!isValid) {
    return res.status(401).send("Bad request signature");
  }

  const body = JSON.parse(rawBody.toString());

  // Discord verification ping
  if (body.type === 1) {
    return res.json({ type: 1 });
  }

  // Slash command response
  return res.json({
    type: 4,
    data: { content: "FastFitHub command received" }
  });
}