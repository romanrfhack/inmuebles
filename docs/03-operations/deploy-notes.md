# Deploy productivo MVP - Patrimonio Claro

## Resumen
El MVP de Patrimonio Claro quedó publicado en producción con HTTPS activo y funcionamiento validado para landing, aviso de privacidad y captura básica de leads.

## Infraestructura
- Dominio principal: https://patrimonioclaro.site
- Dominio www: https://www.patrimonioclaro.site
- VPS productivo: 194.238.26.70
- Hostname productivo: mail.blo.com.mx
- Sistema operativo: Ubuntu 24.04.3 LTS
- Ruta del proyecto en producción: /var/www/patrimonioclaro
- Repositorio GitHub: git@github.com:romanrfhack/inmuebles.git
- Rama productiva actual: main

## Componentes
- Node.js backend
- frontend estático servido por el mismo backend
- nginx reverse proxy
- servicio systemd
- certbot / Let's Encrypt
- `leads.json` como persistencia temporal MVP

## Configuración productiva
- Ruta del proyecto: `/var/www/patrimonioclaro`
- Backend Node: `/var/www/patrimonioclaro/backend/server.js`
- Puerto interno: `3000`
- Servicio systemd: `patrimonioclaro.service`
- Archivo systemd: `/etc/systemd/system/patrimonioclaro.service`
- Usuario del servicio: `www-data`
- Grupo del servicio: `www-data`
- Nginx site: `/etc/nginx/sites-available/patrimonioclaro`
- Nginx enabled: `/etc/nginx/sites-enabled/patrimonioclaro`
- SSL: Let's Encrypt / Certbot
- Certificado: `/etc/letsencrypt/live/patrimonioclaro.site/fullchain.pem`
- Llave privada: `/etc/letsencrypt/live/patrimonioclaro.site/privkey.pem`
- Expira: `2026-07-27`
- Renovación automática: configurada por certbot
- Persistencia MVP: `/var/www/patrimonioclaro/backend/leads.json`

## Comandos operativos

### Ver estado
```bash
systemctl status patrimonioclaro.service --no-pager -l
```

### Reiniciar app
```bash
systemctl restart patrimonioclaro.service
```

### Ver logs
```bash
journalctl -u patrimonioclaro.service -n 100 --no-pager
```

### Ver leads
```bash
cat /var/www/patrimonioclaro/backend/leads.json
```

### Validar nginx
```bash
nginx -t
```

### Recargar nginx
```bash
systemctl reload nginx
```

### Validar landing
```bash
curl -s https://patrimonioclaro.site | head -10
```

### Validar aviso de privacidad
```bash
curl -s https://patrimonioclaro.site/privacidad.html | head -10
```

### Probar POST
```bash
curl -s -X POST https://patrimonioclaro.site/api/leads \
-H "Content-Type: application/json" \
-d '{"nombre":"Prueba","telefono":"5512345678","tipoProblema":"Regularización","valorEstimado":"3000000","comentarios":"Prueba controlada"}'
```

### Limpiar leads de prueba
```bash
printf '[]\n' > /var/www/patrimonioclaro/backend/leads.json && chown www-data:www-data /var/www/patrimonioclaro/backend/leads.json
```

## Validaciones realizadas
- `GET https://patrimonioclaro.site` devuelve HTML correctamente.
- `GET https://patrimonioclaro.site/privacidad.html` devuelve HTML correctamente.
- `POST https://patrimonioclaro.site/api/leads` respondió `{"success":true,"mensaje":"Recibimos tu información"}`.
- El lead se guardó correctamente.
- Llegó notificación al grupo privado de Telegram `Patrimonio Claro - Leads`.
- `leads.json` fue limpiado después de pruebas y quedó vacío.
- `systemctl status patrimonioclaro.service` confirmó servicio activo.
- No se registraron errores fatales en `journalctl`.
- `nginx -t` confirmó configuración válida.
- Existen warnings previos de nginx por otros sitios (`cobranzadigital-web` y `opticsoft`).
- Esos warnings no pertenecen a Patrimonio Claro y no bloquearon el deploy.

## Riesgos pendientes
- Persistencia en JSON no es robusta para concurrencia o volumen real.
- No existe panel administrativo de leads.
- No existe notificación automática por correo o WhatsApp cuando entra un lead.
- No hay monitoreo formal.
- Tailwind sigue cargando por CDN.
- Aviso de privacidad MVP requiere validación legal final.
- El servidor productivo aloja otros sistemas, por lo que cualquier cambio nginx debe hacerse con `nginx -t` y `reload`, no `restart` innecesario.

## Notificaciones de leads por Telegram
- Estado: desplegadas y validadas en producción.
- Variables necesarias:
  - `LEAD_NOTIFICATIONS_ENABLED=true`
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`
- Ubicación del `EnvironmentFile`: `/etc/patrimonioclaro/api.env`
- Permisos confirmados para `api.env`: `root:www-data` con `chmod 640`
- Ese archivo no debe versionarse en git.
- No deben documentarse secretos ni valores completos sensibles.
- Canal operativo actual: grupo privado de Telegram `Patrimonio Claro - Leads`.
- Riesgo principal: exposición de datos personales si el chat destino no está bien controlado.
- Fallback esperado: si Telegram falla o no está configurado, el lead debe seguir guardándose en `leads.json` y solo debe registrarse un warning no fatal en logs.

### Comandos operativos de notificaciones
```bash
systemctl show patrimonioclaro.service --property=EnvironmentFiles
systemctl restart patrimonioclaro.service
journalctl -u patrimonioclaro.service -n 100 --no-pager
cat /var/www/patrimonioclaro/backend/leads.json
printf '[]\n' > /var/www/patrimonioclaro/backend/leads.json && chown www-data:www-data /var/www/patrimonioclaro/backend/leads.json
```

## Siguiente paso recomendado
Definir un criterio de escalamiento y atención operativa para leads nuevos, ahora que la notificación automática ya está activa.
