import { PrismaClient } from '@prisma/client';

// Instancia única del cliente de Prisma. Se reutiliza en los servicios
// para hacer consultas a la base de datos.
const prisma = new PrismaClient();

/**
 * connectDB
 * Intenta establecer la conexión con la base de datos utilizando Prisma.
 * Si la conexión falla, se imprime el error y se finaliza el proceso porque
 * la API depende de la base de datos para funcionar.
 */
export const connectDB = async () => {
  // Intenta establecer la conexión con la base de datos.
  try {
    await prisma.$connect();
    console.log('MySQL conectado con Prisma');
  } catch (error) {
    console.error('Error conectando a MySQL:', error);
    // Salir con código 1 para indicar fallo crítico en la inicialización
    process.exit(1);
  }
};

export default prisma;
