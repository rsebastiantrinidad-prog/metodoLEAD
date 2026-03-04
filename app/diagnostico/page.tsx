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
      <div className="max-w-4xl mx-auto p-4 md:p-8 text-center mt-4">
        <div className="bg-lead-surface rounded-lg shadow-black/20 shadow-xl border border-slate-700/50 p-6 md:p-10 mb-8 relative overflow-hidden">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 text-lead-white items-center flex justify-center gap-2 md:gap-3 leading-tight tracking-tight relative z-10">
            <CheckCircle2 className="text-lead-teal flex-shrink-0 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" size={32} />
            Tu Diagnóstico Estratégico
          </h2>

          <div className="h-[320px] md:h-[450px] w-full mb-8 bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataGrafico}>
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontWeight: 600, fontSize: 13 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar name="LEAD" dataKey="A" stroke="#10B981" strokeWidth={2} fill="#10B981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-5 md:gap-6 text-left lg:grid-cols-2 relative z-10">
            {dataGrafico.map((item) => {
              const id = item.subject.charAt(0);
              const interpretacion = getInterpretation(id, item.A);

              let colorClasses = {
                bg: 'bg-amber-900/20',
                border: 'border-amber-700/50',
                title: 'text-amber-400',
                text: 'text-amber-200',
                glow: 'hover:border-amber-600/50 hover:shadow-black/20'
              };

              if (item.A > 2.5 && item.A <= 3.9) {
                colorClasses = {
                  bg: 'bg-amber-900/20',
                  border: 'border-amber-700/50',
                  title: 'text-amber-400',
                  text: 'text-amber-200',
                  glow: 'hover:border-amber-600/50 hover:shadow-black/20'
                };
              } else if (item.A > 3.9) {
                colorClasses = {
                  bg: 'bg-emerald-900/20',
                  border: 'border-emerald-700/50',
                  title: 'text-emerald-400',
                  text: 'text-emerald-200',
                  glow: 'hover:border-emerald-600/50 hover:shadow-black/20'
                };
              }

              return (
                <div key={item.subject} className={`bg-slate-800/80 p-6 rounded-lg border border-slate-700/50 shadow-md transition-all duration-300 ${colorClasses.glow} h-full flex flex-col`}>
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg md:text-xl font-bold text-lead-white tracking-wide">{item.subject}</h3>
                    <span className="bg-slate-900/50 border border-slate-700/50 text-lead-white font-bold px-3 py-1 rounded-md text-sm shadow-inner overflow-hidden relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-lead-teal">
                      {item.A.toFixed(1)} <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest pl-1">/ 5.0</span>
                    </span>
                  </div>
                  {interpretacion && (
                    <div className="space-y-4 mt-auto flex-grow">
                      <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-700/30">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                          {interpretacion.title}
                        </p>
                        <p className="text-sm text-lead-slate-light leading-relaxed font-medium">
                          {interpretacion.titleDesc}
                        </p>
                      </div>
                      <div className={`${colorClasses.bg} p-5 rounded-lg border ${colorClasses.border}`}>
                        <p className={`text-[11px] font-bold ${colorClasses.title} uppercase tracking-widest mb-2`}>
                          Diagnóstico: <span className="font-extrabold text-lead-white">{interpretacion.diag}</span>
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

          <div className="mt-12 mb-2 pt-8 border-t border-slate-700/50 flex justify-center relative z-10">
            <button
              onClick={() => {
                sessionStorage.removeItem('lead_nombre');
                sessionStorage.removeItem('lead_email');
                router.push('/');
              }}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-lead-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-md group w-full md:w-auto justify-center text-[15px] tracking-wide"
            >
              <RotateCcw size={18} className="group-hover:-rotate-90 transition-transform duration-300" />
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto pb-20 min-h-screen">

      {/* 1. Sticky Header Header de Progreso */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl pt-6 px-6 pb-4 border-b border-slate-800 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-emerald-400 font-bold tracking-widest uppercase text-[11px] px-2.5 py-1 rounded bg-emerald-900/20 border border-emerald-800/50">
            B-{currentBlock.id}: {currentBlock.titulo}
          </span>
          <span className="text-slate-400 font-bold text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-md">
            {step + 1}<span className="font-normal text-slate-500"> / 32</span>
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700">
          <div
            className="bg-lead-teal h-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            style={{ width: `${((step + 1) / 32) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-5 md:px-8">
        {/* 2. Optimización Texto Pregunta */}
        <div className="bg-lead-surface rounded-lg p-6 md:p-8 shadow-black/20 shadow-xl border border-slate-700/50 mb-8 relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold text-lead-white leading-tight tracking-tight relative z-10">
            {currentQuestion}
          </h2>
        </div>

        {isSaving ? (
          <div className="flex flex-col items-center justify-center p-12 text-lead-teal">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-currentColor mb-4"></div>
            <p className="font-bold text-center text-lg animate-pulse">Guardando y calculando tu diagnóstico...</p>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="flex flex-col md:flex-row items-center justify-center w-full gap-6 md:gap-8 my-8 md:my-12">
              {/* Desktop Left Label - Agree (5) */}
              <span className="hidden md:block text-emerald-400 font-bold text-sm md:text-base text-right md:w-32 lg:w-40 leading-tight">
                {currentBlock.escala[4]}
              </span>

              <div className="flex flex-col items-center justify-center w-full md:w-auto">
                {/* Mobile Labels */}
                <div className="flex md:hidden justify-between w-full mb-6 px-1">
                  <span className="text-emerald-400 font-bold text-sm text-left w-[45%] leading-tight">{currentBlock.escala[4]}</span>
                  <span className="text-slate-400 font-bold text-sm text-right w-[45%] leading-tight">{currentBlock.escala[0]}</span>
                </div>

                {/* Circles */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
                  {[5, 4, 3, 2, 1].map((valor) => {
                    const isSelected = selectedAnswer === valor;

                    let sizeClass = "w-9 h-9 sm:w-10 sm:h-10"; // middle
                    if (valor === 5 || valor === 1) sizeClass = "w-14 h-14 sm:w-16 sm:h-16"; // large
                    else if (valor === 4 || valor === 2) sizeClass = "w-11 h-11 sm:w-12 sm:h-12"; // medium

                    let colorClass = "";
                    let selectedClass = "";

                    if (valor === 5 || valor === 4) {
                      colorClass = "border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-400";
                      selectedClass = "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]";
                    } else if (valor === 2 || valor === 1) {
                      colorClass = "border-slate-500/40 hover:bg-slate-500/20 hover:border-slate-400";
                      selectedClass = "bg-slate-600 border-slate-500 text-white shadow-[0_0_10px_rgba(71,85,105,0.4)]";
                    } else {
                      colorClass = "border-slate-600/50 hover:bg-slate-600/30 hover:border-slate-500";
                      selectedClass = "bg-slate-600 border-slate-500 text-white shadow-sm";
                    }

                    return (
                      <button
                        key={valor}
                        onClick={() => handleSelect(valor)}
                        className={`rounded-full border-[2px] transition-all duration-300 flex items-center justify-center relative ${sizeClass} ${isSelected ? selectedClass + ' scale-110' : colorClass + ' bg-slate-900/40'}`}
                        aria-label={`Seleccionar valor ${valor}`}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 rounded-full bg-white opacity-20 outline-none ring-0 animate-ping" style={{ animationIterationCount: 1, animationDuration: '400ms' }}></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Right Label - Disagree (1) */}
              <span className="hidden md:block text-slate-400 font-bold text-sm md:text-base text-left md:w-32 lg:w-40 leading-tight">
                {currentBlock.escala[0]}
              </span>
            </div>

            <button
              onClick={handleContinue}
              disabled={selectedAnswer === null}
              className="mt-6 w-full flex justify-center items-center gap-2 bg-lead-teal hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:border disabled:border-slate-700 disabled:shadow-none text-white py-4 rounded-lg font-bold text-[15px] shadow-lg hover:shadow-emerald-900/40 transition-colors duration-300 tracking-wide"
            >
              Continuar <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}