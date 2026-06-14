import type { NextConfig } from "next";

// Asegurar que NEXTAUTH_URL siempre sea una URL valida durante la compilacion
// para evitar fallos de prerenderizado (TypeError: Invalid URL) en entornos de CI (como GitHub Actions)
if (!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.trim() === "") {
  process.env.NEXTAUTH_URL = "http://localhost:3000";
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
