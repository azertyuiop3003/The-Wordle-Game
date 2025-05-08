import express from "express";
import cors from "cors";
import favicon from "serve-favicon";
import path from "path";

// ─── Inline OpenAPI/Swagger spec ────────────────────────────────────────────
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Wordle API",
    version: "1.0.0",
    description: "Random-word & validity endpoints for the Wordle game.",
  },
  servers: [{ url: "https://wordle-game-backend.vercel.app/api/" }],
  paths: {
    "/random-word": {
      get: {
        summary: "Get a random 5-letter word",
        responses: {
          "200": {
            description: "A random word",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    word: { type: "string", example: "apple" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/word-valid/{word}": {
      get: {
        summary: "Check if a word is valid",
        parameters: [
          {
            name: "word",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Validity of the word",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    valid: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// ─── Backup list of 108 common 5-letter words ───────────────────────────────
const backupWords = [
  "about",
  "other",
  "which",
  "their",
  "there",
  "first",
  "would",
  "these",
  "click",
  "price",
  "state",
  "smith",
  "green",
  "house",
  "apple",
  "table",
  "chair",
  "world",
  "thing",
  "place",
  "never",
  "again",
  "every",
  "great",
  "small",
  "large",
  "money",
  "power",
  "heart",
  "light",
  "water",
  "dance",
  "laugh",
  "dream",
  "music",
  "movie",
  "party",
  "beach",
  "night",
  "happy",
  "visit",
  "thought",
  "friend",
  "peace",
  "earth",
  "ocean",
  "river",
  "sweet",
  "spice",
  "group",
  "begin",
  "bring",
  "carry",
  "check",
  "craft",
  "focus",
  "ghost",
  "honey",
  "ideal",
  "judge",
  "kneel",
  "magic",
  "nurse",
  "order",
  "phone",
  "queen",
  "round",
  "share",
  "trust",
  "union",
  "value",
  "watch",
  "yield",
  "zone",
  "birth",
  "claim",
  "drive",
  "fetch",
  "grant",
  "image",
  "joint",
  "knight",
  "layer",
  "metal",
  "offer",
  "pound",
  "quick",
  "rough",
  "super",
  "theme",
  "urban",
  "video",
  "whale",
  "xenon",
  "yacht",
  "zebra",
  "eager",
  "brave",
  "cheap",
  "doubt",
  "eagle",
  "fancy",
  "giant",
  "hotel",
  "issue",
  "jelly",
  "merry",
];

// In-memory cache
let validWords: Set<string> | null = null;

// ─── Fetch & cache the official list once (fallback on error) ───────────────
async function loadWordList() {
  if (validWords) return;
  const RAW =
    "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";
  try {
    const res = await fetch(RAW);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    validWords = new Set(
      text
        .split("\n")
        .map((w) => w.trim())
        .filter((w) => /^[a-z]{5}$/.test(w)),
    );
    console.log(`✅ Loaded ${validWords.size} words from GitHub.`);
  } catch (err) {
    console.error("⚠️  Could not fetch word list – using backup:", err);
    validWords = new Set(backupWords);
  }
}

const app = express();

// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// serve the favicon placed at backend/favicon.ico
app.use(favicon(path.join(__dirname, "favicon.ico")));

// ensure word list is loaded
app.use(async (_req, _res, next) => {
  await loadWordList();
  next();
});

// ─── ROUTES ─────────────────────────────────────────────────────────────────
app.get("/api/random-word", (_req, res) => {
  const arr = Array.from(validWords!);
  const word = arr[Math.floor(Math.random() * arr.length)];
  res.json({ word });
});

app.get("/api/word-valid/:word", (req, res) => {
  const guess = String(req.params.word).toLowerCase();
  res.json({ valid: validWords!.has(guess) });
});

app.get("/swagger.json", (_req, res) => {
  res.json(swaggerSpec);
});

app.get("/api-docs", (_req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Wordle API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4/swagger-ui.css" />
  <link rel="icon" href="/favicon.ico" />
  <style>body{margin:0}</style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@4/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@4/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      SwaggerUIBundle({
        url: '/swagger.json',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: 'StandaloneLayout'
      });
    };
  </script>
</body>
</html>`);
});

// redirect root → docs
app.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

// ─── EXPORT FOR VERCEL ────────────────────────────────────────────────────────
// express `app` is itself a `(req, res) => void` handler,
// so Vercel’s Node builder will invoke it on every request.
export default app;
