import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Hardcoded OpenAI API Key
const OPENAI_API_KEY = "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";

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
    console.error(err);
    res.status(500).json({ error: "Failed to generate presentation" });
  }
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
