import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const TrabajoUpdateSchema = z.object({
  titulo: z.string().min(1, "El título del trabajo es requerido").optional(),
  descripcion: z.string().nullable().optional(),
  imagen_url: z.string().min(1, "La imagen es requerida").optional(),
  id_servicio: z.number().int().positive().nullable().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const result = TrabajoUpdateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const trabajo = await prisma.trabajoRealizado.update({
    where: { id: Number(id) },
    data: result.data,
  });
  return NextResponse.json(trabajo);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  await prisma.trabajoRealizado.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
