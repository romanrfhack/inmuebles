# Campaña Google Ads activa - Patrimonio Claro

## Estado actual
- Campaña: Regulariza tu inmueble
- Tipo: Performance Max
- Estado: Enabled
- Estrategia: Maximize conversions / Bid strategy learning
- Objetivo: Submit lead form

## Configuración base
- URL final con UTM:
  - `https://patrimonioclaro.site/?utm_source=google&utm_medium=cpc&utm_campaign=regularizacion_inmuebles_mvp&utm_term=regularizacion&utm_content=ad_v1`
- Google tag instalado:
  - `AW-18126485563`
- Conversion event:
  - `AW-18126485563/iMn9COrts6UcELvwsMND`
- La conversión se dispara solo después de `success true` del endpoint `/api/leads`.
- WhatsApp Business activo:
  - `525573266634`
- Telegram notifica leads.
- Los UTMs se guardan y también llegan a Telegram.

## Ubicaciones
- Coyoacán
- Iztapalapa
- Álvaro Obregón
- Tláhuac
- Xochimilco
- Benito Juárez
- Cuauhtémoc
- Miguel Hidalgo
- Milpa Alta

### Ajuste aplicado
- Se eliminó Valle de Chalco.

## Presupuesto
- Presupuesto actual: `MX$100/día`
- Se mantiene como nivel controlado para fase piloto.
- No se ha subido presupuesto.

## Conversion tracking
- La medición está asociada al envío exitoso del formulario.
- Se mantiene condicionada a `response.ok` y `result.success === true`.
- No dispara conversión cuando backend responde `400`, `409`, falla o `gtag` no existe.
- No se mide `page load`.
- No se mide solo clic.
- La medición no debe bloquear el guardado del lead.

## Assets configurados
- Se agregaron más headlines.
- Se agregó long headline.
- Se agregaron 6 sitelinks.
- Ad strength actual: `Average`.

## Ajustes de control aplicados
- Final URL expansion desactivado.
- TV screens desactivado.
- No se activaron recomendaciones automáticas.
- No se subió presupuesto.
- No se activó Google Analytics.

## Qué no se debe cambiar sin revisión
- No activar Final URL expansion durante este piloto.
- No activar TV screens durante este piloto.
- No subir presupuesto sin revisar primeros datos.
- No cambiar objetivo de conversión sin validar impacto.
- No mezclar esta fase con cambios grandes en landing, backend o tracking.

## Checklist diario de monitoreo
- impresiones
- clics
- costo
- conversiones
- leads en Telegram
- términos/categorías disponibles
- ubicaciones con actividad
- costo por lead
- calidad del lead

## Criterios para pausar o ajustar
- no subir presupuesto antes de 24–48 horas
- agregar negativas si aparecen búsquedas irrelevantes
- pausar si hay gasto sin clics útiles o tráfico basura
- crear campaña Search manual si Performance Max no da suficiente control
- no activar Final URL expansion durante este piloto
- no activar TV screens durante este piloto

## Calidad de lead observada
- Google Ads reportó 7 conversiones.
- `leads.json` mostró 8 registros, con 1 duplicado detectado manualmente.
- Hay 7 leads únicos reales, así que la medición de Google Ads parece estar alineada con leads reales.
- Se detectaron leads fuera de CDMX, ubicaciones insuficientes, valores difíciles de clasificar y uso excesivo de `Otro`.

## Ajustes aplicados en desarrollo
- Se agregó ubicación obligatoria del inmueble.
- Se estructuró `valorEstimado` por rangos.
- Se agregaron tipos de problema más precisos.
- Se añadió prevención básica de duplicados por teléfono en ventana de 24 horas.
- Telegram ahora muestra ubicación del inmueble.

## Siguiente revisión recomendada
Revisar resultados iniciales dentro de 24–48 horas para validar si hay clics útiles, leads reales, calidad de tráfico y necesidad de abrir una campaña Search manual con mayor control.
Poner foco específico en calidad por ubicación, `tipoProblema` y `utmContent`.
