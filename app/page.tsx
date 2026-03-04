"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Target, BarChart3, Mail, User } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <main className="min-h-screen bg-lead-navy text-lead-slate-light transition-colors selection:bg-lead-teal/20">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-20 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-lead-white mb-6 tracking-tight">
          ¿Eres el cuello de botella de tu propio equipo? <span className="text-lead-teal">LEAD®</span>
        </h1>
        <p className="text-xl text-lead-slate mb-10 leading-relaxed font-medium">
          Mide tu nivel de autonomía y descubre cómo pasar de apagar incendios a liderar con sistema en los próximos 90 días.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-lead-surface p-6 rounded-lg shadow-black/20 shadow-xl border border-slate-700/50 space-y-4">
          <div className="text-left">
            <label className="block text-sm font-bold text-lead-slate-light mb-1">Nombre Completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-lead-slate/70" />
              </div>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-lead-teal focus:border-lead-teal bg-slate-900/50 text-lead-white placeholder-slate-500 transition-colors"
                placeholder="Ej. John D. Maxwell"
              />
            </div>
          </div>
          <div className="text-left">
            <label className="block text-sm font-bold text-lead-slate-light mb-1">Email Corporativo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-lead-slate/70" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-lead-teal focus:border-lead-teal bg-slate-900/50 text-lead-white placeholder-slate-500 transition-colors"
                placeholder="Maxwell@lidership.com"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-lead-teal hover:bg-teal-700 disabled:bg-teal-400 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all shadow-md hover:shadow-lg mt-4"
          >
            {isSubmitting ? 'Iniciando...' : 'Iniciar Diagnóstico'}
            <ArrowRight size={20} />
          </button>
        </form>
      </section>

      {/* Objetivos del Test */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-lead-surface p-8 rounded-lg border border-slate-700/50 shadow-black/10 shadow-lg hover:border-lead-teal/40 transition-colors">
            <Target className="text-lead-teal mb-4" size={28} />
            <h3 className="text-lg font-bold mb-2 text-lead-white">Enfoque</h3>
            <p className="text-lead-slate font-medium text-sm leading-relaxed">Identifica si actúas como cuello de botella o como facilitador estratégico.</p>
          </div>
          <div className="bg-lead-surface p-8 rounded-lg border border-slate-700/50 shadow-black/10 shadow-lg hover:border-lead-teal/40 transition-colors">
            <BarChart3 className="text-lead-teal mb-4" size={28} />
            <h3 className="text-lg font-bold mb-2 text-lead-white">4 Pilares</h3>
            <p className="text-lead-slate font-medium text-sm leading-relaxed">Evaluación profunda en Liderazgo, Estructura, Alineación y Desempeño.</p>
          </div>
          <div className="bg-lead-surface p-8 rounded-lg border border-slate-700/50 shadow-black/10 shadow-lg hover:border-lead-teal/40 transition-colors">
            <CheckCircle className="text-lead-teal mb-4" size={28} />
            <h3 className="text-lg font-bold mb-2 text-lead-white">Plan de Acción</h3>
            <p className="text-lead-slate font-medium text-sm leading-relaxed">Obtén una interpretación clara y sugerencias de mejora inmediata.</p>
          </div>
        </div>
      </section>
    </main>
  );
}