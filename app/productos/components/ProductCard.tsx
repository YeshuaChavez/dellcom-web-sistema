import { Eye, ShoppingCart, Plus, Minus } from "lucide-react";
import { Producto, CartItem } from "../types";
import ProductImage from "./ProductImage";

interface Props {
  prod: Producto;
  cartItem: CartItem | undefined;
  onOpenDetails: () => void;
  onAddToCart: () => void;
  onUpdateQuantity: (delta: number) => void;
}

export default function ProductCard({ prod, cartItem, onOpenDetails, onAddToCart, onUpdateQuantity }: Props) {
  return (
    <article className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between relative">
      <span className="absolute top-4 right-4 bg-primary/10 text-primary border border-primary/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full z-10">
        Original
      </span>

      <div
        onClick={onOpenDetails}
        className="aspect-square bg-slate-50/40 p-4 flex items-center justify-center border-b border-slate-100/80 relative overflow-hidden select-none cursor-pointer group/img"
      >
        <ProductImage src={prod.imagen_url?.split("||")[0]} alt={prod.nombre} categoryName={prod.categoria?.nombre || "General"} />
        <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[0.5px]">
          <div className="bg-white/95 backdrop-blur-[2px] shadow-sm border border-slate-200/50 text-slate-800 text-[10px] font-bold uppercase tracking-wider py-2 px-3 rounded-xl flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            Vista Rápida
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            {prod.categoria?.nombre || "General"}
          </span>
          <h3
            onClick={onOpenDetails}
            className="font-headline text-sm md:text-base font-bold text-on-surface line-clamp-2 hover:text-primary transition-colors leading-snug cursor-pointer"
          >
            {prod.nombre}
          </h3>
          <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed font-semibold">
            {prod.descripcion || "Consúltanos especificaciones, disponibilidad y compatibilidad de este producto."}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">Precio Aprox.</span>
            <span className="font-headline text-base font-extrabold text-primary leading-none mt-1">
              S/ {Number(prod.precio).toFixed(2)}
            </span>
          </div>

          {cartItem ? (
            <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200/60 p-0.5">
              <button onClick={() => onUpdateQuantity(-1)} className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-primary active:scale-90 transition-all font-bold cursor-pointer border-none bg-transparent">
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-bold text-slate-800">{cartItem.cantidad}</span>
              <button onClick={() => onUpdateQuantity(1)} className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-primary active:scale-90 transition-all font-bold cursor-pointer border-none bg-transparent">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAddToCart}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all active:scale-95 shadow-md shadow-primary/10 cursor-pointer select-none border-none"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Añadir
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
