import bcrypt from "bcryptjs";
import { prisma } from "../prisma/client";
import type { CreateUser } from "../types/userTypes";

export const createUser = async (data: CreateUser) => {
  const password = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { name: data.name, email: data.email, password },
    select: { id_user: true, name: true, email: true, createdAt: true },
  });
};
