import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const ServicioUpdateSchema = z.object({
  nombre: z.string().min(1, "El nombre del servicio es requerido").optional(),
  descripcion: z.string().min(1, "La descripción es requerida").optional(),
  icono_url: z.string().nullable().optional(),
  activo: z.boolean().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const result = ServicioUpdateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const servicio = await prisma.servicio.update({
    where: { id: Number(id) },
    data: result.data,
  });
  return NextResponse.json(servicio);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  await prisma.servicio.update({ where: { id: Number(id) }, data: { activo: false } });
  return NextResponse.json({ ok: true });
}
