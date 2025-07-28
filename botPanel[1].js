const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BUGS_FILE = path.join(__dirname, 'flaggedBugs.json');

// Serve static files (optional: for CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Bot Panel Route
app.get('/panel', (req, res) => {
  fs.readFile(BUGS_FILE, 'utf-8', (err, data) => {
    let bugs = [];
    if (!err) {
      try { bugs = JSON.parse(data); } catch {}
    }
    // Render a simple HTML table
    res.send(`
      <html>
      <head>
        <title>Bot Panel</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f5f5f5; }
          table { border-collapse: collapse; width: 90%; margin: 2em auto; background: #fff;}
          th, td { padding: 12px; border: 1px solid #ccc; text-align: left;}
          th { background: #007bff; color: #fff; }
        </style>
      </head>
      <body>
        <h2 style="text-align:center;">Bot Panel - Flagged Bugs</h2>
        <table>
          <tr>
            <th>Title</th><th>Description</th><th>Reporter</th><th>Status</th>
          </tr>
          ${bugs.map(bug => `
            <tr>
              <td>${bug.title}</td>
              <td>${bug.description}</td>
              <td>${bug.reporter}</td>
              <td>${bug.status || 'Open'}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Bot panel running at http://localhost:${PORT}/panel`);
});