/**
 * Página de login del panel de administración: /admin/login
 * Usa signIn("credentials") de NextAuth con redirect:false para manejar
 * errores sin recargar la página. En caso de éxito redirige al dashboard.
 * Incluye video de fondo y el logo SVG de DELLCOM renderizado en línea.
 */
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function DellcomLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#ff0000" strokeWidth="3" fill="none" opacity="0.85" />
      <circle cx="50" cy="50" r="43" fill="#000000" />
      <path 
        d="M 48 20 C 40 20, 36 24, 36 28 C 30 28, 27 33, 29 39 C 24 41, 23 48, 26 53 C 21 57, 21 64, 25 68 C 23 74, 28 80, 35 80 C 38 80, 42 78, 44 76 C 46 78, 48 80, 48 80 Z" 
        stroke="#ffffff" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
      <path 
        d="M 48 32 C 40 32, 38 38, 44 42 C 34 46, 38 56, 44 56 C 36 60, 40 70, 48 70" 
        stroke="#ffffff" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
      <line x1="50" y1="18" x2="50" y2="82" stroke="#ff0000" strokeWidth="2.5" strokeDasharray="3 3" />
      <path 
        d="M 52 24 L 66 24 L 66 32 M 52 38 L 74 38 L 74 46 M 52 50 L 64 50 L 72 58 M 52 64 L 72 64 M 52 74 L 64 74 L 64 68" 
        stroke="#ff0000" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
      <circle cx="66" cy="32" r="3" fill="#ff0000" />
      <circle cx="74" cy="46" r="3" fill="#ff0000" />
      <circle cx="72" cy="58" r="3" fill="#ff0000" />
      <circle cx="72" cy="64" r="3" fill="#ff0000" />
      <circle cx="64" cy="68" r="3" fill="#ff0000" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        usuario,
        contrasena,
        redirect: false,
      });

      if (res?.error) {
        setError("Usuario o contraseña incorrectos o cuenta inactiva.");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Ocurrió un error inesperado al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 selection:bg-primary/20 selection:text-primary">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Red Glowing Auroras in the background */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Split-column login card matching the requested aesthetics */}
      <div className="w-full max-w-4xl bg-white border border-slate-200/80 rounded-[2.5rem] shadow-2xl shadow-slate-100/50 flex flex-col md:flex-row min-h-[550px] relative z-10 overflow-hidden">
        
        {/* Left Column: Visual Panel (Slight video opacity, brand info, light/modern gradient) */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-slate-50 border-r border-slate-200/50">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.25] filter brightness-105 contrast-95 saturate-100"
          >
            <source src="/vid/laptop_video.mp4" type="video/mp4" />
          </video>

          {/* Grid Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
            style={{
              backgroundImage: "radial-gradient(#94a3b8 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px"
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 pointer-events-none z-0"></div>

          {/* Logo header */}
          <div className="relative z-10 flex items-center gap-3">
            <DellcomLogo className="w-10 h-10 hover:scale-105 transition-transform duration-300" />
            <div>
              <span className="font-headline text-sm font-black text-on-surface block leading-none">DELLCOM</span>
              <span className="text-[9px] font-bold text-primary uppercase tracking-widest block mt-0.5 leading-none">IT Engineering</span>
            </div>
          </div>

          {/* Core Text block overlay */}
          <div className="relative z-10 space-y-4 my-auto">
            <span className="inline-block py-1 px-3 bg-primary/10 border border-primary/15 text-primary font-bold text-[9px] rounded-full uppercase tracking-widest">
              Gestión Interna
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-black text-on-surface leading-tight">
              ¡Hola <span className="text-primary">Técnico</span>! 👋
            </h2>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-semibold max-w-sm">
              Accede a tu cuenta para gestionar licencias de software, monitorear consultas de soporte técnico y actualizar los recursos de la comunidad.
            </p>
          </div>

          {/* Footer copyright */}
          <div className="relative z-10">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              © 2026 DELLCOM SAC. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Right Column: Form Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between min-h-[500px]">
          
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="flex flex-col items-center md:items-start md:hidden mb-6">
            <DellcomLogo className="w-12 h-12 mb-3" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">DELLCOM SAC</span>
          </div>

          {/* Title block */}
          <div className="space-y-2 mt-4">
            <h3 className="font-headline text-2xl font-black text-on-surface tracking-tight">
              Bienvenido de vuelta
            </h3>
            <p className="text-xs text-on-surface-variant font-semibold">
              Ingresa tus credenciales para acceder al panel de administración.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-4 rounded-xl mt-4 flex items-start gap-2.5 font-semibold animate-fade-in">
              <span className="material-symbols-outlined text-base mt-0.5">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Minimalist Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Usuario
              </label>
              <input 
                type="text" 
                required
                disabled={loading}
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="w-full bg-transparent border-b border-slate-200 focus:border-primary focus:outline-none px-0 py-2.5 text-on-surface text-sm transition-all placeholder:text-slate-300 font-semibold"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Contraseña
              </label>
              <input 
                type="password" 
                required
                disabled={loading}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-slate-200 focus:border-primary focus:outline-none px-0 py-2.5 text-on-surface text-sm transition-all placeholder:text-slate-300 font-semibold"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all active:scale-98 shadow-md shadow-primary/10 flex items-center justify-center gap-2 mt-4 cursor-pointer border-none"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">login</span>
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="mt-8 text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-primary transition-colors font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Volver a Inicio
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper mock Next.js Link replacement if next/link is not loaded or for custom bundling
import NextLink from "next/link";
function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}
