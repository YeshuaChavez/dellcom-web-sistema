"use client";

import { useState, useEffect, useRef } from "react";
import StatusHeader from "../components/StatusHeader";
import CleanFooter from "../components/CleanFooter";
import ScrollRevealObserver from "../components/ScrollRevealObserver";
import Pagination from "../components/Pagination";
import DownloadFilters from "./components/DownloadFilters";
import DownloadCard from "./components/DownloadCard";
import RemoteSupportCTA from "./components/RemoteSupportCTA";
import { ArchivoTecnico } from "./types";
import { FALLBACK_ARCHIVOS } from "./utils";

const ITEMS_PER_PAGE = 4;

export default function DescargasPage() {
  const [archivos, setArchivos] = useState<ArchivoTecnico[]>(FALLBACK_ARCHIVOS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const downloadsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadArchivos() {
      try {
        const res = await fetch("/api/archivos");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setArchivos(data);
        }
      } catch {
        /* use fallback */
      }
    }
    loadArchivos();
  }, []);

  const filteredArchivos = archivos.filter((a) => {
    const matchesSearch =
      a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.descripcion && a.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType =
      selectedType === "Todos" ||
      (selectedType === "Controladores" && a.tipo === "driver") ||
      (selectedType === "Programas" && a.tipo === "programa") ||
      (selectedType === "Documentos" && a.tipo === "excel") ||
      (selectedType === "Enlaces" && a.tipo === "link");
    return matchesSearch && matchesType;
  });

  const filterKey = `${searchQuery}|${selectedType}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filteredArchivos.length / ITEMS_PER_PAGE));
  const activePage = Math.min(Math.max(currentPage, 1), totalPages);
  const paginatedArchivos = filteredArchivos.slice((activePage - 1) * ITEMS_PER_PAGE, activePage * ITEMS_PER_PAGE);

  const goToPage = (n: number) => {
    setCurrentPage(n);
    downloadsListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between text-on-surface selection:bg-primary/20 selection:text-primary">
      <StatusHeader />

      <main className="pt-16">
        <section className="relative py-16 bg-slate-50/50 overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-center z-10 scroll-reveal">
            <span className="inline-block py-1 px-3.5 mb-4 bg-primary/10 border border-primary/15 text-primary font-bold text-[10px] rounded-full uppercase tracking-widest">
              Soporte y Utilidades
            </span>
            <h1 className="font-headline text-3xl md:text-5xl font-black text-on-surface leading-tight tracking-tight">
              Soporte y <span className="text-primary">Descargas</span>
            </h1>
            <p className="text-xs md:text-sm font-semibold text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
              Accede a nuestro repositorio oficial de utilidades de diagnóstico, plantillas administrativas y controladores autorizados para impresoras Zebra, Epson y equipos corporativos.
            </p>

            <div className="pt-6 max-w-md mx-auto">
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 select-none">search</span>
                <input
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent border-none focus:outline-none text-on-surface text-sm placeholder:text-slate-400 font-semibold"
                  placeholder="Buscar controlador, programa, manual..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="py-16 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop space-y-20">
          <section className="space-y-12">
            <DownloadFilters archivos={archivos} selectedType={selectedType} onSelect={setSelectedType} />

            <div ref={downloadsListRef} className="space-y-4 scroll-reveal">
              {paginatedArchivos.length > 0 ? (
                paginatedArchivos.map((file) => <DownloadCard key={file.id} file={file} />)
              ) : (
                <div className="py-20 text-center text-on-surface-variant font-headline text-base bg-slate-50 border border-slate-200 rounded-[2.5rem]">
                  <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">folder_open</span>
                  No se encontraron recursos técnicos de esta categoría o búsqueda.
                </div>
              )}
            </div>

            <Pagination currentPage={activePage} totalPages={totalPages} onPageChange={goToPage} className="pt-8" />
          </section>

          <RemoteSupportCTA />
        </div>
      </main>

      <CleanFooter />
      <ScrollRevealObserver />
    </div>
  );
}
