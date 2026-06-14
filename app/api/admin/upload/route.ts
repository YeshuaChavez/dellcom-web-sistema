import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generar un nombre de archivo único para evitar colisiones
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.name);
    const originalName = path.basename(file.name, fileExtension).replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `${originalName}-${uniqueSuffix}${fileExtension}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Asegurar que la carpeta de destino exista
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: relativeUrl,
      name: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error("[API Admin Upload Error]:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la carga del archivo" },
      { status: 500 }
    );
  }
}
