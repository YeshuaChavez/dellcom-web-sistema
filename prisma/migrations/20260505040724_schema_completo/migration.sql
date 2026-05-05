/*
  Warnings:

  - The primary key for the `ArchivoTecnico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ArchivoTecnico` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ArchivoTecnico` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_herramienta` on the `ArchivoTecnico` table. All the data in the column will be lost.
  - You are about to drop the column `subido_por` on the `ArchivoTecnico` table. All the data in the column will be lost.
  - You are about to drop the column `url_descarga` on the `ArchivoTecnico` table. All the data in the column will be lost.
  - The values [Programa,Driver,Excel,Link] on the enum `ArchivoTecnico_tipo` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_categoria` on the `Categoria` table. All the data in the column will be lost.
  - The primary key for the `Licencia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cliente` on the `Licencia` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_vencimiento` on the `Licencia` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_venta` on the `Licencia` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Licencia` table. All the data in the column will be lost.
  - You are about to drop the column `notas` on the `Licencia` table. All the data in the column will be lost.
  - You are about to drop the column `password_cuenta` on the `Licencia` table. All the data in the column will be lost.
  - The primary key for the `Producto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoria_id` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Producto` table. All the data in the column will be lost.
  - The primary key for the `Servicio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Servicio` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Servicio` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Servicio` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Trabajo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuario]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_archivo` to the `ArchivoTecnico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `ArchivoTecnico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `ArchivoTecnico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_archivo` to the `ArchivoTecnico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_categoria` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contrasena` to the `Licencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_inicio` to the `Licencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_licencia` to the `Licencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `Licencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre_cliente` to the `Licencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_categoria` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_producto` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_servicio` to the `Servicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contrasena` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ArchivoTecnico` DROP FOREIGN KEY `ArchivoTecnico_subido_por_fkey`;

-- DropForeignKey
ALTER TABLE `Producto` DROP FOREIGN KEY `Producto_categoria_id_fkey`;

-- DropIndex
DROP INDEX `Categoria_nombre_categoria_key` ON `Categoria`;

-- AlterTable
ALTER TABLE `ArchivoTecnico` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `id`,
    DROP COLUMN `nombre_herramienta`,
    DROP COLUMN `subido_por`,
    DROP COLUMN `url_descarga`,
    ADD COLUMN `descripcion` TEXT NULL,
    ADD COLUMN `fecha_subida` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id_archivo` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `id_usuario` INTEGER NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `url_archivo` VARCHAR(191) NOT NULL,
    MODIFY `tipo` ENUM('programa', 'driver', 'excel', 'link') NOT NULL,
    ADD PRIMARY KEY (`id_archivo`);

-- AlterTable
ALTER TABLE `Categoria` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `nombre_categoria`,
    ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_categoria`);

-- AlterTable
ALTER TABLE `Licencia` DROP PRIMARY KEY,
    DROP COLUMN `cliente`,
    DROP COLUMN `fecha_vencimiento`,
    DROP COLUMN `fecha_venta`,
    DROP COLUMN `id`,
    DROP COLUMN `notas`,
    DROP COLUMN `password_cuenta`,
    ADD COLUMN `contrasena` VARCHAR(191) NOT NULL,
    ADD COLUMN `estado` ENUM('activo', 'vencido') NOT NULL DEFAULT 'activo',
    ADD COLUMN `fecha_fin` DATETIME(3) NULL,
    ADD COLUMN `fecha_inicio` DATETIME(3) NOT NULL,
    ADD COLUMN `id_licencia` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `id_usuario` INTEGER NOT NULL,
    ADD COLUMN `nombre_cliente` VARCHAR(191) NOT NULL,
    ADD COLUMN `observaciones` TEXT NULL,
    ADD COLUMN `telefono` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id_licencia`);

-- AlterTable
ALTER TABLE `Producto` DROP PRIMARY KEY,
    DROP COLUMN `categoria_id`,
    DROP COLUMN `id`,
    ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `id_categoria` INTEGER NOT NULL,
    ADD COLUMN `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_producto`);

-- AlterTable
ALTER TABLE `Servicio` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `estado`,
    DROP COLUMN `id`,
    ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `id_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_servicio`);

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `password_hash`,
    ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `contrasena` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `usuario` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_usuario`);

-- DropTable
DROP TABLE `Trabajo`;

-- CreateTable
CREATE TABLE `TrabajoRealizado` (
    `id_trabajo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_servicio` INTEGER NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NULL,
    `imagen_url` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_trabajo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Categoria_nombre_key` ON `Categoria`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_usuario_key` ON `Usuario`(`usuario`);

-- AddForeignKey
ALTER TABLE `Licencia` ADD CONSTRAINT `Licencia_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArchivoTecnico` ADD CONSTRAINT `ArchivoTecnico_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrabajoRealizado` ADD CONSTRAINT `TrabajoRealizado_id_servicio_fkey` FOREIGN KEY (`id_servicio`) REFERENCES `Servicio`(`id_servicio`) ON DELETE SET NULL ON UPDATE CASCADE;
