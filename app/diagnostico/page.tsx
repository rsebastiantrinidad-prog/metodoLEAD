"use client";

import { useState } from 'react';
import { leadQuestions, CategoryId } from '@/lib/questions';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ChevronRight, ChevronLeft, Send, CheckCircle2 } from 'lucide-react';

export default function DiagnosticoPage() {
  const [step, setStep] = useState(0); // 0 a 31 (las 32 preguntas)
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [finalizado, setFinalizado] = useState(false);

  // Identificar en qué bloque estamos (L, E, A o D)
  const currentBlockIdx = Math.floor(step / 8);
  const currentQuestionIdx = step % 8;
  const currentBlock = leadQuestions[currentBlockIdx];
  const currentQuestion = currentBlock.preguntas[currentQuestionIdx];

  const handleAnswer = (valor: number) => {
    setRespuestas({ ...respuestas, [`${currentBlock.id}-${currentQuestionIdx}`]: valor });
    if (step < 31) {
      setStep(step + 1);
    } else {
      setFinalizado(true);
    }
  };

  // Cálculo de promedios para el gráfico
  const calcularPromedio = (id: CategoryId) => {
    const keys = Object.keys(respuestas).filter(k => k.startsWith(id));
    const suma = keys.reduce((acc, k) => acc + respuestas[k], 0);
    return suma / 8;
  };

  const dataGrafico = [
    { subject: 'Liderazgo', A: calcularPromedio('L'), fullMark: 5 },
    { subject: 'Estructura', A: calcularPromedio('E'), fullMark: 5 },
    { subject: 'Alineación', A: calcularPromedio('A'), fullMark: 5 },
    { subject: 'Desempeño', A: calcularPromedio('D'), fullMark: 5 },
  ];

  if (finalizado) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Tu Diagnóstico LEAD®</h2>
        
        <div className="h-[400px] w-full mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataGrafico}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar name="LEAD" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-4 text-left">
          {/* Aquí puedes mapear la interpretación basada en los promedios del PDF */}
          <p className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <strong>Resultado:</strong> Has completado el diagnóstico. Tu pilar más fuerte es el que tiene el puntaje más alto en el gráfico.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto pt-20 px-6">
      <div className="mb-8">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
          Bloque {currentBlock.id}: {currentBlock.titulo}
        </span>
        <div className="w-full bg-slate-200 h-2 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-300" 
            style={{ width: `${((step + 1) / 32) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-slate-800 mb-8 leading-snug">
        {currentQuestion}
      </h2>

      <div className="grid gap-3">
        {[1, 2, 3, 4, 5].map((valor) => (
          <button
            key={valor}
            onClick={() => handleAnswer(valor)}
            className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all text-left group"
          >
            <span className="font-medium text-slate-700">
              {valor === 1 ? currentBlock.escala.min : valor === 5 ? currentBlock.escala.max : `Nivel ${valor}`}
            </span>
            <ChevronRight className="text-slate-300 group-hover:text-blue-500" size={20} />
          </button>
        ))}
      </div>

      <div className="mt-8 text-slate-400 text-sm text-center">
        Pregunta {step + 1} de 32
      </div>
    </main>
  );
}