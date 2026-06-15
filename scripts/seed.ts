import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpiando base de datos anterior...");
  // Clear tables in reverse order of dependencies
  await prisma.mensajeContacto.deleteMany({});
  await prisma.trabajoRealizado.deleteMany({});
  await prisma.producto.deleteMany({});
  await prisma.categoria.deleteMany({});
  await prisma.archivoTecnico.deleteMany({});
  await prisma.licencia.deleteMany({});
  await prisma.servicio.deleteMany({});
  await prisma.usuario.deleteMany({});

  console.log("🌱 Iniciando siembra de datos (Seeding)...");

  // 1. Seed Default Admin User
  const contrasena = await bcrypt.hash("admin123", 10);
  const admin = await prisma.usuario.create({
    data: {
      nombre: "Administrador Dellcom",
      usuario: "admin",
      email: "admin@dellcom.pe",
      contrasena,
      rol: "admin",
      activo: true,
    },
  });
  console.log("✅ Usuario admin creado: admin / admin123");

  // 2. Seed Real Services of ZEBRA & DELLCOM
  const serviciosList = [
    {
      nombre: "Reparación de Laptops e Impresoras",
      descripcion: "Diagnóstico avanzado y reparación electrónica de hardware multimarca para laptops, impresoras térmicas, láser y matriciales.",
      icono_url: "laptop_mac",
      activo: true,
    },
    {
      nombre: "Microelectrónica y Placas",
      descripcion: "Reparación a nivel de componentes en placas madre, reballing, microsoldadura y restauración de circuitos integrados quemados.",
      icono_url: "memory",
      activo: true,
    },
    {
      nombre: "Redes y Servidores",
      descripcion: "Diseño, estructurado y montaje de redes de datos, cableado Cat6/Cat6A, racks de servidores y mantenimiento de conectividad empresarial.",
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

  const serviciosMap: Record<string, any> = {};
  for (const s of serviciosList) {
    const created = await prisma.servicio.create({
      data: s,
    });
    serviciosMap[s.nombre] = created;
  }
  console.log("✅ Servicios reales sembrados en la BD.");

  // 3. Seed Real Categories
  const categoriasList = [
    "Ribbons y Tintas",
    "Memorias y Discos Externos",
    "Tarjetas ZEBRA",
    "Licencias de Software",
  ];

  const categoriasMap: Record<string, any> = {};
  for (const nombreCat of categoriasList) {
    const created = await prisma.categoria.create({
      data: {
        nombre: nombreCat,
        activo: true,
      },
    });
    categoriasMap[nombreCat] = created;
  }
  console.log("✅ Categorías reales sembradas en la BD.");

  // 4. Seed Products
  const productos = [
    {
      nombre: "Ribbon de Cera Zebra 110x74",
      descripcion: "Ribbon de cera de alta sensibilidad para impresoras industriales y de escritorio. Excelente calidad de impresión en etiquetas de papel.",
      precio: 45.00,
      imagen_url: "/img/servicios/wax_ribbon.png",
      activo: true,
      id_categoria: categoriasMap["Ribbons y Tintas"].id,
    },
    {
      nombre: "Tinta Original HP GT53 Negra",
      descripcion: "Tinta original HP de alta capacidad para impresoras de tanque de tinta. Rendimiento de hasta 6000 páginas en color negro intenso.",
      precio: 39.00,
      imagen_url: "/img/servicios/hp_ink.png",
      activo: true,
      id_categoria: categoriasMap["Ribbons y Tintas"].id,
    },
    {
      nombre: "Disco Externo 2TB Toshiba",
      descripcion: "Disco duro portátil externo Toshiba Canvio Basics USB 3.0 para copias de seguridad de alta velocidad y almacenamiento de archivos.",
      precio: 289.00,
      imagen_url: "/img/servicios/disco_externo.png",
      activo: true,
      id_categoria: categoriasMap["Memorias y Discos Externos"].id,
    },
    {
      nombre: "Memoria RAM DDR4 8GB Crucial Laptop",
      descripcion: "Módulo de memoria RAM SODIMM DDR4 de 3200MHz para optimizar la velocidad y multitarea en computadoras portátiles.",
      precio: 115.00,
      imagen_url: "/img/servicios/ram_laptop.png",
      activo: true,
      id_categoria: categoriasMap["Memorias y Discos Externos"].id,
    },
    {
      nombre: "Tarjeta de Limpieza Zebra",
      descripcion: "Kit de tarjetas de limpieza con alcohol isopropílico para cabezales de impresión de tarjetas de identificación Zebra.",
      precio: 75.00,
      imagen_url: "/img/servicios/zebra_ribbon.png",
      activo: true,
      id_categoria: categoriasMap["Tarjetas ZEBRA"].id,
    },
    {
      nombre: "Licencia Windows 11 Pro OEM",
      descripcion: "Clave de producto de Windows 11 Profesional (OEM de 64 bits), activación de por vida para un único equipo nuevo.",
      precio: 149.00,
      imagen_url: "/img/servicios/licencias_software.png",
      activo: true,
      id_categoria: categoriasMap["Licencias de Software"].id,
    },
    {
      nombre: "Licencia Office 2021 Home & Business",
      descripcion: "Licencia digital perpetua de Microsoft Office 2021 vinculada a cuenta de correo. Incluye Word, Excel, PowerPoint y Outlook.",
      precio: 349.00,
      imagen_url: "/img/servicios/licencias_software.png",
      activo: true,
      id_categoria: categoriasMap["Licencias de Software"].id,
    },
  ];

  for (const p of productos) {
    await prisma.producto.create({
      data: p,
    });
  }
  console.log("✅ Productos reales sembrados en la BD.");

  // 5. Seed Portfolio / Trabajos Realizados
  const trabajos = [
    {
      titulo: "Mantenimiento Preventivo Zebra ZT411",
      descripcion: "Calibración fina de cabezal y limpieza de rodillos de arrastre en impresora de etiquetas Zebra industrial para optimizar la nitidez del código de barras.",
      imagen_url: "/img/servicios/impresora_zebra_mantenimiento.png",
      id_servicio: serviciosMap["Reparación de Laptops e Impresoras"].id,
    },
    {
      titulo: "Instalación de Gabinete Rack de Redes",
      descripcion: "Peinado de cables, ponchado de patch panels Cat6, e instalación de switch inteligente de 24 puertos en rack centralizado para oficina corporativa.",
      imagen_url: "/img/servicios/cableado_estructurado.png",
      id_servicio: serviciosMap["Redes y Servidores"].id,
    },
    {
      titulo: "Reballing en Chipset de Laptop",
      descripcion: "Extracción y soldado con esferas nuevas de estaño con plomo en chip gráfico integrado de laptop de alta gama para solucionar falla de video.",
      imagen_url: "/img/servicios/microelectronica.jpg",
      id_servicio: serviciosMap["Microelectrónica y Placas"].id,
    },
  ];

  for (const t of trabajos) {
    await prisma.trabajoRealizado.create({
      data: t,
    });
  }
  console.log("✅ Portafolio de trabajos sembrado en la BD.");

  // 6. Seed Licencias (Para demostración del cron de expiración)
  const licencias = [
    {
      id_usuario: admin.id,
      software: "Microsoft 365 Empresa Estándar",
      correo_cuenta: "gerencia@dellcom.pe",
      contrasena: "Dellcom365*",
      fecha_inicio: new Date("2025-06-15T00:00:00Z"),
      fecha_fin: new Date("2026-06-15T00:00:00Z"), // Activa (vence mañana)
      nombre_cliente: "Inversiones del Norte SAC",
      telefono: "925981741",
      estado: "activo" as const,
      observaciones: "Renovación anual pendiente para mañana.",
    },
    {
      id_usuario: admin.id,
      software: "Antivirus ESET NOD32 (3 PCs)",
      correo_cuenta: "administracion@constructora.com",
      contrasena: "Eset2025!!",
      fecha_inicio: new Date("2024-05-10T00:00:00Z"),
      fecha_fin: new Date("2025-05-10T00:00:00Z"), // Vencida en el pasado
      nombre_cliente: "Constructora San Elías",
      telefono: "922452929",
      estado: "activo" as const, // Inicialmente activo, para demostrar que el cron lo pondrá como vencido
      observaciones: "El cliente solicitó cotización de renovación por correo.",
    },
    {
      id_usuario: admin.id,
      software: "Windows 11 Pro Licencia OEM",
      correo_cuenta: "caja1@tiendaolivos.pe",
      contrasena: "Win11OEM*",
      fecha_inicio: new Date("2025-01-20T00:00:00Z"),
      fecha_fin: null, // Vitalicia
      nombre_cliente: "Mini Market Los Olivos",
      telefono: "925981741",
      estado: "activo" as const,
      observaciones: "Licencia original física pegada en el gabinete.",
    },
  ];

  for (const l of licencias) {
    await prisma.licencia.create({
      data: l,
    });
  }
  console.log("✅ Licencias de demostración sembradas en la BD.");

  // 7. Seed Archivos Técnicos (Descargas)
  const archivos = [
    {
      id_usuario: admin.id,
      nombre: "Zebra Setup Utilities v1.1.9",
      tipo: "programa" as const,
      url_archivo: "https://dellcom-suministros.s3.amazonaws.com/downloads/zsu-v119.exe",
      descripcion: "Herramienta de configuración oficial para calibración, configuración de red e impresión de prueba en impresoras Zebra.",
    },
    {
      id_usuario: admin.id,
      nombre: "Driver Zebra ZT411 Industrial",
      tipo: "driver" as const,
      url_archivo: "https://dellcom-suministros.s3.amazonaws.com/downloads/zebra_zt411_driver.zip",
      descripcion: "Controladores oficiales de Windows para impresoras industriales de etiquetas Zebra serie ZT400.",
    },
    {
      id_usuario: admin.id,
      nombre: "AnyDesk Client Custom Dellcom",
      tipo: "link" as const,
      url_archivo: "https://anydesk.com/download",
      descripcion: "Enlace directo para la descarga del cliente oficial de soporte remoto AnyDesk.",
    },
  ];

  for (const a of archivos) {
    await prisma.archivoTecnico.create({
      data: a,
    });
  }
  console.log("✅ Archivos técnicos sembrados en la BD.");

  // 8. Seed Mensaje de Contacto de demostración
  await prisma.mensajeContacto.create({
    data: {
      nombre: "Roberto Carlos Díaz",
      correo: "roberto.diaz@gmail.com",
      telefono: "987654321",
      asunto: "Cotización de Servicio",
      mensaje: "Estimados, requiero una cotización para realizar el mantenimiento preventivo y limpieza de 3 impresoras de etiquetas Zebra GK420t en nuestras oficinas de Los Olivos. Agradecería que se comuniquen lo antes posible.",
      leido: false,
    },
  });
  console.log("✅ Mensaje de contacto de demostración sembrado.");

  console.log("\n🚀 ¡Proceso de Seeding de DELLCOM finalizado con éxito!");
}

main()
  .catch((e) => {
    console.error("❌ Error durante el Seeding:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());