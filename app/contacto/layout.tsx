import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — DELLCOM SAC | Soporte TI en Los Olivos",
  description: "Comuníquese con DELLCOM SAC. Escríbanos o llámenos para obtener cotizaciones de mantenimiento preventivo, licenciamiento o redes en Los Olivos, Lima.",
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
