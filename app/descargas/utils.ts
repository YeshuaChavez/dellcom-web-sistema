import { ArchivoTecnico } from "./types";

export const FALLBACK_ARCHIVOS: ArchivoTecnico[] = [
  { id: 1, nombre: "Controlador de Impresora Zebra GK420t", tipo: "driver", url_archivo: "https://www.zebra.com/us/en/support-downloads.html", descripcion: "Controlador oficial certificado de Windows para la impresora térmica Zebra GK420t. Versión de 32/64 bits.", fecha_subida: "2026-05-15T00:00:00.000Z" },
  { id: 2, nombre: "Driver de Impresora de Recibos Epson TM-T20III", tipo: "driver", url_archivo: "https://download.epson-biz.com/?product=tm-t20iii", descripcion: "Epson Advanced Printer Driver (APD) para TM-T20III. Recomendado para integración con sistemas POS.", fecha_subida: "2026-05-10T00:00:00.000Z" },
  { id: 3, nombre: "AnyDesk Control Remoto", tipo: "programa", url_archivo: "https://anydesk.com/download", descripcion: "Herramienta de control remoto portátil y ligera para que nuestro personal técnico te asista de inmediato.", fecha_subida: "2026-05-01T00:00:00.000Z" },
  { id: 4, nombre: "Plantilla Excel de Control de Inventario Dellcom", tipo: "excel", url_archivo: "https://docs.google.com/spreadsheets/", descripcion: "Plantilla diseñada para el registro, conteo y control periódico de stock de suministros e insumos de oficina.", fecha_subida: "2026-04-20T00:00:00.000Z" },
];

export function getFileMetadata(file: ArchivoTecnico) {
  const name = file.nombre.toLowerCase();
  const url = file.url_archivo.toLowerCase();

  if (name.includes("gk420t")) return { tamano: "12.4 MB", compatibilidad: "Windows 10 / 11 (64-bit)", version: "v5.1.16" };
  if (name.includes("tm-t20iii")) return { tamano: "28.1 MB", compatibilidad: "Windows 7 / 8 / 10 / 11", version: "v6.0.4" };
  if (name.includes("anydesk")) return { tamano: "3.8 MB", compatibilidad: "Windows / macOS / Linux", version: "v8.0.10" };
  if (name.includes("inventario")) return { tamano: "1.2 MB", compatibilidad: "Excel / Google Sheets", version: "v2.0" };

  const isPdf = name.endsWith(".pdf") || url.includes(".pdf") || name.includes(" pdf");
  const isExcel = name.endsWith(".xlsx") || name.endsWith(".xls") || url.includes(".xlsx") || url.includes(".xls") || name.includes("excel");
  if (isPdf) return { tamano: "Documento PDF", compatibilidad: "Lector PDF (Acrobat/Navegador)", version: "PDF" };
  if (isExcel) return { tamano: "Libro de Excel", compatibilidad: "Microsoft Excel / Hojas de Cálculo", version: "XLSX" };

  switch (file.tipo) {
    case "programa": return { tamano: "---", compatibilidad: "Windows / macOS", version: "Oficial" };
    case "driver": return { tamano: "---", compatibilidad: "Windows 10 / 11", version: "Oficial" };
    case "excel": return { tamano: "---", compatibilidad: "Hojas de Cálculo", version: "v1.0" };
    case "link": return { tamano: "Enlace", compatibilidad: "Navegador Web", version: "Oficial" };
    default: return { tamano: "---", compatibilidad: "Universal", version: "Oficial" };
  }
}

export function getIconForFile(file: ArchivoTecnico) {
  const name = file.nombre.toLowerCase();
  const url = file.url_archivo.toLowerCase();
  if (name.endsWith(".pdf") || url.includes(".pdf") || name.includes(" pdf")) return "picture_as_pdf";
  switch (file.tipo) {
    case "programa": return "laptop_mac";
    case "driver": return "memory";
    case "excel": return "description";
    case "link": return "link";
    default: return "folder_open";
  }
}

export function getLabelForFile(file: ArchivoTecnico) {
  const name = file.nombre.toLowerCase();
  const url = file.url_archivo.toLowerCase();
  if (name.endsWith(".pdf") || url.includes(".pdf") || name.includes(" pdf")) return "Documento PDF";
  if (name.endsWith(".xlsx") || name.endsWith(".xls") || url.includes(".xlsx") || url.includes(".xls") || name.includes("excel")) return "Libro de Excel";
  switch (file.tipo) {
    case "programa": return "Programa (.exe)";
    case "driver": return "Controlador (Driver)";
    case "excel": return "Documento / Excel";
    case "link": return "Enlace Útil";
    default: return "Archivo";
  }
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}
