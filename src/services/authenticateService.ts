import { prisma } from '../prisma/client';
import { LoginDTO } from '../types/authenticateTypes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'minha_chave_secreta';

export const authenticateUser = async ({ email, password }: LoginDTO) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuário não encontrado');
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Senha inválida');

  const token = jwt.sign({ userId: user }, SECRET, { expiresIn: '1d' });
  return { token, user };
};