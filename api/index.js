const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cookieParser());

// Load config
let config;
try {
  config = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json'), 'utf8'));
} catch (err) {
  console.error('Error loading config.json:', err);
  process.exit(1);
}

// HMAC Helper
function signStage(stageName) {
  const secret = process.env.SESSION_SECRET || config.sessionSecret;
  return crypto
    .createHmac('sha256', secret)
    .update(stageName)
    .digest('hex');
}

function verifyStage(req, stageName) {
  const cookieName = `s_${stageName}`;
  const signature = req.cookies[cookieName];
  if (!signature) return false;
  return signature === signStage(stageName);
}

function setStageCookie(res, stageName) {
  res.cookie(`s_${stageName}`, signStage(stageName), {
    httpOnly: true,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production'
  });
}

// Stealth 404 Helper
function sendStealth404(res) {
  res.status(404).sendFile(path.join(process.cwd(), 'pages', '404.html'));
}

// Static Assets (Placeholders)
app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')));
app.use('/meme', express.static(path.join(process.cwd(), 'public/meme')));

// --- Routes ---

// Stage 3 Start
app.get('/start', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'pages', 'start.html'));
});

// Stage 3 Answer Gateway
app.get('/:answer', (req, res, next) => {
  const answer = req.params.answer;
  if (answer === config.answers.stage3) {
    setStageCookie(res, 'stage3');
    return res.redirect(`/s/${config.routes.stage4}`);
  }
  next(); // Pass to next route (likely 404)
});

// Robots.txt (Stage 4 Start)
app.get('/robots.txt', (req, res) => {
  setStageCookie(res, 'stage4');
  res.type('text/plain');

  const decoys = [
    '/admin', '/root', '/secret', '/passwords', '/firewall', '/bypass', '/hidden', '/tmp', '/cache',
    '/uploads', '/downloads', '/archives', '/src', '/api_v1', '/api_v2', '/berkan', '/login',
    '/logout', '/profile', '/dashboard', '/system', '/kernel', '/boot', '/etc', '/var',
    '/home', '/limon', '/dev', '/proc', '/sys', '/tmp_storage', '/trash', '/recovery',
    '/deprecated', '/legacy', '/next_gen', '/experimental'
  ];

  let robotsContent = 'User-agent: *\n';
  decoys.forEach(path => {
    robotsContent += `Disallow: ${path}\n`;
  });
  
  // The real clue is hidden among the decoys
  robotsContent += `Disallow: /s/${config.routes.stage5}\n`;
  
  robotsContent += '\nyou should read everything if you want to win';
  res.send(robotsContent);
});

// Dynamic Stages (Stages 4-6)
app.get('/s/:hash', (req, res) => {
  const hash = req.params.hash;

  // Stage 4 (Result of Equation)
  if (hash === config.routes.stage4) {
    if (!verifyStage(req, 'stage3')) return sendStealth404(res);
    // stage4 cookie is set when visiting robots.txt, but for now we serve the page
    return res.sendFile(path.join(process.cwd(), 'pages', 'stage4.html'));
  }

  // Stage 5 (Source Code)
  if (hash === config.routes.stage5) {
    if (!verifyStage(req, 'stage4')) return sendStealth404(res);
    setStageCookie(res, 'stage5');
    return res.sendFile(path.join(process.cwd(), 'pages', 'stage5.html'));
  }

  // Stage 6 (EXIF)
  if (hash === config.routes.stage6) {
    if (!verifyStage(req, 'stage5')) return sendStealth404(res);
    setStageCookie(res, 'stage6');
    return res.sendFile(path.join(process.cwd(), 'pages', 'stage6.html'));
  }

  sendStealth404(res);
});

// Stage 7 (Audio)
app.get('/audio/:filename', (req, res) => {
  if (!verifyStage(req, 'stage6')) return sendStealth404(res);
  const filePath = path.join(process.cwd(), 'public/audio', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    sendStealth404(res);
  }
});

// Default 404
app.use((req, res) => {
  sendStealth404(res);
});

module.exports = app;
