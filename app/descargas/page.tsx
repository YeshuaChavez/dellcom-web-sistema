/**
 * Página de descargas: /descargas
 * Muestra el repositorio de archivos técnicos (drivers, programas, Excel, links).
 * Carga los archivos desde /api/archivos y usa FALLBACK_ARCHIVOS si la API falla.
 * Permite filtrar por tipo (Todos/Programa/Driver/Excel/Link) y buscar por nombre.
 * Los archivos de tipo "link" abren en nueva pestaña; los demás descargan directamente.
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatusHeader from "../components/StatusHeader";
import CleanFooter from "../components/CleanFooter";
import ScrollRevealObserver from "../components/ScrollRevealObserver";

interface ArchivoTecnico {
  id: number;
  nombre: string;
  tipo: "programa" | "driver" | "excel" | "link";
  url_archivo: string;
  descripcion: string | null;
  fecha_subida: string;
}

const FALLBACK_ARCHIVOS: ArchivoTecnico[] = [
  {
    id: 1,
    nombre: "Controlador de Impresora Zebra GK420t",
    tipo: "driver",
    url_archivo: "https://www.zebra.com/us/en/support-downloads.html",
    descripcion: "Controlador oficial certificado de Windows para la impresora térmica Zebra GK420t. Versión de 32/64 bits.",
    fecha_subida: "2026-05-15T00:00:00.000Z"
  },
  {
    id: 2,
    nombre: "Driver de Impresora de Recibos Epson TM-T20III",
    tipo: "driver",
    url_archivo: "https://download.epson-biz.com/?product=tm-t20iii",
    descripcion: "Epson Advanced Printer Driver (APD) para TM-T20III. Recomendado para integración con sistemas POS.",
    fecha_subida: "2026-05-10T00:00:00.000Z"
  },
  {
    id: 3,
    nombre: "AnyDesk Control Remoto",
    tipo: "programa",
    url_archivo: "https://anydesk.com/download",
    descripcion: "Herramienta de control remoto portátil y ligera para que nuestro personal técnico te asista de inmediato.",
    fecha_subida: "2026-05-01T00:00:00.000Z"
  },
  {
    id: 4,
    nombre: "Plantilla Excel de Control de Inventario Dellcom",
    tipo: "excel",
    url_archivo: "https://docs.google.com/spreadsheets/",
    descripcion: "Plantilla diseñada para el registro, conteo y control periódico de stock de suministros e insumos de oficina.",
    fecha_subida: "2026-04-20T00:00:00.000Z"
  }
];

export default function DescargasPage() {
  const [archivos, setArchivos] = useState<ArchivoTecnico[]>(FALLBACK_ARCHIVOS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Todos");

  useEffect(() => {
    async function loadArchivos() {
      try {
        const res = await fetch("/api/archivos");
        if (res.ok) {
          try {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setArchivos(data);
            }
          } catch (e) {
            console.warn("Failed to parse files API response as JSON.", e);
          }
        }
      } catch (err) {
        console.warn("Error fetching files from API, using static fallbacks.", err);
      }
    }
    loadArchivos();
  }, []);

  // Filter archives by search input & type
  const filteredArchivos = archivos.filter((a) => {
    const matchesSearch = 
      a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.descripcion && a.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = 
      selectedType === "Todos" ||
      (selectedType === "Programas" && a.tipo === "programa") ||
      (selectedType === "Controladores" && a.tipo === "driver") ||
      (selectedType === "Documentos" && a.tipo === "excel") ||
      (selectedType === "Enlaces" && a.tipo === "link");

    return matchesSearch && matchesType;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case "programa": return "laptop_mac";
      case "driver": return "memory";
      case "excel": return "description";
      case "link": return "link";
      default: return "folder_open";
    }
  };

  const getLabelForType = (type: string) => {
    switch (type) {
      case "programa": return "Programa (.exe)";
      case "driver": return "Controlador (Driver)";
      case "excel": return "Documento / Excel";
      case "link": return "Enlace Útil";
      default: return "Archivo";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between text-on-surface selection:bg-primary/20 selection:text-primary">
      {/* Reusable Status Header */}
      <StatusHeader />

      <main className="pt-16">
        {/* Asymmetric Header Banner */}
        <section className="relative py-16 bg-slate-50/50 overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          
          <div className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-center z-10 scroll-reveal">
            <span className="inline-block py-1 px-3.5 mb-4 bg-primary/10 border border-primary/15 text-primary font-bold text-[10px] rounded-full uppercase tracking-widest">
              Repositorio Oficial
            </span>
            <h1 className="font-headline text-3xl md:text-5xl font-black text-on-surface leading-tight tracking-tight">
              Drivers y <span className="text-primary">Recursos Técnicos</span>
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
              Descarga controladores autorizados, manuales de configuración para impresoras Zebra o Epson y utilidades oficiales provistas por el equipo técnico de DELLCOM SAC.
            </p>
          </div>
        </section>

        {/* Main Downloads View Container */}
        <div className="py-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop space-y-16">

        {/* Resources Search Section */}
        <section className="space-y-8 scroll-reveal" style={{ transitionDelay: "100ms" }}>
          {/* Search Box (Centered) */}
          <div className="relative max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 select-none">search</span>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:outline-none text-on-surface font-body-md text-sm placeholder:text-slate-400 font-semibold"
              placeholder="Buscar controlador, programa, manual..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs (Centered) */}
          <div className="flex flex-wrap justify-center gap-3 pb-3">
            {["Todos", "Controladores", "Programas", "Documentos", "Enlaces"].map((tab) => (
              <button 
                key={tab}
                className={`px-5 py-2.5 rounded-full font-headline text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap border cursor-pointer select-none ${
                  selectedType === tab
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
                onClick={() => setSelectedType(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid of files */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArchivos.length > 0 ? (
              filteredArchivos.map((file) => (
                <article 
                  key={file.id} 
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex gap-4 items-start"
                >
                  <div className="p-3.5 bg-slate-50 border border-slate-200/60 text-primary rounded-2xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[28px]">
                      {getIconForType(file.tipo)}
                    </span>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                        {getLabelForType(file.tipo)}
                      </span>
                      <span suppressHydrationWarning className="text-[10px] text-slate-400 font-semibold">
                        Subido el {formatDate(file.fecha_subida)}
                      </span>
                    </div>
                    
                    <h3 className="font-headline text-base font-bold text-on-surface tracking-tight leading-snug">
                      {file.nombre}
                    </h3>
                    
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {file.descripcion || "Recurso oficial provisto por el equipo técnico de DELLCOM SAC."}
                    </p>
                    
                    <div className="pt-2">
                      <a 
                        href={file.url_archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md shadow-primary/10 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">download</span>
                        Descargar Recurso
                      </a>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-on-surface-variant font-headline text-base bg-slate-50 border border-slate-200 rounded-3xl">
                <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">folder_open</span>
                No se encontraron recursos técnicos de esta categoría o búsqueda.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>

      {/* Reusable Clean Footer */}
      <CleanFooter />

      <ScrollRevealObserver />
    </div>
  );
}
