import Link from "next/link";
import StatusHeader from "../components/StatusHeader";
import CleanFooter from "../components/CleanFooter";
import ScrollRevealObserver from "../components/ScrollRevealObserver";

export const metadata = {
  title: "Nosotros — DELLCOM SAC | Ingeniería IT en Los Olivos, Lima",
  description:
    "Conoce a DELLCOM SAC: más de 10 años brindando soporte técnico, reparación de equipos, cableado estructurado y licencias certificadas en Lima Norte.",
};

export default function NosotrosPage() {
  return (
    <div className="selection:bg-primary/20 selection:text-primary bg-white min-h-screen flex flex-col justify-between text-on-surface">
      <style dangerouslySetInnerHTML={{ __html: `
        .tech-pattern {
          background-image: radial-gradient(#94a3b8 0.5px, transparent 0.5px);
          background-size: 16px 16px;
          opacity: 0.15;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0px 20px 50px rgba(15, 23, 42, 0.04);
        }
      `}} />

      {/* Reusable Status Header */}
      <StatusHeader />

      <main className="flex-1 pt-16">
        {/* Asymmetric Header Banner */}
        <section className="relative py-16 overflow-hidden bg-slate-50/50 border-b border-slate-100">
          <div className="absolute inset-0 tech-pattern pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          
          <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center z-10 scroll-reveal">
            <span className="inline-block py-1 px-3.5 mb-4 bg-slate-100 border border-slate-200/80 text-slate-700 font-bold text-[10px] rounded-full uppercase tracking-widest">
              Nuestra Historia
            </span>
            <h1 className="font-headline text-3xl md:text-5xl font-black text-on-surface leading-tight tracking-tight">
              Sobre <span className="text-primary">Nosotros</span>
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
              Más de 10 años transformando desafíos técnicos en soluciones de vanguardia para la infraestructura IT más exigente del Perú.
            </p>
          </div>
        </section>

        {/* Narrative & Laboratory Showcase */}
        <section className="py-24 bg-white">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group scroll-reveal">
              <div className="absolute -inset-4 bg-slate-50 border border-slate-100 rounded-3xl transition-all group-hover:bg-slate-100/70" />
              <img 
                alt="Sede DELLCOM SAC" 
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover transition-transform duration-700 hover:scale-[1.01]" 
                src="/img/portafolio/WhatsApp Image 2026-06-14 at 9.36.54 PM.jpeg" 
              />
            </div>
            
            <div className="scroll-reveal space-y-6" style={{ transitionDelay: "150ms" }}>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-on-surface relative pb-3">
                Trayectoria Orientada al <span className="text-primary font-bold">Futuro Digital</span>
                <div className="absolute bottom-0 left-0 w-24 h-1 bg-primary rounded-full" />
              </h3>
              <div className="space-y-6 text-sm md:text-base text-on-surface-variant leading-relaxed">
                <p>
                  Nacimos con una visión clara: elevar los estándares de soporte técnico y consultoría IT en el mercado nacional. Lo que comenzó como un taller especializado se transformó rápidamente en un centro neurálgico de ingeniería de precisión.
                </p>
                <p>
                  Hoy, DELLCOM SAC es reconocido como un aliado estratégico líder en infraestructura crítica. Nuestra evolución ha sido impulsada por una obsesión constante con el detalle técnico y un compromiso inquebrantable con la continuidad operativa de nuestros socios corporativos.
                </p>
                <div className="pt-4 flex gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/50 flex-1">
                    <span className="font-headline text-2xl font-bold text-primary block mb-1">2014</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Fundación</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/50 flex-1">
                    <span className="font-headline text-2xl font-bold text-primary block mb-1">Lima</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Sede Central</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="glass-card p-12 rounded-3xl flex flex-col gap-6 group hover:-translate-y-2 transition-all duration-300 scroll-reveal">
              <div className="w-16 h-16 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                <span className="material-symbols-outlined text-[32px]">verified_user</span>
              </div>
              <h4 className="font-headline text-2xl font-bold text-on-surface">Nuestra Misión</h4>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                Garantizar la continuidad operativa de nuestros clientes mediante la implementación de soluciones de infraestructura robustas y soporte técnico de alta precisión, minimizando riesgos y optimizando el rendimiento tecnológico.
              </p>
            </div>
            
            {/* Vision Card */}
            <div className="glass-card p-12 rounded-3xl flex flex-col gap-6 group hover:-translate-y-2 transition-all duration-300 scroll-reveal" style={{ transitionDelay: "150ms" }}>
              <div className="w-16 h-16 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                <span className="material-symbols-outlined text-[32px]">visibility</span>
              </div>
              <h4 className="font-headline text-2xl font-bold text-on-surface">Nuestra Visión</h4>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                Ser el referente nacional en ingeniería de precisión IT, liderando la transformación tecnológica con estándares internacionales de calidad y siendo reconocidos como el socio más confiable para la infraestructura crítica en el Perú.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16 space-y-3 scroll-reveal">
              <span className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200/60 text-slate-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                Pilares del Soporte
              </span>
              <h3 className="font-headline text-3xl font-bold text-on-surface">Nuestros Valores Fundamentales</h3>
              <p className="text-sm text-on-surface-variant max-w-lg mx-auto">
                El ADN que guía cada intervención técnica y decisión estratégica.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {[
                { icon: "handshake", title: "Compromiso", desc: "Dedicación total al éxito y tranquilidad de nuestros clientes." },
                { icon: "biotech", title: "Precisión", desc: "Exactitud técnica rigurosa en cada diagnóstico y reparación." },
                { icon: "lightbulb", title: "Innovación", desc: "Búsqueda constante de soluciones disruptivas y eficientes." },
                { icon: "gavel", title: "Integridad", desc: "Ética profesional y transparencia absoluta en cada proceso." }
              ].map((item, index) => (
                <div 
                  key={item.title} 
                  className="text-center p-8 border-b-2 border-transparent hover:border-primary transition-all duration-300 scroll-reveal"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-6 text-primary hover:scale-110 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm">
                    <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                  </div>
                  <h5 className="font-headline text-lg font-bold text-on-surface mb-2">{item.title}</h5>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section with Crimson Background (Highlight metrics panel) */}
        <section className="py-24 relative bg-primary text-white overflow-hidden scroll-reveal">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
            <div className="tech-pattern h-full w-full" />
          </div>
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 text-center lg:text-left items-center">
              <div>
                <h3 className="font-headline text-3xl font-bold mb-4 text-white">Impacto Medible en la Industria</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Resultados tangibles que respaldan nuestra autoridad técnica y capacidad operativa en todo el país.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
                  <span className="font-headline text-5xl font-extrabold block mb-2 text-white">10+</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">Años de Experiencia</span>
                </div>
                <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
                  <span className="font-headline text-5xl font-extrabold block mb-2 text-white">15k+</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">Reparaciones Exitosas</span>
                </div>
                <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
                  <span className="font-headline text-5xl font-extrabold block mb-2 text-white">99%</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">Satisfacción Cliente</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-margin-mobile text-center scroll-reveal">
            <h3 className="font-headline text-3xl font-bold text-on-surface mb-6">¿Listo para asegurar su infraestructura?</h3>
            <p className="text-sm md:text-base text-on-surface-variant mb-10 max-w-lg mx-auto leading-relaxed">
              Agende una consultoría técnica inicial con nuestros expertos hoy mismo y garantice la continuidad operativa de su empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/51925981741?text=Hola%20Dellcom%20SAC,%20deseo%20agendar%20una%20consultor%C3%ADa%20IT%20para%20mi%20empresa."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-full shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase text-xs tracking-wider"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Contáctanos por WhatsApp
              </a>
              <Link 
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary/5 transition-all uppercase text-xs tracking-wider active:scale-95"
              >
                Ver Portafolio de Servicios
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Reusable Clean Footer */}
      <CleanFooter />

      <ScrollRevealObserver />
    </div>
  );
}
