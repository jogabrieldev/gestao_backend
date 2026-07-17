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

<<<<<<< HEAD
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
=======
>>>>>>> 0c6c2742f987a4943632b37d1137aa1914c439d0

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

<<<<<<< HEAD
export const deleteClientById = async (id: number, userId: number) => {
  const result = await prisma.client.deleteMany({ where: { id_client: id, userId } });
  if (result.count === 0) throw new AppError("Cliente não encontrado.", 404);
=======
export const getAllClient = async(userId:number)=>{
   try {
      const client = await prisma.client.findMany({
        where:{userId}
      });
      if(client) return client
   } catch (error) {
      console.error("Erro para listar clientes")
      throw new Error("Erro ao buscar cliente")
   }
}


export const deleteClientById = async (id: number , userId:number) => {
  try {

      const client = await prisma.client.findUnique({
      where: { id_client: id },
    });

      if (!client || client.userId !== userId) {
      throw new Error("Cliente não encontrado ou não autorizado.");
    }
    // Deleta o cliente pelo ID
     const deletedClient = await prisma.client.delete({
      where: { id_client: id },
    });

    return deletedClient; 
  } catch (error:any) {
    console.error("Erro ao deletar cliente:", error);

    if (error.code === "P2025") {
      throw new Error("Cliente não encontrado para deletar.");
    }

    throw new Error("Erro ao deletar cliente.");
  }
>>>>>>> 0c6c2742f987a4943632b37d1137aa1914c439d0
};

export const updateClient = async (id: number, data: UpdateClient, userId: number) => {
  const result = await prisma.client.updateMany({
    where: { id_client: id, userId },
    data: {
      ...(data.email !== undefined && { email: data.email }),
      ...(data.phone !== undefined && { phone: data.phone }),
    },
  });

<<<<<<< HEAD
  if (result.count === 0) throw new AppError("Cliente não encontrado.", 404);
  return prisma.client.findFirstOrThrow({ where: { id_client: id, userId } });
=======
  if (data.name && data.name !== existingClient.name) {
    throw new Error("Não é permitido alterar o nome do cliente.");
  }

  if (data.cpf && data.cpf !== existingClient.cpf) {
    throw new Error("Não é permitido alterar o CPF do cliente.");
  }

  if (data.data_nasc && data.data_nasc !== existingClient.data_nasc.toISOString().split("T")[0]) {
    throw new Error("Não é permitido alterar a data de nascimento.");
  }

  if (data.email && data.email !== existingClient.email) {
    const existingEmail = await prisma.client.findUnique({ where: { email: data.email } });
    if (existingEmail) throw new Error("E-mail já cadastrado.");
  }

  if (data.phone && data.phone !== existingClient.phone) {
    const existingPhone = await prisma.client.findFirst({ where: { phone: data.phone } });
    if (existingPhone) throw new Error("Telefone já cadastrado.");
  }

  try {
    const updatedClient = await prisma.client.update({
      where: { id_client: id },
      data: {
        ...(data.email && { email: data.email }),
        ...(data.phone && { phone: data.phone }),
      },
    });

    return updatedClient;
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw new Error("Erro ao atualizar cliente.");
  }
>>>>>>> 0c6c2742f987a4943632b37d1137aa1914c439d0
};
