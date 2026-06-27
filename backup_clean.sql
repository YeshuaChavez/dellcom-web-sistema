-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: acela.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ArchivoTecnico`
--

DROP TABLE IF EXISTS `ArchivoTecnico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ArchivoTecnico` (
  `id_archivo` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` enum('programa','driver','excel','link') COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_archivo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `fecha_subida` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id_archivo`),
  KEY `ArchivoTecnico_id_usuario_fkey` (`id_usuario`),
  CONSTRAINT `ArchivoTecnico_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ArchivoTecnico`
--

LOCK TABLES `ArchivoTecnico` WRITE;
/*!40000 ALTER TABLE `ArchivoTecnico` DISABLE KEYS */;
INSERT INTO `ArchivoTecnico` VALUES (45,26,'Zebra Setup Utilities v1.1.9','programa','https://www.zebra.com/us/en/support-downloads/software/utilities/zebra-setup-utilities.html','Herramienta de configuración oficial para calibración, configuración de red e impresión de prueba en impresoras Zebra.','2026-06-18 01:10:27.108'),(46,26,'Driver Zebra ZT411 Industrial','driver','https://www.zebra.com/us/en/support-downloads/printers/industrial/zt411.html','Controladores oficiales de Windows para impresoras industriales de etiquetas Zebra serie ZT400.','2026-06-18 01:10:28.416'),(47,26,'AnyDesk Client Custom Dellcom','link','https://anydesk.com/download','Enlace directo para la descarga del cliente oficial de soporte remoto AnyDesk.','2026-06-18 01:10:29.286'),(49,26,'Epson Advanced Printer Driver v6.02','driver','https://dellcom-suministros.s3.us-east-1.amazonaws.com/uploads/TMUSB800e-1781747943174-718536069.zip','Controlador de impresión oficial avanzado para sistemas operativos Windows. Compatible con impresoras de tickets Epson TM-T20, TM-T20II, TM-T20III y TM-T88V.','2026-06-18 01:59:12.894'),(50,26,'CrystalDiskInfo v9.2.1','programa','https://dellcom-suministros.s3.us-east-1.amazonaws.com/uploads/DiskInfo64-1781748954487-345618463.exe','Herramienta esencial para técnicos. Permite leer la salud del disco duro o SSD (S.M.A.R.T.), monitorear la temperatura de trabajo y verificar el total de horas de uso del dispositivo.','2026-06-18 02:16:11.109'),(52,26,'HWMonitor v1.52','programa','https://dellcom-suministros.s3.us-east-1.amazonaws.com/uploads/HWMonitor_v1_52-1781749156452-150295907.exe','Programa ligero que lee en tiempo real los sensores principales de hardware de PCs y Laptops: voltajes, velocidad de rotación de ventiladores y temperaturas de CPU y GPU.','2026-06-18 02:19:22.950'),(53,26,'Rufus v4.4','programa','https://dellcom-suministros.s3.us-east-1.amazonaws.com/uploads/rufus_4_15_BETA-1781749194583-354266118.exe','Utilidad gratuita y portable de código abierto que ayuda a formatear y crear soportes USB de arranque (booteables) a partir de imágenes ISO oficiales de Windows 10/11 o Linux.','2026-06-18 02:19:59.962'),(55,26,'Driver CH340 USB-to-Serial Windows','driver','https://dellcom-suministros.s3.us-east-1.amazonaws.com/uploads/CH34x_Install_Windows_v3_4-1781749454920-246854942.zip','Controlador ultra ligero (pesa solo 350 KB) ideal para adaptadores y cables de USB a Puerto Serial/RS232 con chip CH340/CH341, muy utilizados para conectar ticketeras y balanzas comerciales.','2026-06-18 02:24:20.150'),(56,26,'Plantilla Excel - Control de Licencias e Inventario','excel','https://dellcom-suministros.s3.us-east-1.amazonaws.com/uploads/control_inventario_en_excel-1781749495197-403803343.xlsx','Plantilla en formato Excel (.xlsx) prediseñada para que las empresas lleven un inventario estructurado de sus computadoras, software instalado, claves de activación y alertas de renovación.','2026-06-18 02:24:58.116'),(57,26,'PuTTY v0.81 (Consola de Conexión Serial)','programa','https://dellcom-suministros.s3.us-east-1.amazonaws.com/uploads/PuTTY__64bit__v0_81-1781749553044-448769099.msi','Utilidad técnica extremadamente ligera indispensable para comunicarse y enviar comandos directos (ESC/POS) a impresoras térmicas a través del puerto COM.','2026-06-18 02:26:00.553'),(58,26,'RustDesk - Soporte Remoto','link','https://rustdesk.com/download','Enlace de descarga para el cliente oficial de soporte remoto RustDesk. Funciona como una excelente alternativa rápida y sin límites a AnyDesk o TeamViewer.','2026-06-18 02:27:04.252'),(60,26,'Zebra Printer Setup Utilities','excel','https://dellcom-suministros.s3.us-east-1.amazonaws.com/uploads/printer_setup_utilities_windows_fact_sheet_en_us-1781750787688-906770343.pdf','Documento de configuración oficial de Zebra. Permite calibrar sensores de etiquetas, configurar direcciones IP de red, ajustar velocidad/oscuridad de impresión y enviar comandos directos a la impresora.','2026-06-18 02:46:46.920');
/*!40000 ALTER TABLE `ArchivoTecnico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categoria`
--

DROP TABLE IF EXISTS `Categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `Categoria_nombre_key` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categoria`
--

LOCK TABLES `Categoria` WRITE;
/*!40000 ALTER TABLE `Categoria` DISABLE KEYS */;
INSERT INTO `Categoria` VALUES (86,'Ribbons y Tintas',0),(87,'Memorias y Discos',1),(88,'Tarjetas ZEBRA',1),(89,'Periféricos y Accesorios',1),(90,'Licencias de Software',1),(91,'Repuestos de Laptops',1),(92,'Impresoras Térmicas y Tickets',1),(93,'Antivirus',1),(94,'Ofimática',1),(95,'Sistemas Operativos',1);
/*!40000 ALTER TABLE `Categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Licencia`
--

DROP TABLE IF EXISTS `Licencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Licencia` (
  `id_licencia` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `software` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo_cuenta` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_inicio` datetime(3) NOT NULL,
  `fecha_fin` datetime(3) DEFAULT NULL,
  `nombre_cliente` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` enum('activo','vencido') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'activo',
  `observaciones` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id_licencia`),
  KEY `Licencia_id_usuario_fkey` (`id_usuario`),
  CONSTRAINT `Licencia_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Licencia`
--

LOCK TABLES `Licencia` WRITE;
/*!40000 ALTER TABLE `Licencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `Licencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MensajeContacto`
--

DROP TABLE IF EXISTS `MensajeContacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MensajeContacto` (
  `id_mensaje` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `asunto` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mensaje` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT '0',
  `fecha` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `id_usuario_leido` int DEFAULT NULL,
  PRIMARY KEY (`id_mensaje`),
  KEY `MensajeContacto_id_usuario_leido_fkey` (`id_usuario_leido`),
  CONSTRAINT `MensajeContacto_id_usuario_leido_fkey` FOREIGN KEY (`id_usuario_leido`) REFERENCES `Usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MensajeContacto`
--

LOCK TABLES `MensajeContacto` WRITE;
/*!40000 ALTER TABLE `MensajeContacto` DISABLE KEYS */;
INSERT INTO `MensajeContacto` VALUES (39,'Roberto Carlos Díaz','roberto.diaz@gmail.com','987654321','Cotización de Servicio','Estimados, requiero una cotización para realizar el mantenimiento preventivo y limpieza de 3 impresoras de etiquetas Zebra GK420t en nuestras oficinas de Los Olivos. Agradecería que se comuniquen lo antes posible.',0,'2026-06-18 01:10:30.224',NULL),(40,'Carlos Ramos Villacorta','operaciones@logisticanorte.pe','981442385','Soporte Técnico','Estimados señores de Dellcom, tenemos un problema con una impresora de etiquetas Zebra GK420t en nuestro almacén de Los Olivos. Al mandar a imprimir, la luz de estado se pone en rojo fijo y no avanza el papel. Ya cambiamos el ribbon y las etiquetas, pero el problema persiste. Requerimos la visita de un técnico de manera urgente para que pueda diagnosticar y calibrar el sensor. Quedamos a la espera de su respuesta.',0,'2026-06-18 01:14:04.054',NULL),(41,'Alejandro Gómez Silva','contacto@estudioalianza.com.pe','992881047','Reparación de Hardware','Buenas tardes. Una de nuestras laptops de oficina, una Dell Latitude 3420, dejó de encender repentinamente después de una fluctuación de voltaje ayer por la tarde. El cargador emite luz normal, pero la laptop no da ninguna señal de vida ni enciende los LEDs laterales de carga. Deseamos llevar el equipo a su taller en San Elías para un diagnóstico microelectrónico de la placa base. Por favor, indíquennos su horario de atención para mañana.',0,'2026-06-18 01:15:30.235',NULL),(43,'Beatriz Medina Torres','administracion@odontosalud.pe','955002134','Licencias y Software','Hola, Dellcom. Estamos renovando las computadoras de recepción y consultorios (6 PCs en total). Vienen con Windows 11 Home de fábrica, pero necesitamos actualizarlas a Windows 11 Pro por políticas de dominio, e instalarles licencias originales de Microsoft Office 2021 Hogar y Empresas con factura electrónica. Quisiéramos una cotización formal y si brindan el soporte de instalación de forma remota mediante AnyDesk. Muchas gracias.',0,'2026-06-18 01:29:16.393',NULL),(44,'Ricardo Flores Prado','compras@inkafarmaexpress.pe','944331088','Cotización de Servicio','Hola, nos comunicamos desde nuestro local en Comas. Contamos con una impresora de tickets Epson TM-T20III que está imprimiendo muy tenue en el lado derecho del papel de recibos, y a veces se atasca la guillotina de corte automático. Solicitamos una cotización para un mantenimiento preventivo y limpieza de cabezal térmico, o en su defecto, el costo de repuesto si requiere cambio de cabezal.',0,'2026-06-18 01:29:37.030',NULL),(45,'Luis Fernando Estrada','sistemas@sanfelipe.edu.pe','966887711','Soporte Técnico','Buenas noches, actualmente tenemos nuestro correo institucional en un plan de hosting básico cPanel, pero sufrimos constantes rebotes de correos cuando escribimos a cuentas de Gmail o Outlook, y las casillas se llenan rápido. Queremos migrar a 15 usuarios a Google Workspace utilizando nuestro mismo dominio. Deseamos saber si Dellcom realiza todo el proceso de migración de historial, configuración de registros MX/SPF/DKIM y cuánto sería el costo de implementación.',0,'2026-06-18 01:30:02.142',NULL),(46,'Carlos Mendoza Quispe','carlos.mendoza@gmail.com','987654321','Reparación de Hardware','Buenas tardes, mi laptop HP Pavilion se apagó de repente y ya no enciende. Le hice un mantenimiento hace como 8 meses pero ahora cuando presiono el botón de encendido solo parpadea la luz un segundo y se apaga. ¿Cuánto me costaría el diagnóstico? ¿Tienen local en Lima? Gracias.',0,'2026-06-19 05:12:45.420',NULL),(49,'Pedro Gutierrez Castro','pedro.gutierrez@colimasolutions.com','981234567','Licencias y Software','Estimados, solicito una cotización formal para la adquisición e instalación de 10 licencias originales de Windows 11 Pro para las computadoras de nuestra nueva oficina. Agradecería que me indiquen los precios y métodos de pago.',1,'2026-06-19 14:07:15.648',26),(50,'Pedro Espinoza','pedro.espinoza@empresa.com','987654321','Soporte Técnico','Buenos días, tenemos 5 laptops con problemas de arranque en nuestra empresa. Quisiera cotizar un servicio de diagnóstico y reparación masiva.',0,'2026-06-22 07:02:30.687',NULL);
/*!40000 ALTER TABLE `MensajeContacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PasswordResetToken`
--

DROP TABLE IF EXISTS `PasswordResetToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PasswordResetToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PasswordResetToken_token_key` (`token`),
  KEY `PasswordResetToken_id_usuario_fkey` (`id_usuario`),
  CONSTRAINT `PasswordResetToken_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PasswordResetToken`
--

LOCK TABLES `PasswordResetToken` WRITE;
/*!40000 ALTER TABLE `PasswordResetToken` DISABLE KEYS */;
INSERT INTO `PasswordResetToken` VALUES (1,'4f9f0cf930d452a9f02f0cdda98f4f17a97efe926c6a86e83b241257fcc6ac8e','ian.vargas@unmsm.edu.pe','2026-06-17 00:13:49.625',1,'2026-06-16 23:13:49.634',26),(2,'67d3903cf283a6c74ab2dcb93028d0c3391ddd072ebfc218fd1da99b456dbcab','sebastianfuentespoma@gmail.com','2026-06-17 00:39:31.918',1,'2026-06-16 23:39:31.919',26);
/*!40000 ALTER TABLE `PasswordResetToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Producto`
--

DROP TABLE IF EXISTS `Producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `precio` decimal(10,2) NOT NULL,
  `imagen_url` text COLLATE utf8mb4_unicode_ci,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `Producto_id_categoria_fkey` (`id_categoria`),
  KEY `Producto_id_usuario_fkey` (`id_usuario`),
  CONSTRAINT `Producto_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria` (`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Producto_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Producto`
--

LOCK TABLES `Producto` WRITE;
/*!40000 ALTER TABLE `Producto` DISABLE KEYS */;
INSERT INTO `Producto` VALUES (203,87,'Disco SSD Kingston A400 480GB SATA','Unidad de estado sólido SATA III de 2.5 pulgadas. Increíble velocidad de lectura (hasta 500MB/s) y escritura (450MB/s) para repotenciar laptops y PCs de escritorio.',180.00,'/img/productos/ssd-480gb.jpg',1,'2026-06-18 01:10:05.419','2026-06-19 13:15:18.873',26),(204,87,'Disco Duro Externo Adata HD330 1TB','Disco duro externo resistente a impactos y caídas con carcasa de silicona amortiguadora. Conexión USB 3.2 rápida y cifrado seguro AES de 256 bits.',245.00,'/img/productos/disco-externo-1tb.jpg',1,'2026-06-18 01:10:06.711','2026-06-19 13:15:18.873',26),(205,87,'Memoria RAM Kingston Valueram 8GB DDR4 3200MHz','Memoria RAM DDR4 de alto rendimiento y bajo consumo energético. Ideal para repotenciar laptops y mejorar la capacidad multitarea.',120.00,'/img/productos/ram-8gb-ddr4.jpg',1,'2026-06-18 01:10:08.163','2026-06-19 13:15:18.873',26),(206,87,'Memoria USB 3.2 Kingston Exodia 32GB','Memoria USB portátil Kingston DataTraveler Exodia con conexión USB 3.2 Gen 1 rápida. Diseño práctico con capuchón protector y llavero colorido.',29.00,'/img/productos/memoria-usb-32gb.jpg',1,'2026-06-18 01:10:09.067','2026-06-19 13:15:18.873',26),(207,88,'Cinta Ribbon Zebra YMCKO 800300-350LA','Cinta ribbon de color original YMCKO de alto rendimiento para impresoras de tarjetas Zebra ZC100 y ZC300. Produce hasta 350 impresiones de alta definición.',290.00,'/img/productos/ribbon-zebra-800300-350la.jpg',1,'2026-06-18 01:10:09.894','2026-06-19 13:15:18.873',26),(208,86,'Ribbon de Cera Zebra 110x74','Rollo de cinta ribbon de cera de alta calidad para impresoras térmicas industriales y de escritorio. Transferencia térmica nítida en etiquetas de papel.',45.00,'/img/productos/ribbon-cera.jpg',1,'2026-06-18 01:10:11.208','2026-06-19 13:15:18.873',26),(209,86,'Tinta HP 664 Negra Original','Cartucho de tinta negra original HP 664. Diseñado para imprimir con calidad profesional constante, evitando impresiones borrosas o fallas.',65.00,'/img/productos/tinta-hp-664.jpg',1,'2026-06-18 01:10:12.125','2026-06-19 13:15:18.873',26),(210,86,'Etiquetas Térmicas Directas 102x152mm','Rollo de etiquetas térmicas autoadhesivas de alta adherencia. Ideales para despacho de mercadería, Courier, y rotulado de cajas (500 etiquetas).',45.00,'/img/productos/etiquetas-termicas.jpg',1,'2026-06-18 01:10:13.002','2026-06-19 13:15:18.873',26),(211,89,'Mouse Inalámbrico Logitech M170','Mouse inalámbrico de 2.4GHz ergonómico y ambidiestro. Receptor USB plug and play con alcance de hasta 10 metros y batería de larga duración.',45.00,'/img/productos/mouse-logitech.jpg',1,'2026-06-18 01:10:13.879','2026-06-19 13:15:18.873',26),(212,89,'Teclado Logitech K120 USB','Teclado cableado estándar USB resistente a salpicaduras. Teclas silenciosas, perfil plano y patas ajustables para una escritura cómoda.',38.00,'/img/productos/teclado-logitech.jpg',1,'2026-06-18 01:10:14.740','2026-06-19 13:15:18.873',26),(213,89,'Mousepad Ergonómico con Apoya Muñeca de Gel','Mousepad con diseño ergonómico de base antideslizante. Relleno de gel suave que reduce la tensión en la muñeca durante largas jornadas.',25.00,'/img/productos/mousepad.jpg',1,'2026-06-18 01:10:15.684','2026-06-19 13:15:18.873',26),(214,90,'Licencia Windows 11 Pro Retail 64-bit','Clave de activación digital original Retail de Windows 11 Professional. Activación permanente en un equipo, vinculable a cuenta Microsoft.',120.00,'/img/productos/windows_11_pro.jpg',1,'2026-06-18 01:10:16.649','2026-06-19 13:15:18.873',26),(215,90,'Licencia Windows 11 Home Retail 64-bit','Clave de activación digital original Retail de Windows 11 Home. Activación permanente en un equipo, ideal para computadoras del hogar y laptops personales.',95.00,'/img/productos/windows_11_home.jpg',1,'2026-06-18 01:10:17.604','2026-06-19 13:15:18.873',26),(216,90,'Licencia Office 2024 Professional Plus','Clave digital original de activación de la suite Office 2024 Professional Plus. Incluye Word, Excel, PowerPoint, Outlook, Teams, OneNote y Access. Licencia permanente.',295.00,'/img/productos/office_2024.jpg',1,'2026-06-18 01:10:18.661','2026-06-19 13:15:18.873',26),(217,91,'Pantalla LED 15.6\" HD Slim 30 pines','Panel LCD LED de 15.6\" resolución HD (1366x768) conector slim 30 pines. Compatible con Lenovo IdeaPad 330, HP 250 G7, Acer Aspire 3, Dell Inspiron 3580. Brillo 200 nits.',220.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/540-1781775381183-387240535.webp||https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/w_1500_h_1500_fit_cover-1781775394336-606965713.webp',1,'2026-06-18 09:36:43.930','2026-06-19 13:15:18.873',26),(218,91,'Teclado HP 250 G7 / 255 G7 Español','Teclado de reemplazo layout español (Ñ) para HP 250 G7, 255 G7, 15-da y 15-db series. Color negro sin backlight. Conector flat ribbon integrado.',85.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/image_ccf8fce99e1a4a18b491c30e10405f2a-1781775836422-703461799.jpg',1,'2026-06-18 09:44:00.534','2026-06-19 13:15:18.873',26),(219,91,'Batería HP HS04 14.6V 2670mAh','Batería 4 celdas para HP 250 G4, 255 G4, Pavilion 14-ac y 15-ac. Capacidad 41Wh. Protección contra sobrecarga y cortocircuito. Duración estimada 3-4 horas.',150.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/BATERIA_HP_HS04_14_6V_2670MAH-1781775900886-805210393.jpg',1,'2026-06-18 09:45:03.662','2026-06-19 13:15:18.873',26),(220,91,'Cargador HP 19.5V 3.33A 65W Punta Azul 4.5mm','Adaptador compatible con HP 250 G7, Pavilion 14/15, ProBook 440/450. Entrada 100-240V AC. Cable de alimentación incluido con protección contra sobretensión.',50.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/producto_4318_lg-1781775951368-424876343.jpg',1,'2026-06-18 09:45:58.459','2026-06-26 05:09:09.982',26),(221,91,'	Cargador Lenovo 20V 3.25A 65W USB-C','Adaptador USB Type-C 65W para ThinkPad T480, T490, X1 Carbon, Yoga. Compatible con cualquier laptop que acepte carga USB-C PD. Cable de 1.8m.',95.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/0305005-1781776040382-573529995.png',1,'2026-06-18 09:47:44.523','2026-06-19 13:15:18.873',26),(222,92,'Impresora Térmica de Tickets Epson TM-T20III USB','Impresora de recibos punto de venta. Velocidad 250mm/s, corte automático, ancho 80mm. Compatible con sistemas POS Windows y Android. Incluye fuente, cable USB y rollo de prueba.',650.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/preptmt20iii-1781776321685-72670007.jpg',1,'2026-06-18 09:52:11.293','2026-06-19 13:15:18.873',26),(223,92,'Rollo de Papel Térmico 80x80mm (Caja x50)','Rollo de papel térmico 80mm para impresoras POS. Alta blancura (83%). Compatible con Epson TM-T20, TM-T88, Star TSP100, Bixolon SRP-350.',95.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/Rollo_te_rmico_80x80mm_Mister_Paper-1781776409850-805297292.jpg',1,'2026-06-18 09:53:58.593','2026-06-19 13:15:18.873',26),(224,92,'Cabezal Térmico Zebra GK420t 203dpi','Cabezal de reemplazo original para Zebra GK420t. Restaura calidad de impresión cuando hay líneas blancas o baja nitidez por desgaste. Incluye instalación y calibración en sede.',380.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/51V4eRicTFL__AC_SL1002__scaled-1781776489462-245095835.jpg',1,'2026-06-18 09:54:52.793','2026-06-19 13:15:18.873',26),(225,92,'Impresora Térmica Portátil Bluetooth 58mm','Impresora de recibos portátil con conexión Bluetooth y USB. Ancho de papel 58mm, velocidad 90mm/s. Batería recargable de 1500mAh. Ideal para delivery, cobranzas en campo y ferias. Compatible con Android e iOS.',185.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/ER_58I_1_600x600-1781776550948-93680013.png',1,'2026-06-18 09:56:01.878','2026-06-19 13:15:18.873',26),(226,91,'Cargador HP 19.5V 3.33A 65W Punta Azul 4.5mm','Adaptador de corriente compatible con laptops HP con conector cilíndrico azul de 4.5mm. Entrada: 100-240V AC. Salida: 19.5V 3.33A (65W). Compatible con HP 250 G7, Pavilion 14/15, ProBook 440/450 G5-G7. Cable de alimentación incluido con protección contra sobretensión.',75.00,'https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/image_c741c08d1a2e412390807bfd0069238f-1781842347691-551645682.webp',1,'2026-06-19 04:12:54.207','2026-06-19 13:15:18.873',26),(228,91,'repuesto de laptop',NULL,1500.00,'https://api.compuusa.com.pe/uploads/products/c1729c3e-3eae-4b42-bb91-bbcf4e11787f.jpg||https://dellcom-suministros.s3.us-east-1.amazonaws.com/productos/c1729c3e_3eae_4b42_bb91_bbcf4e11787f-1782248342040-711387259.jpg',0,'2026-06-23 20:59:12.840','2026-06-25 22:33:05.390',26),(229,93,'ESET Internet Security 2025','Protege tus dispositivos con la solución de seguridad integral ESET Internet Security 2025.\n* Instalación remota en tu equipo (Gratis)\n* Configuración avanzada del antivirus\n* Soporte técnico continuo',60.00,'https://pc-segura.com/img/antivirus-eset-internet-security-2025.jpg',1,'2026-06-25 22:30:50.160','2026-06-25 22:32:57.384',26),(230,93,'Kaspersky Total Security','Garantiza tu seguridad en línea con Kaspersky Total Security.\n* Instalación remota (Gratis)\n* Configuración de protección personalizada\n* Asesoramiento sobre el uso seguro',100.00,'https://pc-segura.com/img/antivirus-kaspersky-total-security.jpg',1,'2026-06-25 22:34:06.558','2026-06-25 22:34:06.558',26),(231,93,'McAfee Live Safe','Disfruta de una protección integral con McAfee LiveSafe.\n* Instalación remota en múltiples dispositivos (Gratis)\n* Configuración personalizada\n* Soporte técnico continuo',79.00,'https://pc-segura.com/img/antivirus-mcafee-live-safe.jpg',1,'2026-06-25 22:34:48.795','2026-06-25 22:34:48.795',26),(232,94,'Microsoft Office 2021','Optimiza tu productividad con Microsoft Office 2021. Incluye instalación remota y configuración de herramientas como Word, Excel y PowerPoint.\n* Instalación remota (Gratis)\n* Configuración personalizada de las aplicaciones\n* Asesoramiento en el uso de herramientas',60.00,'https://pc-segura.com/img/microsoft-office-2021.jpg',1,'2026-06-25 22:35:39.059','2026-06-25 22:35:39.059',26),(233,94,'Microsoft Office 2019','Potencia tu flujo de trabajo con Microsoft Office 2019. Nuestro servicio incluye la instalación y personalización según tus necesidades.\n* Instalación remota (Gratis)\n* Configuración personalizada\n* Soporte técnico inicial',60.00,'https://pc-segura.com/img/microsoft-office-2019.jpg',1,'2026-06-25 22:36:18.659','2026-06-25 22:36:18.659',26),(234,94,'Microsoft Office 2016','Mejora tu productividad con Microsoft Office 2016. Instalación remota y configuración garantizadas.\n* Instalación remota (Gratis)\n* Configuración personalizada de las aplicaciones\n* Asesoramiento técnico continuo',60.00,'https://pc-segura.com/img/microsoft-office-2016.jpg',1,'2026-06-25 22:37:00.638','2026-06-25 22:37:00.638',26),(235,95,'Microsoft Windows 11 Pro/Home','Actualiza tu sistema operativo con Microsoft Windows 11. Ofrecemos asesoría y configuración para asegurar un rendimiento óptimo.\n* Asesoría remota del sistema operativo (Gratis)\n* Configuración personalizada según tus necesidades\n* Soporte técnico posterior a la instalación',50.00,'https://pc-segura.com/img/microsoft-windows-11-pro-home.jpg',1,'2026-06-25 22:37:57.876','2026-06-25 22:37:57.876',26),(236,95,'Microsoft Windows 10 Pro/Home','Asegura la estabilidad de tu equipo con Microsoft Windows 10. Instalación y configuración garantizadas para un óptimo rendimiento.\n* Asesoría remota del sistema operativo (Gratis)\n* Configuración personalizada\n* Soporte técnico inicial',50.00,'https://pc-segura.com/img/microsoft-windows-10-pro-home.jpg',1,'2026-06-25 22:38:37.861','2026-06-25 22:38:37.861',26),(237,95,'Microsoft Windows 8.1','Optimiza tu equipo con Microsoft Windows 8.1. Ofrecemos asesoría remota y configuración personalizada.\n* Asesoría remota del sistema operativo (Gratis)\n* Configuración personalizada\n* Soporte técnico posterior a la instalación',50.00,'https://pc-segura.com/img/microsoft-windows-8.1-pro.jpg',1,'2026-06-25 22:39:23.141','2026-06-25 22:39:23.141',26),(238,95,'Microsoft Windows 8','Renueva tu sistema con Microsoft Windows 8. Instalación y configuración garantizadas para un óptimo rendimiento.\n* Asesoría remota del sistema operativo (Gratis)\n* Configuración personalizada\n* Soporte técnico inicial',50.00,'https://pc-segura.com/img/microsoft-windows-8-pro.jpg',1,'2026-06-25 22:40:08.103','2026-06-25 22:40:08.103',26),(239,95,'Microsoft Windows 7','Asegura la estabilidad de tu equipo con Microsoft Windows 7. Incluye asesoría remota y soporte técnico inicial.\n* Asesoría remota del sistema operativo (Gratis)\n* Configuración personalizada\n* Asesoramiento técnico',50.00,'https://pc-segura.com/img/microsoft-windows-7-pro.jpg',1,'2026-06-25 22:40:47.141','2026-06-25 22:40:47.141',26);
/*!40000 ALTER TABLE `Producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Servicio`
--

DROP TABLE IF EXISTS `Servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Servicio` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icono_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_servicio`),
  KEY `Servicio_id_usuario_fkey` (`id_usuario`),
  CONSTRAINT `Servicio_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Servicio`
--

LOCK TABLES `Servicio` WRITE;
/*!40000 ALTER TABLE `Servicio` DISABLE KEYS */;
INSERT INTO `Servicio` VALUES (102,'Reparación de Laptops e Impresoras','Diagnóstico avanzado y reparación electrónica de hardware multimarca para laptops, impresoras térmicas, láser y matriciales.','laptop_mac',1,26),(103,'Microelectrónica y Placas','Reparación a nivel de componentes en placas madre, reballing, microsoldadura y restauración de circuitos integrados quemados.','memory',1,26),(104,'Redes y Servidores','Diseño, estructurado y montaje de redes de datos, cableado Cat6/Cat6A, racks de servidores y mantenimiento de conectividad empresarial.','dns',0,26),(105,'Soporte Remoto (AnyDesk)','Asistencia técnica remota inmediata para mantenimiento de sistemas operativos, virus, configuraciones y software de oficina.','support_agent',1,26),(106,'Venta de Repuestos de Laptops','Distribución de repuestos originales y compatibles para laptops multimarca: pantallas, teclados, baterías, cargadores, placas y carcasas.','storefront',1,26),(107,'Licencias de Software','Venta e instalación de licencias de software originales para sistemas operativos Windows, suites de Office y antivirus corporativos.','verified_user',1,26),(108,'Correos Corporativos','Configuración, migración y administración de correos profesionales en Google Workspace, Microsoft 365 y Webmail corporativo.','mail',1,26),(109,'Ciberseguridad y Auditoría de Redes','Protegemos la infraestructura digital de tu negocio. Implementamos firewalls, auditorías de seguridad en router/switches y accesos VPN seguros para tus empleados.','security',0,26);
/*!40000 ALTER TABLE `Servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TrabajoRealizado`
--

DROP TABLE IF EXISTS `TrabajoRealizado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TrabajoRealizado` (
  `id_trabajo` int NOT NULL AUTO_INCREMENT,
  `id_servicio` int DEFAULT NULL,
  `titulo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `imagen_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id_trabajo`),
  KEY `TrabajoRealizado_id_servicio_fkey` (`id_servicio`),
  CONSTRAINT `TrabajoRealizado_id_servicio_fkey` FOREIGN KEY (`id_servicio`) REFERENCES `Servicio` (`id_servicio`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TrabajoRealizado`
--

LOCK TABLES `TrabajoRealizado` WRITE;
/*!40000 ALTER TABLE `TrabajoRealizado` DISABLE KEYS */;
INSERT INTO `TrabajoRealizado` VALUES (97,102,'Mantenimiento Térmico y Reparación de Laptops','Mantenimiento térmico preventivo y correctivo para laptops gaming y corporativas de alta gama. Extracción de acumulación de polvo extremo en turbinas, cambio de almohadillas térmicas (pads) secas, aplicación de pasta térmica de alta conductividad para reducir temperaturas de CPU y GPU, reemplazo de pantallas LED/IPS rotas, y repotenciación con discos SSD M.2 NVMe.','/img/portafolio/WhatsApp Image 2026-06-14 at 9.36.56 PM (1).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.36.56 PM.jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.12 PM (4).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.13 PM (6).jpeg','2026-06-15 12:00:00.000'),(98,102,'Soporte y Reparación de Impresoras Epson y Zebra','Diagnóstico y solución de encendido en impresoras Epson EcoTank CK57 MAIN mediante soldadura de transistores y fusible F1 quemados. Reparación de atascos continuos mediante cambio de engranajes de tracción y calibración de sensores ópticos. Configuración y purgado de sistemas continuos HP Smart Tank e integración inalámbrica en red local.','/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.12 PM (2).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.36.56 PM (2).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.12 PM.jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.12 PM (1).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.12 PM (5).jpeg','2026-06-15 11:00:00.000'),(99,103,'Reparación Electrónica de Placas Madre a Nivel Componente','Laboratorio de microelectrónica de precisión. Reparación de cortocircuitos detectados por termografía infrarroja de alta sensibilidad, microsoldadura de puertos de carga USB-C, programación directa de Bios EEPROM mediante grabadores externos y reballing de chips integrados (GPU/Chipset) con soldadura aleada de alta resistencia.','/img/portafolio/WhatsApp Image 2026-06-14 at 9.36.55 PM.jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.36.57 PM (2).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.12 PM (3).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.13 PM (1).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.13 PM (5).jpeg','2026-06-15 10:00:00.000'),(100,102,'Montaje Custom y Gestión de Cables de Computadoras Gamer','Diseño y armado a medida de PCs de escritorio para gaming, edición y diseño arquitectónico. Selección balanceada de componentes (procesador, tarjeta gráfica, RAM y disipación líquida), gestión oculta de cables para flujo de aire óptimo y sincronización de ventiladores ARGB.','/img/portafolio/WhatsApp Image 2026-06-14 at 9.36.57 PM (1).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.36.57 PM.jpeg','2026-06-15 08:00:00.000'),(101,107,'Saneamiento de Software y Configuración de Correos Corporativos','Soporte corporativo presencial y remoto vía AnyDesk/RustDesk. Activación legal de licencias oficiales Windows 10/11 Pro OEM/Retail, suites de Microsoft Office 2021 Hogar y Empresas, configuración de correos corporativos en Google Workspace y Microsoft 365 bajo políticas seguras de spam y envío de emails.','/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.13 PM.jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.13 PM (2).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.13 PM (3).jpeg||/img/portafolio/WhatsApp Image 2026-06-14 at 9.41.13 PM (4).jpeg','2026-06-15 07:00:00.000'),(102,102,'Mantenimiento preventivo y reparación de sistema mecánico en Impresora','Desarmado completo, limpieza de cabezales y corrección de atasco de papel en módulo de arrastre. El equipo quedó operativo y realizando pruebas de impresión correctas en el taller.','https://dellcom-suministros.s3.us-east-1.amazonaws.com/portfolio/WhatsApp_Image_2026_06_14_at_9_41_13_PM-1781844503138-356254886.jpeg||https://dellcom-suministros.s3.us-east-1.amazonaws.com/portfolio/c780c67b_5168_41b6_ae90_2cd29f7e8420-1781844513446-448265763.jpg','2026-06-19 04:48:38.011');
/*!40000 ALTER TABLE `TrabajoRealizado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` enum('admin','tecnico','vendedor') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tecnico',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `mustChangePassword` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `Usuario_usuario_key` (`usuario`),
  UNIQUE KEY `Usuario_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (26,'Administrador Dellcom','admin','admin@dellcom.pe','$2b$10$iuI3/kmo4ckRIcOI0svEYOPwnfzNIaJeRjLIwHEiUn1hyfCG1dq/a','admin',1,'2026-06-18 01:09:50.404',0),(29,'Ventas','ventas','ventas@dellcom.pe','$2b$10$x6mNRN7dQo0YT4olZrUud.lRJE9qifzaRc.MoW1MatmCgSV1MXwMu','vendedor',1,'2026-06-21 06:04:27.874',0),(30,'Tecnico','tecnico','tecnico@dellcom.pe','$2b$10$3cErbMKjjIMvOETX9gyjY.Qo2kQzcWIGVKXYbU7KU4fV5NsuEdIxe','tecnico',1,'2026-06-21 06:07:23.874',0),(32,'Benjamin Velasquez','bvelasquez','benjamin.velasquez@unmsm.edu.pe','$2b$10$NATxFwxTkqI.m5QdiukbduYf74yE22wiGBhp.uUUARYf5Z/1Q1DMa','vendedor',1,'2026-06-23 06:03:52.780',1);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-26 23:34:35
