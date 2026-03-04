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
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/image_1.png')`,
          // Escala sutil de 1.05, y velocidad reducida a 0.04 (4% del scroll) para un parallax extremadamente suave y flotante
          transform: `scale(1.05) translateY(${scrollY * 0.04}px)`,
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
          <div className="bg-[#1e2531]/40 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/5 shadow-xl hover:bg-[#1e2531]/60 hover:border-[#12b886]/30 transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#12b886]/10 flex items-center justify-center mb-4 group-hover:bg-[#12b886]/20 transition-colors">
              <Target className="text-[#12b886]" size={28} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Autonomía vs. Dependencia.</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Identifica si estás centralizando decisiones y cargando con toda la operación.
            </p>
          </div>
          <div className="bg-[#1e2531]/40 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/5 shadow-xl hover:bg-[#1e2531]/60 hover:border-[#12b886]/30 transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#12b886]/10 flex items-center justify-center mb-4 group-hover:bg-[#12b886]/20 transition-colors">
              <BarChart3 className="text-[#12b886]" size={28} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Método LEAD®</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Evalúa tu liderazgo, estructura de roles, alineación de objetivos y hábitos de desempeño.
            </p>
          </div>
          <div className="bg-[#1e2531]/40 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/5 shadow-xl hover:bg-[#1e2531]/60 hover:border-[#12b886]/30 transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#12b886]/10 flex items-center justify-center mb-4 group-hover:bg-[#12b886]/20 transition-colors">
              <CheckCircle className="text-[#12b886]" size={28} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Resultados Medibles.</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Recibe sugerencias concretas para reducir el retrabajo y liberar tu agenda operativa.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}