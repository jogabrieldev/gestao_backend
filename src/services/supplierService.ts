import { prisma } from '../prisma/client';
import {CreateSupplier} from "../types/supplier"

//Serviços fornecedor
export const createSupplier= async(data:CreateSupplier , userId:number)=>{
      
    const existingCnpj = await prisma.fornecedor.findUnique({ where: { cnpj: data.cnpj } });
  if (existingCnpj) {
    throw new Error("CNPJ já cadastrado.");
  }

  if (data.phone) {
    const existingPhone = await prisma.fornecedor.findFirst({ where: { phone: data.phone } });
    if (existingPhone) {
      throw new Error("Telefone já cadastrado.");
    }
  }

   try {
       const supplier = await prisma.fornecedor.create({
          data:{
            name_empresa:data.name_empresa,
            cnpj:data.cnpj,
            email:data.email,
            phone:data.phone,
            userId: userId,

          }
       })
       if(supplier) return supplier
    
   } catch (error) {
      console.error("erro" , error)
      throw new Error("Erro ao criar o fornecedor")
   }
};

export const getAllSupplier= async(userId:number)=>{
      try {
         const supplier = await prisma.fornecedor.findMany({
            where:{userId}
         })
         if(supplier) return supplier
      } catch (error) {
         console.error("Erro para buscar os fornecedores do usuario")
         throw Error("Erro para buscar os fornecedores do usuario")
      }
};

export const deleteSupplierById = async (id: number, userId: number) => {
  try {
    // Verifica se o fornecedor existe e pertence ao usuário
    const supplier = await prisma.fornecedor.findUnique({
      where: { id_forne: id },
    });

    if (!supplier || supplier.userId !== userId) {
      throw new Error("Fornecedor não encontrado ou não autorizado.");
    }

    // Deleta o fornecedor pelo ID
    const deletedSupplier = await prisma.fornecedor.delete({
      where: { id_forne: id },
    });

    return deletedSupplier; // retorna o fornecedor deletado
  } catch (error: any) {
    console.error("Erro ao deletar fornecedor:", error);

    // Trata erro específico do Prisma quando o registro não é encontrado
    if (error.code === "P2025") {
      throw new Error("Fornecedor não encontrado para deletar.");
    }

    throw new Error("Erro ao deletar fornecedor.");
  }
};

export const updateSupplier = async (id: number, data: Partial<CreateSupplier>, userId: number) => {
  const existingSupplier = await prisma.fornecedor.findUnique({ where: { id_forne: id } });

  if (!existingSupplier || existingSupplier.userId !== userId) {
    throw new Error("Fornecedor não encontrado ou não autorizado.");
  }

  // Impedir alteração de name_empresa e cnpj (mesmo se enviar)
  if (data.name_empresa && data.name_empresa !== existingSupplier.name_empresa) {
    throw new Error("Não é permitido alterar o nome da empresa.");
  }
  if (data.cnpj && data.cnpj !== existingSupplier.cnpj) {
    throw new Error("Não é permitido alterar o CNPJ.");
  }

  // Verificar duplicidade de email
  if (data.email && data.email !== existingSupplier.email) {
    const existingEmail = await prisma.fornecedor.findFirst({ where: { email: data.email } });
    if (existingEmail) throw new Error("E-mail já cadastrado.");
  }

  // Verificar duplicidade de telefone
  if (data.phone && data.phone !== existingSupplier.phone) {
    const existingPhone = await prisma.fornecedor.findFirst({ where: { phone: data.phone } });
    if (existingPhone) throw new Error("Telefone já cadastrado.");
  }

  const updatedSupplier = await prisma.fornecedor.update({
    where: { id_forne: id },
    data: {
      ...(data.email && { email: data.email }),
      ...(data.phone && { phone: data.phone }),
    },
  });

  return updatedSupplier;
};

