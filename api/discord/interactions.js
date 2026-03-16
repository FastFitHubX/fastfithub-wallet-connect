import { verifyKey } from "discord-interactions";

export const config = {
  api: {
    bodyParser: false,
  },
};

const PUBLIC_KEY = "8de35fd5e2e82c39cce29987c3533f299379757178828d0fc651d03f2b752fb1";

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const rawBody = await getRawBody(req);

  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];

  const isValidRequest = verifyKey(
    rawBody,
    signature,
    timestamp,
    PUBLIC_KEY
  );

  if (!isValidRequest) {
    return res.status(401).send("Invalid request signature");
  }

  const body = JSON.parse(rawBody);

  if (body.type === 1) {
    return res.json({ type: 1 });
  }

  return res.json({
    type: 4,
    data: {
      content: "FastFitHub interaction received",
    },
  });
}