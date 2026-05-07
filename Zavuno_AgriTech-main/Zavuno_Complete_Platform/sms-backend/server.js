import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !fromNumber) {
  console.warn(
    "Missing Twilio configuration. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in sms-backend/.env.",
  );
}

const client = twilio(accountSid, authToken);

app.post("/send-sms", async (req, res) => {
  const { to, body } = req.body;

  if (!to || !body) {
    return res
      .status(400)
      .json({ error: "Both 'to' and 'body' are required." });
  }

  if (!accountSid || !authToken || !fromNumber) {
    return res.status(500).json({ error: "Twilio configuration is not set." });
  }

  try {
    const message = await client.messages.create({
      to,
      from: fromNumber,
      body,
    });
    return res.json({ sid: message.sid, status: message.status });
  } catch (error) {
    console.error("Twilio SMS error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Failed to send SMS." });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`SMS backend listening on http://localhost:${port}`);
});
