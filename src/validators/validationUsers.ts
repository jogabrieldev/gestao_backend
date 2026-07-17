import { z } from "zod";

const email = z.string().trim().toLowerCase().email("Informe um e-mail válido.").max(120);

export const validationUser = z.object({
  name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres.").max(100),
  email,
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres.").max(72),
}).strict();

export const validationLogin = z.object({
  email,
  password: z.string().min(1, "Informe a senha.").max(72),
}).strict();

export type UserSchemaType = z.infer<typeof validationUser>;
export type LoginSchemaType = z.infer<typeof validationLogin>;
