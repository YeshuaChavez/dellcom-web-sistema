"use client";

import { useState } from "react";
import { Printer, Network, Cpu, ShieldCheck, Monitor } from "lucide-react";

function getIconForCategory(cat: string) {
  const name = cat.toLowerCase();
  if (name.includes("impres") || name.includes("ribbon") || name.includes("tint") || name.includes("suministr")) return Printer;
  if (name.includes("red") || name.includes("connect") || name.includes("router") || name.includes("cable")) return Network;
  if (name.includes("almacen") || name.includes("memor") || name.includes("disco") || name.includes("ssd") || name.includes("ram")) return Cpu;
  if (name.includes("licenc") || name.includes("soft")) return ShieldCheck;
  return Monitor;
}

interface Props {
  src?: string;
  alt: string;
  categoryName: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProductImage({ src, alt, categoryName, className = "max-h-[220px]", style }: Props) {
  const [error, setError] = useState(false);
  const IconComponent = getIconForCategory(categoryName);

  if (error || !src || src.includes("placeholder.png")) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100/60 text-slate-400 select-none p-4 min-h-[200px]">
        <IconComponent className="w-14 h-14 text-slate-300 mb-2 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Dellcom Stock</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-105 transition-all duration-500 ${className}`}
      style={style}
      onError={() => setError(true)}
    />
  );
}

export { getIconForCategory };
