const http = require('http');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, '..', 'frontend');
const leadsFile = path.join(__dirname, 'leads.json');
const MAX_BODY_SIZE = 25 * 1024;
const PHONE_MIN_LENGTH = 8;
const PHONE_MAX_LENGTH = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const TELEGRAM_MESSAGE_COMMENT_LIMIT = 500;
const rateLimitStore = new Map();

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
    let size = 0;
    const chunks = [];
    let aborted = false;

    req.on('data', (chunk) => {
      if (aborted) {
        return;
      }

      size += chunk.length;
      if (size > MAX_BODY_SIZE) {
        aborted = true;
        reject({ statusCode: 413, mensaje: 'Payload demasiado grande' });
        return;
      }

      chunks.push(chunk);
    });

    req.on('end', () => {
      if (aborted) {
        return;
      }

      try {
        const body = Buffer.concat(chunks).toString('utf8');
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject({ statusCode: 400, mensaje: 'JSON inválido' });
      }
    });

    req.on('error', () => {
      if (!aborted) {
        reject({ statusCode: 500, mensaje: 'Error al recibir la solicitud' });
      }
    });
  });
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip) || [];
  const recent = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

function sanitizeLeadInput(body) {
  return {
    nombre: normalizeString(body.nombre),
    telefono: normalizeString(body.telefono),
    tipoProblema: normalizeString(body.tipoProblema),
    valorEstimado: normalizeString(body.valorEstimado),
    comentarios: normalizeString(body.comentarios),
    empresa: normalizeString(body.empresa),
  };
}

function validateLead(lead) {
  if (!lead.nombre) {
    return { statusCode: 400, mensaje: 'Nombre es obligatorio' };
  }

  if (!lead.telefono) {
    return { statusCode: 400, mensaje: 'Teléfono es obligatorio' };
  }

  if (lead.telefono.length < PHONE_MIN_LENGTH || lead.telefono.length > PHONE_MAX_LENGTH) {
    return { statusCode: 400, mensaje: 'Teléfono con longitud inválida' };
  }

  return null;
}

function saveLead(payload) {
  ensureLeadsFile();
  const current = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
  current.push(payload);
  fs.writeFileSync(leadsFile, JSON.stringify(current, null, 2) + '\n', 'utf8');
}

function truncateForTelegram(value, maxLength) {
  if (!value) {
    return '';
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3)}...`;
}

function buildTelegramLeadMessage(lead) {
  return [
    'Nuevo lead - Patrimonio Claro',
    '',
    `Nombre: ${lead.nombre || ''}`,
    `Teléfono: ${lead.telefono || ''}`,
    `Tipo de problema: ${lead.tipoProblema || ''}`,
    `Valor estimado: ${lead.valorEstimado || ''}`,
    `Comentarios: ${truncateForTelegram(lead.comentarios || '', TELEGRAM_MESSAGE_COMMENT_LIMIT)}`,
    `Fecha: ${lead.fecha || ''}`,
    `Origen: ${lead.origen || ''}`,
  ].join('\n');
}

async function notifyLeadByTelegram(lead) {
  if (process.env.LEAD_NOTIFICATIONS_ENABLED !== 'true') {
    return;
  }

  const botToken = normalizeString(process.env.TELEGRAM_BOT_TOKEN);
  const chatId = normalizeString(process.env.TELEGRAM_CHAT_ID);

  if (!botToken || !chatId) {
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: buildTelegramLeadMessage(lead),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text();
      console.warn(`[lead-notify] Telegram respondió con estado ${response.status}. Detalle: ${truncateForTelegram(body, 200)}`);
    }
  } catch (error) {
    console.warn(`[lead-notify] No fue posible enviar notificación a Telegram: ${error.message}`);
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/leads') {
    const clientIp = getClientIp(req);

    if (isRateLimited(clientIp)) {
      sendJson(res, 429, { success: false, mensaje: 'Demasiadas solicitudes, intenta más tarde' });
      return;
    }

    try {
      const body = await parseBody(req);
      const input = sanitizeLeadInput(body);

      if (input.empresa) {
        sendJson(res, 200, { success: true, mensaje: 'Recibimos tu información' });
        return;
      }

      const validationError = validateLead(input);
      if (validationError) {
        sendJson(res, validationError.statusCode, { success: false, mensaje: validationError.mensaje });
        return;
      }

      const lead = {
        id: randomUUID(),
        fecha: new Date().toISOString(),
        nombre: input.nombre,
        telefono: input.telefono,
        tipoProblema: input.tipoProblema,
        valorEstimado: input.valorEstimado,
        comentarios: input.comentarios,
        origen: 'landing',
      };

      saveLead(lead);
      void notifyLeadByTelegram(lead);
      sendJson(res, 200, { success: true, mensaje: 'Recibimos tu información' });
    } catch (error) {
      sendJson(res, error.statusCode || 500, { success: false, mensaje: error.mensaje || 'Error interno del servidor' });
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
