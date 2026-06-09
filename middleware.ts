import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("TOKEN:", req.nextauth.token);

    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const method = req.method;

    if (!token) {
      console.log("NO TOKEN");
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const esAdmin = token.role === "admin";
    const esEscritura = ["POST", "PUT", "DELETE"].includes(method);

    if (
      (path.startsWith("/api/licencias") ||
        path.startsWith("/api/archivos")) &&
      !esAdmin &&
      esEscritura
    ) {
      return NextResponse.json(
        { error: "No tienes permisos para esta acción" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        const method = req.method;

        const isPublicGetApi =
          (path.startsWith("/api/productos") ||
            path.startsWith("/api/servicios") ||
            path.startsWith("/api/trabajos") ||
            path.startsWith("/api/categorias") ||
            path.startsWith("/api/archivos")) &&
          method === "GET";

        if (isPublicGetApi) return true;

        return !!token;
      },
    },
  }
);