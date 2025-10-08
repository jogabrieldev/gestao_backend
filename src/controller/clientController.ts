import { Request, Response } from "express";
import { createClient } from "../services/clientService";


export const registerClient = async (req: Request, res: Response) => {
  try {
        console.log("user" , res.locals.userId)
     
    const userId = Number(res.locals.userId); // garante que seja um número
     

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const client = await createClient(req.body , userId);
    return res.status(201).json(client);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
