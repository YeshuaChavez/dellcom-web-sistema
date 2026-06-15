/**
 * Página de soporte remoto: /soporte
 * Es un Server Component (sin "use client") porque solo renderiza contenido estático
 * más el componente interactivo AnyDeskConsole (que sí es cliente).
 * Secciones: Hero, botones de descarga AnyDesk/RustDesk, videotutorial
 * y la consola de envío de código para iniciar la sesión remota.
 */
import StatusHeader from "../components/StatusHeader";
import CleanFooter from "../components/CleanFooter";
import AnyDeskConsole from "../components/AnyDeskConsole";
import ScrollRevealObserver from "../components/ScrollRevealObserver";

export const metadata = {
  title: "Soporte Remoto AnyDesk — DELLCOM SAC",
  description: "Obtenga asistencia técnica remota en tiempo real de forma segura. Ingrese su código de AnyDesk o RustDesk y mire nuestro videotutorial de instalación.",
};

export default function SoportePage() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between text-on-surface selection:bg-primary/20 selection:text-primary">
      {/* Navigation Header */}
      <StatusHeader />

      {/* Main Container */}
      <main className="pt-24 pb-20 flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop">
        
        {/* Intro Hero Section */}
        <section className="text-center max-w-3xl mx-auto pt-10 pb-16 space-y-6 scroll-reveal">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            Soporte Técnico Digital
          </span>
          <h1 className="font-headline text-4xl md:text-6xl font-black text-on-surface leading-tight tracking-tight">
            Asistencia Remota <br className="hidden md:inline" />
            <span className="text-primary font-extrabold">en Tiempo Real</span>
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-semibold">
            Resolvemos tus inconvenientes de software, licencias, impresoras térmicas y configuración de red al instante. Sigue los dos pasos a continuación para conectarte de forma segura.
          </p>
        </section>

        {/* STEP 1: DOWNLOAD & TUTORIAL VIDEO (Sequential Widescreen Layout) */}
        <section className="py-12 border-t border-slate-100/80 space-y-10 scroll-reveal">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
              1. Descarga e Instalación del Software
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Selecciona tu programa preferido para soporte remoto. Descárgalo de sus servidores oficiales usando los botones de abajo.
            </p>
          </div>

          {/* Centered Download Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a 
              href="https://anydesk.com/download"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/95 text-white py-4 px-8 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-primary/20 flex items-center gap-2.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Descargar AnyDesk
            </a>
            <a 
              href="https://rustdesk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-4 px-8 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 active:scale-95 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Descargar RustDesk
            </a>
          </div>

          {/* Large Cinematic Video Player Centerstage (Widescreen, No Card Border) */}
          <div className="max-w-5xl mx-auto w-full pt-6">
            <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border border-slate-100 transition-all hover:shadow-primary/5 hover:shadow-[0_20px_50px_rgba(255,0,0,0.08)]">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/tYFM7aD-Jr8?si=RQavduMMsg9a8-XM"
                title="Videotutorial de instalación paso a paso de AnyDesk"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">play_circle</span>
              Videotutorial de ayuda: Cómo descargar e instalar AnyDesk en tu computadora
            </p>
          </div>
        </section>

        {/* STEP 2: CONNECTION & CONSOLE (Wide Split Layout) */}
        <section className="py-16 border-t border-slate-100/80 space-y-12 scroll-reveal" style={{ transitionDelay: "100ms" }}>
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
              2. Conexión y Asistencia en Vivo
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Sigue la guía rápida y envíanos tu código de dirección. Nuestro personal técnico iniciará la sesión contigo de inmediato.
            </p>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-5xl mx-auto pt-4">
            
            {/* Left Column: Premium Custom Timeline (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="relative pl-8 border-l-2 border-primary/20 space-y-10 py-2">
                
                {/* Timeline Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-black shadow-md shadow-primary/20">
                    1
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-headline text-base font-bold text-on-surface leading-none">
                      Abrir el Programa Descargado
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Ubica el archivo de AnyDesk o RustDesk en tu carpeta de Descargas e inícialo. No requiere instalación obligatoria para recibir soporte.
                    </p>
                  </div>
                </div>

                {/* Timeline Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-black shadow-md shadow-primary/20">
                    2
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-headline text-base font-bold text-on-surface leading-none">
                      Copiar tu Dirección de Acceso
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      En la pantalla principal de la aplicación, busca el campo que dice <strong className="text-slate-800 font-bold">"Este puesto"</strong> o <strong className="text-slate-800 font-bold">"Tu dirección"</strong>. Verás un código numérico de 9 dígitos.
                    </p>
                  </div>
                </div>

                {/* Timeline Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-black shadow-md shadow-primary/20">
                    3
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-headline text-base font-bold text-on-surface leading-none">
                      Ingresar el Código en la Consola
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Escribe ese número de 9 dígitos en el panel de la derecha y haz clic en el botón para enviarlo a nuestro WhatsApp de soporte técnico.
                    </p>
                  </div>
                </div>

                {/* Timeline Step 4 */}
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-black shadow-md shadow-primary/20">
                    4
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-headline text-base font-bold text-on-surface leading-none">
                      Aceptar la Solicitud de Conexión
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Mantén la aplicación abierta. En unos instantes, verás una ventana emergente en tu pantalla. Haz clic en <strong className="text-primary font-bold">"Aceptar"</strong> o <strong className="text-primary font-bold">"Permitir"</strong> para iniciar el soporte técnico.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Console Component (5 cols) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <AnyDeskConsole />
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <CleanFooter />

      <ScrollRevealObserver />
    </div>
  );
}
