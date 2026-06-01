"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ArchivoTecnico {
  id: number;
  nombre: string;
  tipo: "programa" | "driver" | "excel" | "link";
  url_archivo: string;
  descripcion: string | null;
  fecha_subida: string;
}

// Inline Dellcom SVG Logo
function DellcomLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#dc2626" strokeWidth="3" fill="none" opacity="0.85" />
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
      <line x1="50" y1="18" x2="50" y2="82" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="3 3" />
      <path 
        d="M 52 24 L 66 24 L 66 32 M 52 38 L 74 38 L 74 46 M 52 50 L 64 50 L 72 58 M 52 64 L 72 64 M 52 74 L 64 74 L 64 68" 
        stroke="#dc2626" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
      <circle cx="66" cy="32" r="3" fill="#dc2626" />
      <circle cx="74" cy="46" r="3" fill="#dc2626" />
      <circle cx="72" cy="58" r="3" fill="#dc2626" />
      <circle cx="72" cy="64" r="3" fill="#dc2626" />
      <circle cx="64" cy="68" r="3" fill="#dc2626" />
    </svg>
  );
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
          const data = await res.json();
          if (data && data.length > 0) {
            setArchivos(data);
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
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between text-on-surface">
      
      {/* Header / Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300" id="main-header">
        <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <DellcomLogo className="w-10 h-10 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg text-on-surface leading-none tracking-tight">DELLCOM SAC</span>
              <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Tu centro de confianza</span>
            </div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold" href="/">Inicio</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold" href="/productos">Catálogo</Link>
            <Link className="text-primary font-bold border-b-2 border-primary pb-0.5 text-sm font-semibold" href="/descargas">Descargas</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold" href="/#servicios">Servicios</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold" href="/#nosotros">Nosotros</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold" href="/#contacto">Contacto</Link>
            
            {/* Admin Login Link */}
            <Link 
              href="/admin/login"
              className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold"
            >
              Acceso Técnico
            </Link>
            
            {/* AnyDesk Support CTA Link */}
            <a 
              href="https://anydesk.com/download"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/95 text-on-primary px-6 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all active:scale-95 shadow-md shadow-primary/20 uppercase"
            >
              Soporte AnyDesk
            </a>
          </nav>
          
          {/* Mobile Menu Icon */}
          <div className="flex items-center gap-4 md:hidden">
            <button className="text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Downloads View Container */}
      <main className="pt-24 pb-20 flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop">
        
        {/* Title and Search Bar */}
        <header className="mb-10 text-center md:text-left space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[16px]">download</span>
                Centro de Descargas Técnicas
              </div>
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
                Drivers y <span className="text-primary">Programas</span>
              </h2>
            </div>
          </div>

          <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Descarga de forma segura y directa los controladores oficiales de tus impresoras térmicas, manuales de usuario, utilitarios de configuración y programas de asistencia.
          </p>

          <div className="relative max-w-2xl bg-white rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden mt-4">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-transparent focus:outline-none text-on-surface font-body-md text-sm placeholder:text-slate-400"
              placeholder="Buscar controlador, programa, manual..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Dynamic Category Navigation Tabs */}
        <section className="mb-8">
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-3">
            {["Todos", "Controladores", "Programas", "Documentos", "Enlaces"].map((tab) => (
              <button 
                key={tab}
                className={`px-5 py-2.5 rounded-full font-headline text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap border ${
                  selectedType === tab
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                    : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-slate-50"
                }`}
                onClick={() => setSelectedType(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Dynamic Downloads Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArchivos.length > 0 ? (
            filteredArchivos.map((file) => (
              <article 
                key={file.id} 
                className="bg-white p-6 rounded-2xl border border-outline-variant/30 hover:shadow-lg transition-all duration-300 flex gap-4 items-start"
              >
                <div className="p-3.5 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">
                    {getIconForType(file.tipo)}
                  </span>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                      {getLabelForType(file.tipo)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
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
            <div className="col-span-full py-20 text-center text-on-surface-variant font-headline text-base bg-white border border-outline-variant/30 rounded-3xl">
              <span className="material-symbols-outlined text-5xl text-outline-variant/50 mb-3 block">folder_open</span>
              No se encontraron recursos técnicos de esta categoría o búsqueda.
            </div>
          )}
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-surface-container-lowest py-16 border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <DellcomLogo className="w-8 h-8" />
              <span className="font-headline font-bold text-lg text-on-surface tracking-tight">DELLCOM SAC</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Ingeniería IT y microelectrónica de vanguardia en Lima Norte. Garantizando operatividad con precisión técnica.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/51987654321" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">smartphone</span>
              </a>
              <a 
                href="https://www.dellcom.pe" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">public</span>
              </a>
            </div>
          </div>
          
          {/* Services Column */}
          <div>
            <h4 className="font-headline font-bold text-xs text-on-surface uppercase tracking-wider mb-6">Servicios</h4>
            <ul className="space-y-4">
              <li><Link className="text-sm text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 inline-block" href="/#servicios">Reparación de Hardware</Link></li>
              <li><Link className="text-sm text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 inline-block" href="/#servicios">Soporte Corporativo</Link></li>
              <li><Link className="text-sm text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 inline-block" href="/#servicios">Microelectrónica</Link></li>
              <li><Link className="text-sm text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 inline-block" href="/#servicios">Licencias Originales</Link></li>
            </ul>
          </div>
          
          {/* Company Info Column */}
          <div>
            <h4 className="font-headline font-bold text-xs text-on-surface uppercase tracking-wider mb-6">Compañía</h4>
            <ul className="space-y-4">
              <li><Link className="text-sm text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 inline-block" href="/#nosotros">Sobre Nosotros</Link></li>
              <li><Link className="text-sm text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 inline-block" href="/#servicios">Casos de Éxito</Link></li>
              <li><Link className="text-sm text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 inline-block" href="/productos">Nuestro Catálogo</Link></li>
              <li><Link className="text-sm text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 inline-block" href="/descargas">Descargas y Drivers</Link></li>
              <li><Link className="text-sm text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 inline-block" href="/admin/login">Portal Interno</Link></li>
            </ul>
          </div>
          
          {/* Contact Info Column */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-xs text-on-surface uppercase tracking-wider mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                <span className="text-sm text-on-surface-variant">Av. Santa Elvira, Mza. E, Lote 59, Urb. San Elías, Los Olivos, Lima.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                <span className="text-sm text-on-surface-variant">+51 987 654 321</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                <span className="text-sm text-on-surface-variant">soporte@dellcom.pe</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-outline-variant/20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant">
            © 2026 DELLCOM SAC. Precision IT Engineering. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link className="text-xs text-on-surface-variant hover:text-primary" href="/#">Términos</Link>
            <Link className="text-xs text-on-surface-variant hover:text-primary" href="/#">Privacidad</Link>
            <Link className="text-xs text-on-surface-variant hover:text-primary" href="/admin/login">Panel Técnico</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
