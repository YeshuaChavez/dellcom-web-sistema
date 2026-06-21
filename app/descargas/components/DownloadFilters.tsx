import { ArchivoTecnico } from "../types";

interface Props {
  archivos: ArchivoTecnico[];
  selectedType: string;
  onSelect: (type: string) => void;
}

const CATEGORIES = [
  { id: "Todos", label: "Todos", icon: "folder_open", filter: (_: ArchivoTecnico) => true },
  { id: "Controladores", label: "Drivers", icon: "memory", filter: (a: ArchivoTecnico) => a.tipo === "driver" },
  { id: "Programas", label: "Programas", icon: "laptop_mac", filter: (a: ArchivoTecnico) => a.tipo === "programa" },
  { id: "Documentos", label: "Documentos", icon: "description", filter: (a: ArchivoTecnico) => a.tipo === "excel" },
  { id: "Enlaces", label: "Enlaces", icon: "link", filter: (a: ArchivoTecnico) => a.tipo === "link" },
];

export default function DownloadFilters({ archivos, selectedType, onSelect }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 scroll-reveal">
      {CATEGORIES.map((cat) => {
        const isActive = selectedType === cat.id;
        const count = cat.id === "Todos" ? archivos.length : archivos.filter(cat.filter).length;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
              isActive
                ? "bg-primary border-primary text-white shadow-md shadow-primary/10 -translate-y-0.5"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <span className="material-symbols-outlined text-[18px] leading-none">{cat.icon}</span>
            <span>{cat.label}</span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full leading-none transition-all ${isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
