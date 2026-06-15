/**
 * Layout raíz de la aplicación.
 * Se aplica a todas las rutas públicas y del panel.
 * Carga las fuentes Outfit (tipografía principal) y Material Symbols (íconos).
 * El SmartAssistant se monta globalmente pero se oculta solo en /admin.
 */
import type { Metadata } from "next";
import "./globals.css";
import SmartAssistant from "./components/SmartAssistant";

export const metadata: Metadata = {
  title: "DELLCOM SAC | Tu centro de confianza",
  description: "Servicios tecnológicos y soporte de TI de alto nivel en Los Olivos, Lima. Reparación, redes, licencias y microelectrónica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-background antialiased selection:bg-primary/20">
        {children}
        <SmartAssistant />
      </body>
    </html>
  );
}

