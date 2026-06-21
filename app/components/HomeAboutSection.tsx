import Link from "next/link";

const VIDEO_CARDS = [
  { src: "/img/videos/reparacion.mp4", icon: "devices", title: "Reparaciones", desc: "Laptops, impresoras térmicas, láser y matriciales." },
  { src: "/img/videos/soporte_remoto.mp4", icon: "support_agent", title: "Soporte Remoto", desc: "Asistencia técnica remota inmediata vía AnyDesk." },
  { src: "/img/videos/licencias.mp4", icon: "security", title: "Licencias", desc: "Windows, Office, Antivirus certificados." },
  { src: "/img/videos/ribbons_zebra.mp4", icon: "print", title: "Ribbons y Zebra", desc: "Suministros originales de ribbons, tintas y tarjetas Zebra." },
];

export default function HomeAboutSection() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-white border-t border-b border-slate-100" id="nosotros">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="scroll-reveal space-y-6">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">¿Por qué confiar en <span className="text-primary">DELLCOM</span>?</h2>
          <p className="text-sm md:text-base font-semibold text-on-surface-variant leading-relaxed">
            En DELLCOM SAC somos especialistas en brindar soluciones de soporte tecnológico diseñadas para asegurar la continuidad operativa de tu negocio. Nos enfocamos en diagnósticos de alta precisión a nivel de hardware, licenciamiento oficial y suministro de consumibles Zebra.
          </p>
          <p className="text-sm md:text-base font-semibold text-on-surface-variant leading-relaxed">
            Brindamos atención personalizada para empresas, colegios e institutos, con soluciones presenciales y soporte remoto inmediato a nivel nacional, respaldados por personal técnico certificado.
          </p>
          <div className="pt-2">
            <Link href="/nosotros" className="inline-flex items-center gap-2 border-b-2 border-primary text-primary font-bold text-sm hover:text-primary/80 hover:border-primary/80 transition-all pb-1 uppercase tracking-wider">
              Conocer más detalles de soporte
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="scroll-reveal grid grid-cols-2 gap-4 bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm relative overflow-hidden" style={{ transitionDelay: "150ms" }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          {VIDEO_CARDS.map((card) => (
            <div key={card.title} className="group relative p-5 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[140px]">
              <video src={card.src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-primary/92 transition-colors duration-300" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-3 text-primary shadow-sm">
                    <span className="material-symbols-outlined text-xl">{card.icon}</span>
                  </div>
                  <h4 className="font-headline font-bold text-white text-sm">{card.title}</h4>
                  <p className="text-[11px] text-white/80 mt-1 leading-snug font-medium">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
