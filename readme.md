# Gestão Fácil — API

API acadêmica para autenticação e gestão de clientes e fornecedores. Cada usuário acessa somente os próprios registros.

## Tecnologias

- Node.js, Express e TypeScript
- Prisma ORM e MySQL
- JWT e bcrypt
- Zod para validação

## Funcionalidades

- Cadastro e login de usuários.
- Rotas protegidas por token Bearer.
- CRUD de clientes e fornecedores.
- Busca, ordenação e paginação por query string.
- Validação de CPF, CNPJ, telefone, e-mail e data de nascimento.

## Executando

Crie um `.env` com:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/gestao"
JWT_SECRET="uma-chave-segura"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

Depois execute:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Saúde da aplicação: `GET http://localhost:3000/health`.

## Endpoints principais

| Método | Endpoint | Protegido |
|---|---|---|
| POST | `/api/users` | Não |
| POST | `/api/login` | Não |
| GET/POST | `/api/client` | Sim |
| PATCH/DELETE | `/api/client/:id` | Sim |
| GET/POST | `/api/supplier` | Sim |
| PATCH/DELETE | `/api/supplier/:id` | Sim |

As listagens aceitam `page`, `limit`, `search` e `order`. O total é retornado no header `X-Total-Count`.

## Scripts

- `npm run dev`: inicia com recarregamento automático.
- `npm run typecheck`: valida o TypeScript.
- `npm test`: compila e executa testes dos schemas.
- `npm run build`: gera o código em `dist`.
