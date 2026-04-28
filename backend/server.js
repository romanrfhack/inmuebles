const http = require('http');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, '..', 'frontend');
const leadsFile = path.join(__dirname, 'leads.json');

function ensureLeadsFile() {
  if (!fs.existsSync(leadsFile)) {
    fs.writeFileSync(leadsFile, '[]\n', 'utf8');
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      sendJson(res, 500, { success: false, mensaje: 'No fue posible cargar el recurso' });
      return;
    }

    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
    };

    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function serveStatic(req, res) {
  const requestedPath = req.url === '/' ? '/index.html' : req.url;
  const normalizedPath = path.normalize(requestedPath).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(frontendDir, normalizedPath);

  if (!filePath.startsWith(frontendDir)) {
    sendJson(res, 403, { success: false, mensaje: 'Acceso denegado' });
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      sendJson(res, 404, { success: false, mensaje: 'Recurso no encontrado' });
      return;
    }

    sendFile(res, filePath);
  });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        reject(new Error('Payload demasiado grande'));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('JSON inválido'));
      }
    });

    req.on('error', reject);
  });
}

function saveLead(payload) {
  ensureLeadsFile();
  const current = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
  current.push(payload);
  fs.writeFileSync(leadsFile, JSON.stringify(current, null, 2) + '\n', 'utf8');
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/leads') {
    try {
      const body = await parseBody(req);
      const nombre = (body.nombre || '').trim();
      const telefono = (body.telefono || '').trim();

      if (!nombre || !telefono) {
        sendJson(res, 400, { success: false, mensaje: 'Nombre y teléfono son obligatorios' });
        return;
      }

      const lead = {
        id: randomUUID(),
        fecha: new Date().toISOString(),
        nombre,
        telefono,
        tipoProblema: (body.tipoProblema || '').trim(),
        valorEstimado: (body.valorEstimado || '').trim(),
        comentarios: (body.comentarios || '').trim(),
        origen: 'landing',
      };

      saveLead(lead);
      sendJson(res, 200, { success: true, mensaje: 'Recibimos tu información' });
    } catch (error) {
      const statusCode = error.message === 'JSON inválido' ? 400 : 500;
      sendJson(res, statusCode, { success: false, mensaje: error.message || 'Error interno del servidor' });
    }
    return;
  }

  if (req.method === 'GET') {
    serveStatic(req, res);
    return;
  }

  sendJson(res, 405, { success: false, mensaje: 'Método no permitido' });
});

server.listen(PORT, () => {
  ensureLeadsFile();
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
