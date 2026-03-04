import Link from 'next/link';
import { ArrowRight, CheckCircle, Target, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-20 pb-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
          Diagnóstico Estratégico <span className="text-blue-600 dark:text-blue-400">LEAD®</span>
        </h1>
        <p className="text-xl text-slate-700 dark:text-slate-300 mb-10 leading-relaxed font-medium">
          Evalúa la eficiencia de tu sistema de liderazgo actual para identificar
          fugas de productividad y áreas de mejora en los próximos 90 días.
        </p>

        <Link
          href="/diagnostico"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-blue-200"
        >
          Iniciar Diagnóstico
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Objetivos del Test */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
            <Target className="text-blue-600 dark:text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Enfoque</h3>
            <p className="text-slate-700 dark:text-slate-400 font-medium">Identifica si actúas como cuello de botella o como facilitador estratégico.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
            <BarChart3 className="text-blue-600 dark:text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">4 Pilares</h3>
            <p className="text-slate-700 dark:text-slate-400 font-medium">Evaluación profunda en Liderazgo, Estructura, Alineación y Desempeño.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
            <CheckCircle className="text-blue-600 dark:text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Plan de Acción</h3>
            <p className="text-slate-700 dark:text-slate-400 font-medium">Obtén una interpretación clara y sugerencias de mejora inmediata.</p>
          </div>
        </div>
      </section>
    </main>
  );
}