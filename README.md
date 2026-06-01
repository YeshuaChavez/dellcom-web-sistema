# DELLCOM SAC - Portal Web y Dashboard Administrativo

Este repositorio contiene la plataforma web corporativa y el sistema de administracion tecnica de DELLCOM SAC. La aplicacion esta desarrollada con Next.js (App Router), Tailwind CSS version 4, Prisma ORM, MySQL y NextAuth.js para la gestion de identidades y accesos de los tecnicos.

## Descripcion del Proyecto

El sitio web ofrece una interfaz publica optimizada para SEO y una experiencia premium donde se exponen los servicios de soporte tecnico, consultoria de infraestructura de TI, cableado estructurado, licenciamiento oficial de software y catalogo de suministros Zebra.

Ademas, incluye un area administrativa protegida para la gestion interna de la empresa, que permite a los tecnicos y administradores llevar un control riguroso de:
* Licencias de software vendidas a clientes, incluyendo fechas de inicio y vencimiento.
* Archivos tecnicos, drivers y instaladores de programas de soporte.
* Mantenimiento de la base de datos de productos en el catalogo publico.
* Actualizaciones en tiempo real del catalogo web, servicios y trabajos realizados.

## Stack Tecnologico

* Frontend y SSR: Next.js version 16.2 (App Router con React 19)
* Estilos: Tailwind CSS version 4
* Persistencia de Datos: Prisma ORM con conector MySQL
* Autenticacion: NextAuth.js con estrategia de credenciales
* Seguridad: Bcryptjs para el hashing de contrasenas y Middleware de Next.js para la proteccion de rutas
* Iconografia: Google Material Symbols Outlined

## Requisitos Previos

* Node.js version 18 o superior
* Gestor de paquetes npm (instalado por defecto con Node.js)
* Servidor de base de datos MySQL

## Configuracion del Entorno

Para ejecutar el proyecto, cree un archivo llamado `.env` en la raiz del directorio y configure las siguientes variables de entorno:

```env
# URL de conexion a la base de datos MySQL
DATABASE_URL="mysql://usuario:contrasena@localhost:3306/nombre_bd"

# Secreto de NextAuth para cifrado de tokens de sesion
NEXTAUTH_SECRET="un_secreto_seguro_de_32_caracteres"

# URL base del sitio web (en desarrollo suele ser localhost)
NEXTAUTH_URL="http://localhost:3000"
```

## Instrucciones de Instalacion

Siga estos pasos para configurar y ejecutar el entorno de desarrollo:

1. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Generar el cliente de Prisma e inicializar el esquema de la base de datos:
   ```bash
   npx prisma generate
   ```

3. Aplicar el esquema a su base de datos local:
   ```bash
   npx prisma db push
   ```

4. Ejecutar el script de seed para poblar la base de datos con un usuario administrador por defecto y los servicios iniciales:
   ```bash
   npx prisma db seed
   ```
   *Nota: El usuario administrador por defecto creado tiene las credenciales especificadas en el archivo prisma/seed.ts (usuario: admin, contrasena: admin123).*

5. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El portal web estara disponible en http://localhost:3000 y el panel administrativo en http://localhost:3000/admin/login.

## Estructura de Directorios

El codigo fuente sigue las convenciones del Next.js App Router:

* `app/`: Directorio principal de rutas de la aplicacion.
  * `admin/`: Rutas protegidas de administracion.
    * `login/`: Formulario de acceso de personal.
    * `dashboard/`: Panel de control interactivo para gestionar licencias, archivos y catalogo.
  * `api/`: Controladores API REST expuestos para peticiones internas y externas.
  * `components/`: Componentes React modulares y reutilizables (cabecera, pie de pagina, consola remota).
  * `contacto/`: Pagina de soporte y formulario de contacto.
  * `descargas/`: Seccion publica de descarga de drivers, programas y herramientas.
  * `nosotros/`: Pagina corporativa sobre la trayectoria y valores.
  * `productos/`: Catalogo web interactivo de repuestos y suministros.
  * `servicios/`: Exposicion detallada de servicios con diseno de filas alternas.
  * `soporte/`: Pagina interactiva de conexion AnyDesk yRustDesk con guia paso a paso.
* `lib/`: Configuracion de modulos compartidos, como la instancia cliente de Prisma.
* `prisma/`: Archivos de configuracion del ORM, esquema del modelo de datos y script de seed.
* `public/`: Archivos estaticos como imagenes de portafolio, logotipos de software e imagenes locales.

## Modelos de Base de Datos

El esquema Prisma (`prisma/schema.prisma`) cuenta con los siguientes modelos principales:

### Sistema Administrativo
* Usuario: Representa al personal tecnico con Roles (admin, tecnico, vendedor) y credenciales de acceso.
* Licencia: Control de licencias de software asignadas a clientes finales, incluyendo estados de vigencia.
* ArchivoTecnico: Registro de archivos cargados por los tecnicos para soporte interno y descargas.

### Sistema Web Publico
* Servicio: Servicios de soporte y reparaciones mostrados en el portal.
* Categoria: Clasificacion para organizar los productos del catalogo.
* Producto: Articulos disponibles para venta y cotizacion (SSD, memorias, ribbons, consumibles).
* TrabajoRealizado: Album de trabajos reales y proyectos ejecutados en la empresa para exposicion de portafolio.

## Seguridad y Middleware

El archivo `middleware.ts` protege las secciones criticas del sistema. Bloquea peticiones no autenticadas en la ruta `/admin/dashboard` y los metodos de escritura (`POST`, `PUT`, `DELETE`) en la API, mientras mantiene la lectura (`GET`) accesible de forma publica en los recursos compartidos, garantizando la continuidad operativa y protegiendo los datos estrategicos del negocio.

## Compilacion para Produccion

Para generar el build optimizado de Next.js:

```bash
npm run build
```

Una vez construido el proyecto con exito, puede iniciarlo en produccion usando:

```bash
npm run start
```
