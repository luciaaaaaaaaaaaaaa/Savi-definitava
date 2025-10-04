import * as UserService from './userService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import jwtConfig from '../config/jwt.js';

/**
 * login
 * Autentica a un usuario usando email/password. Si las credenciales
 * son válidas, genera un JWT con la información base del usuario y lo devuelve
 * junto con el objeto `user`.
 * @param {{email:string,password:string}} param0
 */
export const login = async ({ email, password }) => {
  const user = await UserService.findByEmail(email);
  if (!user) throw new Error('Usuario no encontrado');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Contraseña incorrecta');
  // Firmar token con secret y expiración configurados en config/jwt.js
  const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  return { token, user };
};
