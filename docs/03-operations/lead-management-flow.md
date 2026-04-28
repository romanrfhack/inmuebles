# Lead Management Flow

## Objetivo
Definir un flujo simple para registrar, filtrar y dar seguimiento a prospectos antes de que un caso llegue al abogado especialista.

## Flujo propuesto
1. Captación del lead.
   - El prospecto llega por landing, anuncio, referencia o contacto derivado.
2. Registro inicial.
   - Se capturan datos básicos de contacto y contexto general del caso.
3. Pre-filtro.
   - Se revisa si el caso parece corresponder a servicios inmobiliarios legales dentro del enfoque del proyecto.
4. Clasificación.
   - Lead viable para revisión.
   - Lead con información incompleta.
   - Lead fuera de enfoque.
5. Seguimiento.
   - Solicitar datos faltantes o agendar contacto inicial cuando proceda.
6. Revisión especializada.
   - El abogado revisa casos calificados antes de aceptar formalmente una atención.
7. Cierre operativo.
   - Caso aceptado para siguiente etapa.
   - Caso descartado.
   - Caso pendiente de información adicional.

## Datos mínimos esperados
- nombre o identificador de contacto
- medio de contacto
- tipo general de asunto
- ubicación aproximada del inmueble si aplica
- descripción breve del problema
- etapa o urgencia percibida

## Estados sugeridos
- nuevo
- en revisión inicial
- incompleto
- viable para abogado
- descartado
- en seguimiento
- cerrado

## Reglas operativas iniciales
- No pedir documentación sensible completa en el primer contacto si no es necesario.
- No asumir viabilidad jurídica sin revisión especializada.
- Registrar motivo de descarte o de escalamiento.
- Mantener trazabilidad del origen del lead.
