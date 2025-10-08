**Back-end**

## SRC/Source

--Modulos--

*Prisma*
__ O modulo que exporta a instancia do prisma para termos acesso as tabelas e metodos do ORM.

*Types*
__ Essa camada e o meu DTO responsavel pela padronização de transferencia de dados entre aplicações.

*Services*
__ Camada para a regra de negocio da minha aplicação.

*Middleware*
__ Camada onde faço validações nas rotas antes de processar a requisição.

*Controller*
__ Camada controladora ela vai receber minha requisição e vai devolver uma resposta.

*Validators*
__ Passo as validações necessarias pos requisição , estou usando para validações o (zod) exportando a função de validaçõ para uso no middleware.

*Routes*
__ Conecto o metodo do express chamado de (Router) uso os metodos HTTP , crio os endpoints passo meu middleware de validações e logo após passo meu controllador.

## Server