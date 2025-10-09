import { Request, Response } from "express";
import { createSupplier } from "../services/supplierService";


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