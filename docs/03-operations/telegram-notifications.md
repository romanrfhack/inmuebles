# Telegram Notifications

## Objetivo
Documentar la configuración y operación de la notificación automática de nuevos leads por Telegram en Patrimonio Claro.

## Variables de entorno requeridas
- `LEAD_NOTIFICATIONS_ENABLED=true`
- `TELEGRAM_BOT_TOKEN=<token-del-bot>`
- `TELEGRAM_CHAT_ID=<chat-id-destino>`

## Comportamiento esperado
- Si `LEAD_NOTIFICATIONS_ENABLED` no es `true`, no se intenta notificar.
- Si faltan `TELEGRAM_BOT_TOKEN` o `TELEGRAM_CHAT_ID`, no se intenta notificar.
- Si Telegram falla, el lead debe guardarse de todos modos y el sistema solo debe registrar un warning en logs.
- No se agregan dependencias externas.

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

## Configuración recomendada en producción con systemd
Se recomienda usar un archivo de entorno separado:

```bash
/etc/patrimonioclaro/api.env
```

Ejemplo de contenido:
```bash
LEAD_NOTIFICATIONS_ENABLED=true
TELEGRAM_BOT_TOKEN=colocar-token-real-aqui
TELEGRAM_CHAT_ID=colocar-chat-id-real-aqui
```

### Importante
- `/etc/patrimonioclaro/api.env` NO debe ir a git.
- No guardar secretos en el repositorio.
- No registrar tokens en logs.

## Cómo reiniciar servicio
```bash
systemctl restart patrimonioclaro.service
```

## Cómo ver logs
```bash
journalctl -u patrimonioclaro.service -n 100 --no-pager
```
