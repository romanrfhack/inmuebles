# Prelaunch Checklist

## Objetivo
Verificar que el MVP de Patrimonio Claro tenga mínimos aceptables antes de cualquier publicación pública.

## Checklist técnica
- [ ] La landing carga correctamente en móvil y escritorio.
- [ ] El formulario valida nombre y teléfono.
- [ ] El endpoint `POST /api/leads` guarda solo los campos permitidos.
- [ ] El backend rechaza payloads demasiado grandes.
- [ ] El honeypot está activo y evita guardado de spam básico.
- [ ] El rate limit básico por IP responde correctamente.
- [ ] `backend/leads.json` existe y conserva formato válido.

## Checklist legal y comercial
- [ ] La landing incluye aviso básico de uso de datos.
- [ ] La landing aclara que cada caso requiere revisión individual.
- [ ] La landing aclara que el contacto inicial no constituye contratación formal.
- [ ] Aviso de privacidad implementado.
- [ ] Link visible al aviso de privacidad desde la landing.
- [ ] Texto legal validado para MVP.
- [ ] No hay promesas absolutas de resultado, tiempo o aceptación.
- [ ] El texto comercial es consistente con el enfoque de revisión inicial.

## Checklist operativa
- [ ] Existe criterio para revisar y responder leads reales.
- [ ] Está definido quién revisa leads calientes, tibios y fríos.
- [ ] Existe mensaje inicial aprobado para contacto por WhatsApp.
- [ ] Se definió frecuencia de respaldo o descarga del archivo `leads.json`.

## Checklist antes de publicar
- [ ] Revisar aviso de privacidad formal.
- [ ] Confirmar canal de contacto operativo.
- [ ] Hacer prueba integral con leads de prueba.
- [ ] Limpiar datos de prueba antes de abrir al público.
