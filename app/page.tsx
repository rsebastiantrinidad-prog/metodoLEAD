import Link from 'next/link';
import { ArrowRight, CheckCircle, Target, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-20 pb-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
          Diagnóstico Estratégico <span className="text-blue-600">LEAD®</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          Evalúa la eficiencia de tu sistema de liderazgo actual para identificar 
          fugas de productividad y áreas de mejora en los próximos 90 días. [cite: 2]
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
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <Target className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Enfoque</h3>
            <p className="text-slate-600">Identifica si actúas como cuello de botella o como facilitador estratégico. [cite: 4]</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <BarChart3 className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">4 Pilares</h3>
            <p className="text-slate-600">Evaluación profunda en Liderazgo, Estructura, Alineación y Desempeño. [cite: 3, 14, 26, 37]</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <CheckCircle className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Plan de Acción</h3>
            <p className="text-slate-600">Obtén una interpretación clara y sugerencias de mejora inmediata. [cite: 50]</p>
          </div>
        </div>
      </section>
    </main>
  );
}