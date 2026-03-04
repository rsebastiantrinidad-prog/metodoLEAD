export type CategoryId = 'L' | 'E' | 'A' | 'D';

export interface QuestionBlock {
  id: CategoryId;
  titulo: string;
  objetivo: string;
  escala: {
    min: string;
    max: string;
  };
  preguntas: string[];
}

export const leadQuestions: QuestionBlock[] = [
  {
    id: "L",
    titulo: "Liderazgo (Criterio y Decisión)",
    objetivo: "Evaluar si el líder actúa como cuello de botella o como facilitador estratégico.",
    escala: { min: "Totalmente en desacuerdo", max: "Totalmente de acuerdo" },
    preguntas: [
      "Mi equipo avanza de forma autónoma sin que yo sea el centro de todas las decisiones.",
      "Delegar me genera tranquilidad porque confío en el criterio de mi equipo.",
      "Mi agenda semanal está dominada por tareas estratégicas, no por urgencias del día a día.",
      "Las decisiones importantes se toman basándose en criterios preestablecidos, no en la presión del momento.",
      "Me siento cómodo/a y efectivo/a al abordar conversaciones difíciles con mi equipo.",
      "He logrado separar mi identidad del control absoluto; no siento que 'si bajo el ritmo, todo se cae'.",
      "El equipo resuelve problemas operativos por su cuenta sin escalarlos inmediatamente a mi oficina.",
      "Dedico tiempo recurrente a la mentoría y al desarrollo estratégico de mi equipo."
    ]
  },
  {
    id: "E",
    titulo: "Estructura (Roles y Procesos)",
    objetivo: "Detectar confusión, retrabajo y desorden en la ejecución.",
    escala: { min: "Caos total", max: "Orden absoluto" },
    preguntas: [
      "Cada integrante conoce sus responsabilidades específicas y nadie se pisa las tareas con otro.",
      "Contamos con un mapa de roles actualizado que es consultado regularmente por el equipo.",
      "Los procesos más críticos están simplificados y documentados para que cualquiera pueda ejecutarlos.",
      "Existen reglas de funcionamiento claras (canales de comunicación, tiempos de respuesta) que todos respetan.",
      "El retrabajo es mínimo debido a que las instrucciones y procesos son claros desde el inicio.",
      "La comunicación interna es fluida y no genera ruido ni malentendidos innecesarios.",
      "Las reuniones del equipo son ágiles y siempre terminan con acuerdos y próximos pasos claros.",
      "El equipo tiene acceso a todas las herramientas y guías necesarias para operar sin mi ayuda."
    ]
  },
  {
    id: "A",
    titulo: "Alineación (Prioridades y Objetivos)",
    objetivo: "Validar que el esfuerzo se traduzca en resultados medibles y no solo en actividad.",
    escala: { min: "Nada alineados", max: "Totalmente alineados" },
    preguntas: [
      "Las 3 prioridades estratégicas del mes son conocidas y compartidas por todo el equipo.",
      "El equipo sabe decir 'no' a las urgencias que no alinean con nuestros objetivos críticos.",
      "Existe una conexión clara entre las tareas diarias de cada persona y las metas del negocio.",
      "La ejecución del equipo es consistente, independientemente de los imprevistos externos.",
      "Todos los miembros del equipo 'reman' en la misma dirección sin agendas ocultas.",
      "El equipo entiende qué es 'éxito' para su rol este trimestre.",
      "No hay confusión entre lo que es urgente y lo que es verdaderamente importante.",
      "Contamos con un plan de ejecución visible que guía nuestras acciones semanales."
    ]
  },
  {
    id: "D",
    titulo: "Desempeño (Métricas y Hábitos)",
    objetivo: "Evaluar la capacidad de medir y sostener el éxito de forma autónoma.",
    escala: { min: "No medimos", max: "Medimos y ajustamos" },
    preguntas: [
      "Contamos con indicadores simples que muestran el estado de salud de la operación semanalmente.",
      "Los resultados de mi equipo son predecibles; no dependemos de 'golpes de suerte' o esfuerzos heroicos.",
      "Tenemos el hábito de realizar rutinas de seguimiento cortas para ajustar desviaciones rápidamente.",
      "El feedback correctivo y de reconocimiento es una práctica semanal y no un evento anual.",
      "El equipo monitorea sus propios KPIs sin que yo tenga que solicitar reportes constantemente.",
      "Hemos mejorado nuestra productividad de forma sostenida en el tiempo.",
      "El sistema de trabajo sigue funcionando perfectamente incluso si yo me ausento unos días.",
      "Tenemos un plan claro para mantener estos resultados a largo plazo."
    ]
  }
];