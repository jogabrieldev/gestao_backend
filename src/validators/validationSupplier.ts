import { cnpj } from "cpf-cnpj-validator";
import { z } from "zod";
import { idParams, listQueryValidation } from "./validationClient";

const digits = (value: string) => value.replace(/\D/g, "");
const optionalPhone = z.preprocess(
  (value) => value === "" || value === undefined ? null : value,
  z.union([
    z.null(),
    z.string().transform(digits).refine((value) => /^\d{10,11}$/.test(value), "Informe DDD e telefone com 10 ou 11 dígitos."),
  ]),
);
const email = z.string().trim().toLowerCase().email("Informe um e-mail válido.").max(120);

export const validationSupplier = z.object({
  name_empresa: z.string().trim().min(3, "O nome da empresa deve ter pelo menos 3 caracteres.").max(120),
  cnpj: z.string().transform(digits).refine(cnpj.isValid, "Informe um CNPJ válido."),
  email,
  phone: optionalPhone.optional(),
}).strict();

export const updateSupplierValidation = z.object({
  email: email.optional(),
  phone: optionalPhone.optional(),
}).strict().refine((data) => Object.keys(data).length > 0, "Informe ao menos um campo para atualizar.");

export const deleteSupplierParams = idParams;
export const listSupplierQueryValidation = listQueryValidation;
