import { AppError } from "../middleware/validate";
import { prisma } from "../prisma/client";
import type { ListOptions } from "../types/clientTypes";
import type { CreateSupplier, UpdateSupplier } from "../types/supplier";

export const createSupplier = (data: CreateSupplier, userId: number) =>
  prisma.fornecedor.create({
    data: {
      name_empresa: data.name_empresa,
      cnpj: data.cnpj,
      email: data.email,
      phone: data.phone ?? null,
      userId,
    },
  });

export const getAllSupplier = async (userId: number, options: ListOptions) => {
  const where = {
    userId,
    ...(options.search && {
      OR: [
        { name_empresa: { contains: options.search } },
        { email: { contains: options.search } },
        { cnpj: { contains: options.search.replace(/\D/g, "") } },
      ],
    }),
  };

  const [items, total] = await prisma.$transaction([
    prisma.fornecedor.findMany({
      where,
      orderBy: { createdAt: options.order },
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    }),
    prisma.fornecedor.count({ where }),
  ]);

  return { items, total };
};

export const deleteSupplierById = async (id: number, userId: number) => {
  const result = await prisma.fornecedor.deleteMany({ where: { id_forne: id, userId } });
  if (result.count === 0) throw new AppError("Fornecedor não encontrado.", 404);
};

export const updateSupplier = async (id: number, data: UpdateSupplier, userId: number) => {
  const result = await prisma.fornecedor.updateMany({
    where: { id_forne: id, userId },
    data: {
      ...(data.email !== undefined && { email: data.email }),
      ...(data.phone !== undefined && { phone: data.phone }),
    },
  });

  if (result.count === 0) throw new AppError("Fornecedor não encontrado.", 404);
  return prisma.fornecedor.findFirstOrThrow({ where: { id_forne: id, userId } });
};
