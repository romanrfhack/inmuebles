# Lead Notifications Plan

## Objetivo
Enviar una notificación automática cuando se registre un lead nuevo.

## Opción recomendada
Telegram Bot API.

## Justificación breve
Telegram es el canal inicial recomendado porque ya forma parte del flujo operativo de coordinación actual y permite una implementación mínima, rápida y poco invasiva para el MVP.

## Variables de entorno sugeridas
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `LEAD_NOTIFICATIONS_ENABLED=true`

## Flujo propuesto
1. Usuario envía formulario.
2. Backend valida datos.
3. Backend guarda en `leads.json`.
4. Si notificaciones están activas:
   - construye mensaje resumido
   - envía `POST` a Telegram Bot API
5. Si Telegram falla:
   - NO debe fallar el registro del lead
   - solo registrar warning en logs

## Formato sugerido del mensaje
```text
Nuevo lead - Patrimonio Claro

Nombre:
Teléfono:
Tipo de problema:
Valor estimado:
Comentarios:
Fecha:
Origen:
```

## Diseño técnico propuesto
- Reutilizar el backend Node actual sin cambiar arquitectura.
- Usar `fetch` nativo de Node para evitar dependencias externas.
- Ejecutar el envío a Telegram después de guardar el lead.
- Encapsular la lógica en una función pequeña y aislada, por ejemplo `notifyLeadTelegram(lead)`.
- Activar o desactivar el envío mediante variables de entorno.
- Mantener `leads.json` como fuente primaria de registro en esta fase.

## Comportamiento esperado
- Si el lead se guarda correctamente, el endpoint debe seguir respondiendo éxito aunque Telegram falle.
- Si faltan variables de entorno, el backend no debe intentar notificar.
- Los errores de Telegram deben registrarse en logs como warning no fatal.
- El servicio debe seguir iniciando normalmente con systemd.

## Riesgos
- Exposición accidental de token.
- Envío de datos personales por Telegram.
- Fallos de red.
- Spam.
- Telegram no reemplaza CRM formal.

## Mitigaciones
- Variables de entorno, no hardcodear secretos.
- No guardar tokens en git.
- Notificación resumida.
- Fallar suave si Telegram no responde.
- Mantener `leads.json` como fuente primaria por ahora.

## Criterios de aceptación para futura implementación
- Lead válido se guarda aunque Telegram falle.
- Si `TELEGRAM_BOT_TOKEN` o `TELEGRAM_CHAT_ID` no existen, no se intenta notificar.
- No se rompe flujo actual.
- No se agregan dependencias externas.
- El servicio sigue levantando con systemd.
- Logs muestran error no fatal si Telegram falla.

## Alcance explícitamente fuera de esta fase
- No implementar todavía.
- No cambiar frontend.
- No cambiar backend en esta fase documental.
- No instalar dependencias.
- No agregar base de datos ni cola de trabajos.
