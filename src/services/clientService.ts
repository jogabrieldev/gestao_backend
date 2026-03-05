


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
        data_nasc: new Date(),
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
};
export const updateClient = async (id: number, data: Partial<CreateClient>, userId: number) => {
  const existingClient = await prisma.client.findUnique({ where: { id_client: id } });

  if (!existingClient || existingClient.userId !== userId) {
    throw new Error("Cliente não encontrado ou não autorizado.");
  }

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
};
