import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const contrasena = await bcrypt.hash("admin123", 10);
  await prisma.usuario.upsert({
    where: { email: "admin@dellcom.pe" },
    update: {},
    create: {
      nombre: "Administrador",
      usuario: "admin",
      email: "admin@dellcom.pe",
      contrasena,
      rol: "admin",
      activo: true,
    },
  });
  console.log("✅ Usuario admin creado: admin / admin123");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());