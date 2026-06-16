import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { newPassword } = await req.json();

  if (!newPassword || !PASSWORD_REGEX.test(newPassword)) {
    return NextResponse.json(
      { error: "La contraseña no cumple los requisitos de seguridad." },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.usuario.update({
    where: { email: session.user.email },
    data: { contrasena: hashed, mustChangePassword: false },
  });

  return NextResponse.json({ ok: true });
}
