"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

function DellcomLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#ff0000" strokeWidth="3" fill="none" opacity="0.85" />
      <circle cx="50" cy="50" r="43" fill="#000000" />
      <path d="M 48 20 C 40 20, 36 24, 36 28 C 30 28, 27 33, 29 39 C 24 41, 23 48, 26 53 C 21 57, 21 64, 25 68 C 23 74, 28 80, 35 80 C 38 80, 42 78, 44 76 C 46 78, 48 80, 48 80 Z" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 48 32 C 40 32, 38 38, 44 42 C 34 46, 38 56, 44 56 C 36 60, 40 70, 48 70" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="50" y1="18" x2="50" y2="82" stroke="#ff0000" strokeWidth="2.5" strokeDasharray="3 3" />
      <path d="M 52 24 L 66 24 L 66 32 M 52 38 L 74 38 L 74 46 M 52 50 L 64 50 L 72 58 M 52 64 L 72 64 M 52 74 L 64 74 L 64 68" stroke="#ff0000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="66" cy="32" r="3" fill="#ff0000" />
      <circle cx="74" cy="46" r="3" fill="#ff0000" />
      <circle cx="72" cy="58" r="3" fill="#ff0000" />
      <circle cx="72" cy="64" r="3" fill="#ff0000" />
      <circle cx="64" cy="68" r="3" fill="#ff0000" />
    </svg>
  );
}

export default function StatusHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Catálogo" },
    { href: "/servicios", label: "Servicios" },
    { href: "/descargas", label: "Descargas" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" }
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300" id="main-header">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <DellcomLogo className="w-10 h-10 transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-headline font-bold text-lg text-on-surface leading-none tracking-tight">DELLCOM SAC</span>
            <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Tu centro de confianza</span>
          </div>
        </Link>



        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 items-center shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors text-sm ${
                isActive(link.href)
                  ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                  : "text-on-surface-variant hover:text-primary font-semibold"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <span className="h-4 w-px bg-slate-200" />

          {/* Admin Access */}
          <Link
            href="/admin/login"
            className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold"
          >
            Acceso Técnico
          </Link>

          {/* Support CTA Button */}
          <a
            href="/soporte"
            className="bg-primary hover:bg-primary/95 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all active:scale-95 shadow-md shadow-primary/20 uppercase"
          >
            Soporte AnyDesk
          </a>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-on-surface hover:text-primary transition-colors focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg px-6 py-6 animate-fade-in-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 block ${
                  isActive(link.href)
                    ? "text-primary font-bold border-l-2 border-primary pl-2"
                    : "text-on-surface-variant font-semibold"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-slate-100 my-2" />
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant font-semibold text-sm py-2 block"
            >
              Acceso Técnico
            </Link>
            <a
              href="/soporte"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-white text-center py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-primary/10 mt-2 block"
            >
              Soporte AnyDesk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
