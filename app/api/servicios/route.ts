import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const ServicioSchema = z.object({
  nombre: z.string().min(1, "El nombre del servicio es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  icono_url: z.string().nullable().optional(),
  activo: z.boolean().default(true),
});

export async function GET() {
  const servicios = await prisma.servicio.findMany({ where: { activo: true } });
  return NextResponse.json(servicios);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const result = ServicioSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const servicio = await prisma.servicio.create({ data: result.data });
  return NextResponse.json(servicio, { status: 201 });
}
