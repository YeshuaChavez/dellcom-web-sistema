import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const LicenciaUpdateSchema = z.object({
  software: z.string().min(1, "El software es requerido").optional(),
  correo_cuenta: z.string().email("El correo de la cuenta no es válido").optional(),
  contrasena: z.string().min(1, "La contraseña es requerida").optional(),
  nombre_cliente: z.string().min(1, "El nombre del cliente es requerido").optional(),
  telefono: z.string().nullable().optional(),
  fecha_inicio: z.string().optional(),
  fecha_fin: z.string().nullable().optional(),
  observaciones: z.string().nullable().optional(),
  estado: z.enum(["activo", "vencido"]).optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const result = LicenciaUpdateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const { fecha_inicio, fecha_fin, ...rest } = result.data;
  const updateData: Record<string, unknown> = { ...rest };
  if (fecha_inicio !== undefined) updateData.fecha_inicio = new Date(fecha_inicio);
  if (fecha_fin !== undefined) updateData.fecha_fin = fecha_fin ? new Date(fecha_fin) : null;

  const licencia = await prisma.licencia.update({
    where: { id: Number(id) },
    data: updateData,
  });
  return NextResponse.json(licencia);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  await prisma.licencia.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
