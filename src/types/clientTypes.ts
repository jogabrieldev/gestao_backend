export interface CreateClient {
  name: string;
  email: string;
  cpf: string;
  data_nasc: string;
  phone?: string | null;
}

export interface UpdateClient {
  email?: string;
  phone?: string | null;
}

export interface ListOptions {
  page: number;
  limit: number;
  search: string;
  order: "asc" | "desc";
}
