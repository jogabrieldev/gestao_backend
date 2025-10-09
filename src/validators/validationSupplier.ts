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
    .regex(/^(\d{2})9\d{8}$/, {
      message: 'Telefone deve conter DDD seguido de número com 9 e mais 8 dígitos. Ex: 62999999999',
    })
    .optional(),
});