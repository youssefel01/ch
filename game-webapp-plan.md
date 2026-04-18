# Game Web App — Build Plan (Vercel + Express Edition)

## Overview

This document is a full instruction plan for building the web application that hosts the scavenger ENIGMA VERSE challenge from Stage 3 to Stage 7.

**The app is built using Express.js running as a Serverless Function on Vercel. Frontend pages are served as static HTML/CSS. This approach allows for free deployment while keeping hashed routes and stealth 404s.**

---

## What the app covers

| Stage | URL | What happens |
|---|---|---|
| Stage 3 | `/start` | Shows the equation image |
| Stage 3 Answer | `/:answer` (e.g., `/247`) | Validates answer and redirects to Stage 4 hash |
| Stage 4 | `/robots.txt` | Custom robots file pointing to Stage 5 hash |
| Stage 5 | `/s/:hash` | Blank page with hidden HTML comment |
| Stage 6 | `/s/:hash` | Page with one downloadable image |
| Stage 7 | `/audio/:filename` | Serves the audio file |

---

## Security requirement — no route guessing

This is the most important requirement of the entire app.

### Rule 1 — Dynamic Hashed Routes
All sensitive routes (Stages 4-6) are accessed via a generic `/s/:hash` endpoint. The actual hashes are stored in `config.json` and are never exposed.

### Rule 2 — Answer Mapping (The "Gateway")
When a player types the answer to a puzzle (like `/247`), the server:
1.  Validates the answer against `config.json`.
2.  **Redirects** them to the hashed URL of the next stage.

### Rule 3 — Stealth 404s
Every unauthorized request or invalid route returns a completely empty white page with a 404 status (actually a random meme page).

---

## Backend (Express + Node.js)

The backend lives in `api/index.js` and uses `express` for routing.

### config.json structure

```json
{
  "answers": {
    "stage3": "247"
  },
  "routes": {
    "start": "start-page-logic",
    "stage4": "7b2e84",
    "stage5": "d1c559",
    "stage6": "f4a812"
  }
}
```

---

## File structure

```
/
├── api/
│   └── index.js          ← Main Express logic (Vercel Function)
├── pages/
│   ├── start.html        ← Stage 3
│   ├── stage4.html       ← Stage 3 Answer Page
│   ├── stage5.html       ← Stage 5 (Source Code)
│   ├── stage6.html       ← Stage 6 (EXIF)
│   └── 404.html          ← Blank 404
├── public/
│   ├── assets/
│   │   ├── equation.webp
│   │   ├── camer1.jpg
│   │   ├── camer2.jpg
│   │   └── the-box.png
│   ├── audio/
│   │   └── academo-org-demos-spectrum-analyzer.wav
│   └── meme/
│       └── [1-7].jpg
├── config.json
├── vercel.json           ← Routing config for Vercel
└── package.json
```

---

## Page specifications

### `pages/start.html` — Stage 3
*   **Content:** White background, centered equations.
*   **Logic:** No forms. Players must manually type the answer in the URL (e.g., `yoursite.com/247`).

### `/robots.txt`
*   **Content:** Lists decoys + real Stage 5 hash.
*   **Logic:** Publicly accessible.

### `pages/stage5.html` — Stage 5 (Source Code)
*   **Content:** Security alert UI. HTML comment: `<!-- good job. now inspect the image at: /s/f4a812 -->` hidden under 10,000 lines of noise.

### `pages/stage6.html` — Stage 6 (EXIF)
*   **Content:** Museum heist UI with security cameras.
*   **Metadata:** The `the-box.png` image contains the comment: `Good job. Now listen carefully at: /audio/academo-org-demos-spectrum-analyzer.wav`.

---

## Summary of Player Experience

1.  Starts at `/start`.
2.  Solves math, types `/247`.
3.  Server redirects to `/s/7b2e84`. Page says "find the robots".
4.  Goes to `/robots.txt`. Finds `/s/d1c559`.
5.  Goes to `/s/d1c559`. Views source, finds `/s/f4a812`.
6.  Goes to `/s/f4a812`. Downloads image, finds `/audio/academo-org-demos-spectrum-analyzer.wav`.
7.  Downloads audio, analyzes spectrogram.
