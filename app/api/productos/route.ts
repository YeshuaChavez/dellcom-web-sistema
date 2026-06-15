import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const ProductoSchema = z.object({
  nombre: z.string().min(1, "El nombre del producto es requerido"),
  precio: z.number({ invalid_type_error: "El precio debe ser un número" }).positive("El precio debe ser mayor a 0"),
  descripcion: z.string().nullable().optional(),
  id_categoria: z.number({ invalid_type_error: "La categoría es requerida" }).int().positive(),
  imagen_url: z.string().nullable().optional(),
  activo: z.boolean().default(true),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const showAll = searchParams.get("all") === "true";

  const productos = await prisma.producto.findMany({
    include: { categoria: true },
    where: showAll ? {} : { activo: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(productos);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const result = ProductoSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const producto = await prisma.producto.create({ data: result.data });
  return NextResponse.json(producto, { status: 201 });
}
