export interface CreateSupplier {
  name_empresa: string;
  cnpj: string;
  email: string;
  phone?: string | null;
}

export interface UpdateSupplier {
  email?: string;
  phone?: string | null;
}
