/**
 * API Route catch-all de NextAuth.js: /api/auth/[...nextauth]
 * Maneja automáticamente todos los endpoints de autenticación:
 *   GET/POST /api/auth/signin, /signout, /session, /csrf, /callback, etc.
 * La configuración real está en lib/auth.ts (authOptions).
 */
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };