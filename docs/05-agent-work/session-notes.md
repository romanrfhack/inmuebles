# Session Notes

## 2026-04-28
### Contexto de la sesión
Se definió que el proyecto Inmuebles iniciará como plataforma de captación y calificación de leads para servicios legales inmobiliarios, con foco inicial en regularización de inmuebles.

### Avances realizados
- revisión del estado inicial del repositorio
- creación de estructura documental base en /docs
- documentación de visión, cliente, oferta, alcance MVP, backlog, roadmap, operación y marketing inicial
- registro de decisiones fundacionales del proyecto

### Restricciones vigentes
- no instalar dependencias
- no crear frontend todavía
- no crear backend todavía
- no tocar configuración del servidor
- no publicar nada
- no usar datos reales de clientes

### Pendientes inmediatos sugeridos
- validar nombre de marca
- definir criterios de calificación de leads
- aterrizar estructura de landing y formulario

## 2026-04-28 - Configuración de identidad Git local
### Contexto
Se configuró la identidad Git local del repositorio para evitar que nuevos commits usen la identidad automática del servidor.

### Nota
- Se configuró identidad Git local del repositorio.
- No se reescribió historial.
- Los commits anteriores conservan la identidad original.
- Los commits futuros usarán la nueva identidad local.

## 2026-04-28 - Aviso de privacidad MVP
### Contexto
Se incorporó el aviso corto para formulario y se documentó una versión integral inicial del aviso de privacidad para el MVP.

### Nota
- Se actualizó el copy visible del formulario.
- Se documentó el aviso integral en notas legales operativas.
- No se modificó arquitectura ni flujo técnico.

## 2026-04-28 - Deploy productivo MVP
### Contexto
Se documentó la publicación del MVP en producción para Patrimonio Claro con dominio activo y operación básica validada.

### Nota
- Se publicó el MVP en producción.
- Dominio activo con HTTPS.
- Servicio systemd activo.
- nginx reverse proxy configurado.
- `leads.json` limpio después de pruebas.
- Pendiente implementar notificaciones de leads.

## 2026-04-28 - Diseño de notificaciones de leads
### Contexto
Se diseñó la siguiente mejora del MVP para notificar automáticamente nuevos leads usando Telegram como canal inicial, sin implementar todavía cambios técnicos.

### Nota
- Se documentó el diseño de notificaciones automáticas.
- Se recomendó Telegram Bot API como opción inicial.
- Queda pendiente implementación futura.

## 2026-04-28 - Implementación de notificación por Telegram
### Contexto
Se implementó la notificación automática de nuevos leads por Telegram en el backend de desarrollo, sin agregar dependencias ni secretos al repositorio.

### Nota
- Se implementó notificación por Telegram en backend.
- Queda pendiente configurar variables reales en producción.
- No se agregaron secretos al repo.

## 2026-04-28 - Notificaciones Telegram desplegadas en producción
### Contexto
Se documentó que la funcionalidad de notificaciones por Telegram ya quedó desplegada y validada en producción, sin exponer secretos en el repositorio.

### Nota
- La funcionalidad ya está activa en producción.
- El servicio lee variables desde `/etc/patrimonioclaro/api.env`.
- No se documentaron tokens ni secretos.
- La prueba end-to-end fue exitosa.
- `leads.json` fue limpiado después de la prueba.

## 2026-04-28 - Proceso operativo comercial de leads
### Contexto
Se definió el proceso operativo comercial para atender leads reales desde la notificación en Telegram hasta la posible canalización al abogado.

### Nota
- Se definió proceso operativo comercial.
- Se documentaron criterios de calificación.
- Se creó formato de envío al abogado.
- Se creó guion de primer contacto.
- Siguiente fase sugerida: preparar primera campaña y/o panel mínimo de leads.

## 2026-04-29 - Diseño de campaña piloto MVP
### Contexto
Se diseñó la primera campaña piloto de captación de leads para Patrimonio Claro, sin lanzar anuncios todavía.

### Nota
- Se diseñó campaña piloto MVP.
- Se propuso Google Search como canal inicial principal.
- Se documentó Meta Ads como canal secundario.
- Se documentaron riesgos de política publicitaria.
- Siguiente fase sugerida: revisar copy y decidir presupuesto inicial.

## 2026-04-29 - Vinculación de WhatsApp Business y logo corporativo
### Contexto
Se actualizó la landing para usar el número real de WhatsApp Business y se agregó el logo corporativo, dejando pendiente el despliegue a producción después de validación.

### Nota
- Se vinculó WhatsApp Business real.
- Se agregó logo corporativo.
- Pendiente desplegar a producción después de validación.
