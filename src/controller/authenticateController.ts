import type { NextFunction, Request, Response } from "express";
import { authenticateUser } from "../services/authenticateService";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authenticateUser(req.body, res.locals.jwtSecret as string);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
