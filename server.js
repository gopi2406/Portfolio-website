import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/slack", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  const payload = {
    text: `📬 New Portfolio Inquiry

Name: ${name}
Email: ${email}
Message: ${message}

Sent at: ${new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    })} IST`,
  };

  try {
    const response = await fetch(
      process.env.SLACK_WEBHOOK_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Slack failed");
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Slack notification failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});