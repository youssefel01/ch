# Game Web App — Build Plan (Vercel + Express Edition)

## Overview

This document is a full instruction plan for building the web application that hosts the scavenger ENIGMA VERSE challenge from Stage 3 to Stage 7.

**The app is built using Express.js running as a Serverless Function on Vercel. Frontend pages are served as static HTML/CSS. This approach allows for free deployment while keeping advanced security like progressive cookies and hashed routes.**

---

## What the app covers

| Stage | URL | What happens |
|---|---|---|
| Stage 3 | `/start` | Shows the equation image |
| Stage 3 Answer | `/:answer` (e.g., `/29`) | Validates answer and redirects to Stage 4 hash |
| Stage 4 | `/robots.txt` | Custom robots file pointing to Stage 5 hash |
| Stage 5 | `/s/:hash` | Blank page with hidden HTML comment |
| Stage 6 | `/s/:hash` | Page with one downloadable image |
| Stage 7 | `/audio/:filename` | Serves the audio file if Stage 6 is complete |

---

## Security requirement — no route guessing

This is the most important requirement of the entire app.

### Rule 1 — Dynamic Hashed Routes
All sensitive routes (Stages 4-6) are accessed via a generic `/s/:hash` endpoint. The actual hashes are stored in `config.json` and are never exposed.

### Rule 2 — Progressive Session Cookies
Access to Stage N requires a valid HMAC-signed cookie from Stage N-1.
*   **Signature:** `HMAC-SHA256(stage_name + session_secret)`
*   **Stealth Fail:** If a cookie is missing or invalid, the server returns a **blank 404 page** (no text, no error), making it impossible to tell if the URL exists.

### Rule 3 — Answer Mapping (The "Gateway")
When a player types the answer to a puzzle (like `/29`), the server:
1.  Validates the answer against `config.json`.
2.  Sets the `stage3` cookie.
3.  **Redirects** them to the hashed URL of the next stage.

### Rule 4 — Stealth 404s
Every unauthorized request, rate-limit hit, or invalid route returns a completely empty white page with a 404 status.

---

## Backend (Express + Node.js)

The backend lives in `api/index.js` and uses:
*   `express`: For routing and middleware.
*   `cookie-parser`: To handle session cookies easily.
*   `crypto`: For HMAC signing.

### config.json structure

```json
{
  "answers": {
    "stage3": "30"
  },
  "routes": {
    "start": "start-page-logic",
    "stage4": "7b2e84",
    "stage5": "d1c559",
    "stage6": "f4a812"
  },
  "sessionSecret": "replace-this-with-a-long-random-string"
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
│   │   └── wall_meta.jpg
│   └── audio/
│       └── spectrum-analyzer.wav
├── config.json
├── vercel.json           ← Routing config for Vercel
└── package.json
```

---

## Page specifications

### `pages/start.html` — Stage 3
*   **Content:** White background, centered `equation.webp`.
*   **Logic:** No forms. Players must manually type the answer in the URL (e.g., `yoursite.com/29`).

### `/robots.txt`
*   **Content:**
    ```
    User-agent: *
    Disallow: /s/d1c559
    
    you should read everything if you want to win
    ```
*   **Logic:** Publicly accessible. Sets the `stage4` cookie when visited.

### `pages/stage5.html` — Stage 5 (Source Code)
*   **Content:** Blank. HTML comment: `<!-- good job. now inspect the image at: /s/f4a812 -->`.
*   **Requirement:** Requires `stage4` cookie.

### `pages/stage6.html` — Stage 6 (EXIF)
*   **Content:** A museum gallery with two security cameras and a central "box" artifact.
*   **Metadata:** The `the-box.png` image contains the comment: `Good job. Now listen carefully at: /audio/spectrum-analyzer.wav`.
*   **Requirement:** Requires `stage5` cookie.

---

## Deployment (Vercel)

1.  **Vercel configuration (`vercel.json`):**
    ```json
    {
      "rewrites": [
        { "source": "/(.*)", "destination": "/api/index.js" }
      ]
    }
    ```
2.  **Free Tier:** This setup runs entirely within Vercel's free hobby tier.
3.  **Environment Variables:** `sessionSecret` should be set in the Vercel Dashboard for extra security, though `config.json` works for local testing.

---

## Summary of Player Experience

1.  Starts at `/start`.
2.  Solves math, types `/29`.
3.  Server redirects to `/s/7b2e84`. Page says "find the robots".
4.  Goes to `/robots.txt`. Finds `/s/d1c559`.
5.  Goes to `/s/d1c559`. Views source, finds `/s/f4a812`.
6.  Goes to `/s/f4a812`. Downloads image, finds `/audio/spectrum-analyzer.wav`.
7.  Downloads audio, analyzes spectrogram.
