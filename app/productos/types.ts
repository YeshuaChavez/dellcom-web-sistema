export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string | number;
  imagen_url: string;
  categoria: { nombre: string };
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen_url: string;
  categoriaNombre: string;
}
