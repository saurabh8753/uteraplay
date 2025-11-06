import express from "express";

const app = express();
app.use(express.json());

// ✅ Serve HTML page dynamically
app.get("/open.html", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.send("<h3 style='text-align:center;margin-top:50px;color:red;'>⚠️ No Terabox video URL provided!</h3>");
  }

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>UteraPlay | Video Player</title>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #000000, #1a1a1a);
      color: white;
      height: 100vh;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    h1 {
      font-size: 2em;
      margin-bottom: 10px;
      background: linear-gradient(90deg, #ff7300, #ff0000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      font-size: 18px;
      color: #ccc;
    }
    button {
      margin-top: 25px;
      padding: 15px 40px;
      font-size: 18px;
      background: linear-gradient(90deg, #ff0000, #ff7300);
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 0 20px rgba(255, 100, 0, 0.8);
      transition: transform 0.3s ease;
    }
    button:hover {
      transform: scale(1.08);
    }
    #timer {
      margin-top: 20px;
      font-size: 22px;
      color: #ff7300;
    }
    @keyframes glow {
      from { box-shadow: 0 0 10px #ff4d00; }
      to { box-shadow: 0 0 25px #ff7300; }
    }
  </style>
</head>
<body>
  <h1>🔥 UteraPlay Video Player</h1>
  <p>Your Terabox video is being prepared...</p>
  <div id="timer">Please wait <span id="count">7</span> seconds</div>
  <button id="openBtn" disabled>⏳ Loading...</button>

  <script>
    let count = 7;
    const timer = document.getElementById("count");
    const btn = document.getElementById("openBtn");

    const interval = setInterval(() => {
      count--;
      timer.textContent = count;
      if (count === 0) {
        clearInterval(interval);
        btn.disabled = false;
        btn.textContent = "▶️ OPEN VIDEO";
      }
    }, 1000);

    btn.addEventListener("click", () => {
      window.location.href = "https://iteraplay.com/api/play.php?url=${videoUrl}&key=iTeraPlay2025";
    });
  </script>
</body>
</html>
  `);
});

// ✅ Root route (homepage)
app.get("/", (req, res) => {
  res.send("<h2>✅ UteraPlay Bot is live and running on Vercel!</h2>");
});

// ✅ Export for Vercel
export default app;
