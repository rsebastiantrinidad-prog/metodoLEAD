export const getInterpretation = (id: string, score: number) => {
  if (score < 2.5) {
    const data = {
      L: { title: "Cuello de Botella Humano", path: "Asfixia por Control" },
      E: { title: "Anarquía Operativa", path: "Entropía Organizacional" },
      A: { title: "Foco Disperso", path: "Deriva Estratégica" },
      D: { title: "Ceguera de Gestión", path: "Gestión por Intuición" },
    };
    return data[id as keyof typeof data];
  } else if (score <= 3.9) {
    const data = {
      L: { title: "Liderazgo Reactivo", path: "Esfuerzo Heroico" },
      E: { title: "Orden Frágil", path: "Estructura de Papel" },
      A: { title: "Alineación Parcial", path: "Falsa Sincronía" },
      D: { title: "Métricas de Espejismo", path: "Control sin Ajuste" },
    };
    return data[id as keyof typeof data];
  } else {
    const data = {
      L: { title: "Arquitecto Estratégico", path: "Liderazgo de Alto Nivel" },
      E: { title: "Maquinaria Fluida", path: "Eficiencia Sistémica" },
      A: { title: "Enfoque Láser", path: "Sinergia Operativa" },
      D: { title: "Cultura de Resultados", path: "Alto Desempeño Sostenible" },
    };
    return data[id as keyof typeof data];
  }
};