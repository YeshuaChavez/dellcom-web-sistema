/**
 * API Route: /api/licencias/[id]
 * Operaciones sobre una licencia específica por su ID.
 * PUT    — actualiza los campos enviados (requiere sesión activa)
 * DELETE — elimina la licencia permanentemente (requiere sesión activa)
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/apiAuth";
import { z } from "zod";

// Todos los campos son opcionales para permitir actualizaciones parciales
const LicenciaUpdateSchema = z.object({
  software: z.string().min(3, "El nombre del software debe tener al menos 3 caracteres").optional(),
  correo_cuenta: z.string().min(3, "La cuenta/correo debe tener al menos 3 caracteres").optional(),
  contrasena: z.string().min(4, "La contraseña/clave debe tener al menos 4 caracteres").optional(),
  nombre_cliente: z.string().min(3, "El nombre del cliente debe tener al menos 3 caracteres").optional(),
  telefono: z
    .string()
    .regex(/^[0-9]+$/, "El teléfono debe contener solo números")
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(15, "El teléfono no debe superar los 15 dígitos")
    .optional()
    .nullable()
    .or(z.literal("")),
  anydesk_id: z.string().optional().nullable().or(z.literal("")),
  fecha_inicio: z.string().optional(),
  fecha_fin: z.string().nullable().optional(),
  observaciones: z.string().nullable().optional(),
  estado: z.enum(["activo", "vencido"]).optional(),
});

// Actualiza solo los campos enviados en el body
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(["admin"]);
  if (!auth.authorized) return auth.errorResponse;

  const { id } = await params;
  const body = await req.json();

  const result = LicenciaUpdateSchema.safeParse(body);
  if (!result.success) {
    const errorMsg = Object.values(result.error.flatten().fieldErrors).flat().join(", ");
    return NextResponse.json({ error: errorMsg, errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  // Extrae fechas para convertirlas a Date; el resto va directo a Prisma
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

// Elimina la licencia de forma permanente (borrado físico)
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(["admin"]);
  if (!auth.authorized) return auth.errorResponse;

  const { id } = await params;
  await prisma.licencia.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
