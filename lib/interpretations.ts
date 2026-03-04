// Calculation ranges for interpreted scores:
// 5 = Arquitecto
// 3.9 = Riesgo (1 marca)
// 2.5 = Crisis (2 marcas)
// 1.0 = Caos Total (3 o 4 marcas)

export const getInterpretation = (id: string, score: number) => {
  if (score <= 2.5) { // 2.5 o 1.0 (Caos o Crisis)
    const data = {
      L: {
        title: "Pilar L: Liderazgo (Criterio y Decisión)",
        titleDesc: "Evaluación de Facilitador Estratégico vs. Cuello de Botella Operativo.",
        diag: "Centralización Crítica",
        diagDesc: "El líder opera bajo la creencia de que 'si baja el ritmo, todo se cae'. Existe una incapacidad para delegar debido a la falta de confianza en el criterio del equipo. La agenda está secuestrada por urgencias y el líder interviene en decisiones mínimas, anulando la autonomía del grupo."
      },
      E: {
        title: "Pilar E: Estructura (Roles y Procesos)",
        titleDesc: "Fugas de productividad por desorden, retrabajo o reglas no funcionales.",
        diag: "Caos Operativo",
        diagDesc: "No existen procesos definidos; el conocimiento reside en las personas y no en el sistema. Los roles se solapan, lo que genera duplicidad de tareas o vacíos de responsabilidad. El retrabajo es la norma y la improvisación domina la ejecución diaria."
      },
      A: {
        title: "Pilar A: Alineación (Prioridades y Objetivos)",
        titleDesc: "Conexión entre el esfuerzo diario del equipo y los objetivos estratégicos.",
        diag: "Desconexión Total",
        diagDesc: "El equipo trabaja mucho pero el negocio no progresa ('Deriva Estratégica'). Las prioridades cambian cada día según el humor del líder o la última queja de un cliente. No hay una visión compartida de qué significa el 'éxito' semanal."
      },
      D: {
        title: "Pilar D: Desempeño (Métricas y Hábitos)",
        titleDesc: "Capacidad de la organización para medir, sostener y predecir el éxito.",
        diag: "Ceguera de Gestión",
        diagDesc: "Gestión por intuición. No se utilizan indicadores (KPIs) y los resultados son inconsistentes, dependiendo de crisis o golpes de suerte. Es imposible mejorar lo que no se mide; el equipo no tiene feedback sobre su rendimiento real."
      },
    };
    return data[id as keyof typeof data];
  } else if (score <= 3.9) { // 3.9 (Riesgo / Frágil)
    const data = {
      L: {
        title: "Pilar L: Liderazgo (Criterio y Decisión)",
        titleDesc: "Evaluación de Facilitador Estratégico vs. Cuello de Botella Operativo.",
        diag: "Liderazgo Reactivo",
        diagDesc: "Hay intentos de delegación, pero son incompletos o generan ansiedad. El líder evita conversaciones difíciles y las decisiones se toman por presión del momento en lugar de seguir criterios preestablecidos. El equipo avanza, pero escala problemas operativos constantemente."
      },
      E: {
        title: "Pilar E: Estructura (Roles y Procesos)",
        titleDesc: "Fugas de productividad por desorden, retrabajo o reglas no funcionales.",
        diag: "Orden Frágil",
        diagDesc: "Existen manuales o descripciones de puestos, pero no se consultan o están desactualizados. La estructura depende de la buena voluntad individual. Hay procesos 'conocidos' pero no 'optimizados', lo que genera fricciones constantes en la entrega de resultados."
      },
      A: {
        title: "Pilar A: Alineación (Prioridades y Objetivos)",
        titleDesc: "Conexión entre el esfuerzo diario del equipo y los objetivos estratégicos.",
        diag: "Sincronía Superficial",
        diagDesc: "Se conocen los objetivos anuales, pero no se traducen en acciones cotidianas. Las urgencias descarrilan los planes con frecuencia. Existe una 'Falsa Sincronía' donde el líder cree que están alineados, pero el equipo opera con agendas distintas."
      },
      D: {
        title: "Pilar D: Desempeño (Métricas y Hábitos)",
        titleDesc: "Capacidad de la organización para medir, sostener y predecir el éxito.",
        diag: "Control sin Ajuste",
        diagDesc: "Se miden datos ('Métricas de Espejismo'), pero no se usan para tomar decisiones. No hay rutinas de seguimiento (ritmo de reuniones) ni hábitos de ejecución instalados. Los reportes se ven una vez al mes, cuando ya es tarde para corregir el rumbo."
      },
    };
    return data[id as keyof typeof data];
  } else { // 5.0 (Optimizado / Sin Fugas)
    const data = {
      L: {
        title: "Pilar L: Liderazgo (Criterio y Decisión)",
        titleDesc: "Evaluación de Facilitador Estratégico vs. Cuello de Botella Operativo.",
        diag: "Facilitador Estratégico",
        diagDesc: "El líder ha separado su identidad del control absoluto. Existe un sistema de mentoría recurrente y el equipo resuelve problemas por cuenta propia. La toma de decisiones es predecible y basada en criterios de negocio, no en emociones o urgencias."
      },
      E: {
        title: "Pilar E: Estructura (Roles y Procesos)",
        titleDesc: "Fugas de productividad por desorden, retrabajo o reglas no funcionales.",
        diag: "Sistema Escalable",
        diagDesc: "Cada integrante conoce su impacto y responsabilidad específica. Los procesos están simplificados y documentados, permitiendo que el equipo opere con fluidez. La estructura sostiene el crecimiento sin necesidad de supervisión constante."
      },
      A: {
        title: "Pilar A: Alineación (Prioridades y Objetivos)",
        titleDesc: "Conexión entre el esfuerzo diario del equipo y los objetivos estratégicos.",
        diag: "Enfoque Láser",
        diagDesc: "El esfuerzo de cada miembro se traduce directamente en resultados predecibles. Existe una sinergia operativa donde todos saben qué es lo más importante en cada momento. La alineación reduce el desgaste y maximiza el impacto estratégico."
      },
      D: {
        title: "Pilar D: Desempeño (Métricas y Hábitos)",
        titleDesc: "Capacidad de la organización para medir, sostener y predecir el éxito.",
        diag: "Cultura de Resultados",
        diagDesc: "Indicadores simples y potentes guían la operación. El seguimiento es parte de la cultura (rutinas de feedback). Existe una mejora concreta de entre el 15% y el 30% en la productividad gracias al ajuste constante basado en datos reales."
      },
    };
    return data[id as keyof typeof data];
  }
};