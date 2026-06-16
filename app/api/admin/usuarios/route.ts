/**
 * API Route: /api/admin/usuarios  (solo admin)
 * CRUD completo de usuarios del panel de administración.
 * GET   — lista todos los usuarios (sin el campo contrasena)
 * POST  — crea usuario: genera username/password, envía email de bienvenida
 * PUT   — edita datos de un usuario (contraseña opcional)
 * PATCH — activa o desactiva un usuario (no se puede auto-desactivar)
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "crypto";

// ── Schemas ────────────────────────────────────────────────────────────────

const CreateUserSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("El correo electrónico no es válido"),
  rol: z.enum(["admin", "tecnico", "vendedor"], { errorMap: () => ({ message: "Rol inválido" }) }),
});

const UpdateUserSchema = z.object({
  id: z.number({ required_error: "ID de usuario es requerido" }),
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  usuario: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  email: z.string().email("El correo electrónico no es válido"),
  contrasena: z.string().min(6).optional().or(z.literal("")),
  rol: z.enum(["admin", "tecnico", "vendedor"], { errorMap: () => ({ message: "Rol inválido" }) }),
});

const ToggleStatusSchema = z.object({
  id: z.number({ required_error: "ID de usuario es requerido" }),
  activo: z.boolean({ required_error: "Estado activo es requerido" }),
});

// ── Helpers ────────────────────────────────────────────────────────────────

function normalizeStr(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

async function generateUniqueUsername(nombre: string): Promise<string> {
  const parts = nombre.trim().split(/\s+/);
  const base =
    parts.length >= 2
      ? normalizeStr(parts[0][0]) + normalizeStr(parts[1])
      : normalizeStr(parts[0]);

  let candidate = base;
  let counter = 2;
  while (await prisma.usuario.findUnique({ where: { usuario: candidate } })) {
    candidate = `${base}${counter++}`;
  }
  return candidate;
}

function generateTempPassword(): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const symbols = "@#!%*?&";

  const pick = (chars: string) => chars[crypto.randomInt(chars.length)];

  const chars = [
    pick(upper), pick(upper),
    pick(lower), pick(lower), pick(lower), pick(lower),
    pick(digits), pick(digits),
    pick(symbols),
  ];

  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

const ROL_LABEL: Record<string, string> = {
  admin: "Administrador",
  tecnico: "Técnico",
  vendedor: "Vendedor",
};

async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return { authorized: false, errorResponse: NextResponse.json({ error: "No autorizado" }, { status: 401 }) };

  const userRole = (session.user as any).role;
  if (userRole !== "admin") {
    return { authorized: false, errorResponse: NextResponse.json({ error: "Permisos insuficientes" }, { status: 403 }) };
  }

  return { authorized: true };
}

// ── GET ────────────────────────────────────────────────────────────────────

export async function GET() {
  try {
    const auth = await checkAdminAuth();
    if (!auth.authorized) return auth.errorResponse!;

    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        usuario: true,
        email: true,
        rol: true,
        activo: true,
        mustChangePassword: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("[API Admin Usuarios GET Error]:", error);
    return NextResponse.json({ error: "Error interno al obtener los usuarios" }, { status: 500 });
  }
}

// ── POST ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const auth = await checkAdminAuth();
    if (!auth.authorized) return auth.errorResponse!;

    const body = await req.json();
    const result = CreateUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { nombre, email, rol } = result.data;
    const emailLower = email.toLowerCase().trim();

    const existingEmail = await prisma.usuario.findUnique({ where: { email: emailLower } });
    if (existingEmail) {
      return NextResponse.json({ errors: { email: ["El correo electrónico ya está registrado"] } }, { status: 400 });
    }

    const usuario = await generateUniqueUsername(nombre);
    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        usuario,
        email: emailLower,
        contrasena: hashedPassword,
        rol,
        activo: true,
        mustChangePassword: true,
      },
      select: {
        id: true,
        nombre: true,
        usuario: true,
        email: true,
        rol: true,
        activo: true,
        mustChangePassword: true,
        createdAt: true,
      },
    });

    // Send welcome email with credentials
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "DELLCOM SAC <onboarding@resend.dev>",
        to: emailLower,
        subject: "Bienvenido/a a DELLCOM SAC — Tus credenciales de acceso",
        html: `
          <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 28px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #000; border: 2px solid #dc2626; display: flex; align-items: center; justify-content: center;">
                <span style="color: #dc2626; font-weight: 900; font-size: 16px; font-style: italic;">D</span>
              </div>
              <div>
                <p style="margin: 0; font-weight: 900; font-size: 14px; color: #1e293b;">DELLCOM SAC</p>
                <p style="margin: 0; font-size: 10px; color: #dc2626; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Portal de Gestión Interna</p>
              </div>
            </div>

            <h1 style="font-size: 22px; font-weight: 900; color: #1e293b; margin: 0 0 8px 0;">¡Bienvenido/a, ${nombre}!</h1>
            <p style="font-size: 14px; color: #64748b; margin: 0 0 24px 0; line-height: 1.6;">
              Tu cuenta en el portal de gestión interna de DELLCOM SAC ha sido creada con el rol de <strong>${ROL_LABEL[rol] ?? rol}</strong>. Estas son tus credenciales de acceso:
            </p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #64748b;">
                <span style="font-weight: 700; color: #1e293b; display: inline-block; width: 100px;">Usuario:</span>
                <code style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 14px; color: #0f172a;">${usuario}</code>
              </p>
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                <span style="font-weight: 700; color: #1e293b; display: inline-block; width: 100px;">Contraseña:</span>
                <code style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 14px; color: #0f172a;">${tempPassword}</code>
              </p>
            </div>

            <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 600; line-height: 1.5;">
                ⚠️ Al ingresar por primera vez, el sistema te pedirá que establezcas una contraseña propia. La contraseña anterior es solo temporal.
              </p>
            </div>

            <a href="${process.env.NEXTAUTH_URL}/admin/login" style="display: inline-block; background: #dc2626; color: #ffffff; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 999px; text-decoration: none; margin-bottom: 20px;">
              Acceder al portal
            </a>

            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
            <p style="font-size: 11px; color: #cbd5e1; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
              © 2026 DELLCOM SAC — Los Olivos, Lima
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("[API Admin Usuarios] Email send failed:", emailErr);
      // Don't fail the request if email fails — user was created
    }

    return NextResponse.json({ success: true, data: nuevoUsuario }, { status: 201 });
  } catch (error) {
    console.error("[API Admin Usuarios POST Error]:", error);
    return NextResponse.json({ error: "Error interno al crear el usuario" }, { status: 500 });
  }
}

// ── PUT ────────────────────────────────────────────────────────────────────

export async function PUT(req: NextRequest) {
  try {
    const auth = await checkAdminAuth();
    if (!auth.authorized) return auth.errorResponse!;

    const body = await req.json();
    const result = UpdateUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { id, nombre, usuario, email, contrasena, rol } = result.data;

    const existingUsername = await prisma.usuario.findFirst({ where: { usuario, id: { not: id } } });
    if (existingUsername) {
      return NextResponse.json({ errors: { usuario: ["El nombre de usuario ya está en uso"] } }, { status: 400 });
    }

    const existingEmail = await prisma.usuario.findFirst({ where: { email, id: { not: id } } });
    if (existingEmail) {
      return NextResponse.json({ errors: { email: ["El correo electrónico ya está en uso"] } }, { status: 400 });
    }

    const updateData: any = { nombre, usuario, email, rol };
    if (contrasena && contrasena.trim() !== "") {
      updateData.contrasena = await bcrypt.hash(contrasena, 10);
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: updateData,
      select: { id: true, nombre: true, usuario: true, email: true, rol: true, activo: true },
    });

    return NextResponse.json({ success: true, data: usuarioActualizado });
  } catch (error) {
    console.error("[API Admin Usuarios PUT Error]:", error);
    return NextResponse.json({ error: "Error interno al actualizar el usuario" }, { status: 500 });
  }
}

// ── PATCH ──────────────────────────────────────────────────────────────────

export async function PATCH(req: NextRequest) {
  try {
    const auth = await checkAdminAuth();
    if (!auth.authorized) return auth.errorResponse!;

    const body = await req.json();
    const result = ToggleStatusSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { id, activo } = result.data;

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const loggedInUser = await prisma.usuario.findUnique({ where: { email } });
    if (loggedInUser && loggedInUser.id === id && !activo) {
      return NextResponse.json({ error: "No puedes desactivar tu propia cuenta" }, { status: 400 });
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: { activo },
      select: { id: true, nombre: true, usuario: true, activo: true },
    });

    return NextResponse.json({ success: true, data: usuarioActualizado });
  } catch (error) {
    console.error("[API Admin Usuarios PATCH Error]:", error);
    return NextResponse.json({ error: "Error interno al actualizar el estado del usuario" }, { status: 500 });
  }
}
