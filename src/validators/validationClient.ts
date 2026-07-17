import { cpf } from "cpf-cnpj-validator";
import { z } from "zod";

const digits = (value: string) => value.replace(/\D/g, "");
const optionalPhone = z.preprocess(
  (value) => value === "" || value === undefined ? null : value,
  z.union([
    z.null(),
    z.string().transform(digits).refine((value) => /^\d{10,11}$/.test(value), "Informe DDD e telefone com 10 ou 11 dígitos."),
  ]),
);
const email = z.string().trim().toLowerCase().email("Informe um e-mail válido.").max(120);

export const validationClient = z.object({
  name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres.").max(100),
  email,
  cpf: z.string().transform(digits).refine(cpf.isValid, "Informe um CPF válido."),
  phone: optionalPhone.optional(),
  data_nasc: z.iso.date().refine((value) => new Date(`${value}T00:00:00`) <= new Date(), "A data não pode estar no futuro."),
}).strict();

export const idParams = z.object({ id: z.coerce.number().int().positive() }).strict();

export const updateClientValidation = z.object({
  email: email.optional(),
  phone: optionalPhone.optional(),
}).strict().refine((data) => Object.keys(data).length > 0, "Informe ao menos um campo para atualizar.");

export const listQueryValidation = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().max(100).default(""),
  order: z.enum(["asc", "desc"]).default("desc"),
}).strict();

export const deleteClientParams = idParams;
