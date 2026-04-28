# Plan de UTMs

## Objetivo
Medir el origen de leads por campaña y conservar trazabilidad básica desde la landing hasta `leads.json` y la notificación por Telegram.

## URLs sugeridas

### Google
https://patrimonioclaro.site/?utm_source=google&utm_medium=cpc&utm_campaign=regularizacion_inmuebles_mvp&utm_term={keyword}&utm_content=ad_v1

### Meta
https://patrimonioclaro.site/?utm_source=meta&utm_medium=paid_social&utm_campaign=regularizacion_inmuebles_mvp

### WhatsApp / manual
https://patrimonioclaro.site/?utm_source=whatsapp&utm_medium=direct&utm_campaign=contacto_manual

## Campos capturados
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

## Implementación actual
- La landing lee los UTMs desde la query string.
- Los campos se cargan en hidden fields del formulario.
- El backend guarda los UTMs en `leads.json`.
- La notificación de Telegram incluye origen de campaña.

## Nota operativa
Si el lead llega sin UTMs, los campos se guardan vacíos y el flujo actual no se rompe.
