const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5173;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=UTF-8',
  '.vcf': 'text/vcard'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const cleanPath = urlPath === '/' ? 'index.html' : decodeURIComponent(urlPath.replace(/^\//, ''));
  const filePath = path.join(__dirname, cleanPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`FRONTEND_RUNNING: http://localhost:${PORT}`);
});
