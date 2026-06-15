import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const ArchivoSchema = z.object({
  nombre: z.string().min(1, "El nombre del archivo es requerido"),
  tipo: z.enum(["programa", "driver", "excel", "link"], {
    errorMap: () => ({ message: "Tipo inválido. Debe ser: programa, driver, excel o link" }),
  }),
  url_archivo: z.string().min(1, "La URL del archivo es requerida"),
  descripcion: z.string().nullable().optional(),
});

export async function GET() {
  const archivos = await prisma.archivoTecnico.findMany({
    include: { usuario: { select: { nombre: true } } },
    orderBy: { fecha_subida: "desc" },
  });
  return NextResponse.json(archivos);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const user = await prisma.usuario.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const body = await req.json();
  const result = ArchivoSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const archivo = await prisma.archivoTecnico.create({
    data: { ...result.data, id_usuario: user.id },
  });
  return NextResponse.json(archivo, { status: 201 });
}
