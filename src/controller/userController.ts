import type { NextFunction, Request, Response } from "express";
import { createUser } from "../services/userService";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
