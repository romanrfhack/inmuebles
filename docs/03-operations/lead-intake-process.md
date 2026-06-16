# Proceso operativo de atención de leads

## Flujo general
1. Lead llega desde landing.
2. El formulario exige nombre, teléfono, ubicación del inmueble, tipo de problema y valor estimado por rango.
3. El backend valida campos permitidos y bloquea duplicados por teléfono dentro de 24 horas.
4. Si el lead es válido y no duplicado, se guarda en `leads.json`.
5. Telegram notifica al grupo privado con ubicación del inmueble y origen de campaña.
6. Responsable revisa datos.
7. Se contacta al prospecto.
8. Se clasifica como caliente, tibio, frío o descartado.
9. Si aplica, se prepara resumen para abogado.
10. Abogado revisa.
11. Se agenda sesión o se descarta.
12. Se da seguimiento.

## SLA recomendado
- Lead caliente: responder en menos de 30 minutos si es horario hábil.
- Lead tibio: responder el mismo día.
- Lead frío: responder dentro de 24 a 48 horas.
- Lead incompleto: pedir información mínima una sola vez.

## Horario operativo sugerido
- Lunes a viernes.
- Horario hábil sugerido: 09:00 a 18:00 hora local del operador.
- Fuera de horario, responder al siguiente bloque operativo disponible.

## Responsable inicial
- El captador u operador revisa primero cada lead entrante.
- El abogado solo recibe casos filtrados y resumidos.
- El operador debe mantener trazabilidad básica de cada contacto, clasificación y siguiente paso.

## Canales operativos
- El formulario sigue siendo el canal principal de captura estructurada.
- WhatsApp Business será canal de contacto inicial con el prospecto.
- Telegram sigue siendo canal interno de notificación y coordinación.

## Estados sugeridos del lead
- Nuevo
- Contactado
- En espera de información
- Calificado
- Enviado al abogado
- Agendado
- Descartado
- Cerrado

## Reglas operativas mínimas
- No enviar casos basura o ambiguos al abogado sin filtro previo.
- No emitir juicio legal definitivo desde operación comercial.
- No pedir documentación sensible completa en el primer contacto si no es necesaria.
- Registrar fecha de contacto, clasificación y observaciones mínimas.
- Si el prospecto no responde tras el primer intento y un recordatorio razonable, dejar el caso en espera o cerrarlo según criterio operativo.

## Trazabilidad mínima recomendada
Por cada lead registrar al menos:
- fecha de entrada
- nombre
- teléfono
- ubicación del inmueble
- tipo de problema
- valor estimado por rango
- clasificación comercial
- estado actual
- fecha de último contacto
- siguiente acción sugerida

## Ajustes recientes del formulario
- Se agregó ubicación obligatoria del inmueble.
- El valor estimado dejó de ser texto libre y ahora se captura por rangos.
- Se amplió el catálogo de `tipoProblema` para reducir el uso excesivo de `Otro`.
- Se agregó prevención básica de duplicados por teléfono en ventana de 24 horas.
- El siguiente monitoreo operativo debe revisar calidad de leads por ubicación, `tipoProblema` y `utmContent`.
