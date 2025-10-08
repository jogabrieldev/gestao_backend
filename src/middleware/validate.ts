import { ZodObject, ZodError, ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject<ZodRawShape>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      const zodError = error as ZodError<any>;
      if (zodError && zodError.issues) {
        const formattedErrors = zodError.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));

        return res.status(400).json({
          error: "Erro de validação",
          details: formattedErrors,
        });
      }

      return res.status(500).json({
        error: "Erro interno de validação",
        message: (error as Error).message,
      });
    }
  };

