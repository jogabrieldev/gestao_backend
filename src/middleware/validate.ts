import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

type RequestTarget = "body" | "params" | "query";

export class AppError extends Error {
  constructor(message: string, public readonly statusCode = 400) {
    super(message);
    this.name = "AppError";
  }
}

export const validate = (schema: ZodType, target: RequestTarget = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return res.status(422).json({
        error: "Dados inválidos.",
        details: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    if (target === "body") req.body = result.data;
    if (target === "params") req.params = result.data as Request["params"];
    if (target === "query") res.locals.validatedQuery = result.data;
    next();
  };

export const notFound = (_req: Request, res: Response) =>
  res.status(404).json({ error: "Rota não encontrada." });

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({ error: "Dados inválidos.", details: error.issues });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") return res.status(409).json({ error: "Já existe um registro com esses dados." });
    if (error.code === "P2025") return res.status(404).json({ error: "Registro não encontrado." });
  }

  console.error("Erro não tratado:", error);
  return res.status(500).json({ error: "Erro interno do servidor." });
};
