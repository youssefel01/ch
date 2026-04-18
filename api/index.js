const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();

// Load config
let config;
try {
  config = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json'), 'utf8'));
} catch (err) {
  console.error('Error loading config.json:', err);
  process.exit(1);
}

// Stealth 404 Helper
function sendStealth404(res) {
  res.status(404).sendFile(path.join(process.cwd(), 'pages', '404.html'));
}

// Static Assets
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
    return res.redirect(`/s/${config.routes.stage4}`);
  }
  next(); // Pass to next route (likely 404)
});

// Robots.txt (Stage 4 Start)
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');

  const decoys = [
    '/admin', '/root', '/secret', '/passwords', '/firewall', '/bypass', '/hidden', '/tmp', '/cache',
    '/uploads', '/downloads', '/archives', '/src', '/api_v1', '/api_v2', '/berkan', '/login',
    '/logout', '/profile', '/dashboard', '/system', '/kernel', '/boot', '/etc', '/var',
    '/home', '/limon', '/dev', '/proc', '/sys', '/tmp_storage', '/trash', '/recovery',
    '/deprecated', '/legacy', '/next_gen', '/experimental'
  ];

  // Insert the real path at a random position among the decoys
  const realPath = `/s/${config.routes.stage5}`;
  const randomIndex = Math.floor(Math.random() * (decoys.length + 1));
  const newDecoys = [...decoys];
  newDecoys.splice(randomIndex, 0, realPath);

  let robotsContent = 'User-agent: *\n';
  newDecoys.forEach(path => {
    robotsContent += `Disallow: ${path}\n`;
  });
  
  robotsContent += '\nyou should read everything if you want to win';
  res.send(robotsContent);
});

// Dynamic Stages (Stages 4-6)
app.get('/s/:hash', (req, res) => {
  const hash = req.params.hash;

  // Stage 4 (Result of Equation)
  if (hash === config.routes.stage4) {
    return res.sendFile(path.join(process.cwd(), 'pages', 'stage4.html'));
  }

  // Stage 5 (Source Code)
  if (hash === config.routes.stage5) {
    return res.sendFile(path.join(process.cwd(), 'pages', 'stage5.html'));
  }

  // Stage 6 (EXIF)
  if (hash === config.routes.stage6) {
    return res.sendFile(path.join(process.cwd(), 'pages', 'stage6.html'));
  }

  sendStealth404(res);
});

// Stage 7 (Audio)
app.get('/audio/:filename', (req, res) => {
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
