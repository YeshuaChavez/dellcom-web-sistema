"use client";

import { useState } from "react";
import StatusHeader from "../components/StatusHeader";
import CleanFooter from "../components/CleanFooter";
import ScrollRevealObserver from "../components/ScrollRevealObserver";
import ContactForm from "./components/ContactForm";
import ContactSidebar from "./components/ContactSidebar";

export default function ContactoPage() {
  const [selectedBranch, setSelectedBranch] = useState<"olivos" | "santa_anita">("olivos");
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [asunto, setAsunto] = useState("Soporte Técnico");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrors({});
    setErrorMessage("");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo: email, telefono: telefono || null, asunto, mensaje }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        else setErrorMessage(data.error || "Ocurrio un error al enviar el mensaje.");
        return;
      }

      setSuccess(true);
      setNombre(""); setEmpresa(""); setAsunto("Soporte Técnico");
      setTelefono(""); setEmail(""); setMensaje("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Error de conexion con el servidor. Intentelo mas tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between text-on-surface selection:bg-primary/20 selection:text-primary">
      <StatusHeader />

      <main className="pt-16">
        <section className="relative py-16 bg-slate-50/50 overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-center z-10 scroll-reveal">
            <span className="inline-block py-1 px-3.5 mb-4 bg-primary/10 border border-primary/15 text-primary font-bold text-[10px] rounded-full uppercase tracking-widest">
              Hablemos hoy mismo
            </span>
            <h1 className="font-headline text-3xl md:text-5xl font-black text-on-surface leading-tight tracking-tight">
              Estamos Listos para <span className="text-primary">Ayudarte</span>
            </h1>
            <p className="text-xs md:text-sm font-semibold text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
              Completa la carta de contacto a continuación para describir tu solicitud técnica. Nos comunicaremos contigo el mismo día.
            </p>
          </div>
        </section>

        <div className="py-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <ContactForm
              nombre={nombre} setNombre={setNombre}
              empresa={empresa} setEmpresa={setEmpresa}
              asunto={asunto} setAsunto={setAsunto}
              telefono={telefono} setTelefono={setTelefono}
              email={email} setEmail={setEmail}
              mensaje={mensaje} setMensaje={setMensaje}
              loading={loading} success={success}
              errors={errors} errorMessage={errorMessage}
              onSubmit={handleSubmit}
            />
            <ContactSidebar selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} />
          </div>
        </div>
      </main>

      <CleanFooter />
      <ScrollRevealObserver />
    </div>
  );
}
