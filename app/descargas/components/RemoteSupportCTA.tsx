const BULLETS = [
  "Instalación de controladores Zebra/Epson",
  "Configuración de red e impresoras de tickets",
  "Saneamiento y optimización de software",
  "Diagnóstico a nivel lógico de Bios",
];

export default function RemoteSupportCTA() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-white border-l-4 border-l-primary border-t border-r border-b border-slate-200/80 text-on-surface rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-sm scroll-reveal">
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-5">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-primary/10 border border-primary/15 text-primary font-bold text-[10px] rounded-full uppercase tracking-widest">
            <span className="material-symbols-outlined text-[14px]">support_agent</span>
            Asistencia Inmediata en Línea
          </span>
          <h2 className="font-headline text-2xl md:text-3xl font-black text-on-surface leading-tight">
            ¿Necesitas soporte técnico <span className="text-primary">remoto en tiempo real</span>?
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-xl leading-relaxed font-semibold">
            Descarga AnyDesk, la herramienta oficial recomendada por nuestro laboratorio. Un ingeniero certificado te guiará y tomará control remoto para solucionar problemas de impresión, atascos o activación de software.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {BULLETS.map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                <span className="material-symbols-outlined text-primary text-[18px] font-bold">check_circle</span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <a
            href="https://anydesk.com/download"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-md shadow-primary/15 hover:scale-[1.03] active:scale-95 cursor-pointer border-none no-underline"
          >
            <span className="material-symbols-outlined text-base">laptop_mac</span>
            Descargar AnyDesk
          </a>
        </div>
      </div>
    </section>
  );
}
