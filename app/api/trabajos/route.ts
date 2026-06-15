import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const TrabajoSchema = z.object({
  titulo: z.string().min(1, "El título del trabajo es requerido"),
  descripcion: z.string().nullable().optional(),
  imagen_url: z.string().min(1, "La imagen del trabajo es requerida"),
  id_servicio: z.number().int().positive().nullable().optional(),
});

export async function GET() {
  const trabajos = await prisma.trabajoRealizado.findMany({
    include: { servicio: true },
    orderBy: { fecha: "desc" },
  });
  return NextResponse.json(trabajos);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const result = TrabajoSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const trabajo = await prisma.trabajoRealizado.create({ data: result.data });
  return NextResponse.json(trabajo, { status: 201 });
}
