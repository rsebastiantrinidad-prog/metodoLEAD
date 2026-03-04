"use client";

import { useState } from 'react';
import { leadQuestions, CategoryId } from '@/lib/questions';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { ChevronRight, ChevronLeft, Send, CheckCircle2 } from 'lucide-react';
import { getInterpretation } from '@/lib/interpretations';
import { supabase } from '@/lib/supabase';

export default function DiagnosticoPage() {
  const [step, setStep] = useState(0); // 0 a 31 (las 32 preguntas)
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [finalizado, setFinalizado] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  // Identificar en qué bloque estamos (L, E, A o D)
  const currentBlockIdx = Math.floor(step / 8);
  const currentQuestionIdx = step % 8;
  const currentBlock = leadQuestions[currentBlockIdx];
  const currentQuestion = currentBlock.preguntas[currentQuestionIdx];

  const handleAnswer = async (valor: number) => {
    const nuevasRespuestas = { ...respuestas, [`${currentBlock.id}-${currentQuestionIdx}`]: valor };
    setRespuestas(nuevasRespuestas);

    if (step < 31) {
      setStep(step + 1);
    } else {
      setIsSaving(true);
      await guardarResultados(nuevasRespuestas);
      setFinalizado(true);
      setIsSaving(false);
    }
  };

  // Cálculo de promedios para el gráfico
  const calcularPromedio = (id: CategoryId, currentRespuestas = respuestas) => {
    const keys = Object.keys(currentRespuestas).filter(k => k.startsWith(id));
    if (keys.length === 0) return 0;
    const suma = keys.reduce((acc, k) => acc + currentRespuestas[k], 0);
    return suma / 8; // Divide explicitly by 8 according to LEAD questions mapping
  };

  const guardarResultados = async (todasLasRespuestas: Record<string, number>) => {
    try {
      const storedNombre = sessionStorage.getItem('lead_nombre') || 'Usuario Anónimo';
      const storedEmail = sessionStorage.getItem('lead_email') || 'sin@email.com';

      const payload = {
        full_name: storedNombre,
        email: storedEmail,
        respuestas: todasLasRespuestas,
        promedios: {
          L: calcularPromedio('L', todasLasRespuestas),
          E: calcularPromedio('E', todasLasRespuestas),
          A: calcularPromedio('A', todasLasRespuestas),
          D: calcularPromedio('D', todasLasRespuestas)
        }
      };

      console.log("Intentando guardar este payload en Supabase:", payload);

      const { data, error } = await supabase
        .from('diagnosticos')
        .insert([payload]);

      if (error) {
        console.error("Error al guardar en Supabase:", error);
      } else {
        console.log("Resultados guardados correctamente:", data);
      }
    } catch (err: any) {
      console.error("Error excepcional al guardar:", err);
    }
  };

  const dataGrafico = [
    { subject: 'Liderazgo', A: calcularPromedio('L'), fullMark: 5 },
    { subject: 'Estructura', A: calcularPromedio('E'), fullMark: 5 },
    { subject: 'Alineación', A: calcularPromedio('A'), fullMark: 5 },
    { subject: 'Desempeño', A: calcularPromedio('D'), fullMark: 5 },
  ];

  if (finalizado) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-4xl font-extrabold mb-8 text-slate-900 dark:text-white items-center flex justify-center gap-3">
          <CheckCircle2 className="text-green-500" size={36} />
          Tu Diagnóstico Estratégico LEAD®
        </h2>

        <div className="h-[450px] w-full mb-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={dataGrafico}>
              <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontWeight: 800, fontSize: 16 }} className="text-slate-900 dark:text-slate-100" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
              <Radar name="LEAD" dataKey="A" stroke="#2563eb" strokeWidth={3} fill="#3b82f6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-6 text-left md:grid-cols-2">
          {dataGrafico.map((item) => {
            const id = item.subject.charAt(0);
            const interpretacion = getInterpretation(id, item.A);

            let colorClasses = {
              bg: 'bg-red-50 dark:bg-red-900/20',
              border: 'border-red-100 dark:border-red-900/30',
              title: 'text-red-700 dark:text-red-400',
              text: 'text-red-600 dark:text-red-300'
            };

            if (item.A > 2.5 && item.A <= 3.9) {
              colorClasses = {
                bg: 'bg-orange-50 dark:bg-orange-900/20',
                border: 'border-orange-100 dark:border-orange-900/30',
                title: 'text-orange-700 dark:text-orange-400',
                text: 'text-orange-600 dark:text-orange-300'
              };
            } else if (item.A > 3.9) {
              colorClasses = {
                bg: 'bg-emerald-50 dark:bg-emerald-900/20',
                border: 'border-emerald-100 dark:border-emerald-900/30',
                title: 'text-emerald-700 dark:text-emerald-400',
                text: 'text-emerald-600 dark:text-emerald-300'
              };
            }

            return (
              <div key={item.subject} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.subject}</h3>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-bold px-3 py-1 rounded-full text-sm">
                    {item.A.toFixed(1)} / 5.0
                  </span>
                </div>
                {interpretacion && (
                  <div className="space-y-4 mt-4">
                    <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-2">
                        {interpretacion.title}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {interpretacion.titleDesc}
                      </p>
                    </div>
                    <div className={`${colorClasses.bg} p-4 rounded-xl border ${colorClasses.border}`}>
                      <p className={`text-sm font-bold ${colorClasses.title} mb-2`}>
                        Diagnóstico Preliminar: <span className="font-semibold">{interpretacion.diag}</span>
                      </p>
                      <p className={`text-sm ${colorClasses.text} leading-relaxed font-medium`}>
                        {interpretacion.diagDesc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto pt-20 px-6 pb-20">
      <div className="mb-8">
        <span className="text-blue-700 dark:text-blue-400 font-extrabold tracking-widest uppercase text-sm">
          Bloque {currentBlock.id}: {currentBlock.titulo}
        </span>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 mt-3 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 32) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
          {currentQuestion}
        </h2>
      </div>

      {isSaving ? (
        <div className="flex flex-col items-center justify-center p-12 text-blue-600 dark:text-blue-400">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-currentColor mb-4"></div>
          <p className="font-bold text-lg animate-pulse">Guardando y calculando tu diagnóstico...</p>
        </div>
      ) : (
        <div className="grid gap-4 mt-6">
          {[1, 2, 3, 4, 5].map((valor, index) => (
            <button
              key={valor}
              onClick={() => handleAnswer(valor)}
              className="flex items-center justify-between p-5 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700/50 hover:border-blue-500 dark:hover:border-blue-400 transition-all text-left group bg-white dark:bg-slate-800 shadow-sm hover:shadow-md"
            >
              <span className="font-semibold text-slate-800 dark:text-slate-100 text-lg group-hover:text-blue-700 dark:group-hover:text-blue-300">
                {currentBlock.escala[index]}
              </span>
              <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <ChevronRight className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" size={20} />
              </div>
            </button>
          ))}
        </div>
      )}

      {!isSaving && (
        <div className="mt-10 text-slate-500 dark:text-slate-400 font-medium text-center bg-slate-100 dark:bg-slate-800 py-3 rounded-full mx-auto max-w-xs">
          Pregunta <span className="text-slate-900 dark:text-white font-bold">{step + 1}</span> de 32
        </div>
      )}
    </main>
  );
}