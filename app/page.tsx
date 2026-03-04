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
    <main className="min-h-screen bg-lead-white dark:bg-slate-950 transition-colors">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-20 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-lead-navy dark:text-white mb-6">
          Diagnóstico Estratégico <span className="text-lead-teal">LEAD®</span>
        </h1>
        <p className="text-xl text-lead-slate dark:text-slate-300 mb-10 leading-relaxed font-medium">
          Evalúa la eficiencia de tu sistema de liderazgo actual para identificar
          fugas de productividad y áreas de mejora en los próximos 90 días.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="text-left">
            <label className="block text-sm font-bold text-lead-navy dark:text-slate-300 mb-1">Nombre Completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-lead-slate/70" />
              </div>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-lead-teal focus:border-lead-teal bg-lead-white dark:bg-slate-800 text-lead-navy dark:text-white"
                placeholder="Ej. Juan Pérez"
              />
            </div>
          </div>
          <div className="text-left">
            <label className="block text-sm font-bold text-lead-navy dark:text-slate-300 mb-1">Email Corporativo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-lead-slate/70" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-lead-teal focus:border-lead-teal bg-lead-white dark:bg-slate-800 text-lead-navy dark:text-white"
                placeholder="juan@empresa.com"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-lead-teal hover:bg-teal-700 disabled:bg-teal-400 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-teal-900/40 mt-4"
          >
            {isSubmitting ? 'Iniciando...' : 'Iniciar Diagnóstico'}
            <ArrowRight size={20} />
          </button>
        </form>
      </section>

      {/* Objetivos del Test */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-lead-teal/30 transition-all">
            <Target className="text-lead-teal mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2 text-lead-navy dark:text-white">Enfoque</h3>
            <p className="text-lead-slate font-medium">Identifica si actúas como cuello de botella o como facilitador estratégico.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-lead-teal/30 transition-all">
            <BarChart3 className="text-lead-teal mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2 text-lead-navy dark:text-white">4 Pilares</h3>
            <p className="text-lead-slate font-medium">Evaluación profunda en Liderazgo, Estructura, Alineación y Desempeño.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-lead-teal/30 transition-all">
            <CheckCircle className="text-lead-teal mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2 text-lead-navy dark:text-white">Plan de Acción</h3>
            <p className="text-lead-slate font-medium">Obtén una interpretación clara y sugerencias de mejora inmediata.</p>
          </div>
        </div>
      </section>
    </main>
  );
}