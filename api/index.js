const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'perfil',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.url === '/api/health' && req.method === 'GET') {
    try {
      await pool.query('SELECT 1');
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'ok' }));
    } catch (e) {
      res.writeHead(503);
      res.end(JSON.stringify({ status: 'error', message: 'DB not connected' }));
    }
    return;
  }

  if (req.url === '/api/mensajes' && req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM mensajes ORDER BY fecha DESC');
      res.writeHead(200);
      res.end(JSON.stringify(result.rows));
    } catch (e) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  if (req.url === '/api/mensajes' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const { nombre, mensaje } = JSON.parse(body);
        if (!nombre || !mensaje || mensaje.length > 280) {
          res.writeHead(400);
          return res.end(JSON.stringify({ error: 'Datos inválidos' }));
        }
        const result = await pool.query(
          'INSERT INTO mensajes (nombre, mensaje) VALUES ($1, $2) RETURNING *',
          [nombre, mensaje]
        );
        res.writeHead(201);
        res.end(JSON.stringify(result.rows[0]));
      } catch (e) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3000, '0.0.0.0', () => console.log('API corriendo en el puerto 3000'));