/**
 * API Route: /api/cron/check-licencias
 * Job programado que marca como "vencido" las licencias cuya fecha_fin ya pasó.
 * Se invoca externamente (cron de Railway u otro scheduler) con autenticación Bearer.
 *
 * Autenticación: Header "Authorization: Bearer <CRON_SECRET>"
 * Acepta GET y POST para compatibilidad con distintos schedulers.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const secretFromEnv = process.env.CRON_SECRET;

    // Si no hay CRON_SECRET configurado en el entorno, rechaza inmediatamente
    if (!secretFromEnv) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const expectedAuth = `Bearer ${secretFromEnv}`;

    // Verifica que el Bearer token coincida con el secreto del entorno
    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const now = new Date();

    // Actualiza en lote todas las licencias activas cuya fecha de fin ya expiró
    const resultado = await prisma.licencia.updateMany({
      where: {
        estado: "activo",
        fecha_fin: {
          lt: now,   // fecha_fin anterior al momento actual
        },
      },
      data: {
        estado: "vencido",
      },
    });

    return NextResponse.json({
      success: true,
      mensaje: "Comprobacion de licencias completada",
      actualizadas: resultado.count,
    });
  } catch (error) {
    console.error("[CRON Check Licencias Error]:", error);
    return NextResponse.json(
      { error: "Error interno al ejecutar la comprobacion de licencias" },
      { status: 500 }
    );
  }
}

// Tambien permitir POST por flexibilidad de invocacion
export async function POST(req: NextRequest) {
  return GET(req);
}
