

import { prisma } from "../prisma/client";
import { CreateClient } from "../types/clientTypes";

export const createClient = async (data: CreateClient, userId: number) => {

  const existingEmail = await prisma.client.findUnique({ where: { email: data.email } });
  if (existingEmail) {
    throw new Error("E-mail já cadastrado.");
  }

  const existingCpf = await prisma.client.findUnique({ where: { cpf: data.cpf } });
  if (existingCpf) {
    throw new Error("CPF já cadastrado.");
  }

  if (data.phone) {
    const existingPhone = await prisma.client.findFirst({ where: { phone: data.phone } });
    if (existingPhone) {
      throw new Error("Telefone já cadastrado.");
    }
  }

  try {
    const client = await prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        data_nasc: new Date(data.data_nasc),
        phone: data.phone ?? null, 
        userId: userId,
      },
    });
     if(client) return client;
   
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar cliente");
  }
};