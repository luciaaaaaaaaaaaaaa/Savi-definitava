import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';

export const register = async ({ name, email, password }) => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new Error('El usuario ya existe');
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }
  });
  return user;
};

export const findByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const registerCompany = async ({ name, email, password, ...rest }) => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new Error('El usuario ya existe');
  const hashedPassword = await bcrypt.hash(password, 10);
  // Por ahora guardamos la empresa en la tabla User (schema actual).
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }
  });
  return user;
};
