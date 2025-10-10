import { z } from 'zod';
import { cnpj } from 'cpf-cnpj-validator';

export const validationSupplier = z.object({
  name_empresa: z
    .string()
    .min(5, { message: 'O nome da empresa deve ter pelo menos 3 caracteres.' }),

  cnpj: z
    .string()
    .refine((val) => cnpj.isValid(val), {
      message: 'CNPJ inválido.',
    }),

  email: z
    .string()
    .email({ message: 'E-mail inválido.' }),

 phone: z
  .string()
  .optional()
  .refine((val) => {
    if (!val) return true; // campo opcional
    const cleaned = val.replace(/\D/g, ""); // remove tudo que não é número
    return /^(\d{10}|\d{11})$/.test(cleaned); // aceita 10 ou 11 dígitos
  }, {
    message: 'Telefone inválido. Informe DDD + número (10 ou 11 dígitos).',
  }),
});

export const deleteSupplierParams = z.object({
  id: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "ID inválido",
    }),
});
export const updateSupplierValidation = z.object({
  email: z.string().email({ message: "E-mail inválido." }).optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const cleaned = val.replace(/\D/g, "");
      return /^(\d{10}|\d{11})$/.test(cleaned);
    }, { message: "Telefone inválido. Informe DDD + número (10 ou 11 dígitos)." }),
});