/**
 * HTML Page Designer - Independent Local Server
 * Listens strictly on Port 3000
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static file directories
const publicPath = path.resolve(__dirname, '../public');
const frontendPath = path.resolve(__dirname, '../frontend');
const rootPath = path.resolve(__dirname, '..');

if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
}
app.use(express.static(rootPath));

// Health check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'HTML Page Designer',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Root entry point
app.get(['/', '/index.html', '/designer'], (req, res) => {
  res.sendFile(path.join(rootPath, 'index.html'));
});

// Start listening strictly on Port 3000
const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🎨 HTML Page Designer is RUNNING at: http://localhost:${PORT}`);
  console.log(`📂 Project Folder:  G:\\code\\projects\\HTML`);
  console.log(`⚡ Mode:            Local-First Independent Studio`);
  console.log(`======================================================\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[PORT CONFLICT] Port ${PORT} is already in use by another process.`);
    console.error(`Please close the competing process or grant authorization to change ports.\n`);
  } else {
    console.error(`Server error: ${err.message}`);
  }
});

module.exports = app;
