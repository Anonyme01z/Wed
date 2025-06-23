const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Incoming request: ${req.url}`);
    
    // Handle root path
    if (req.url === '/') {
        req.url = '/index.html';
    }

    // Determine if the request is for a file in the src directory or public directory
    let filePath;
    if (req.url.startsWith('/images/') || req.url.startsWith('/music/')) {
        filePath = path.join(__dirname, 'public', req.url);
        console.log('Serving from public:', filePath);
    } else {
        filePath = path.join(__dirname, 'src', req.url);
        console.log('Serving from src:', filePath);
    }
    
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.mp3':
            contentType = 'audio/mpeg';
            break;
    }

    // Check if file exists before trying to read it
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        res.writeHead(404);
        res.end(`File not found: ${req.url}`);
        return;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.error(`Error reading file ${filePath}:`, error);
            if(error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            // Add CORS and caching headers
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=31536000'
            });
            res.end(content, 'utf-8');
            console.log(`Successfully served: ${req.url}`);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
