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
    .regex(/^(\d{2})9\d{8}$/, {
      message: 'Telefone deve conter DDD seguido de número com 9 e mais 8 dígitos. Ex: 62999999999',
    })
    .optional(),

  data_nasc: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Data de nascimento inválida.',
    }),
});