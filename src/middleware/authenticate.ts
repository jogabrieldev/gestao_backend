import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? [];
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Token de acesso não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, res.locals.jwtSecret as string, {
      issuer: "gestao-api",
      audience: "gestao-frontend",
    }) as TokenPayload;
    res.locals.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
