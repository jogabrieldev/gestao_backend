**Back-end**

version 1.0

Gestão de clientes e de fornecedores

(Sistema esta sendo pensado para usuario que querem ter um controle maior sobre seus fornecedores e clientes ativos)

Se baseia onde cada usuario pagante dos sistema, vai ter seu usuario proprio com total dominio dos seus clientes e fornecedores, esse controle vai ser crucial para ter um noção de ponta a ponta. Nas novas atualizações implemetaremos a parte financeira do sistema onde vai fazer todo o calculo tanto na parte do cliente quanto na parte do fornecedor. Vai ter a parte do dashbord que vai ser onde iremos mostrar toda a analise o sistema e pensado para integração com um sistema ja consolidado onde essa parte de gestão ira ficar totalmente com os proprietarios pois ira pegar toda a analise do outro sistema , pegando os clientes e toda movimentação o mesmo com os fornecedores, sistema ja possui cliente utilizando e totalmente adptado para a realidade do cliente. por ser 100% responsivo e totalmente adptavel com todas as telas inclusive de televisoes a versão mobile ainda vai acontecer pois o cliente consegue acessar direto pelo o navegador. E a questão do mobile temos os gastos com as plataformas e temos que ter uma margin de instalação, irei adptar o react-native ou vou usar uma ferramente com a tecnologia PWA como ionic ou outro que seja mais compativel com react

back-end

Foi desenvolvido com uma arquitetura MVC com divisões em camadas e uma boa divião de responsabilidades. temos a camada de controle para pegar as requisições e encaminhar para o processamento no SERVICE, após termos uma resposta retornamos por meis do mesmo controlador.
Temos os VALIDATORS onde e a camada que contem as validações para adptação a regra de negocio do sistema, regras para criar, deletar, editar
estou usando uma ferramenta de ORM , que basicamente facilita nossa comunicação com o banco de dados , que no caso e o mySQL.
por meio das MIGRATIONS construimos o banco de dados com suas tabelas

Os MIDDLEWARES fazem a parte da barreira de proteção das nossas rotas que fazem comunicação com o front-end

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