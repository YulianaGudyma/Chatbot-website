// Importera nödvändiga paket
const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Lägg till CORS-stöd

// Skapa en instans av Express
const app = express();
const PORT = process.env.PORT || 3000;

// Använd JSON och CORS som middleware
app.use(express.json());
app.use(cors());

// Läsa in OpenAI API-nyckeln från miljövariabler
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Skapa en endpoint för att hantera chattförfrågningar
app.post("/api/chat", async (req, res) => {
  const userInput = req.body.prompt;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: userInput,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Ett fel inträffade.");
  }
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
