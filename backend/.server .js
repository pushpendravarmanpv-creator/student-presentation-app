import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "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"; // 👈 यहां अपनी OpenAI key डालना

// ✅ Presentation Generate API
app.post("/api/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a presentation generator AI." },
          { role: "user", content: `Create a 5-slide student presentation on: ${topic}` },
        ],
      }),
    });

    const data = await response.json();
    res.json({ slides: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate presentation" });
  }
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  
