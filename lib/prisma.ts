/**
 * Singleton de PrismaClient compartido en todo el servidor.
 * En desarrollo, Next.js recarga los módulos en cada cambio (hot reload),
 * lo que crearía múltiples conexiones a la base de datos sin este patrón.
 * La instancia se guarda en `global` para reutilizarla entre recargas.
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

// Solo en desarrollo: almacena la instancia en global para evitar conexiones duplicadas
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;