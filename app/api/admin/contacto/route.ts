import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const UpdateReadSchema = z.object({
  id: z.number({ required_error: "ID de mensaje es requerido" }),
  leido: z.boolean({ required_error: "Estado leido es requerido" }),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const mensajes = await prisma.mensajeContacto.findMany({
      orderBy: { fecha: "desc" },
    });

    return NextResponse.json(mensajes);
  } catch (error) {
    console.error("[API Admin Contacto GET Error]:", error);
    return NextResponse.json(
      { error: "Error interno al obtener los mensajes" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const result = UpdateReadSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { id, leido } = result.data;

    const mensajeActualizado = await prisma.mensajeContacto.update({
      where: { id },
      data: { leido },
    });

    return NextResponse.json({ success: true, data: mensajeActualizado });
  } catch (error) {
    console.error("[API Admin Contacto PUT Error]:", error);
    return NextResponse.json(
      { error: "Error interno al actualizar el mensaje" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    if (!idParam) {
      return NextResponse.json({ error: "ID de mensaje requerido" }, { status: 400 });
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID de mensaje inválido" }, { status: 400 });
    }

    await prisma.mensajeContacto.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Mensaje eliminado exitosamente" });
  } catch (error) {
    console.error("[API Admin Contacto DELETE Error]:", error);
    return NextResponse.json(
      { error: "Error interno al eliminar el mensaje" },
      { status: 500 }
    );
  }
}
