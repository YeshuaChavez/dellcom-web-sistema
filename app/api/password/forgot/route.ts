import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json({ error: "Servicio de correo no configurado." }, { status: 500 });
    }
    const resend = new Resend(apiKey);
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
          <div style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 32px 32px 32px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);">
            
            <!-- Logo Header -->
            <div style="margin-bottom: 32px; display: block;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <!-- SVG Logo Dellcom inline -->
                    <svg viewBox="0 0 100 100" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style="display: block;">
                      <circle cx="50" cy="50" r="46" stroke="#dc2626" stroke-width="3" fill="none" opacity="0.85" />
                      <circle cx="50" cy="50" r="43" fill="#000000" />
                      <path d="M 48 20 C 40 20, 36 24, 36 28 C 30 28, 27 33, 29 39 C 24 41, 23 48, 26 53 C 21 57, 21 64, 25 68 C 23 74, 28 80, 35 80 C 38 80, 42 78, 44 76 C 46 78, 48 80, 48 80 Z" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                      <path d="M 48 32 C 40 32, 38 38, 44 42 C 34 46, 38 56, 44 56 C 36 60, 40 70, 48 70" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                      <line x1="50" y1="18" x2="50" y2="82" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="3 3" />
                      <path d="M 52 24 L 66 24 L 66 32 M 52 38 L 74 38 L 74 46 M 52 50 L 64 50 L 72 58 M 52 64 L 72 64 M 52 74 L 64 74 L 64 68" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                      <circle cx="66" cy="32" r="3" fill="#dc2626" />
                      <circle cx="74" cy="46" r="3" fill="#dc2626" />
                      <circle cx="72" cy="58" r="3" fill="#dc2626" />
                      <circle cx="72" cy="64" r="3" fill="#dc2626" />
                      <circle cx="64" cy="68" r="3" fill="#dc2626" />
                    </svg>
                  </td>
                  <td style="vertical-align: middle;">
                    <p style="margin: 0; font-weight: 900; font-size: 16px; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: -0.5px;">DELLCOM</p>
                    <p style="margin: 0; font-size: 9px; color: #dc2626; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; font-family: 'Outfit', sans-serif; margin-top: 1px;">Portal de Gestión Interna</p>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Content -->
            <h1 style="font-size: 22px; font-weight: 900; color: #0f172a; margin: 0 0 10px 0; font-family: 'Outfit', sans-serif;">Restablecer contraseña</h1>
            <p style="font-size: 14px; color: #475569; margin: 0 0 24px 0; line-height: 1.6;">
              Hola <strong>\${user.nombre}</strong>,<br />
              Recibimos una solicitud para restablecer la contraseña de tu cuenta de usuario <strong>\${user.usuario}</strong> en nuestro panel administrativo.
            </p>

            <!-- CTA Button -->
            <div style="margin: 28px 0; text-align: left;">
              <a href="\${resetUrl}" style="display: inline-block; background-color: #dc2626; color: #ffffff; font-weight: 700; font-size: 14px; padding: 14px 30px; border-radius: 999px; text-decoration: none; box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2); text-transform: uppercase; letter-spacing: 0.5px;">
                Restablecer contraseña
              </a>
            </div>

            <!-- Warning Callout Box -->
            <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px; margin: 24px 0;">
              <p style="margin: 0; font-size: 12.5px; color: #64748b; line-height: 1.6;">
                <strong>Importante:</strong> Este enlace de un solo uso expira en <strong>1 hora</strong>. Si no has solicitado este restablecimiento, por favor ignora este correo de forma segura — tu contraseña actual no será modificada.
              </p>
            </div>

            <!-- Footer -->
            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 28px 0;" />
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
              <tr>
                <td style="font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                  © 2026 DELLCOM SAC — Los Olivos, Lima
                </td>
              </tr>
            </table>
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
