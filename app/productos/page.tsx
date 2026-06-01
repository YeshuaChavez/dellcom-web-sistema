"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatusHeader from "../components/StatusHeader";
import CleanFooter from "../components/CleanFooter";
import ScrollRevealObserver from "../components/ScrollRevealObserver";

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

// Custom Component for Product Images with dynamic fallback icons
function ProductImage({ src, alt, categoryName }: { src?: string; alt: string; categoryName: string }) {
  const [error, setError] = useState(false);

  // Helper to determine the best material icon based on category name
  const getIconForCategory = (cat: string) => {
    const name = cat.toLowerCase();
    if (name.includes("impres") || name.includes("ribbon") || name.includes("tint") || name.includes("suministr")) return "print";
    if (name.includes("red") || name.includes("connect") || name.includes("router") || name.includes("cable")) return "router";
    if (name.includes("almacen") || name.includes("memor") || name.includes("disco") || name.includes("ssd") || name.includes("ram")) return "memory";
    if (name.includes("accesorio") || name.includes("mouse") || name.includes("teclad")) return "keyboard";
    if (name.includes("licenc") || name.includes("soft")) return "verified_user";
    return "devices";
  };

  const iconName = getIconForCategory(categoryName);

  if (error || !src || src.includes("placeholder.png")) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100/60 text-slate-400 select-none p-4 min-h-[200px]">
        <span className="material-symbols-outlined text-[56px] text-slate-300 mb-2 group-hover:scale-110 group-hover:text-primary transition-all duration-300">
          {iconName}
        </span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Dellcom Stock</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-105 transition-transform duration-500 max-h-[200px]"
      onError={() => setError(true)}
    />
  );
}

const fallbackCategories = [
  { id: 0, nombre: "Todos" },
  { id: 1, nombre: "Ribbons y Tintas" },
  { id: 2, nombre: "Memorias y Discos" },
  { id: 3, nombre: "Redes y Conectividad" },
  { id: 4, nombre: "Periféricos y Accesorios" },
  { id: 5, nombre: "Licencias de Software" }
];

const fallbackProducts: Producto[] = [
  {
    id: 1,
    nombre: "Disco SSD Kingston A400 480GB SATA",
    descripcion: "Unidad de estado sólido SATA III de 2.5 pulgadas. Increíble velocidad de lectura (hasta 500MB/s) y escritura (450MB/s) para repotenciar laptops y PCs de escritorio.",
    precio: 180.00,
    imagen_url: "/img/productos/ssd-480gb.jpg",
    categoria: { nombre: "Memorias y Discos" }
  },
  {
    id: 2,
    nombre: "Disco Duro Externo Adata HD330 1TB",
    descripcion: "Disco duro externo resistente a impactos y caídas con carcasa de silicona amortiguadora. Conexión USB 3.2 rápida y cifrado seguro AES de 256 bits.",
    precio: 245.00,
    imagen_url: "/img/productos/disco-externo-1tb.jpg",
    categoria: { nombre: "Memorias y Discos" }
  },
  {
    id: 3,
    nombre: "Memoria RAM Kingston Valueram 8GB DDR4 3200MHz",
    descripcion: "Memoria RAM DDR4 de alto rendimiento y bajo consumo energético. Ideal para repotenciar laptops y mejorar la capacidad multitarea.",
    precio: 120.00,
    imagen_url: "/img/productos/ram-8gb-ddr4.jpg",
    categoria: { nombre: "Memorias y Discos" }
  },
  {
    id: 4,
    nombre: "Cinta Ribbon Zebra YMCKO 800300-350LA",
    descripcion: "Cinta ribbon de color original YMCKO de alto rendimiento para impresoras de tarjetas Zebra ZC100 y ZC300. Produce hasta 350 impresiones de alta definición.",
    precio: 290.00,
    imagen_url: "/img/productos/ribbon-zebra-800300-350la.jpg",
    categoria: { nombre: "Ribbons y Tintas" }
  },
  {
    id: 5,
    nombre: "Ribbon de Cera Zebra 110mm x 74m",
    descripcion: "Rollo de cinta ribbon de cera de alta calidad para impresoras térmicas industriales y de escritorio. Transferencia térmica nítida en etiquetas de papel.",
    precio: 25.00,
    imagen_url: "/img/productos/ribbon-cera.jpg",
    categoria: { nombre: "Ribbons y Tintas" }
  },
  {
    id: 6,
    nombre: "Tinta HP 664 Negra Original",
    descripcion: "Cartucho de tinta negra original HP 664. Diseñado para imprimir con calidad profesional constante, evitando impresiones borrosas o fallas.",
    precio: 65.00,
    imagen_url: "/img/productos/tinta-hp-664.jpg",
    categoria: { nombre: "Ribbons y Tintas" }
  },
  {
    id: 7,
    nombre: "Etiquetas Térmicas Directas 102x152mm",
    descripcion: "Rollo de etiquetas térmicas autoadhesivas de alta adherencia. Ideales para despacho de mercadería, Courier, y rotulado de cajas (500 etiquetas).",
    precio: 45.00,
    imagen_url: "/img/productos/etiquetas-termicas.jpg",
    categoria: { nombre: "Ribbons y Tintas" }
  },
  {
    id: 8,
    nombre: "Router Inalámbrico TP-Link TL-WR840N N300",
    descripcion: "Router de banda única de 2.4GHz a 300Mbps. Cuenta con 4 puertos LAN de 10/100Mbps y 2 antenas fijas de alto alcance. Modos router, repetidor y access point.",
    precio: 75.00,
    imagen_url: "/img/productos/router-tplink.jpg",
    categoria: { nombre: "Redes y Conectividad" }
  },
  {
    id: 9,
    nombre: "Cable de Red Cat6 UTP Dixon 100% Cobre (Caja 305m)",
    descripcion: "Caja de cable UTP categoría 6 Dixon de cobre puro. Excelente rendimiento de transmisión Gigabit, conductor multifilar ideal para tendido estructurado.",
    precio: 480.00,
    imagen_url: "/img/productos/cable-cat6.jpg",
    categoria: { nombre: "Redes y Conectividad" }
  },
  {
    id: 10,
    nombre: "Adaptador USB 3.0 a Ethernet RJ45 Gigabit TP-Link",
    descripcion: "Adaptador de red portátil USB a RJ45 hembra. Proporciona conectividad a internet de alta velocidad de hasta 1000Mbps para laptops sin puerto ethernet.",
    precio: 65.00,
    imagen_url: "/img/productos/adaptador-usb-ethernet.jpg",
    categoria: { nombre: "Redes y Conectividad" }
  },
  {
    id: 11,
    nombre: "Mouse Inalámbrico Logitech M170",
    descripcion: "Mouse inalámbrico de 2.4GHz ergonómico y ambidiestro. Receptor USB plug and play con alcance de hasta 10 metros y batería de larga duración.",
    precio: 45.00,
    imagen_url: "/img/productos/mouse-logitech.jpg",
    categoria: { nombre: "Periféricos y Accesorios" }
  },
  {
    id: 12,
    nombre: "Teclado Logitech K120 USB",
    descripcion: "Teclado cableado estándar USB resistente a salpicaduras. Teclas silenciosas, perfil plano y patas ajustables para una escritura cómoda.",
    precio: 38.00,
    imagen_url: "/img/productos/teclado-logitech.jpg",
    categoria: { nombre: "Periféricos y Accesorios" }
  },
  {
    id: 13,
    nombre: "Mousepad Ergonómico con Apoya Muñeca de Gel",
    descripcion: "Mousepad con diseño ergonómico de base antideslizante. Relleno de gel suave que reduce la tensión en la muñeca durante largas jornadas.",
    precio: 25.00,
    imagen_url: "/img/productos/mousepad.jpg",
    categoria: { nombre: "Periféricos y Accesorios" }
  },
  {
    id: 14,
    nombre: "Licencia Windows 11 Pro Retail 64-bit",
    descripcion: "Clave de activación digital original Retail de Windows 11 Professional. Activación permanente en un equipo, vinculable a cuenta Microsoft.",
    precio: 120.00,
    imagen_url: "", // No image, uses fallback verified_user icon
    categoria: { nombre: "Licencias de Software" }
  },
  {
    id: 15,
    nombre: "Licencia Office 2021 Professional Plus",
    descripcion: "Clave digital original de activación de la suite Office 2021 Professional Plus. Incluye Word, Excel, PowerPoint y Outlook. Licencia permanente.",
    precio: 280.00,
    imagen_url: "",
    categoria: { nombre: "Licencias de Software" }
  }
];

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories & products from DB APIs
  useEffect(() => {
    async function loadData() {
      try {
        const prodRes = await fetch("/api/productos");
        const catRes = await fetch("/api/categorias");
        
        let prods = [];
        let cats = [];

        if (prodRes.ok) {
          try {
            prods = await prodRes.json();
          } catch (e) {
            console.warn("Failed to parse products API response as JSON.", e);
          }
        }
        if (catRes.ok) {
          try {
            cats = await catRes.json();
          } catch (e) {
            console.warn("Failed to parse categories API response as JSON.", e);
          }
        }

        if (!Array.isArray(prods) || prods.length === 0) {
          prods = fallbackProducts;
        }
        if (!Array.isArray(cats) || cats.length === 0) {
          cats = fallbackCategories;
        } else {
          cats = [{ id: 0, nombre: "Todos" }, ...cats];
        }

        setProductos(prods);
        setCategorias(cats);
      } catch (err) {
        console.error("Error fetching product data from Next API. Using static fallbacks.", err);
        setProductos(fallbackProducts);
        setCategorias(fallbackCategories);
      }
    }
    loadData();
  }, []);

  // Filter products by query search and selected tab
  const filteredProducts = productos.filter((p) => {
    const matchesSearch = 
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === "Todos" || 
      (p.categoria && p.categoria.nombre.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });



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
              Catálogo Virtual 2026
            </span>
            <h1 className="font-headline text-3xl md:text-5xl font-black text-on-surface leading-tight tracking-tight">
              Nuestros <span className="text-primary">Productos</span>
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
              Explora nuestra selección de suministros originales Zebra, repuestos de hardware, y licenciamiento de software oficial.
            </p>
          </div>
        </section>

        {/* Main Catalog Content Container */}
        <div className="py-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop space-y-12">
          {/* Search box (Centered) */}
          <div className="relative max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all mb-8">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 select-none">search</span>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:outline-none text-on-surface font-body-md text-sm placeholder:text-slate-400 font-semibold"
              placeholder="Buscar por nombre, marca o especificación..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

        {/* Dynamic Category Navigation Tabs */}
        <section className="mb-8">
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-3">
            {categorias.map((cat) => (
              <button 
                key={cat.id}
                className={`px-5 py-2 rounded-full font-headline text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap border cursor-pointer select-none ${
                  selectedCategory.toLowerCase() === cat.nombre.toLowerCase()
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
                onClick={() => setSelectedCategory(cat.nombre)}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </section>

        {/* Dynamic Products Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod) => (
              <article 
                key={prod.id} 
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Product Image Container with Fallbacks */}
                <div className="aspect-square bg-slate-50/50 p-6 flex items-center justify-center border-b border-slate-100 relative overflow-hidden select-none">
                  <ProductImage 
                    src={prod.imagen_url} 
                    alt={prod.nombre} 
                    categoryName={prod.categoria?.nombre || "General"} 
                  />
                </div>
                
                {/* Product Details Section */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      {prod.categoria?.nombre || "General"}
                    </span>
                    <h3 className="font-headline text-base font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {prod.nombre}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                      {prod.descripcion || "Consúltanos especificaciones, disponibilidad y compatibilidad de este producto."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">Precio Aprox.</span>
                      <span className="font-headline text-lg font-extrabold text-primary mt-1">
                        S/ {Number(prod.precio).toFixed(2)}
                      </span>
                    </div>
                    <a 
                      className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all active:scale-95 shadow-md shadow-primary/10 cursor-pointer" 
                      href={`https://wa.me/51987654321?text=Hola%20Dellcom%20SAC,%20deseo%20cotizar%20el%20producto%20${encodeURIComponent(prod.nombre)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      Cotizar
                    </a>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-on-surface-variant font-headline text-base bg-slate-50 border border-slate-200 rounded-3xl">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">inventory_2</span>
              No se encontraron productos en esta categoría o búsqueda.
            </div>
          )}
        </section>
      </div>
    </main>

      {/* Reusable Clean Footer */}
      <CleanFooter />

      <ScrollRevealObserver />
    </div>
  );
}
