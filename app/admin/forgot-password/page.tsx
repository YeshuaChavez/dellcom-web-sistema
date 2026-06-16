"use client";

import { useState } from "react";
import NextLink from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error ?? "Ocurrió un error.");
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch {
      setErrorMsg("No se pudo conectar. Intenta de nuevo.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 md:p-10 space-y-6">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-2xl">lock_reset</span>
            </div>
            <h1 className="font-headline text-2xl font-extrabold text-slate-800 tracking-tight">
              Restablecer contraseña
            </h1>
            <p className="text-sm text-slate-400 font-semibold leading-relaxed">
              Ingresa tu correo y te enviaremos un enlace para crear una nueva contraseña.
            </p>
          </div>

          {status === "done" ? (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center space-y-3">
              <span className="material-symbols-outlined text-green-500 text-3xl">mark_email_read</span>
              <p className="text-sm font-bold text-green-700">
                ¡Correo enviado!
              </p>
              <p className="text-xs text-green-600 font-semibold leading-relaxed">
                Si existe una cuenta con ese correo, recibirás un enlace en los próximos minutos. Revisa también tu carpeta de spam.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-3.5 rounded-xl flex items-start gap-2 font-semibold">
                  <span className="material-symbols-outlined text-base mt-0.5 shrink-0">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex flex-col">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Correo electrónico
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-xl focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/40 transition-all px-4 py-3">
                  <span className="material-symbols-outlined text-slate-400 mr-3 text-lg leading-none">mail</span>
                  <input
                    type="email"
                    required
                    disabled={status === "loading"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-slate-800 text-sm font-semibold placeholder:text-slate-400/80"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-full text-sm transition-all active:scale-[0.98] shadow-md shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                {status === "loading" ? (
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg leading-none">send</span>
                    Enviar enlace
                  </>
                )}
              </button>
            </form>
          )}

          {/* Back Link */}
          <div className="text-center pt-2">
            <NextLink
              href="/admin/login"
              className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm leading-none">arrow_back</span>
              Volver al inicio de sesión
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
