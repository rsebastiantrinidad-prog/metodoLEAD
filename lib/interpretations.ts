export const getInterpretation = (id: string, score: number) => {
  if (score <= 2.5) {
    const data = {
      L: {
        title: "Cuello de Botella Humano",
        titleDesc: "El líder centraliza todas las decisiones. Existe un agotamiento decisional crítico y se decide exclusivamente desde la urgencia.",
        diag: "Asfixia por Control",
        diagDesc: "La operación se detiene si el líder no está presente."
      },
      E: {
        title: "Anarquía Operativa",
        titleDesc: "Confusión absoluta en roles y responsabilidades. El desorden comunicacional y el retrabajo son la norma diaria.",
        diag: "Entropía Organizacional",
        diagDesc: "Energía desperdiciada en fricciones internas constantes."
      },
      A: {
        title: "Foco Disperso",
        titleDesc: "Se confunde actividad con avance. No hay claridad sobre qué 'mueve la aguja', priorizando lo urgente sobre lo importante.",
        diag: "Deriva Estratégica",
        diagDesc: "El equipo trabaja mucho pero el negocio no progresa."
      },
      D: {
        title: "Ceguera de Gestión",
        titleDesc: "No se trabaja con indicadores claros ni métricas operativas. Los resultados son inconsistentes y dependen de la suerte o crisis.",
        diag: "Gestión por Intuición",
        diagDesc: "Imposibilidad de mejorar lo que no se mide."
      },
    };
    return data[id as keyof typeof data];
  } else if (score <= 3.9) {
    const data = {
      L: {
        title: "Liderazgo Reactivo",
        titleDesc: "Se delega de forma incompleta o sin criterios claros. El líder intenta 'poder con todo' solo, lo que genera un desgaste del rol.",
        diag: "Esfuerzo Heroico",
        diagDesc: "Se confunde poner más horas de trabajo con liderar el sistema."
      },
      E: {
        title: "Orden Frágil",
        titleDesc: "Existen procesos, pero son complejos o se ignoran ante la presión. La estructura depende de la memoria de la gente y no de sistemas claros.",
        diag: "Estructura de Papel",
        diagDesc: "Hay roles definidos, pero en la práctica las tareas se pisan entre sí."
      },
      A: {
        title: "Alineación Parcial",
        titleDesc: "Hay objetivos, pero no son compartidos o vividos por el equipo. Las urgencias diarias suelen descarrilar los planes semanales.",
        diag: "Falsa Sincronía",
        diagDesc: "El líder cree que están alineados, pero el equipo opera con prioridades distintas."
      },
      D: {
        title: "Métricas de Espejismo",
        titleDesc: "Se miden cosas, pero no hay rutinas de seguimiento ni feedback constante. Los datos no se usan para tomar decisiones estratégicas.",
        diag: "Control sin Ajuste",
        diagDesc: "Se detectan los problemas cuando ya es tarde para corregirlos."
      },
    };
    return data[id as keyof typeof data];
  } else {
    const data = {
      L: {
        title: "Arquitecto Estratégico",
        titleDesc: "Claridad total de rol y toma de decisiones con criterio. El líder recupera su foco estratégico y tranquilidad bajo presión.",
        diag: "Liderazgo de Alto Nivel",
        diagDesc: "El líder dirige el sistema, no las micro-tareas."
      },
      E: {
        title: "Maquinaria Fluida",
        titleDesc: "Roles y responsabilidades definidos y respetados. Procesos críticos simplificados que permiten la autonomía del equipo.",
        diag: "Eficiencia Sistémica",
        diagDesc: "El equipo sabe qué hacer y cómo hacerlo sin supervisión constante."
      },
      A: {
        title: "Enfoque Láser",
        titleDesc: "Prioridades y objetivos compartidos por todos. El esfuerzo se convierte directamente en resultados predecibles.",
        diag: "Sinergia Operativa",
        diagDesc: "Alineación real que reduce el desgaste y maximiza el impacto."
      },
      D: {
        title: "Cultura de Resultados",
        titleDesc: "Indicadores simples y hábitos de ejecución instalados. Mejora concreta del 15% al 30% en la productividad.",
        diag: "Alto Desempeño Sostenible",
        diagDesc: "Resultados medibles y perdurables en el tiempo."
      },
    };
    return data[id as keyof typeof data];
  }
};