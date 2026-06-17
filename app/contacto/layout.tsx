/**
 * Layout de la sección de contacto (/contacto).
 * Define los metadatos SEO. Pasa los children sin envolver en contenedores
 * adicionales para que la página controle su propia estructura.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — DELLCOM SAC | Soporte TI en Los Olivos",
  description: "Comuníquese con DELLCOM SAC. Escríbanos o llámenos para obtener cotizaciones de mantenimiento preventivo o licenciamiento en Los Olivos, Lima.",
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
