import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';

export const validationClient = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),

  email: z.string().email({ message: 'E-mail inválido.' }),

  cpf: z
    .string()
    .refine((val) => cpf.isValid(val), {
      message: 'CPF inválido.',
    }),

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


  data_nasc: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Data de nascimento inválida.',
    }),
});

// validar delete
export const deleteClientParams = z.object({
  id: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "ID inválido",
    }),
});


//Validação para atualização de cliente
export const updateClientValidation = z.object({
  email: z.string().email({ message: "E-mail inválido." }).optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const cleaned = val.replace(/\D/g, "");
      return /^(\d{10}|\d{11})$/.test(cleaned);
    }, { message: "Telefone inválido. Informe DDD + número (10 ou 11 dígitos)." }),
  data_nasc: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Data de nascimento inválida.",
    }),
});