"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Target, BarChart3, Mail, User } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim() && email.trim()) {
      setIsSubmitting(true);
      // Guardar en sessionStorage para recuperarlo luego al finalizar el test
      sessionStorage.setItem('lead_nombre', nombre);
      sessionStorage.setItem('lead_email', email);
      router.push('/diagnostico');
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-slate-200 selection:bg-[#12b886]/30 font-sans overflow-hidden">
      {/* Background Image with Gradient Overlay & Parallax Animation */}
      <div
        className="fixed top-0 left-0 w-full h-[120vh] z-0 bg-cover bg-center bg-no-repeat will-change-transform ease-out"
        style={{
          backgroundImage: `url('/image_1.png')`,
          // Mueve hacia arriba en lugar de escalar tanto, previene el 'jump' brutal de redibujado en movil 
          // al ocultarse/mostrarse la barra de navegación del navegador (el cual cambia el 100vh).
          transform: `translateY(calc(-5vh + ${scrollY * 0.08}px))`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128]/80 via-[#0a1128]/60 to-black/85"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-4 py-12 md:py-20 flex flex-col items-center">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
            ¿Tu equipo depende de ti para avanzar? <span className="text-[#12b886]">LEAD®</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-medium drop-shadow-sm max-w-2xl mx-auto">
            Mide la salud operativa de tu liderazgo y transforma el desorden en un sistema de ejecución de alto desempeño en 90 días.
          </p>
        </div>

        {/* Central Form with Glassmorphism */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#1e2531]/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 space-y-6"
        >
          <div className="text-left space-y-1">
            <label className="block text-sm font-bold text-slate-300">Nombre Completo</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#12b886] group-focus-within:text-[#12b886] transition-colors" />
              </div>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/5 rounded-xl focus:ring-2 focus:ring-[#12b886] focus:border-[#12b886] text-white placeholder-slate-500 transition-all outline-none"
                placeholder="Ej. John D. Maxwell"
              />
            </div>
          </div>

          <div className="text-left space-y-1">
            <label className="block text-sm font-bold text-slate-300">Email Corporativo</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#12b886] group-focus-within:text-[#12b886] transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/5 rounded-xl focus:ring-2 focus:ring-[#12b886] focus:border-[#12b886] text-white placeholder-slate-500 transition-all outline-none"
                placeholder="Maxwell@lidership.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-[#12b886] hover:bg-[#0fa376] disabled:bg-[#12b886]/50 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-[#12b886]/25 mt-4"
          >
            {isSubmitting ? 'Iniciando...' : 'Iniciar Diagnóstico'}
            <ArrowRight size={22} />
          </button>
        </form>

        {/* Objetivos del Test */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
          <div className="bg-[#1e2531]/40 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/5 shadow-xl hover:bg-[#1e2531]/60 hover:border-[#12b886]/30 transition-all group delay-75">
            <div className="w-12 h-12 rounded-full bg-[#12b886]/10 flex items-center justify-center mb-4 group-hover:bg-[#12b886]/20 transition-colors">
              <Target className="text-[#12b886]" size={28} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Autonomía vs. Dependencia.</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Identifica si estás centralizando decisiones y cargando con toda la operación.
            </p>
          </div>
          <div className="bg-[#1e2531]/40 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/5 shadow-xl hover:bg-[#1e2531]/60 hover:border-[#12b886]/30 transition-all group delay-100">
            <div className="w-12 h-12 rounded-full bg-[#12b886]/10 flex items-center justify-center mb-4 group-hover:bg-[#12b886]/20 transition-colors">
              <BarChart3 className="text-[#12b886]" size={28} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Método LEAD®</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Evalúa tu liderazgo, estructura de roles, alineación de objetivos y hábitos de desempeño.
            </p>
          </div>
          <div className="bg-[#1e2531]/40 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/5 shadow-xl hover:bg-[#1e2531]/60 hover:border-[#12b886]/30 transition-all group delay-150">
            <div className="w-12 h-12 rounded-full bg-[#12b886]/10 flex items-center justify-center mb-4 group-hover:bg-[#12b886]/20 transition-colors">
              <CheckCircle className="text-[#12b886]" size={28} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Resultados Medibles.</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Recibe sugerencias concretas para reducir el retrabajo y liberar tu agenda operativa.
            </p>
          </div>
        </div>

        {/* Sección: Arquitectura del Despliegue LEAD® */}
        <div className="w-full max-w-5xl mt-32 relative">
          <div className="absolute -inset-10 bg-[#12b886]/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>

          <div className="relative z-10 text-center mb-16">
            <span className="text-[#12b886] font-mono text-sm tracking-widest uppercase mb-3 block">/// Framework Operativo</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Arquitectura del Despliegue LEAD®</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Esta topología resuelve la falla de diseño en tu liderazgo actual, reescribiendo la forma en que tu sistema opera.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">

            {/* 01. Liderazgo */}
            <div className="bg-[#101722]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-[#12b886]/30 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-10 font-mono text-8xl font-black text-white group-hover:text-[#12b886] group-hover:opacity-20 transition-all">01</div>
              <h3 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                <span className="text-[#12b886] font-mono text-sm">/L</span> El Protocolo: Liderazgo y Criterio
              </h3>
              <div className="space-y-4 relative z-10 text-[15px]">
                <div>
                  <span className="text-slate-500 font-mono text-xs uppercase tracking-wider block mb-1">Diagnóstico</span>
                  <p className="text-slate-300">Identificamos el punto de falla en la centralización excesiva de decisiones.</p>
                </div>
                <div>
                  <span className="text-[#12b886] font-mono text-xs uppercase tracking-wider block mb-1">Acción</span>
                  <p className="text-white font-medium">Establecemos criterios de decisión claros para que el líder deje de ser el único hilo de ejecución.</p>
                </div>
                <div className="pt-2 border-t border-white/5 mt-2">
                  <span className="text-emerald-400/80 font-mono text-xs uppercase tracking-wider block mb-1">Resultado</span>
                  <p className="text-emerald-100">Claridad de rol y eliminación del cuello de botella operativo.</p>
                </div>
              </div>
            </div>

            {/* 02. Estructura */}
            <div className="bg-[#101722]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-[#12b886]/30 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-10 font-mono text-8xl font-black text-white group-hover:text-[#12b886] group-hover:opacity-20 transition-all">02</div>
              <h3 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                <span className="text-[#12b886] font-mono text-sm">/E</span> La Infraestructura: Estructura de Roles
              </h3>
              <div className="space-y-4 relative z-10 text-[15px]">
                <div>
                  <span className="text-slate-500 font-mono text-xs uppercase tracking-wider block mb-1">Diagnóstico</span>
                  <p className="text-slate-300">Reducción del ruido generado por la confusión en roles y responsabilidades.</p>
                </div>
                <div>
                  <span className="text-[#12b886] font-mono text-xs uppercase tracking-wider block mb-1">Acción</span>
                  <p className="text-white font-medium">Diseño de un mapa de responsabilidades y procesos críticos simplificados.</p>
                </div>
                <div className="pt-2 border-t border-white/5 mt-2">
                  <span className="text-emerald-400/80 font-mono text-xs uppercase tracking-wider block mb-1">Resultado</span>
                  <p className="text-emerald-100">Autonomía del equipo y eliminación del retrabajo constante.</p>
                </div>
              </div>
            </div>

            {/* 03. Alineación */}
            <div className="bg-[#101722]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-[#12b886]/30 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-10 font-mono text-8xl font-black text-white group-hover:text-[#12b886] group-hover:opacity-20 transition-all">03</div>
              <h3 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                <span className="text-[#12b886] font-mono text-sm">/A</span> La Sincronización: Alineación de Vectores
              </h3>
              <div className="space-y-4 relative z-10 text-[15px]">
                <div>
                  <span className="text-slate-500 font-mono text-xs uppercase tracking-wider block mb-1">Diagnóstico</span>
                  <p className="text-slate-300">Corrección de la deriva entre el esfuerzo diario y los objetivos estratégicos.</p>
                </div>
                <div>
                  <span className="text-[#12b886] font-mono text-xs uppercase tracking-wider block mb-1">Acción</span>
                  <p className="text-white font-medium">Definición de reglas de funcionamiento y prioridades compartidas.</p>
                </div>
                <div className="pt-2 border-t border-white/5 mt-2">
                  <span className="text-emerald-400/80 font-mono text-xs uppercase tracking-wider block mb-1">Resultado</span>
                  <p className="text-emerald-100">El esfuerzo disperso se convierte en un vector de ejecución directo.</p>
                </div>
              </div>
            </div>

            {/* 04. Desempeño */}
            <div className="bg-[#101722]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-[#12b886]/30 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-10 font-mono text-8xl font-black text-white group-hover:text-[#12b886] group-hover:opacity-20 transition-all">04</div>
              <h3 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                <span className="text-[#12b886] font-mono text-sm">/D</span> La Telemetría: Capa de Desempeño
              </h3>
              <div className="space-y-4 relative z-10 text-[15px]">
                <div>
                  <span className="text-slate-500 font-mono text-xs uppercase tracking-wider block mb-1">Diagnóstico</span>
                  <p className="text-slate-300">Sustitución de la "sensación de avance" por datos reales.</p>
                </div>
                <div>
                  <span className="text-[#12b886] font-mono text-xs uppercase tracking-wider block mb-1">Acción</span>
                  <p className="text-white font-medium">Implementación de indicadores simples y rutinas de seguimiento de alta frecuencia.</p>
                </div>
                <div className="pt-2 border-t border-white/5 mt-2">
                  <span className="text-emerald-400/80 font-mono text-xs uppercase tracking-wider block mb-1">Resultado</span>
                  <p className="text-emerald-100">Resultados sostenibles, medibles y predecibles en el tiempo.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <h4 className="text-xl md:text-2xl font-bold text-white mb-3">Las variables de hoy compilan tu resultado de mañana.</h4>
            <p className="text-slate-400 mb-8 max-w-xl">
              Optimiza el ancho de banda de tu liderazgo antes de que el sistema alcance su límite de capacidad.
            </p>
            <a
              href="https://calendly.com/rsebastian-trinidad/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
            >
              Agendá un espacio
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}