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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-slate-100 selection:bg-primary/20 selection:text-primary">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.65] filter brightness-105 contrast-95 saturate-100"
      >
        <source src="/vid/laptop_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Light semi-transparent overlay with glass backdrop blur */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[3px] pointer-events-none z-0"></div>

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12] z-0"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Light Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/5 pointer-events-none z-0"></div>

      {/* Red Glowing Auroras in the background */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-100/50 hover:border-primary/20 transition-all duration-500 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <DellcomLogo className="w-16 h-16 mb-4 hover:scale-105 transition-transform duration-300" />
          <h2 className="font-headline text-2xl font-black text-on-surface tracking-tight">Portal de Gestión Interna</h2>
          <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">DELLCOM SAC</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-4 rounded-xl mb-6 flex items-start gap-2.5 font-semibold">
            <span className="material-symbols-outlined text-base mt-0.5">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Usuario</label>
            <input 
              type="text" 
              required
              disabled={loading}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingresa tu usuario"
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3.5 text-on-surface text-sm transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              disabled={loading}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3.5 text-on-surface text-sm transition-all placeholder:text-slate-400"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-4 px-4 rounded-xl text-sm transition-all active:scale-98 shadow-md shadow-primary/20 flex items-center justify-center gap-2 mt-4 cursor-pointer"
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

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-primary transition-colors font-bold uppercase tracking-wider">
            Volver a la página principal
          </Link>
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
