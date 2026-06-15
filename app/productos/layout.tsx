/**
 * Layout de la sección de catálogo (/productos).
 * Define los metadatos SEO de la sección. No añade estructura visual propia
 * porque la página es un Client Component que gestiona su propio layout.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo — DELLCOM SAC | Productos y Suministros IT",
  description: "Explore nuestro catálogo de ribbons Zebra, tintas originales, discos externos, memorias RAM, periféricos y licencias de software en Los Olivos, Lima.",
};

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
