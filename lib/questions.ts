export type CategoryId = 'L' | 'E' | 'A' | 'D';

export interface QuestionBlock {
  id: CategoryId;
  titulo: string;
  objetivo: string;
  sintomas: string[];
}

export const leadQuestions: QuestionBlock[] = [
  {
    id: "L",
    titulo: "Liderazgo (Cuello de Botella)",
    objetivo: "Marca todas las situaciones que ocurren en tu equipo hoy.",
    sintomas: [
      "Siento que si bajo el ritmo, todo se cae.",
      "Mi agenda está dominada por urgencias y 'apagar incendios'.",
      "El equipo me consulta hasta las decisiones más simples.",
      "Evito tener conversaciones difíciles por falta de tiempo o energía."
    ]
  },
  {
    id: "E",
    titulo: "Estructura (Desorden Operativo)",
    objetivo: "Marca todas las situaciones que ocurren en tu equipo hoy.",
    sintomas: [
      "Hay retrabajo porque las instrucciones no fueron claras desde el inicio.",
      "Los roles se pisan; a veces dos personas hacen lo mismo o algo queda sin hacer.",
      "Las reuniones duran mucho y terminan sin acuerdos claros.",
      "No tenemos procesos escritos; todo depende de la memoria de la gente."
    ]
  },
  {
    id: "A",
    titulo: "Alineación (Esfuerzo Disperso)",
    objetivo: "Marca todas las situaciones que ocurren en tu equipo hoy.",
    sintomas: [
      "El equipo confunde 'estar ocupado' con 'avanzar'.",
      "No todos saben cuáles son las 3 prioridades críticas del mes.",
      "Las urgencias externas siempre descarrilan el plan semanal.",
      "Siento que 'remo' solo; el equipo no tiene la misma intensidad."
    ]
  },
  {
    id: "D",
    titulo: "Desempeño (Inconsistencia)",
    objetivo: "Marca todas las situaciones que ocurren en tu equipo hoy.",
    sintomas: [
      "No tenemos métricas simples; gestiono por intuición.",
      "Los resultados son inconsistentes; dependemos de 'esfuerzos heroicos'.",
      "El feedback solo ocurre cuando hay un problema grave.",
      "Si me ausento una semana, la operación sufre o se detiene."
    ]
  }
];