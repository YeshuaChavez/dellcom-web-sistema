import { ShoppingBag, X, Trash2, MessageCircle, Plus, Minus, Printer, Network, Cpu, ShieldCheck, Monitor } from "lucide-react";
import { CartItem } from "../types";

function getIconForCategory(name: string) {
  const n = name.toLowerCase();
  if (n.includes("impres") || n.includes("ribbon") || n.includes("tint") || n.includes("suministr")) return Printer;
  if (n.includes("red") || n.includes("connect") || n.includes("router") || n.includes("cable")) return Network;
  if (n.includes("almacen") || n.includes("memor") || n.includes("disco") || n.includes("ssd") || n.includes("ram")) return Cpu;
  if (n.includes("licenc") || n.includes("soft")) return ShieldCheck;
  return Monitor;
}

interface Props {
  cart: CartItem[];
  isCartOpen: boolean;
  isAnimatingCartButton: boolean;
  confirmingClear: boolean;
  cartItemCount: number;
  cartTotal: number;
  whatsAppUrl: string;
  setIsCartOpen: (v: boolean) => void;
  setConfirmingClear: (v: boolean) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  cart, isCartOpen, isAnimatingCartButton, confirmingClear, cartItemCount, cartTotal,
  whatsAppUrl, setIsCartOpen, setConfirmingClear, onUpdateQuantity, onClearCart,
}: Props) {
  return (
    <>
      {cartItemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className={`fixed bottom-24 right-6 z-40 flex items-center gap-3 bg-primary hover:bg-primary/95 text-white px-5 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-none ${isAnimatingCartButton ? "scale-110 animate-pulse" : ""}`}
        >
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
              {cartItemCount}
            </span>
          </div>
          <div className="hidden sm:flex flex-col items-start leading-none text-left">
            <span className="text-[9px] uppercase tracking-wider font-bold opacity-80">Lista de Cotización</span>
            <span className="text-sm font-extrabold mt-0.5">S/ {cartTotal.toFixed(2)}</span>
          </div>
        </button>
      )}

      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div onClick={() => { setIsCartOpen(false); setConfirmingClear(false); }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity" />
        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <div className={`w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-l border-slate-100 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="font-headline text-lg font-bold text-on-surface">Tu Cotización</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mt-1">
                    {cartItemCount} {cartItemCount === 1 ? "artículo" : "artículos"}
                  </p>
                </div>
              </div>
              <button onClick={() => { setIsCartOpen(false); setConfirmingClear(false); }} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer border-none">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
              {cart.length > 0 ? cart.map((item) => {
                const Icon = getIconForCategory(item.categoriaNombre);
                return (
                  <div key={item.id} className="flex gap-4 p-3 bg-slate-50/60 rounded-2xl border border-slate-100 hover:border-slate-200/60 transition-all">
                    <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 p-2 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.imagen_url && !item.imagen_url.includes("placeholder")
                        ? <img src={item.imagen_url.split("||")[0]} alt={item.nombre} className="w-full h-full object-contain" />
                        : <Icon className="w-8 h-8 text-slate-300" />
                      }
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1 leading-snug">{item.nombre}</h4>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{item.categoriaNombre}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-extrabold text-primary">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-primary transition-colors font-bold cursor-pointer border-none bg-transparent">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-[11px] font-bold text-slate-700">{item.cantidad}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-primary transition-colors font-bold cursor-pointer border-none bg-transparent">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-16">
                  <ShoppingBag className="w-16 h-16 text-slate-200 mb-2 mx-auto" />
                  <p className="text-sm font-semibold">Tu lista de cotización está vacía</p>
                  <p className="text-xs text-slate-400 mt-1">Explora nuestro catálogo y añade suministros o licencias.</p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                <div className="flex justify-between items-center text-slate-800 font-bold">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Total Estimado</span>
                  <span className="font-headline text-xl font-extrabold text-slate-900">S/ {cartTotal.toFixed(2)}</span>
                </div>
                {confirmingClear ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-semibold flex-1">¿Vaciar lista?</span>
                    <button onClick={() => setConfirmingClear(false)} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer border-none">No</button>
                    <button onClick={onClearCart} className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-colors cursor-pointer border-none">Sí, vaciar</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-2">
                    <button onClick={() => setConfirmingClear(true)} className="col-span-1 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-500 hover:text-red-500 border border-slate-200 rounded-xl py-3.5 transition-colors cursor-pointer" title="Vaciar Lista">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="col-span-4 flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-primary/10 active:scale-95 cursor-pointer text-center no-underline">
                      <MessageCircle className="w-5 h-5" />
                      Enviar Cotización por WhatsApp
                    </a>
                  </div>
                )}
                <p className="text-[9px] text-slate-400 font-medium text-center leading-relaxed">
                  *Los precios son aproximados y pueden variar según stock y tipo de cambio.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
