# DELLCOM SAC - Plataforma Corporativa y Sistema Administrativo IT

Este repositorio contiene la solucion de software integral para la corporacion DELLCOM SAC, un centro tecnologico especializado en soporte tecnico de computadoras, redes y suministros IT, ubicado en Los Olivos, Lima. El proyecto combina un portal publico de alta gama con un panel administrativo protegido de nivel empresarial para tecnicos y administradores.

La solucion esta desarrollada utilizando Next.js con arquitectura App Router, Tailwind CSS v4 para el diseno visual, Prisma ORM con MySQL en Railway para la persistencia, y un conjunto de herramientas de ingenieria de software de alta calidad (Zod, Jest, GitHub Actions).

---

## Modulos y Funcionalidades Principales

### 1. Portal Corporativo Publico (Frontend UX Premium)
* **Pagina de Inicio (Hero & Bento Grid)**: Seccion de bienvenida cinemática con accesos a soporte instantaneo por WhatsApp y bento grid unificado 2-1 que expone la propuesta de valor.
* **Servicios Corporativos (Filas Alternas)**: Visualizacion dinamica de los servicios (Soporte, Redes, Licenciamiento, Hardware) mediante layouts flexibles que alternan descripciones estructuradas y fotografias locales de alta calidad.
* **Catalogo Virtual Activo**: Exposicion de suministros originales (SSDs, RAMs, ribbons Zebra, tintas HP) consumidos en tiempo real desde la API de base de datos, con fallbacks de datos estaticos en caso de problemas de red.
* **Seccion de Descargas de Soporte**: Repositorio publico donde clientes y tecnicos pueden descargar drivers oficiales y manuales.
* **Modulo de Soporte Remoto (/soporte)**: Interfaz de streaming cinemática con reproductor de video integrado para guias paso a paso de AnyDesk/RustDesk y consola interactiva de consulta de IDs de conexion.
* **Formulario de Contacto Real (/contacto)**: Formulario estructurado con iconos vectoriales de Google Material Symbols. Valida datos en tiempo real y persiste las consultas directamente en la base de datos MySQL.

### 2. Panel Administrativo Protegido (Dashboard)
* **Area de Login Glassmorphic**: Interfaz de acceso limpia con un overlay translucido sobre un video tecnico de fondo, focos de acento en rojo puro (#ff0000) y proteccion por token JWT.
* **Modulo de Licencias de Software**: Registro detallado de cuentas de correo, contrasenas, fechas de vigencia y observaciones de licencias (Windows, Office, Antivirus) vendidas a clientes, con codigos de color de alerta segun proximidad de vencimiento (urgente, por vencer, activo).
* **Modulo de Archivos y Drivers**: Permite subir ejecutables y manuales asignandoles etiquetas de categoria (programa, driver, excel, link).
* **Modulo de Catalogo de Productos**: Control de stock virtual para anadir, editar, desactivar o eliminar productos del catalogo publico.
* **Modulo de Mensajes de Contacto**: Bandeja de entrada interna del taller donde los administradores pueden leer consultas de clientes, marcarlas como leidas/no leidas y eliminarlas tras su resolucion.
* **Modulo de Gestion de Personal (CRUD Admin-Only)**: Panel de control exclusivo para usuarios con rol 'admin' que permite dar de alta a nuevos tecnicos/vendedores, editar sus perfiles y activar o desactivar su acceso general.

---

## Calidad de Software e Ingenieria de Codigo

* **Validacion Estricta con Zod**: Todos los payloads y consultas que ingresan a las APIs administrativas son analizados con esquemas Zod en el servidor, garantizando que no se introduzcan valores nulos, correos invalidos o textos de longitud inapropiada.
* **Seguridad Criptografica**: Las contrasenas de las cuentas de personal se procesan con hashes de seguridad mediante `bcryptjs` con salt rounds optimizados antes de ser persistidas.
* **Control de Acceso basado en Roles (RBAC)**: Integracion de roles a traves de callbacks de JWT en NextAuth.js. El middleware restringe el acceso al CRUD de usuarios solo a administradores.
* **Automatizacion de Licencias (Cron Job)**: Endpoint `/api/cron/check-licencias` configurado para actualizar automaticamente el estado de licencias vencidas basandose en la fecha del servidor, protegido por validacion de Bearer Token.
* **Carga Fisica de Archivos (Hibrido AWS S3 / Local)**: Endpoint `/api/admin/upload` con logica de auto-deteccion. Si las variables de S3 estan en el archivo `.env`, envia el archivo de forma directa y asincrona al Bucket de AWS S3 mediante el SDK `@aws-sdk/client-s3`. Si no estan configuradas, escribe en el disco local (`public/uploads`) de forma transparente.
* **Pruebas Automatizadas con Jest**: Suite de pruebas unitarias configurada con `ts-jest` en el directorio `__tests__/` para auditar la validez y consistencia del parseo de datos.
* **Pipeline de Integracion Continua (CI)**: Flujo de trabajo automatizado en GitHub Actions (`.github/workflows/nextjs.yml`) ejecutado en cada push a main/master para instalar dependencias, auditar linter, correr tests unitarios, compilar tipos y validar el build final de Next.js.

---

## Requisitos de Sistema

* Node.js version 20 o superior
* Gestor de paquetes npm
* Servidor MySQL (local o en la nube como Railway/PlanetScale)
* Bucket de AWS S3 (opcional para almacenamiento en la nube)

---

## Variables de Entorno (.env)

Cree un archivo `.env` en la raiz del proyecto con el siguiente formato:

```env
# 1. Base de Datos
DATABASE_URL="mysql://usuario:contrasena@host:puerto/nombre_base_datos"

# 2. NextAuth Autenticacion
NEXTAUTH_SECRET="escribe_aqui_una_clave_secreta_y_larga_de_minimo_32_caracteres"
NEXTAUTH_URL="http://localhost:3000"

# 3. AWS S3 (Opcional, de lo contrario se guardara en public/uploads/)
AWS_ACCESS_KEY_ID="tu_access_key_id_de_iam"
AWS_SECRET_ACCESS_KEY="tu_secret_access_key_de_iam"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="nombre_del_bucket_s3"

# 4. Automatizacion (Cron Key)
CRON_SECRET="dellcom-cron-secret-2026"
```

---

## Instrucciones de Instalacion y Despliegue Local

1. Clonar el repositorio e instalar las dependencias:
   ```bash
   npm install
   ```

2. Generar el cliente de base de datos de Prisma:
   ```bash
   npx prisma generate
   ```

3. Sincronizar el esquema de Prisma con tu base de datos remota/local:
   ```bash
   npx prisma db push
   ```

4. Poblar la base de datos con los servicios corporativos iniciales y el administrador por defecto:
   ```bash
   npx prisma db seed
   ```
   *Nota: Las credenciales por defecto son: usuario `admin` y contrasena `admin123`. Modificalas inmediatamente al ingresar.*

5. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

El sitio web estara disponible en `http://localhost:3000`.

---

## Catalogo de Endpoints de la API

### Servicios Publicos
* `GET /api/productos` - Obtiene la lista de productos activos para el catalogo.
* `GET /api/servicios` - Obtiene los servicios estructurados del taller.
* `GET /api/trabajos` - Obtiene las imagenes del portafolio.
* `GET /api/categorias` - Obtiene las categorias registradas.
* `GET /api/archivos` - Obtiene los drivers y manuales disponibles para descarga.
* `POST /api/contacto` - Guarda un mensaje de contacto enviado desde la web publica (Validado con Zod).

### Modulo Administrativo (Requiere sesion activa)
* `GET /api/admin/contacto` - Obtiene la lista completa de mensajes recibidos de clientes.
* `PUT /api/admin/contacto` - Cambia el estado de lectura de un mensaje (`id` y `leido` en el body).
* `DELETE /api/admin/contacto?id=X` - Elimina un mensaje del sistema.
* `POST /api/admin/upload` - Procesa un archivo adjunto del dashboard y lo guarda en AWS S3 o carpeta local.
* `GET /api/admin/usuarios` - Lista el personal registrado en DELLCOM SAC (Solo Administrador).
* `POST /api/admin/usuarios` - Registra un nuevo tecnico/vendedor con password hash (Solo Administrador).
* `PUT /api/admin/usuarios` - Actualiza perfil y rol de un miembro del personal (Solo Administrador).
* `PATCH /api/admin/usuarios` - Activa o desactiva la cuenta de un tecnico (Solo Administrador).

### Tareas de Automatizacion
* `GET /api/cron/check-licencias` - Actualiza licencias activas cuya fecha de fin sea menor a hoy (Requiere `Authorization: Bearer <CRON_SECRET>`).

---

## Control de Calidad y Compilacion

### Ejecutar Pruebas Locales
Para correr la suite de pruebas unitarias configuradas en Jest:
```bash
npm run test
```

### Comprobacion de Tipado de TypeScript
Para verificar que el tipado estatico del proyecto sea correcto sin generar archivos de salida:
```bash
npx tsc --noEmit
```

### Compilar Proyecto para Produccion
Para empaquetar y compilar la aplicacion optimizada para produccion:
```bash
npm run build
```

Una vez finalizado, puedes levantar la aplicacion compilada localmente con:
```bash
npm run start
```
