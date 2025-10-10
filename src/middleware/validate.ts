import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";

type RequestTarget = "body" | "params" | "query";

export const validate =
  (schema: ZodObject<ZodRawShape>, target: RequestTarget = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (target === "body") {
        req.body = schema.parse(req.body); // ✅ body funciona normalmente
      }

      if (target === "params") {
        // Type assertion para informar que é ParamsDictionary
        const parsed = schema.parse(req.params) as Record<string, string>;
        req.params = parsed;
      }

      if (target === "query") {
        // Type assertion para informar que é ParsedQs
        const parsed = schema.parse(req.query) as Record<string, any>;
        req.query = parsed;
      }

      next();
    } catch (error) {
      const zodError = error as ZodError<any>;
      if (zodError.issues) {
        const formattedErrors = zodError.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));

        return _res.status(400).json({ error: "Erro de validação", details: formattedErrors });
      }

      return _res.status(500).json({ error: "Erro interno de validação", message: (error as Error).message });
    }
  };

  // BLOCK para campos que não podem ser alterados no fornecedor
  export const blockImmutableSupplierFields = (req: Request, res: Response, next: NextFunction) => {
  const forbiddenFields = ["name_empresa", "cnpj"];
  const found = forbiddenFields.filter((f) => f in req.body);

  if (found.length > 0) {
    return res.status(400).json({
      message: `Os campos ${found.join(", ")} não podem ser alterados.`,
    });
  }

  next();
};

// BLOCK para campos que não podem ser alterados no cliente
export const blockImmutableClientFields = (req: Request, res: Response, next: NextFunction) => {
  const forbiddenFields = ["name", "cpf", "data_nasc"];
  const found = forbiddenFields.filter((f) => f in req.body);

  if (found.length > 0) {
    return res.status(400).json({
      message: `Os campos ${found.join(", ")} não podem ser alterados.`,
    });
  }

  next();
};
