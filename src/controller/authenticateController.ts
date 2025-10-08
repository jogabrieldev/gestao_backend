import { Request, Response } from 'express';
import { authenticateUser } from '../services/authenticateService';

export const login = async (req: Request, res: Response) => {
  try {
    const { token, user } = await authenticateUser(req.body);
    res.json({ token, user});
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};