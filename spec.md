# Método LEAD® - Diagnóstico Estratégico

## Resumen
Aplicación web diseñada para capturar la atención de líderes y profesionales, ofreciendo un test de diagnóstico de 16 preguntas agrupadas en cuatro pilares: Liderazgo, Estructura, Alineación y Despliegue (LEAD). Al finalizar, el sistema entrega un resultado cualitativo y cuantitativo (puntajes por pilar, interpretación, gráfica de radar y "Costo de Inacción"), y persiste toda la información y telemetría de forma asíncrona en una base de datos segura.

## Requerimientos Funcionales
- [x] Landing page de alto impacto visual con diseño "Minimalismo Técnico de Élite", incluyendo modo oscuro, glassmorphism, parallax en el fondo y diseño "Bento Grid".
- [x] Formulario inicial ("Hero CTA") que captura Nombre y Correo Electrónico del lead.
- [x] Persistencia de Fase 1: El sistema debe registrar un lead en la base de datos inmediatamente tras capturar su email, marcando el inicio del test (`started_at`).
- [x] El test consta de 16 preguntas (4 por cada pilar del método).
- [x] La navegación entre preguntas es secuencial, de una en una, con barra de progreso interactiva superior.
- [x] Al contestar la pregunta 16, el sistema procesa los promedios y redirige a la pantalla de resultados del diagnóstico.
- [x] Persistencia de Fase 2: Tras completar el test, el sistema localiza el registro del email ingresado y actualiza la información agregando las respuestas, promedios y timestamp (`completed_at`). 
- [x] La actualización en la Fase 2 debe realizarse esquivando restricciones de lectura estricta de base de datos para no comprometer la privacidad del resto de usuarios.
- [x] La pantalla de resultados muestra gráficos tipo radar con base 10 e interpretación cualitativa (Ej: Optimizado, Riesgo, Crisis) por cada área del método LEAD.
- [x] Sección de visualización de riesgos "Costo de Inacción" (COI) basado en el puntaje más bajo obtenido.
- [x] El botón principal Post-Análisis ("Agendar una sesión de arquitectura") permite agendar reuniones para el cierre comercial.

## Stack Tecnológico
- Frontend: Next.js 14+ (App Router) y React
- Estilos: Tailwind CSS
- Iconografía: Lucide React
- Visualización de Datos: Recharts (Radar Chart)
- Backend & Base de Datos: Supabase (PostgreSQL) con Políticas RLS estandarizadas y seguridad basada en RPC
- Host/Deploy: Vercel (esperado)

## Reglas Críticas
- Cumplir estrictamente la configuración del esquema de Supabase: La tabla se llama `diagnosticos`. Las columnas temporales (`started_at`, `completed_at`) deben usar el tipo de dato `timestamptz`.
- Mantener activadas las políticas de seguridad a nivel de filas (RLS) en Supabase: "Permitir INSERT anon" activado, "Permitir SELECT anon" prohibido (por seguridad).
- Utilizar la función de base de datos (RPC) alojada llamada `terminar_diagnostico` para realizar las actualizaciones del registro del cliente para saltar intencionadamente de forma segura las políticas RLS.
- Mantener la estética visual oscura (`dark mode` #0a0a0a) con tipografía `Inter` e interfaces limpias en toda actualización futura.
