import { Request, Response } from 'express';
import { authenticateUser } from '../services/authenticateService';

export const login = async (req: Request, res: Response) => {
  try {
    const { token, user } = await authenticateUser(req.body);
     
    const safeUser = {
       id: user.id_user,
       name: user.name,
       email: user.email,
    }
    res.json({ token, user:safeUser});
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};