import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/validate";
import { prisma } from "../prisma/client";
import type { LoginDTO } from "../types/authenticateTypes";

export const authenticateUser = async ({ email, password }: LoginDTO, secret: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  const validPassword = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !validPassword) throw new AppError("E-mail ou senha inválidos.", 401);

  const token = jwt.sign({ userId: user.id_user }, secret, {
    expiresIn: "1d",
    issuer: "gestao-api",
    audience: "gestao-frontend",
  });

  return { token, user: { id: user.id_user, name: user.name, email: user.email } };
};
