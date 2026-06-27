# DELLCOM SAC - Plataforma Corporativa y Sistema Administrativo IT

Este repositorio contiene la solución de software integral para la corporación DELLCOM SAC, un centro tecnológico especializado en soporte técnico de computadoras, redes y suministros IT, ubicado en Los Olivos, Lima. El proyecto combina un portal público de alta gama con un panel administrativo protegido de nivel empresarial, con permisos diferenciados para administradores, técnicos y vendedores.

La solución está desarrollada con Next.js 16.2.4 (App Router, Turbopack), TypeScript en modo estricto, Tailwind CSS v4, Prisma ORM v5.22, NextAuth.js v4 para autenticación JWT y React 19.

## Arquitectura Cloud de Producción

Toda la infraestructura ha sido migrada bajo un enfoque de alta disponibilidad y optimización de recursos usando planes y servicios en la nube:
*   **Hosting Full-Stack (Vercel)**: Despliegue continuo (CI/CD) vinculado directamente al repositorio privado del proyecto.
*   **Base de Datos Relacional (Aiven MySQL)**: Instancia MySQL de alta disponibilidad en la nube con keep-alive externo.
*   **Almacenamiento (Cloudflare R2)**: Repositorio compatible con el SDK S3 de AWS para la subida de imágenes y drivers con transferencia de datos optimizada.
*   **Mensajería SMTP (Gmail Corporativo)**: Envío de correos de sistema (creación de cuentas, bienvenida y restablecimiento de contraseña) con contraseñas de aplicación cifradas.
*   **Keep-Alive Programado (Cron-Job.org)**: Automatización externa que realiza pings HTTP cada 30 minutos al endpoint `/api/cron/keep-alive` para mantener activa la base de datos.

---

## Estructura Completa de Directorios del Proyecto

```
DELLCOM-WEB/
├── .github/
│   └── workflows/
│       └── nextjs.yml                  # Pipeline de CI: lint, tests, typecheck y build
├── __tests__/
│   └── api.test.ts                     # Pruebas unitarias de esquemas de datos con Jest
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Panel principal con 8 módulos CRUD (tabs + modales)
│   │   ├── login/
│   │   │   └── page.tsx                # Login glassmorphic con video de fondo y JWT
│   │   ├── change-password/           # Vista de cambio de contraseña obligatoria al primer ingreso
│   │   ├── reset-password/            # Formulario de restablecer contraseña desde link de correo
│   │   └── layout.tsx                  # Layout con SessionProvider de NextAuth
│   ├── api/
│   │   ├── admin/
│   │   │   ├── contacto/
│   │   │   │   └── route.ts            # GET/PUT mensajes de contacto / DELETE (solo admin)
│   │   │   ├── upload/                # POST carga de archivos: Cloudflare R2 (compatible S3)
│   │   │   └── usuarios/              # GET/POST/PUT/PATCH CRUD de personal (solo admin)
│   │   ├── archivos/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts            # PUT/DELETE archivo específico
│   │   │   └── route.ts                # GET/POST archivos y drivers técnicos
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts            # Handler interno de NextAuth.js
│   │   ├── categorias/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts            # PUT/DELETE categoría específica
│   │   │   └── route.ts                # GET/POST categorías del catálogo
│   │   ├── contacto/
│   │   │   └── route.ts                # POST formulario público (Zod + rate limiting)
│   │   ├── cron/
│   │   │   ├── check-licencias/
│   │   │   │   └── route.ts            # GET/POST job de vencimiento de licencias
│   │   │   └── keep-alive/
│   │   │       └── route.ts            # GET ping HTTP para mantener despierta la BD de Aiven
│   │   ├── licencias/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts            # PUT/DELETE licencia específica
│   │   │   └── route.ts                # GET/POST licencias de software de clientes
│   │   ├── productos/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts            # GET/PUT/DELETE producto específico
│   │   │   └── route.ts                # GET/POST productos del catálogo
│   │   ├── servicios/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts            # PUT/DELETE servicio específico
│   │   │   └── route.ts                # GET/POST servicios de TI
│   │   ├── password/
│   │   │   ├── forgot/
│   │   │   │   └── route.ts            # POST genera token de recuperación y envía email
│   │   │   └── reset/
│   │   │       └── route.ts            # POST valida token de recuperación y cambia contraseña
│   │   └── trabajos/
│   │       ├── [id]/
│   │       │   └── route.ts            # PUT/DELETE trabajo de portafolio específico
│   │       └── route.ts                # GET/POST trabajos realizados (portafolio)
│   ├── components/
│   │   ├── AnyDeskConsole.tsx          # Consola interactiva de consulta de IDs AnyDesk
│   │   ├── CleanFooter.tsx             # Pie de página corporativo con redes y accesos
│   │   ├── CotizadorExpress.tsx        # Generador rápido de cotizaciones
│   │   ├── HomeHeroSearch.tsx          # Buscador de diagnóstico de fallas con autocomplete
│   │   ├── PortfolioGallery.tsx        # Carrusel de trabajos realizados con modal
│   │   ├── ScrollRevealObserver.tsx    # Animaciones de fade-in por scroll (IntersectionObserver)
│   │   ├── SmartAssistant.tsx          # Chatbot flotante con respuestas por palabras clave
│   │   └── StatusHeader.tsx            # Barra de navegación principal con logo SVG
│   ├── contacto/
│   │   ├── layout.tsx
│   │   └── page.tsx                    # Formulario público de consultas con validación
│   ├── descargas/
│   │   ├── layout.tsx
│   │   └── page.tsx                    # Repositorio público de drivers y manuales
│   ├── nosotros/
│   │   └── page.tsx                    # Trayectoria, visión, misión y valores corporativos
│   ├── productos/
│   │   ├── layout.tsx
│   │   └── page.tsx                    # Catálogo virtual con filtros, carrito y vista rápida
│   ├── servicios/
│   │   └── page.tsx                    # Servicios de TI en layout de filas alternas
│   ├── soporte/
│   │   └── page.tsx                    # Guía de soporte remoto AnyDesk con consola interactiva
│   ├── globals.css                     # Estilos globales y tokens de Tailwind CSS v4
│   ├── layout.tsx                      # Raíz de la app: tipografía Outfit e iconos Material
│   └── page.tsx                        # Landing page principal (Hero, Bento Grid, Portafolio)
├── lib/
│   ├── apiAuth.ts                      # Helper requireRole(): autorización por rol en rutas API
│   ├── auth.ts                         # Configuración de NextAuth: proveedor, callbacks JWT, roles
│   ├── mailer.ts                       # Transportador de correos SMTP (Gmail corporativo)
│   ├── emailTemplates.ts               # Plantillas HTML responsivas para envíos de correos
│   └── prisma.ts                       # Cliente Prisma singleton (previene múltiples instancias)
├── prisma/
│   └── schema.prisma                   # Modelos relacionales y conectores MySQL (Aiven)
├── public/
│   ├── img/
│   │   ├── portafolio/                 # Fotos de trabajos realizados
│   │   ├── productos/                  # Imágenes del catálogo de suministros
│   │   └── servicios/                  # Imágenes de servicios de TI
│   ├── vid/
│   │   └── laptop_video.mp4            # Video de fondo del login administrativo
│   └── uploads/                        # Directorio de fallback para archivos subidos localmente
├── scripts/
│   └── seed.ts                         # Poblado inicial de la BD (npx prisma db seed)
├── Dockerfile                          # Imagen Docker de producción (multi-stage build)
├── docker-compose.yml                  # Orquestación de contenedores para desarrollo
├── eslint.config.mjs                   # Configuración ESLint (next/core-web-vitals + typescript)
├── jest.config.js                      # Configuración Jest con ts-jest
├── middleware.ts                       # Control de acceso por roles (RBAC) y rutas protegidas
├── next.config.ts                      # Configuración de compilación de Next.js
├── package.json                        # Dependencias y scripts del proyecto
└── tsconfig.json                       # Configuración de TypeScript en modo estricto
```

---

## Módulos y Funcionalidades Principales

### 1. Portal Corporativo Público (Frontend)

* **Landing Page (Hero & Bento Grid)**: Sección de bienvenida con acceso directo a soporte por WhatsApp, buscador de diagnóstico de fallas con autocomplete (`HomeHeroSearch`) y bento grid con propuesta de valor.
* **Servicios de TI**: Visualización dinámica de servicios (Soporte, Redes, Licenciamiento, Hardware) con layout de filas alternas que combina descripciones y fotografías locales.
* **Catálogo Virtual y Carrito de Cotización**: Exposición de suministros con filtros por categoría y búsqueda en tiempo real. Incluye carrito de cotización via `localStorage` que envía solicitudes formateadas a WhatsApp, y modal de Vista Rápida implementado con React Portal.
* **Portafolio de Trabajos**: Carrusel animado (`PortfolioGallery`) con fotos reales de instalaciones, cableado y reparaciones realizadas.
* **Descargas de Soporte**: Repositorio público de drivers oficiales, manuales e instaladores clasificados por tipo.
* **Soporte Remoto (/soporte)**: Guía paso a paso de AnyDesk con consola interactiva de consulta de IDs de conexión (`AnyDeskConsole`).
* **Formulario de Contacto (/contacto)**: Validación con Zod, rate limiting por IP (5 envios cada 10 minutos) y sanitización HTML antes de persistir en la BD.
* **Asistente Virtual (Chatbot)**: Componente flotante (`SmartAssistant`) con respuestas automáticas por palabras clave (horarios, ubicación, AnyDesk, servicios). Se oculta automáticamente en rutas `/admin/*`.

### 2. Panel Administrativo Protegido (/admin/dashboard)

Acceso restringido por JWT. Los roles disponibles son `admin`, `tecnico` y `vendedor`, cada uno con permisos delimitados por su función de trabajo (ver tabla de roles más abajo).

* **Gestión de Licencias**: Registro de cuentas de correo, claves y vigencias de licencias de software (Windows, Office, Antivirus) vendidas a clientes. Alertas visuales por proximidad de vencimiento (activo / por vencer / vencido). Exclusivo de `admin`.
* **Archivos y Drivers**: Repositorio interno de ejecutables, drivers, planillas Excel y enlaces útiles con subida física via Cloudflare R2 o fallback local. Gestionado por `admin` y `tecnico`.
* **Catálogo de Productos**: CRUD completo de suministros (ribbons, tintas, memorias, accesorios). Incluye subida de imagen, asignación de categoría y toggle de visibilidad en la web pública. Gestionado por `admin` y `vendedor`.
* **Categorías de Productos**: Creación y desactivación de las categorías que agrupan el catálogo virtual. Gestionado por `admin` y `vendedor`.
* **Gestión de Servicios**: Alta, edición y desactivación de los servicios de TI mostrados en la web pública. El icono se configura con un nombre de Material Symbol. Gestionado por `admin` y `vendedor`.
* **Portafolio / Trabajos Realizados**: Registro de fotos y descripción de proyectos completados, asociados opcionalmente a un servicio. Gestionado por `admin` y `tecnico`.
* **Mensajes de Contacto**: Bandeja de entrada con mensajes del formulario público. El asunto y el cuerpo del mensaje se pueden abrir en un modal de lectura completa con un clic (remitente, fecha y texto íntegro). Permite marcar como leído/no leído (cualquier rol) y eliminar (solo `admin`).
* **Gestión de Personal (solo admin)**: CRUD de usuarios con hash bcrypt de contraseñas, asignación de roles y activación/desactivación de cuentas.

#### Modelo de Permisos por Rol

| Rol | Puede crear/editar | Solo lectura | Eliminar |
|-----|---------------------|--------------|----------|
| `admin` | Todos los módulos | — | Todos los módulos |
| `tecnico` | Portafolio, Archivos/Drivers | Productos, Categorías, Servicios, Licencias | Ninguno |
| `vendedor` | Productos, Categorías, Servicios | Portafolio, Archivos/Drivers, Licencias | Ninguno |

Mensajes de contacto (lectura y marcado leído/no leído) y Gestión de Personal quedan fuera de esta tabla: el primero es común a los tres roles, el segundo es exclusivo de `admin`. **Eliminar registros está restringido a `admin` en todos los módulos** como medida de seguridad adicional, incluso en aquellos donde el rol tiene permiso de creación/edición.

La restricción se aplica en tres capas independientes (defensa en profundidad):
1. **UI**: los botones de crear/editar/eliminar se ocultan según el rol de la sesión activa.
2. **Middleware` (`middleware.ts`, Edge Runtime): bloquea a nivel de borde la escritura en `/api/licencias` (no-admin) y `/api/archivos` (vendedor) antes de que la petición llegue a la ruta.
3. **Ruta API** (`requireRole()` en `lib/apiAuth.ts`): cada handler POST/PUT/DELETE valida el rol exacto contra la base de datos de la sesión, de modo que una llamada directa a la API (sin pasar por la UI) también queda bloqueada.

---

## Calidad de Software e Ingeniería de Código

* **Validación con Zod**: Todos los endpoints administrativos y el formulario de contacto validan los payloads con esquemas Zod en el servidor.
* **Seguridad Criptográfica**: Contraseñas de personal hasheadas con `bcryptjs` (10 salt rounds) antes de persistirse. Nunca se almacenan en texto plano.
* **Sanitización de Inputs**: Los campos de texto del formulario de contacto público son sanitizados para eliminar etiquetas HTML antes de guardarse en la base de datos.
* **Rate Limiting**: El endpoint `POST /api/contacto` limita a 5 envíos por IP cada 10 minutos, retornando HTTP 429 si se supera el límite.
* **Control de Acceso basado en Roles (RBAC)**: El middleware protege todas las rutas administrativas y cada ruta API valida el rol exacto con `requireRole()`. Solo `admin` gestiona usuarios y licencias; `tecnico` gestiona Portafolio y Archivos/Drivers; `vendedor` gestiona Productos, Categorías y Servicios; eliminar registros queda reservado a `admin` en todos los módulos.
* **Automatización de Licencias (Cron Job)**: Endpoint `GET /api/cron/check-licencias` protegido por Bearer Token que actualiza automáticamente el estado de licencias cuya fecha de fin ya pasó. Requiere la variable `CRON_SECRET` en producción.
* **Carga de Archivos Híbrida (Cloudflare R2 / Local)**: El endpoint `POST /api/admin/upload` detecta automáticamente si las credenciales de R2 están configuradas. Si lo están, sube el archivo al bucket R2. Si no, escribe en `public/uploads/` de forma transparente.
* **Pruebas con Jest**: Suite de pruebas unitarias en `__tests__/` configurada con `ts-jest` para validar esquemas y lógica de datos.
* **Pipeline CI con GitHub Actions**: Se ejecuta en cada push a `main`: instala dependencias, genera cliente Prisma, corre ESLint, ejecuta Jest, valida TypeScript y compila el build de Next.js.
* **Estados de Carga Explícitos**: Las páginas públicas que consumen datos vía fetch del lado del cliente (p. ej. `/productos`) muestran un esqueleto de carga mientras la petición está en curso, en lugar de renderizar prematuramente un estado de "sin resultados" durante una red lenta o un cold-start del servidor.
* **Renderizado de Fechas Seguro para Hidratación**: Todo formato de fecha visible en páginas públicas (`toLocaleDateString`) fija explícitamente `timeZone: "UTC"`. Esto evita que el servidor (Vercel, UTC) y el navegador del visitante (zona horaria local, p. ej. Perú UTC-5) calculen un día distinto para el mismo instante, lo que de otro modo produce un error de hidratación de React (#418) visible en la consola del navegador.

---

## Esquema de Base de Datos (Prisma ORM + MySQL)

### Sistema Administrativo

| Modelo | Descripción | Campos clave |
|--------|-------------|--------------|
| `Usuario` | Personal de DELLCOM | `usuario` (único), `email` (único), `contrasena` (hash), `rol` (admin/tecnico/vendedor), `activo` |
| `Licencia` | Licencias de software vendidas a clientes | `software`, `correo_cuenta`, `contrasena`, `fecha_inicio`, `fecha_fin`, `nombre_cliente`, `estado` (activo/vencido) |
| `ArchivoTecnico` | Drivers, instaladores y documentos | `nombre`, `tipo` (programa/driver/excel/link), `url_archivo`, `fecha_subida` |

### Sistema Web Público

| Modelo | Descripción | Campos clave |
|--------|-------------|--------------|
| `Servicio` | Servicios de TI ofrecidos | `nombre`, `descripcion`, `icono_url` (Material Symbol), `activo` |
| `Categoria` | Categorías del catálogo | `nombre` (único), `activo` |
| `Producto` | Suministros del catálogo | `nombre`, `precio` (Decimal 10,2), `imagen_url`, `activo`, `id_categoria` |
| `TrabajoRealizado` | Fotos del portafolio | `titulo`, `descripcion`, `imagen_url`, `fecha`, `id_servicio` (opcional) |
| `MensajeContacto` | Consultas del formulario público | `nombre`, `correo`, `telefono`, `asunto`, `mensaje`, `leido`, `fecha` |

**Relaciones:** `Usuario` 1:N `Licencia`, `Usuario` 1:N `ArchivoTecnico`, `Categoría` 1:N `Producto`, `Servicio` 1:N `TrabajoRealizado`.

---

## Variables de Entorno (.env)

Cree un archivo `.env` en la raíz del proyecto:

```env
# 1. Base de Datos (Aiven MySQL)
DATABASE_URL="mysql://avnadmin:password@host:port/defaultdb?ssl-mode=REQUIRED"

# 2. NextAuth
NEXTAUTH_SECRET="clave_aleatoria_segura_de_mínimo_32_caracteres"
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

