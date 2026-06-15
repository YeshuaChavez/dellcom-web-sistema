/**
 * Layout de la sección de descargas (/descargas).
 * Define los metadatos SEO para la página de repositorio de archivos técnicos
 * y la guía de descarga de AnyDesk/RustDesk.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descargas y Soporte Remoto — DELLCOM SAC",
  description: "Descargue AnyDesk o RustDesk para recibir soporte técnico remoto inmediato. Conéctese con nuestro taller en Los Olivos, Lima.",
};

export default function DescargasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
