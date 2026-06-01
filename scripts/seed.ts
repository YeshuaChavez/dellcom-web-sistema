import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Default Admin User
  const contrasena = await bcrypt.hash("admin123", 10);
  const admin = await prisma.usuario.upsert({
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
  console.log("✅ Usuario admin creado/verificado: admin / admin123");

  // 2. Seed Real Services of DELLCOM SAC
  const servicios = [
    {
      nombre: "Reparación de Laptops e Impresoras",
      descripcion: "Diagnóstico avanzado y reparación electrónica de hardware multimarca para laptops, impresoras y PCs de escritorio.",
      icono_url: "laptop_mac",
      activo: true,
    },
    {
      nombre: "Microelectrónica y Placas",
      descripcion: "Reparación a nivel de componentes en placas madre, reballing, microsoldadura y restauración de circuitos integrados.",
      icono_url: "memory",
      activo: true,
    },
    {
      nombre: "Redes y Servidores",
      descripcion: "Diseño, estructurado y montaje de redes de datos, racks de servidores y mantenimiento de conectividad empresarial.",
      icono_url: "dns",
      activo: true,
    },
    {
      nombre: "Soporte Remoto (AnyDesk)",
      descripcion: "Asistencia técnica remota inmediata para mantenimiento de sistemas operativos, virus, configuraciones y software de oficina.",
      icono_url: "support_agent",
      activo: true,
    },
    {
      nombre: "Correos Corporativos",
      descripcion: "Configuración, migración y administración de correos profesionales en Google Workspace, Microsoft 365 y Webmail corporativo.",
      icono_url: "mail",
      activo: true,
    },
    {
      nombre: "Licencias de Software",
      descripcion: "Venta e instalación de licencias de software originales para sistemas operativos Windows, suites de Office y antivirus corporativos.",
      icono_url: "verified_user",
      activo: true,
    },
  ];

  for (const s of servicios) {
    await prisma.servicio.upsert({
      where: { id: 0 }, // We search by name or create new
      // Since 'nombre' is not unique in Schema but we want to avoid duplicates:
      update: {},
      create: s,
    });
  }
  console.log("✅ Servicios reales sembrados en la BD.");

  // 3. Seed Real Categories
  const categorias = [
    "Ribbons y Tintas",
    "Memorias y Discos Externos",
    "Tarjetas ZEBRA",
    "Licencias de Software",
  ];

  for (const nombreCat of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: nombreCat },
      update: {},
      create: {
        nombre: nombreCat,
        activo: true,
      },
    });
  }
  console.log("✅ Categorías reales sembradas en la BD.");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());