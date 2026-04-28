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
