import { Request, Response } from "express";
import { createSupplier , getAllSupplier } from "../services/supplierService";


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
}