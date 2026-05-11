import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Server is running ✅" });
});

app.post("/api/slack", async (req, res) => {
  const { name, email, message, subject, contact, from } = req.body;



  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(" SLACK_WEBHOOK_URL not found in .env");
    return res.status(500).json({
      error: "Slack webhook not configured",
    });
  }

  const payload = {
    text: `*New Portfolio Inquiry*\n*From:* ${from}\n*Name:* ${name}\n*Email:* ${email}\n*Contact:* ${contact}\n*Subject:* ${subject}\n*Message:* ${message}`,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("✅ Slack response:", text);

    if (!response.ok || text !== "ok") {
      throw new Error(`Slack error: ${text}`);
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ Slack Error:", error.message);
    res.status(500).json({
      error: "Slack notification failed",
      detail: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});