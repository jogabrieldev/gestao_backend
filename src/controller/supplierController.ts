import { Request, Response } from "express";
import { createSupplier , getAllSupplier , getSupplierByCnpj, deleteSupplierById , updateSupplier } from "../services/supplierService";

export const registerSupplier = async (req: Request, res: Response) => {
  try {
    const userId = Number(res.locals.userId); 
     
    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const client = await createSupplier(req.body , userId);
    return res.status(201).json(client);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllSupplierController = async (req:Request , res: Response)=>{
    const userId = Number(res.locals.userId)

    if(!userId){
      return res.status(401).json({erro: "Usuário não autenticado"})
    }
    try {
       const supplier = await getAllSupplier(userId)
       if(!supplier) return res.status(400).json({error:"Erro ao buscar fornecedores"})
       return res.status(200).json(supplier)
    } catch (error:any) {
         return res.status(400).json({ error: error.message});
    }
};

export const getSupplierByCnpjController = async (req:Request , res:Response)=>{

      const {cnpj} = req.params
      const userId = Number(res.locals.userId)

      if (!cnpj || !userId) {
         return res.status(400).json({ error: "CPF ou usuário não informado." });
      }

     try {
      const supplier = await getSupplierByCnpj(cnpj , userId)
      return res.status(200).json(supplier)
    } catch (error:any) {
        return res.status(404).json({ error: error.message });
   }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = res.locals.userId;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autorizado" });
  }

  try {
    const deletedSupplier = await deleteSupplierById(id, userId);
    return res.status(200).json({
      message: "Fornecedor deletado com sucesso",
      supplier: deletedSupplier,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateSupplierController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = Number(res.locals.userId);

  if (!userId) return res.status(401).json({ error: "Usuário não autenticado" });

  try {
    const updatedSupplier = await updateSupplier(id, req.body, userId);
    return res.status(200).json({
      message: "Fornecedor atualizado com sucesso!",
      supplier: updatedSupplier,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

