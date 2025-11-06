import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 🔹 Telegram Bot Token (Set in environment variables)
const BOT_TOKEN = process.env.BOT_TOKEN;
const BASE_URL = "https://api.telegram.org/bot" + BOT_TOKEN;

// 🔹 Your Vercel site (frontend)
const FRONTEND_URL = "https://uteraplay.vercel.app";

app.post("/", async (req, res) => {
  try {
    const message = req.body.message;
    if (!message || !message.text) return res.sendStatus(200);

    const chatId = message.chat.id;
    const text = message.text.trim();

    // ✅ If it's a valid Terabox link
    if (text.includes("terabox.com")) {
      const openPage = `${FRONTEND_URL}/open.html?url=${encodeURIComponent(text)}`;

      const reply = `🎬 *Your UteraPlay Video Link Ready!*\n\n[🔗 OPEN VIDEO](${openPage})`;

      await fetch(`${BASE_URL}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply,
          parse_mode: "Markdown"
        })
      });
    } else {
      // ❌ Invalid link
      await fetch(`${BASE_URL}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "📎 Please send a valid Terabox link!"
        })
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// ✅ Home route
app.get("/", (req, res) => res.send("UteraPlay Bot is running ✅"));

app.listen(3000, () => console.log("🚀 UteraPlay server started on port 3000"));
