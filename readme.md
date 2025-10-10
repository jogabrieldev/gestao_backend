**Back-end**

## SRC/Source

--Modulos--

*Prisma*
__ Contém a instância do Prisma ORM, responsável pela comunicação com o banco de dados e acesso às tabelas e métodos definidos no schema.

*Types*
__ Essa camada e o meu DTO responsavel pela padronização de transferencia de dados entre aplicações.

*Services*
__ Camada responsável pela regra de negócio da aplicação. Aqui são implementadas as lógicas que processam os dados antes de serem enviados ao controller ou ao banco

*Middleware*
__ Contém funções intermediárias que são executadas antes das rotas, como validações de autenticação.

*Controller*
__ Recebe as requisições HTTP, chama os serviços correspondentes e retorna as respostas ao cliente. 

*Validators*
__ Implementa validações específicas utilizando a biblioteca Zod. As funções de validação são exportadas para uso nos middlewares, garantindo integridade dos dados.


*Routes*
__ Define os endpoints da aplicação utilizando o Router do Express. Cada rota aplica os middlewares necessários e direciona a requisição ao controller correspondente.

## Rotas

*Users*
__ Cria um novo usuario para ter acesso ao sistema para poder fazer controler dos seus clietes e fornecedores

*Login*
__ Realiza a autenticação do usuário. Em caso de sucesso, gera e retorna um token JWT para acesso às rotas protegidas.

*Client*
__ temos metodos para (Criar , deltar , atualizar , listar) verificando o usuario.

*Supplier*
__ temos metodos para (Criar , deltar , atualizar , listar) verificando o usuario.


(Cada usuário cadastrado tem seus clientes e seus fornecedores, nunca um usuario vai acessar e ver clientes e fornecedores de outro usuário)

*Rodar o projeto*

__ (Clone o repositório)
__ (npm install)
__ (npm run dev)