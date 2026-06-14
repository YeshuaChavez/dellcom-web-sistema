import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ContactSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  correo: z.string().email("El correo electrónico no es válido"),
  telefono: z.string().nullable().optional(),
  asunto: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  mensaje: z.string().min(5, "El mensaje debe tener al menos 5 caracteres"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validar datos con Zod
    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nombre, correo, telefono, asunto, mensaje } = result.data;

    const mensajeGuardado = await prisma.mensajeContacto.create({
      data: {
        nombre,
        correo,
        telefono: telefono || null,
        asunto,
        mensaje,
      },
    });

    return NextResponse.json({ success: true, data: mensajeGuardado }, { status: 201 });
  } catch (error) {
    console.error("[API Contacto Error]:", error);
    return NextResponse.json(
      { error: "Error interno al enviar el mensaje de contacto" },
      { status: 500 }
    );
  }
}
