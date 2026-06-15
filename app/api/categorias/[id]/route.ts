/**
 * API Route: /api/categorias/[id]
 * Operaciones sobre una categoría específica por su ID.
 * PUT    — actualiza los campos enviados (requiere sesión activa)
 * DELETE — desactiva la categoría (soft delete, requiere sesión activa)
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Todos los campos son opcionales para permitir actualizaciones parciales
const CategoriaUpdateSchema = z.object({
  nombre: z.string().min(1, "El nombre de la categoría es requerido").optional(),
  activo: z.boolean().optional(),
});

// Actualiza solo los campos enviados en el body
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const result = CategoriaUpdateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const categoria = await prisma.categoria.update({
    where: { id: Number(id) },
    data: result.data,
  });
  return NextResponse.json(categoria);
}

// Soft delete: marca la categoría como inactiva en vez de borrarla
// (los productos asociados quedan intactos pero la categoría deja de aparecer)
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  await prisma.categoria.update({ where: { id: Number(id) }, data: { activo: false } });
  return NextResponse.json({ ok: true });
}
