import { AppError } from "../middleware/validate";
import { prisma } from "../prisma/client";
import type { CreateClient, ListOptions, UpdateClient } from "../types/clientTypes";

export const createClient = (data: CreateClient, userId: number) =>
  prisma.client.create({
    data: {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      data_nasc: new Date(`${data.data_nasc}T00:00:00`),
      phone: data.phone ?? null,
      userId,
    },
  });

export const getAllClient = async (userId: number, options: ListOptions) => {
  const where = {
    userId,
    ...(options.search && {
      OR: [
        { name: { contains: options.search } },
        { email: { contains: options.search } },
        { cpf: { contains: options.search.replace(/\D/g, "") } },
      ],
    }),
  };

  const [items, total] = await prisma.$transaction([
    prisma.client.findMany({
      where,
      orderBy: { createdAt: options.order },
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    }),
    prisma.client.count({ where }),
  ]);

  return { items, total };
};

export const deleteClientById = async (id: number, userId: number) => {
  const result = await prisma.client.deleteMany({ where: { id_client: id, userId } });
  if (result.count === 0) throw new AppError("Cliente não encontrado.", 404);
};

export const updateClient = async (id: number, data: UpdateClient, userId: number) => {
  const result = await prisma.client.updateMany({
    where: { id_client: id, userId },
    data: {
      ...(data.email !== undefined && { email: data.email }),
      ...(data.phone !== undefined && { phone: data.phone }),
    },
  });

  if (result.count === 0) throw new AppError("Cliente não encontrado.", 404);
  return prisma.client.findFirstOrThrow({ where: { id_client: id, userId } });
};
