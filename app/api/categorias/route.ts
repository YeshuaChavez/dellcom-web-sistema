import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const CategoriaSchema = z.object({
  nombre: z.string().min(1, "El nombre de la categoría es requerido"),
  activo: z.boolean().default(true),
});

export async function GET() {
  const categorias = await prisma.categoria.findMany({ where: { activo: true } });
  return NextResponse.json(categorias);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const result = CategoriaSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const categoria = await prisma.categoria.create({ data: result.data });
  return NextResponse.json(categoria, { status: 201 });
}
