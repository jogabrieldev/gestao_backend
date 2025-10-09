import { Request, Response } from "express";
import { createClient , getAllClient } from "../services/clientService";


export const registerClient = async (req: Request, res: Response) => {
  try {
       
    const userId = Number(res.locals.userId); // garante que seja um número
     
    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const client = await createClient(req.body , userId);
    return res.status(201).json(client);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllClientsController = async (_req: Request, res: Response) => {
  const userId = res.locals.userId

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
  try {
    const clients = await getAllClient(userId);
    if(!clients) return res.status(400).json({message:"ERRO em buscar os clientes"})
    return res.status(200).json(clients);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

