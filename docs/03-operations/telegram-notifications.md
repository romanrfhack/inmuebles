# Telegram Notifications

## Objetivo
Documentar la configuración y operación de la notificación automática de nuevos leads por Telegram en Patrimonio Claro.

## Estado actual
La funcionalidad ya está desplegada en producción y fue validada de extremo a extremo.

## Variables de entorno requeridas
- `LEAD_NOTIFICATIONS_ENABLED=true`
- `TELEGRAM_BOT_TOKEN=<token-del-bot>`
- `TELEGRAM_CHAT_ID=<chat-id-destino>`

## Comportamiento esperado
- Si `LEAD_NOTIFICATIONS_ENABLED` no es `true`, no se intenta notificar.
- Si faltan `TELEGRAM_BOT_TOKEN` o `TELEGRAM_CHAT_ID`, no se intenta notificar.
- Si Telegram falla, el lead debe guardarse de todos modos y el sistema solo debe registrar un warning en logs.
- No se agregan dependencias externas.

## Configuración productiva
- El servicio productivo lee variables desde: `/etc/patrimonioclaro/api.env`
- Ese archivo no está en git.
- No deben documentarse ni versionarse secretos.
- Permisos recomendados/confirmados: `root:www-data` con `chmod 640`
- Canal operativo actual: grupo privado de Telegram `Patrimonio Claro - Leads`
- El chat destino debe ser privado y con acceso restringido.

## Validación productiva confirmada
- `POST https://patrimonioclaro.site/api/leads` respondió `success: true`.
- El lead se guardó correctamente.
- La notificación llegó al grupo Telegram `Patrimonio Claro - Leads`.
- Después de la prueba, `backend/leads.json` fue limpiado y quedó en `[]`.
- El servicio systemd permaneció activo.
- No se registraron errores fatales en `journalctl`.

## Cómo probar localmente con notificación deshabilitada
```bash
LEAD_NOTIFICATIONS_ENABLED=false node backend/server.js
```
Luego enviar un `POST /api/leads` y confirmar que:
- el lead se guarda en `backend/leads.json`
- no falla el endpoint
- no se intenta notificar

## Cómo probar localmente con notificación habilitada
### Sin token/chat
```bash
LEAD_NOTIFICATIONS_ENABLED=true node backend/server.js
```
Confirmar que:
- el lead se guarda
- el endpoint responde éxito
- el proceso no falla

### Con token/chat de prueba o ficticios
```bash
LEAD_NOTIFICATIONS_ENABLED=true \
TELEGRAM_BOT_TOKEN=token-ficticio \
TELEGRAM_CHAT_ID=123456789 \
node backend/server.js
```
Confirmar que:
- el lead se guarda
- el endpoint responde éxito
- se registra warning no fatal si Telegram responde error o falla la red

## Comandos operativos

### Ver variables cargadas sin mostrar secretos
```bash
systemctl show patrimonioclaro.service --property=EnvironmentFiles
```

### Reiniciar servicio
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

### Limpiar leads de prueba
```bash
printf '[]\n' > /var/www/patrimonioclaro/backend/leads.json && chown www-data:www-data /var/www/patrimonioclaro/backend/leads.json
```

## Riesgos operativos
- exposición de datos personales si el chat destino se comparte con personas no autorizadas
- dependencia de un canal externo que no reemplaza un CRM formal
- necesidad de mantener secretos fuera del repositorio
- posibilidad de fallos de red o respuestas no exitosas de Telegram

## Fallback esperado
Si Telegram falla o no está configurado, el lead debe seguir guardándose en `leads.json` y el sistema solo debe registrar un warning no fatal en logs.
