import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        usuario: { label: "Usuario", type: "text" },
        contrasena: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        console.log("[Auth] Authorize called with credentials:", {
          usuario: credentials?.usuario,
          hasContrasena: !!credentials?.contrasena,
        });

        if (!credentials?.usuario || !credentials?.contrasena) {
          console.log("[Auth] Missing usuario or contrasena");
          return null;
        }

        try {
          const user = await prisma.usuario.findUnique({
            where: { usuario: credentials.usuario },
          });

          console.log("[Auth] User lookup result:", user ? { id: user.id, usuario: user.usuario, activo: user.activo } : "Not found");

          if (!user || !user.activo) {
            console.log("[Auth] User not found or inactive");
            return null;
          }

          const valid = await bcrypt.compare(credentials.contrasena, user.contrasena);
          console.log("[Auth] Bcrypt compare valid:", valid);
          
          if (!valid) {
            console.log("[Auth] Invalid password");
            return null;
          }

          console.log("[Auth] Login successful for:", user.usuario);
          return {
            id: String(user.id),
            name: user.nombre,
            email: user.email,
            role: user.rol,
          };
        } catch (error) {
          console.error("[Auth] Database connection or query error during authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
