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
  
