export interface ArchivoTecnico {
  id: number;
  id_usuario?: number;
  nombre: string;
  tipo: "programa" | "driver" | "excel" | "link";
  url_archivo: string;
  descripcion: string | null;
  fecha_subida: string;
}
