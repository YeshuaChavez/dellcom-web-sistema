/**
 * Layout de las rutas del panel de administración (/admin/*).
 * Envuelve todas las páginas admin con SessionProvider de NextAuth
 * para exponer la sesión a componentes cliente del panel.
 * Debe ser "use client" porque SessionProvider usa contexto React.
 */
"use client";

import { SessionProvider } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
