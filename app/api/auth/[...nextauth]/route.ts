import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        usuario: { label: "Usuario", type: "text" },
        contrasena: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.usuario || !credentials?.contrasena) return null;

        const user = await prisma.usuario.findUnique({
          where: { usuario: credentials.usuario }, // ahora busca por usuario, no email
        });

        if (!user || !user.activo) return null; // verifica que esté activo

        const valid = await bcrypt.compare(credentials.contrasena, user.contrasena);
        if (!valid) return null;

        return {
          id: String(user.id),
          name: user.nombre,
          email: user.email,
          role: user.rol,
        };
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
});

export { handler as GET, handler as POST };