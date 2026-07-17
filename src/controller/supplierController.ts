import type { NextFunction, Request, Response } from "express";
import type { ListOptions } from "../types/clientTypes";
import { createSupplier, deleteSupplierById, getAllSupplier, updateSupplier } from "../services/supplierService";

export const registerSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplier = await createSupplier(req.body, res.locals.userId as number);
    return res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
};

export const getAllSupplierController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, total } = await getAllSupplier(
      res.locals.userId as number,
      res.locals.validatedQuery as ListOptions,
    );
    res.setHeader("X-Total-Count", total);
    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteSupplierById(Number(req.params.id), res.locals.userId as number);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateSupplierController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplier = await updateSupplier(Number(req.params.id), req.body, res.locals.userId as number);
    return res.status(200).json({ message: "Fornecedor atualizado com sucesso.", supplier });
  } catch (error) {
    next(error);
  }
};
