const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const url = require('url');

// Configuration
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Default to index.html
  if (pathname === '/') {
    pathname = '/control-panel.html';
  }
  
  // Map file extension to content type
  const extensionToContentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  
  // Get file extension
  const ext = path.extname(pathname);
  let contentType = extensionToContentType[ext] || 'text/plain';
  
  // Read file
  fs.readFile(path.join(__dirname, pathname.substr(1)), (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('404 Not Found');
        return;
      }
      
      // Server error
      res.writeHead(500);
      res.end('500 Internal Server Error');
      return;
    }
    
    // Success - return file content
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Connected clients
const clients = new Set();

// WebSocket connection handler
wss.on('connection', (ws) => {
  // Add new client to the set
  clients.add(ws);
  console.log('Client connected. Total connections:', clients.size);
  
  // Message handler
  ws.on('message', (message) => {
    try {
      // Broadcast the message to all clients
      const messageData = message.toString();
      console.log('Received message:', messageData);
      
      // Forward the message to all other clients
      clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(messageData);
        }
      });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });
  
  // Connection close handler
  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected. Total connections:', clients.size);
  });
  
  // Error handler
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Control panel: http://localhost:${PORT}/control-panel.html`);
  console.log(`Overlay: http://localhost:${PORT}/overlay.html`);
});