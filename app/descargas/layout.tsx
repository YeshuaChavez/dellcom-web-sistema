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
