# DELLCOM SAC — Plataforma de Gestión de Servicios IT y Suministros

Solución corporativa y administrativa integral desarrollada para **DELLCOM SAC** (Los Olivos, Lima), un centro técnico especializado en soporte informático, redes y repuestos IT. El sistema combina un portal público moderno de alta gama con un panel administrativo protegido de nivel empresarial que implementa control de acceso basado en roles (RBAC).

## 🚀 Arquitectura Cloud de Producción (Costo Mensual $0.00)

Toda la infraestructura de producción ha sido optimizada y migrada bajo una arquitectura de **costo mensual cero ($0.00 USD)** usando los planes gratuitos permanentes (Free Tiers) de proveedores de nube líderes:

*   **Hosting Full-Stack (Vercel)**: Aloja el portal público y las API Routes de Next.js. Despliegue continuo (CI/CD) vinculado directamente al repositorio privado del proyecto.
*   **Base de Datos Relacional (Aiven MySQL)**: Base de datos MySQL de alta disponibilidad. Cuenta con un sistema keep-alive automatizado que realiza pings periódicos para evitar la suspensión automática por inactividad.
*   **Almacenamiento de Archivos (Cloudflare R2)**: Repositorio compatible con el SDK S3 de AWS para la subida física de imágenes de productos, evidencias de trabajos y drivers. Egress fees (costo de descarga de datos) de $0.00 permanentes.
*   **Mensajería SMTP (Gmail Corporativo)**: Envío de correos de sistema (creación de cuentas, bienvenida y restablecimiento de contraseña) utilizando contraseñas de aplicación cifradas.
*   **Keep-Alive Programado (Cron-Job.org)**: Automatización externa que realiza pings HTTP cada 30 minutos al endpoint `/api/cron/keep-alive` para mantener activa la base de datos de producción.

---

## 🛠️ Stack Tecnológico

*   **Core**: Next.js 16 (App Router, Turbopack) & React 19.
*   **Lenguaje**: TypeScript en modo estricto (`strict: true`).
*   **Estilos**: Tailwind CSS v4 con arquitectura responsiva y animaciones dinámicas basadas en `IntersectionObserver`.
*   **Base de Datos**: MySQL gestionado con Prisma ORM v5 (Cliente singleton).
*   **Autenticación**: NextAuth.js v4 con seguridad basada en JSON Web Tokens (JWT) y cookies seguras.
*   **Seguridad**: Hashing de contraseñas con `bcryptjs`, validación con Zod en servidor, rate limiting y sanitización HTML contra inyecciones XSS.

---

## 🛡️ Control de Acceso Basado en Roles (RBAC)

El panel administrativo (`/admin/dashboard`) e APIs aplican una estrategia de defensa en profundidad en tres capas independientes (UI, Middleware de Edge Runtime y API endpoints):

| Rol | Modales / CRUDs Permitidos | Solo Lectura | Eliminar |
| :--- | :--- | :--- | :--- |
| **`admin`** | Todos los módulos + Gestión de personal | — | Todos los módulos |
| **`tecnico`** | Portafolio (Trabajos), Archivos y Drivers | Productos, Categorías, Servicios, Licencias | Ninguno |
| **`vendedor`** | Productos, Categorías y Servicios | Portafolio, Archivos/Drivers, Licencias | Ninguno |

*Nota: La eliminación de registros está estrictamente reservada al rol de `admin` en todos los módulos como medida preventiva.*

---

## 📋 Estructura de Directorios del Proyecto

```
DELLCOM-WEB/
├── app/                               # Directorio de la aplicación (Next.js App Router)
│   ├── admin/
│   │   ├── dashboard/                 # Panel principal (Tabs y Modales CRUD)
│   │   ├── change-password/           # Vista de cambio de contraseña obligatoria al primer ingreso
│   │   ├── reset-password/            # Formulario de establecimiento de nueva contraseña desde correo
│   │   └── login/                     # Login administrativo con autenticación de credenciales
│   ├── api/                           # API Routes (Handlers de peticiones HTTP)
│   │   ├── admin/
│   │   │   ├── upload/                # Carga de archivos a Cloudflare R2 (S3 API)
│   │   │   └── usuarios/              # CRUD de personal de Dellcom (solo admin)
│   │   ├── cron/
│   │   │   └── keep-alive/            # Ping de mantenimiento para evitar suspensión de la BD
│   │   └── password/                  # Lógica de recuperación y cambio de contraseñas
│   ├── components/                    # Componentes React (Buscador, Cotizador, Chatbot, Consola)
│   ├── descargas/                     # Portal de drivers y manuales
│   └── nosotros/                      # Misión, visión y trayectoria
├── lib/                               # Clientes e inicializadores (Prisma, Mailer, API Auth)
├── prisma/                            # Modelado de datos (schema.prisma) y migraciones
├── scripts/                           # Script de poblado inicial (seed.ts)
├── Dockerfile                         # Imagen Docker optimizada (Multi-stage build)
└── docker-compose.yml                 # Orquestación de desarrollo local
```

---

## ⚙️ Configuración del Archivo `.env`

Cree un archivo `.env` en la raíz del proyecto para desarrollo local:

```env
# 1. Conexión de Base de Datos (Aiven MySQL)
DATABASE_URL="mysql://avnadmin:password@host:port/defaultdb?ssl-mode=REQUIRED"

# 2. NextAuth (Autenticación)
NEXTAUTH_SECRET="clave_secreta_minimo_32_caracteres"
NEXTAUTH_URL="http://localhost:3000"


### Automatizacion

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET/POST | `/api/cron/check-licencias` | Marca como vencidas las licencias expiradas. Requiere header `Authorization: Bearer <CRON_SECRET>` |

---

## Control de Calidad y Compilacion

```bash
# Pruebas unitarias
npm run test

# Verificacion de tipos TypeScript
npx tsc --noEmit

# Lint
npm run lint

# Build de produccion
npm run build

# Iniciar en produccion
npm run start
```

