import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Correo requerido." }, { status: 400 });
    }

    // Find user by email (don't reveal whether the email exists or not)
    const user = await prisma.usuario.findUnique({ where: { email: email.toLowerCase().trim() } });

    if (user && user.activo) {
      // Invalidate previous tokens for this email
      await prisma.passwordResetToken.updateMany({
        where: { email: user.email, used: false },
        data: { used: true },
      });

      // Generate a secure random token, valid for 1 hour
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      await prisma.passwordResetToken.create({
        data: { token, email: user.email, expiresAt },
      });

      const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${token}`;

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "DELLCOM SAC <onboarding@resend.dev>",
        to: user.email,
        subject: "Restablecer contraseña — DELLCOM SAC",
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 28px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #000; border: 2px solid #dc2626; display: flex; align-items: center; justify-content: center;">
                <span style="color: #dc2626; font-weight: 900; font-size: 16px; font-style: italic;">D</span>
              </div>
              <div>
                <p style="margin: 0; font-weight: 900; font-size: 14px; color: #1e293b;">DELLCOM SAC</p>
                <p style="margin: 0; font-size: 10px; color: #dc2626; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Portal de Gestión Interna</p>
              </div>
            </div>

            <h1 style="font-size: 22px; font-weight: 900; color: #1e293b; margin: 0 0 8px 0;">Restablecer contraseña</h1>
            <p style="font-size: 14px; color: #64748b; margin: 0 0 24px 0; line-height: 1.6;">
              Hola <strong>${user.nombre}</strong>, recibimos una solicitud para restablecer la contraseña de tu cuenta <strong>${user.usuario}</strong>.
            </p>

            <a href="${resetUrl}" style="display: inline-block; background: #dc2626; color: #ffffff; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 999px; text-decoration: none; margin-bottom: 20px;">
              Restablecer contraseña
            </a>

            <p style="font-size: 12px; color: #94a3b8; margin: 20px 0 0 0; line-height: 1.6;">
              Este enlace expira en <strong>1 hora</strong>. Si no solicitaste este cambio, ignora este correo — tu contraseña no será modificada.
            </p>

            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
            <p style="font-size: 11px; color: #cbd5e1; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
              © 2026 DELLCOM SAC — Los Olivos, Lima
            </p>
          </div>
        `,
      });
    }

    // Always return success to avoid email enumeration
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[forgot-password]", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
