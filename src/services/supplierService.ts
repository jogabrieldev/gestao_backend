import { prisma } from '../prisma/client';
import {CreateSupplier} from "../types/supplier"

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
}