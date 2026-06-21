import { ArchivoTecnico } from "../types";
import { getFileMetadata, getIconForFile, getLabelForFile, formatDate } from "../utils";

interface Props {
  file: ArchivoTecnico;
}

function getBadgeStyles(file: ArchivoTecnico) {
  const name = file.nombre.toLowerCase();
  const url = file.url_archivo.toLowerCase();
  const isPdf = name.endsWith(".pdf") || url.includes(".pdf") || name.includes(" pdf");
  const isExcel = name.endsWith(".xlsx") || name.endsWith(".xls") || url.includes(".xlsx") || url.includes(".xls") || name.includes("excel");

  if (isPdf) return { bg: "bg-red-50/50 border-red-100 text-red-600 group-hover:bg-red-50", label: "PDF" };
  if (isExcel) return { bg: "bg-emerald-50/50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-50", label: "XLSX" };
  if (file.tipo === "driver") return { bg: "bg-blue-50/50 border-blue-100 text-blue-600 group-hover:bg-blue-50", label: "DRV" };
  if (file.tipo === "programa") return { bg: "bg-emerald-50/50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-50", label: "EXE" };
  if (file.tipo === "excel") return { bg: "bg-teal-50/50 border-teal-100 text-teal-600 group-hover:bg-teal-50", label: "XLS" };
  return { bg: "bg-slate-50/50 border-slate-200/60 text-slate-600 group-hover:bg-slate-50", label: "LINK" };
}

export default function DownloadCard({ file }: Props) {
  const meta = getFileMetadata(file);
  const badge = getBadgeStyles(file);
  const isFeatured = file.nombre.toLowerCase().includes("anydesk") || file.nombre.toLowerCase().includes("zebra");

  return (
    <div className="relative bg-white border border-slate-200/80 hover:border-slate-300/80 hover:shadow-xl rounded-[2.5rem] p-6 md:p-8 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group overflow-hidden">
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-l-[2.5rem]" />

      <div className="flex items-start md:items-center gap-6 flex-1 min-w-0">
        <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm border transition-colors duration-300 ${badge.bg}`}>
          <span className="material-symbols-outlined text-2xl leading-none">{getIconForFile(file)}</span>
          <span className="text-[9px] font-extrabold uppercase tracking-wider mt-1 block leading-none">{badge.label}</span>
        </div>

        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">
              {getLabelForFile(file)}
            </span>
            {meta.version && (
              <span className="text-[9px] bg-slate-50 border border-slate-200/60 text-slate-500 font-extrabold px-2 py-0.5 rounded leading-none">
                {meta.version}
              </span>
            )}
            {isFeatured && (
              <span className="text-[9px] bg-primary/10 text-primary border border-primary/15 font-extrabold px-2 py-0.5 rounded-full leading-none uppercase tracking-wider">
                Destacado
              </span>
            )}
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide leading-none">
              • Subido {formatDate(file.fecha_subida)}
            </span>
          </div>

          <h3 className="font-headline text-base md:text-xl font-black text-on-surface tracking-tight truncate leading-snug group-hover:text-primary transition-colors">
            {file.nombre}
          </h3>

          <p className="text-xs text-on-surface-variant font-semibold leading-relaxed line-clamp-2">
            {file.descripcion || "Recurso oficial provisto por el equipo técnico de DELLCOM SAC."}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-1 text-[11px] text-slate-400 font-bold uppercase">
            {meta.tamano !== "---" && (
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">database</span>
                {meta.tamano}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
              {meta.compatibilidad}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
        <a
          href={file.url_archivo}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-2xl transition-all duration-300 active:scale-95 shadow-md shadow-primary/10 cursor-pointer border-none no-underline group/btn"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-y-0.5">
            {file.tipo === "link" ? "open_in_new" : "download"}
          </span>
          {file.tipo === "link" ? "Abrir Enlace" : "Descargar"}
        </a>
      </div>
    </div>
  );
}
