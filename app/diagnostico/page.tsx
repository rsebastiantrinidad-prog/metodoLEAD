"use client";

import { useState } from 'react';
import { leadQuestions, CategoryId } from '@/lib/questions';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { ChevronRight, CheckCircle2, RotateCcw, CheckSquare, Square, AlertTriangle, TrendingDown, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getInterpretation } from '@/lib/interpretations';
import { supabase } from '@/lib/supabase';

export default function DiagnosticoPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 a 3 (4 bloques)
  const [respuestas, setRespuestas] = useState<Record<string, boolean>>({});
  const [finalizado, setFinalizado] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentBlock = leadQuestions[step];

  const handleToggleSymptom = (index: number) => {
    const key = `${currentBlock.id}-${index}`;
    setRespuestas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleContinue = async () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsSaving(true);
      await guardarResultados(respuestas);
      setFinalizado(true);
      setIsSaving(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cálculo de promedios para el gráfico basados en "clics" de síntomas (fugas)
  const calcularPromedio = (id: CategoryId, currentRespuestas = respuestas) => {
    let clicks = 0;
    for (let i = 0; i < 4; i++) {
      if (currentRespuestas[`${id}-${i}`]) {
        clicks++;
      }
    }

    // Reverse scoring logic
    if (clicks === 0) return 5.0; // Arquitecto (100% Saludable)
    if (clicks === 1) return 3.9; // Riesgo (Orden Frágil)
    if (clicks === 2) return 2.5; // Crisis (Cuello parcial)
    return 1.0; // Caos Total (3 o 4 opciones)
  };

  const calcularFugasTotales = () => {
    return Object.values(respuestas).filter(v => v === true).length;
  };

  const guardarResultados = async (todasLasRespuestas: Record<string, boolean>) => {
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
        },
        // Marcar la hora en que el test se completó
        completed_at: new Date().toISOString()
      };

      console.log("Saving payload to Supabase:", payload);

      if (storedEmail !== 'sin@email.com') {
        // Fase 2: Usamos una función RPC (Security Definer) para saltarnos 
        // la restricción de SELECT en RLS y poder actualizar el registro
        const { error: updateError } = await supabase.rpc('terminar_diagnostico', {
          p_email: storedEmail,
          p_respuestas: payload.respuestas,
          p_promedios: payload.promedios,
          p_completed_at: payload.completed_at
        });

        if (updateError) {
          console.error("Error updating via RPC Supabase:", updateError);
          // Fallback a insert si la RPC falla por alguna razón (ej. no está creada)
          await supabase.from('diagnosticos').insert([payload]);
        } else {
          console.log("Results updated successfully via RPC");
        }
      } else {
        // Fallback: Si no hay email, insertamos uno nuevo
        const { error: insertError } = await supabase
          .from('diagnosticos')
          .insert([payload]);

        if (insertError) {
          console.error("Error saving fallback to Supabase:", insertError);
        } else {
          console.log("Results saved (fallback insert)");
        }
      }
    } catch (err: any) {
      console.error("Exception saving:", err);
    }
  };

  const dataGrafico = [
    { subject: 'Liderazgo', A: calcularPromedio('L'), perfect: 5 },
    { subject: 'Estructura', A: calcularPromedio('E'), perfect: 5 },
    { subject: 'Alineación', A: calcularPromedio('A'), perfect: 5 },
    { subject: 'Desempeño', A: calcularPromedio('D'), perfect: 5 },
  ];

  if (finalizado) {
    const totalFugas = calcularFugasTotales();
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
                {/* Capa "Estado Deseado" (Sombra perfecta) */}
                <Radar name="Ideal" dataKey="perfect" stroke="#334155" strokeWidth={1} fill="#e2e8f0" fillOpacity={0.03} />
                {/* Capa "Situación Actual" */}
                <Radar name="LEAD" dataKey="A" stroke="#10B981" strokeWidth={2} fill="#10B981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-10 bg-slate-900/40 border border-lead-teal/30 p-6 rounded-lg shadow-inner">
            <p className="text-lg md:text-xl text-lead-slate-light font-medium leading-relaxed">
              Has marcado <span className="text-lead-teal font-bold text-2xl px-1">{totalFugas}</span> fugas de sistema.
              <br className="mb-2" />
              Esto confirma que hoy lideras desde la urgencia y no desde un sistema estable. <br className="hidden md:block" /> El <span className="text-lead-white font-bold">Método LEAD®</span> transformará estos clics en autonomía en 90 días.
            </p>
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
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-700/50 pb-2">
                          {interpretacion.title}
                        </p>
                        <p className="text-sm text-lead-slate-light leading-relaxed font-medium">
                          {interpretacion.titleDesc}
                        </p>
                      </div>
                      <div className={`${colorClasses.bg} p-5 rounded-lg border ${colorClasses.border}`}>
                        <p className={`text-[12px] font-bold ${colorClasses.title} uppercase tracking-widest mb-3`}>
                          Diagnóstico: <span className="font-extrabold text-lead-white">{interpretacion.diag}</span>
                        </p>
                        <p className={`text-[14.5px] ${colorClasses.text} leading-[1.6] font-medium`}>
                          {interpretacion.diagDesc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ------------- COSTO DE INACCIÓN (COI) ------------- */}
          {(() => {
            const sumL = calcularPromedio('L');
            const sumE = calcularPromedio('E');
            const sumA = calcularPromedio('A');
            const sumD = calcularPromedio('D');
            const scoreGlobal = (sumL + sumE + sumA + sumD) / 4;

            let riskLevel = "Leve (< 5.0)";
            let riskTitle = "Pérdida de Foco";
            let riskImpact = "Desgaste innecesario que impide pasar al siguiente nivel de excelencia.";
            let riskColor = "text-amber-400";
            let riskBorder = "border-amber-500/50";
            let riskBg = "bg-amber-900/10";

            if (scoreGlobal <= 2.5) {
              riskLevel = "Crítico (< 2.5)";
              riskTitle = "Colapso Operativo";
              riskImpact = "Renuncia o baja médica del líder por agotamiento profundo.";
              riskColor = "text-red-500";
              riskBorder = "border-red-500/50";
              riskBg = "bg-red-900/10";
            } else if (scoreGlobal <= 3.9) {
              riskLevel = "Moderado (< 3.9)";
              riskTitle = "Estancamiento de Margen";
              riskImpact = "Pérdida sostenida de competitividad y fuga de talento por falta de claridad.";
              riskColor = "text-orange-500";
              riskBorder = "border-orange-500/50";
              riskBg = "bg-orange-900/10";
            }

            const isAgotamiento = sumL <= 3.9 && sumD <= 3.9;
            const isCrecimientoFrenado = sumE <= 3.9;
            const isPerdidaProductividad = totalFugas > 0;

            if (totalFugas === 0) return null; // No COI if perfect score

            return (
              <div className="mt-12 text-left relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="text-red-500" size={28} />
                  <h3 className="text-2xl font-bold text-lead-white tracking-tight">Proyección del Costo de Inacción (COI)</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {/* KPI Matriz Global */}
                  <div className={`${riskBg} p-5 rounded-lg border ${riskBorder} flex flex-col justify-center`}>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Impacto a 6 Meses</p>
                    <p className={`text-xl font-black ${riskColor} mb-2`}>{riskTitle}</p>
                    <p className="text-[13px] text-lead-slate-light font-medium leading-relaxed">{riskImpact}</p>
                    <div className="mt-auto pt-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded bg-black/20 ${riskColor} uppercase tracking-wider border ${riskBorder}`}>
                        Nivel: {riskLevel}
                      </span>
                    </div>
                  </div>

                  {/* Riesgos Específicos Dinámicos */}
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                    {isAgotamiento && (
                      <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
                        <Activity className="text-red-400 mb-3" size={20} />
                        <h4 className="text-[15px] font-bold text-lead-white mb-2">Agotamiento Crónico</h4>
                        <p className="text-[13px] text-slate-400 leading-relaxed">
                          La permanencia en tu rol peligra por sobrecarga y burnout funcional, dejando a la empresa sin su principal tomador de decisiones.
                        </p>
                      </div>
                    )}
                    {isCrecimientoFrenado && (
                      <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
                        <TrendingDown className="text-orange-400 mb-3" size={20} />
                        <h4 className="text-[15px] font-bold text-lead-white mb-2">Crecimiento Frenado</h4>
                        <p className="text-[13px] text-slate-400 leading-relaxed">
                          La empresa no puede escalar. Como la operación absorbe el 100% de tu capacidad, el crecimiento se detiene de forma tajante.
                        </p>
                      </div>
                    )}
                    {isPerdidaProductividad && (
                      <div className={`${!isAgotamiento || !isCrecimientoFrenado ? 'sm:col-span-2' : ''} bg-slate-800/50 p-5 rounded-lg border border-slate-700 flex items-start gap-4`}>
                        <div className="text-2xl font-black text-lead-teal bg-emerald-900/30 px-3 py-2 rounded border border-emerald-500/30 shrink-0">
                          -30%
                        </div>
                        <div>
                          <h4 className="text-[15px] font-bold text-lead-white mb-1">Pérdida Operativa Constante</h4>
                          <p className="text-[13px] text-slate-400 leading-relaxed">
                            Aceptas una pérdida de hasta 30% en capacidad. Estás quemando dinero y tiempo cada mes en tareas duplicadas y confusión estructural.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-700/80 text-center">
                  <p className="text-lg text-lead-slate-light font-medium italic">
                    "¿Cuánto te cuesta operativa, financiera y personalmente mantenerte como el cuello de botella de tu propio modelo de negocio?"
                  </p>
                </div>
              </div>
            );
          })()}

          <div className="mt-12 mb-2 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <button
              onClick={() => {
                window.location.href = "https://calendly.com/roxana-ochnicki-executive--growth-partners/reunion-exploratoria-de-liderazgo-?month=2026-03"; // Reemplazar con URL real
              }}
              className="flex items-center gap-2 bg-lead-teal hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-md shadow-emerald-900/40 w-full md:w-auto justify-center text-[15px] tracking-wide"
            >
              Agenda una consulta.
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('lead_nombre');
                sessionStorage.removeItem('lead_email');
                router.push('/');
              }}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-lead-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-md group w-full md:w-auto justify-center text-[15px] tracking-wide"
            >
              <RotateCcw size={18} className="group-hover:-rotate-90 transition-transform duration-300" />
              Hacer test de nuevo
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
            Paso {step + 1} de 4
          </span>
          <span className="text-slate-400 font-bold text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-md">
            Pilar <span className="text-lead-white">{currentBlock.id}</span>
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700">
          <div
            className="bg-lead-teal h-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-5 md:px-8">
        {/* 2. Optimización Título Contenedor */}
        <div className="bg-lead-surface rounded-lg p-6 md:p-8 shadow-black/20 shadow-xl border border-slate-700/50 mb-8 relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold text-lead-white leading-tight tracking-tight mb-2">
            {currentBlock.titulo}
          </h2>
          <p className="text-lead-slate-light font-medium text-sm md:text-base">
            {currentBlock.objetivo}
          </p>
        </div>

        {isSaving ? (
          <div className="flex flex-col items-center justify-center p-12 text-lead-teal">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-currentColor mb-4"></div>
            <p className="font-bold text-center text-lg animate-pulse">Analizando tus respuestas y calculando el Mapa de Calor...</p>
          </div>
        ) : (
          <div className="flex flex-col w-full space-y-4">

            {/* Opciones (Checkboxes) */}
            {currentBlock.sintomas.map((sintoma, idx) => {
              const isChecked = respuestas[`${currentBlock.id}-${idx}`] || false;
              return (
                <button
                  key={idx}
                  onClick={() => handleToggleSymptom(idx)}
                  className={`w-full text-left p-5 rounded-lg border-2 transition-all duration-300 flex items-start gap-4 ${isChecked
                    ? 'bg-emerald-900/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] shadow-md'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                >
                  <div className={`mt-0.5 flex-shrink-0 transition-colors ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {isChecked ? <CheckSquare size={22} className="fill-emerald-900/40" /> : <Square size={22} />}
                  </div>
                  <span className={`text-[15px] md:text-base font-medium leading-relaxed ${isChecked ? 'text-lead-white' : 'text-lead-slate-light'}`}>
                    {sintoma}
                  </span>
                </button>
              );
            })}

            <button
              onClick={handleContinue}
              className="mt-8 w-full flex justify-center items-center gap-2 bg-lead-teal hover:bg-emerald-600 text-white py-4 rounded-lg font-bold text-[15px] shadow-lg hover:shadow-emerald-900/40 transition-colors duration-300 tracking-wide"
            >
              Continuar <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}