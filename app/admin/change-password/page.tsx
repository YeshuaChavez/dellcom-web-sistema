"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

const rules = [
  { label: "Mínimo 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Al menos una mayúscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Al menos una minúscula", test: (p: string) => /[a-z]/.test(p) },
  { label: "Al menos un número", test: (p: string) => /\d/.test(p) },
  { label: "Al menos un símbolo (@, #, !, etc.)", test: (p: string) => /[^a-zA-Z\d]/.test(p) },
];

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const allRulesMet = rules.every((r) => r.test(newPassword));
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRulesMet) {
      setErrorMsg("La contraseña no cumple todos los requisitos.");
      setStatus("error");
      return;
    }
    if (!passwordsMatch) {
      setErrorMsg("Las contraseñas no coinciden.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/password/change-first", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error ?? "Ocurrió un error.");
        setStatus("error");
        return;
      }

      setStatus("done");
      // Sign out so the new JWT (without mustChangePassword) is issued on next login
      setTimeout(() => signOut({ callbackUrl: "/admin/login?changed=1" }), 2000);
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 md:p-10 space-y-6">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-amber-500 text-2xl">key</span>
            </div>
            <h1 className="font-headline text-2xl font-extrabold text-slate-800 tracking-tight">
              Establece tu contraseña
            </h1>
            <p className="text-sm text-slate-400 font-semibold leading-relaxed">
              Es tu primer ingreso. Crea una contraseña personal segura para continuar.
            </p>
          </div>

          {status === "done" ? (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center space-y-2">
              <span className="material-symbols-outlined text-green-500 text-3xl">check_circle</span>
              <p className="text-sm font-bold text-green-700">¡Contraseña guardada!</p>
              <p className="text-xs text-green-600 font-semibold">Redirigiendo al inicio de sesión...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-3.5 rounded-xl flex items-start gap-2 font-semibold">
                  <span className="material-symbols-outlined text-base mt-0.5 shrink-0">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* New password */}
              <div className="flex flex-col">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Nueva contraseña
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-xl focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/40 transition-all px-4 py-3">
                  <span className="material-symbols-outlined text-slate-400 mr-3 text-lg leading-none">lock</span>
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    disabled={status === "loading"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Tu nueva contraseña"
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-slate-800 text-sm font-semibold placeholder:text-slate-400/80"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="text-slate-400 hover:text-slate-600 transition-colors ml-2 flex items-center focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-lg leading-none">
                      {showNew ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Password rules */}
              {newPassword.length > 0 && (
                <ul className="space-y-1.5 px-1">
                  {rules.map((rule) => {
                    const ok = rule.test(newPassword);
                    return (
                      <li key={rule.label} className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-base leading-none ${ok ? "text-green-500" : "text-slate-300"}`}>
                          {ok ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <span className={`text-xs font-semibold ${ok ? "text-green-600" : "text-slate-400"}`}>
                          {rule.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Confirm password */}
              <div className="flex flex-col">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Confirmar contraseña
                </label>
                <div className={`relative flex items-center bg-slate-50 border rounded-xl focus-within:ring-1 transition-all px-4 py-3 ${
                  confirmPassword.length > 0
                    ? passwordsMatch
                      ? "border-green-300 focus-within:border-green-400 focus-within:ring-green-300"
                      : "border-red-200 focus-within:border-red-400 focus-within:ring-red-200"
                    : "border-slate-100 focus-within:border-primary/40 focus-within:ring-primary/40"
                }`}>
                  <span className="material-symbols-outlined text-slate-400 mr-3 text-lg leading-none">lock_clock</span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    disabled={status === "loading"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite la contraseña"
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-slate-800 text-sm font-semibold placeholder:text-slate-400/80"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-slate-400 hover:text-slate-600 transition-colors ml-2 flex items-center focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-lg leading-none">
                      {showConfirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading" || !allRulesMet || !passwordsMatch}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-full text-sm transition-all active:scale-[0.98] shadow-md shadow-primary/10 flex items-center justify-center gap-2 border-none cursor-pointer"
              >
                {status === "loading" ? (
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg leading-none">save</span>
                    Guardar contraseña
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
