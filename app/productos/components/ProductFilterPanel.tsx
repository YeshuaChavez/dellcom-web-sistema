import { X, Search } from "lucide-react";
import { Categoria } from "../types";

interface Props {
  categorias: Categoria[];
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  priceLimit: number;
  setPriceLimit: (v: number) => void;
  maxPrice: number;
  getCategoryCount: (name: string) => number;
  isMobile?: boolean;
  onClose?: () => void;
}

export default function ProductFilterPanel({
  categorias, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
  priceLimit, setPriceLimit, maxPrice, getCategoryCount, isMobile = false, onClose,
}: Props) {
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Todos");
    setPriceLimit(maxPrice);
    if (isMobile && onClose) onClose();
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "Todos" || (priceLimit > 0 && priceLimit < maxPrice);

  return (
    <div className="space-y-8">
      <div>
        <h4 className="font-headline font-bold text-xs uppercase text-slate-500 tracking-wider mb-3">Buscar Producto</h4>
        <div className="relative bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          <input
            className="w-full pl-9 pr-8 py-2.5 bg-transparent border-none focus:outline-none text-on-surface text-xs font-semibold placeholder:text-slate-400"
            placeholder="Buscar..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-headline font-bold text-xs uppercase text-slate-500 tracking-wider mb-3">Categorías</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
          {categorias.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.nombre.toLowerCase();
            const count = getCategoryCount(cat.nombre);
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.nombre); if (isMobile && onClose) onClose(); }}
                className={`w-full flex items-center justify-between text-left py-2 px-3 rounded-xl transition-all cursor-pointer border-none text-xs font-semibold ${
                  isSelected ? "bg-primary/5 text-primary" : "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate mr-2">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${isSelected ? "border-primary bg-primary" : "border-slate-300 bg-white"}`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="truncate">{cat.nombre}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all shrink-0 ${isSelected ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {maxPrice > 0 && (
        <div>
          <h4 className="font-headline font-bold text-xs uppercase text-slate-500 tracking-wider mb-2">Filtrar por Precio</h4>
          <div className="space-y-3 pt-2">
            <input
              type="range" min="0" max={maxPrice} value={priceLimit || maxPrice}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              className="w-full accent-primary h-1 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between items-center text-[10px] sm:text-xs">
              <span className="text-slate-500 font-bold">Máx: S/ {maxPrice.toFixed(0)}</span>
              <span className="text-primary font-extrabold bg-primary/5 px-2.5 py-1 rounded-lg">Hasta S/ {(priceLimit || maxPrice).toFixed(0)}</span>
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <button onClick={clearFilters} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none">
          Limpiar Filtros
        </button>
      )}
    </div>
  );
}
