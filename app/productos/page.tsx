"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string | number;
  imagen_url: string;
  categoria: {
    nombre: string;
  };
}

interface Categoria {
  id: number;
  nombre: string;
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

// Fallback products and categories data (matches user HTML exactly)
const FALLBACK_PRODUCTS: Producto[] = [
  {
    id: 1,
    nombre: "Ribbon Negro Premium",
    descripcion: "Suministro de alta calidad para impresión térmica duradera y nítida. Ideal para etiquetado comercial.",
    precio: 85.00,
    imagen_url: "https://lh3.googleusercontent.com/aida/ADBb0ug9NXHXsYG5EZPXrgF_OCCgc0qelmQNHMdJe4DB63SZIl2WDlYqM924tqb-KjQWRkW0MdoBdkawPdG6UjGuHarZHVBWSSjJOAdOQrdNJrj1jOl4nZ9jEuS5CdRcD7ya4FhDxhnCjtGurcmVEGkNrmIRja-hyxuAC0FVCdb7D7kkALhwz2YiifHTdEKgALV9bi2BmH2q-5fxf-E0rBf_Ox0za7Uyk4HhmvG_qyfWTS9ngpMsqHGfe7uvlObO",
    categoria: { nombre: "Ribbons" }
  },
  {
    id: 2,
    nombre: "Disco Externo 1TB",
    descripcion: "Almacenamiento portátil de alta velocidad con acabado mate premium y conexión USB 3.2.",
    precio: 240.00,
    imagen_url: "https://lh3.googleusercontent.com/aida/ADBb0uhm6Coe85eU97cELiaqr1GeAfg8SmOGT2fz5jwHwoGIDu1EkFpICu230z3VyZMPhEjtfUy_pBtoWtKlIvqaEyHV2-9yIq5kTXPounwT_YOsAjlbzYym7_7e86SxOWxdrkO2cEf_RWNOVdo2_vRn4ADj9ObKqC6MgZ0LKgR_lWnbFzeeogG2YQZqyZXYqIgWf6gk8hqWB6dBrci4wSAtGEmBffLGIuaf3bG1ZwBbJHdYdl2QrZ9mm9ESJvA",
    categoria: { nombre: "Memorias" }
  },
  {
    id: 3,
    nombre: "Tarjetas ZEBRA PVC",
    descripcion: "Paquete de tarjetas de PVC de alta durabilidad para identificación, credenciales y control de acceso.",
    precio: 120.00,
    imagen_url: "https://lh3.googleusercontent.com/aida/ADBb0uhMS22wEnK6pxFD94oWVj_8JJHUuB_kT3i6sHxTKtCPWXQ1rex6_46pzsG3NhUlt_fY5dsMgS_UDdkF5FM8fZIV7NnCTNo9UECpcnbWFhrLS-FK2T84s5FYTEL0vsU4vySgpZ-vBA40jNc6lbxNiRO0fR__FIidcl7Uk9kWAJVg1umeXO5YoKnvRuXK5OdeTnrlhdWrPwHkox59lBDuc676nb0nFXrF1pqhiw5Hl_TMhfZ_FEjVpsPZ-WNi",
    categoria: { nombre: "Tarjetas" }
  }
];

const FALLBACK_CATEGORIES: Categoria[] = [
  { id: 1, nombre: "Todos" },
  { id: 2, nombre: "Ribbons" },
  { id: 3, nombre: "Memorias" },
  { id: 4, nombre: "Tarjetas" },
  { id: 5, nombre: "Licencias" }
];

export default function CatalogoPage() {
  const [productos, setProductos] = useState<Producto[]>(FALLBACK_PRODUCTS);
  const [categorias, setCategorias] = useState<Categoria[]>(FALLBACK_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const prodRes = await fetch("/api/productos");
        const catRes = await fetch("/api/categorias");
        
        if (prodRes.ok && catRes.ok) {
          const prodData = await prodRes.json();
          const catData = await catRes.json();
          
          if (prodData && prodData.length > 0) {
            setProductos(prodData);
          }
          if (catData && catData.length > 0) {
            const formattedCats = [{ id: 0, nombre: "Todos" }, ...catData];
            setCategorias(formattedCats);
          }
        }
      } catch (err) {
        console.warn("Error fetching data from API, using static fallbacks.", err);
      }
    }
    loadData();
  }, []);

  // Filter products by search query and category tab
  const filteredProducts = productos.filter((p) => {
    const matchesSearch = 
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "Todos" || 
      p.categoria.nombre.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Handle WhatsApp quote click (registers virtual item counter)
  const handleQuoteClick = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-on-background">
      {/* Navigation TopAppBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 glass-header border-b border-outline-variant/30 h-16 flex items-center justify-between px-margin-mobile md:px-margin-desktop shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-black/5 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
          <div className="flex items-center gap-2">
            <DellcomLogo className="w-8 h-8" />
            <h1 className="font-headline font-bold text-lg text-on-surface leading-none tracking-tight">DELLCOM SAC</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            aria-label="Shopping Cart" 
            className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => alert(`Has cotizado ${cartCount} producto(s) por WhatsApp.`)}
          >
            <span className="material-symbols-outlined text-on-surface">shopping_cart</span>
            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </nav>

      {/* Navigation Drawer (Desktop Sidebar Placeholder) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-20 flex-col pt-24 items-center gap-6 border-r border-outline-variant/30 bg-white z-40">
        <Link href="/" className="w-12 h-12 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined">home</span>
        </Link>
        <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">grid_view</span>
        </button>
        <Link href="/admin/login" className="w-12 h-12 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined">lock</span>
        </Link>
        <div className="mt-auto mb-8">
          <a 
            href="https://wa.me/51987654321?text=Hola%20Dellcom%20SAC,%20deseo%20solicitar%20asistencia."
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined">support_agent</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pt-24 pb-32 px-margin-mobile md:px-margin-desktop lg:pl-28 max-w-container-max mx-auto">
        
        {/* Hero Search Section */}
        <header className="mb-8">
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface mb-4 tracking-tight">
            Catálogo de <span className="text-primary">Tecnología</span>
          </h2>
          <div className="relative max-w-2xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-white border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-body-md rounded-xl shadow-sm text-sm"
              placeholder="Buscar ribbons, memorias, tarjetas, licencias..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Dynamic Filter Tabs */}
        <section className="mb-10 overflow-hidden">
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
            {categorias.map((cat) => (
              <button 
                key={cat.id}
                className={`px-6 py-2.5 rounded-full font-headline text-sm font-semibold transition-all whitespace-nowrap border ${
                  selectedCategory.toLowerCase() === cat.nombre.toLowerCase()
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/25"
                    : "bg-white border-outline-variant/40 text-on-surface-variant hover:bg-slate-50"
                }`}
                onClick={() => setSelectedCategory(cat.nombre)}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod) => (
              <article 
                key={prod.id} 
                className="bg-white rounded-2xl overflow-hidden border border-outline-variant/30 hover:shadow-soft transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Product Image Area */}
                <div className="aspect-square overflow-hidden bg-slate-50/50 p-8 flex items-center justify-center border-b border-outline-variant/10">
                  <img 
                    alt={prod.nombre} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 max-h-[220px]" 
                    src={prod.imagen_url}
                  />
                </div>
                
                {/* Product Details Area */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                      {prod.categoria.nombre}
                    </span>
                    <h3 className="font-headline text-xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">
                      {prod.nombre}
                    </h3>
                    <p className="text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
                      {prod.descripcion}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <p className="font-headline text-lg font-extrabold text-primary">
                      S/ {Number(prod.precio).toFixed(2)}
                    </p>
                    <a 
                      onClick={handleQuoteClick}
                      className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md shadow-primary/20 cursor-pointer" 
                      href={`https://wa.me/51987654321?text=Hola%20Dellcom%20SAC,%20deseo%20cotizar%20el%20producto%20${encodeURIComponent(prod.nombre)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-on-surface-variant font-headline text-base">
              <span className="material-symbols-outlined text-5xl text-outline-variant/50 mb-3 block">inventory_2</span>
              No se encontraron productos en esta categoría o búsqueda.
            </div>
          )}
        </section>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full z-50 bg-white/95 backdrop-blur-md border-t border-outline-variant/30 flex justify-around items-center h-16 md:hidden shadow-lg">
        <Link href="/" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-semibold mt-0.5">Inicio</span>
        </Link>
        <button className="flex flex-col items-center justify-center text-primary">
          <span className="material-symbols-outlined fill-1">grid_view</span>
          <span className="text-[10px] font-bold mt-0.5">Catálogo</span>
        </button>
        <a 
          href="https://wa.me/51987654321?text=Hola%20Dellcom%20SAC,%20deseo%20solicitar%20soporte%20remoto."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">support_agent</span>
          <span className="text-[10px] font-semibold mt-0.5">Soporte</span>
        </a>
        <Link href="/admin/login" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">lock</span>
          <span className="text-[10px] font-semibold mt-0.5">Admin</span>
        </Link>
      </nav>
    </div>
  );
}
