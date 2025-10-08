import { prisma } from '../prisma/client';
import { CreateUser } from '../types/userTypes';
import bcrypt from 'bcryptjs';

export const createUser = async (data: CreateUser) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
};