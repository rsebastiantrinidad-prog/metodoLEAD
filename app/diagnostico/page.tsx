"use client";

import { useState } from 'react';
import { leadQuestions, CategoryId } from '@/lib/questions';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { ChevronRight, ChevronLeft, Send, CheckCircle2, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getInterpretation } from '@/lib/interpretations';
import { supabase } from '@/lib/supabase';

export default function DiagnosticoPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 a 31 (las 32 preguntas)
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finalizado, setFinalizado] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  // Identificar en qué bloque estamos (L, E, A o D)
  const currentBlockIdx = Math.floor(step / 8);
  const currentQuestionIdx = step % 8;
  const currentBlock = leadQuestions[currentBlockIdx];
  const currentQuestion = currentBlock.preguntas[currentQuestionIdx];

  const handleSelect = (valor: number) => {
    setSelectedAnswer(valor);
  };

  const handleContinue = async () => {
    if (selectedAnswer === null) return;

    const nuevasRespuestas = { ...respuestas, [`${currentBlock.id}-${currentQuestionIdx}`]: selectedAnswer };
    setRespuestas(nuevasRespuestas);
    setSelectedAnswer(null); // Reset for next

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
      <div className="max-w-4xl mx-auto p-4 md:p-8 text-center bg-transparent mt-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 text-slate-900 dark:text-white items-center flex justify-center gap-2 md:gap-3 leading-tight">
            <CheckCircle2 className="text-green-500 flex-shrink-0" size={32} />
            Tu Diagnóstico Estratégico
          </h2>

          <div className="h-[320px] md:h-[450px] w-full mb-8 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataGrafico}>
                <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontWeight: 800, fontSize: 14 }} className="text-lead-navy dark:text-slate-300" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar name="LEAD" dataKey="A" stroke="#0D9488" strokeWidth={3} fill="#0D9488" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-5 md:gap-6 text-left lg:grid-cols-2">
            {dataGrafico.map((item) => {
              const id = item.subject.charAt(0);
              const interpretacion = getInterpretation(id, item.A);

              let colorClasses = {
                bg: 'bg-lead-amber/10 dark:bg-lead-amber/5',
                border: 'border-lead-amber/30 dark:border-lead-amber/20',
                title: 'text-lead-amber dark:text-amber-400',
                text: 'text-amber-800 dark:text-amber-300'
              };

              if (item.A > 2.5 && item.A <= 3.9) {
                colorClasses = {
                  bg: 'bg-lead-amber/10 dark:bg-lead-amber/5',
                  border: 'border-lead-amber/30 dark:border-lead-amber/20',
                  title: 'text-lead-amber dark:text-amber-400',
                  text: 'text-amber-800 dark:text-amber-300'
                };
              } else if (item.A > 3.9) {
                colorClasses = {
                  bg: 'bg-lead-teal/10 dark:bg-lead-teal/5',
                  border: 'border-lead-teal/30 dark:border-lead-teal/20',
                  title: 'text-lead-teal dark:text-teal-400',
                  text: 'text-teal-800 dark:text-teal-300'
                };
              }

              return (
                <div key={item.subject} className="bg-lead-white dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm transition-shadow h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-lead-navy dark:text-white">{item.subject}</h3>
                    <span className="bg-lead-teal/10 text-lead-teal dark:bg-lead-teal/20 dark:text-teal-300 font-extrabold px-3 py-1 rounded-full text-sm">
                      {item.A.toFixed(1)} <span className="text-xs font-medium opacity-70">/ 5.0</span>
                    </span>
                  </div>
                  {interpretacion && (
                    <div className="space-y-3 mt-auto flex-grow">
                      <div className="bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-lead-navy dark:text-slate-300 uppercase tracking-wider mb-1.5 opacity-80">
                          {interpretacion.title}
                        </p>
                        <p className="text-sm text-lead-slate dark:text-slate-400 leading-relaxed">
                          {interpretacion.titleDesc}
                        </p>
                      </div>
                      <div className={`${colorClasses.bg} p-4 rounded-xl border ${colorClasses.border}`}>
                        <p className={`text-xs font-bold ${colorClasses.title} uppercase tracking-wider mb-1.5`}>
                          Diagnóstico: <span className="font-extrabold">{interpretacion.diag}</span>
                        </p>
                        <p className={`text-sm ${colorClasses.text} leading-relaxed`}>
                          {interpretacion.diagDesc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 mb-2 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-center">
            <button
              onClick={() => {
                sessionStorage.removeItem('lead_nombre');
                sessionStorage.removeItem('lead_email');
                router.push('/');
              }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 px-8 py-4 rounded-xl font-bold transition-all shadow-md group w-full md:w-auto justify-center text-lg"
            >
              <RotateCcw size={20} className="group-hover:-rotate-90 transition-transform duration-300" />
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto pb-20">

      {/* 1. Sticky Header Header de Progreso */}
      <div className="sticky top-0 z-40 bg-lead-white/90 dark:bg-slate-950/90 backdrop-blur-xl pt-6 px-6 pb-4 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lead-teal dark:text-teal-400 font-extrabold tracking-widest uppercase text-xs md:text-sm">
            B-{currentBlock.id}: {currentBlock.titulo}
          </span>
          <span className="text-lead-slate dark:text-slate-400 font-bold text-sm bg-slate-200/50 dark:bg-slate-800/50 px-3 py-1 rounded-full">
            {step + 1}<span className="font-normal opacity-70">/32</span>
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-lead-teal dark:bg-teal-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 32) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-5 md:px-8">
        {/* 2. Optimización Texto Pregunta */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-lead-navy dark:text-white leading-tight">
            {currentQuestion}
          </h2>
        </div>

        {isSaving ? (
          <div className="flex flex-col items-center justify-center p-12 text-lead-teal">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-currentColor mb-4"></div>
            <p className="font-bold text-center text-lg animate-pulse">Guardando y calculando tu diagnóstico...</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {[1, 2, 3, 4, 5].map((valor, index) => {
              const isSelected = selectedAnswer === valor;
              return (
                <button
                  key={valor}
                  onClick={() => handleSelect(valor)}
                  className={`relative flex items-center justify-between p-4 md:p-5 border-2 rounded-xl transition-all text-left group shadow-sm hover:shadow-md ${isSelected
                    ? 'border-lead-teal bg-lead-teal/5 dark:bg-lead-teal/10'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-lead-slate/30'
                    }`}
                >
                  <span className={`font-semibold text-base md:text-lg pr-10 transition-colors ${isSelected ? 'text-lead-teal' : 'text-lead-navy dark:text-slate-200 group-hover:text-lead-navy/80'
                    }`}>
                    {currentBlock.escala[index]}
                  </span>
                  <div className={`absolute right-4 p-1.5 md:p-2 rounded-full transition-colors ${isSelected ? 'bg-lead-teal text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200'
                    }`}>
                    {isSelected ? <CheckCircle2 size={18} /> : <div className="w-[18px] h-[18px] rounded-full border-2 border-current opacity-30"></div>}
                  </div>
                </button>
              );
            })}

            <button
              onClick={handleContinue}
              disabled={selectedAnswer === null}
              className="mt-6 w-full flex justify-center items-center gap-2 bg-lead-teal hover:bg-teal-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all"
            >
              Continuar <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}