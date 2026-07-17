import type { NextFunction, Request, Response } from "express";
import type { ListOptions } from "../types/clientTypes";
import { createClient, deleteClientById, getAllClient, updateClient } from "../services/clientService";

export const registerClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await createClient(req.body, res.locals.userId as number);
    return res.status(201).json(client);
  } catch (error) {
    next(error);
  }
};

export const getAllClientsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, total } = await getAllClient(
      res.locals.userId as number,
      res.locals.validatedQuery as ListOptions,
    );
    res.setHeader("X-Total-Count", total);
    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteClientById(Number(req.params.id), res.locals.userId as number);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateClientController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await updateClient(Number(req.params.id), req.body, res.locals.userId as number);
    return res.status(200).json({ message: "Cliente atualizado com sucesso.", client });
  } catch (error) {
    next(error);
  }
};
