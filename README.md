# Cine Clube - Backend

> Descrição do projeto

## **Links**

- Documentação do TypeORM: [Link](https://github.com/typeorm/typeorm/tree/master/docs)
- Tutorial de TypeORM: [Link](https://www.youtube.com/playlist?list=PLDqnSpzNKDvn-3cpMf3yPn7gTnb3ooy4b)

## Pré-requesitos

- Node.js
- npm

## Iniciando

- Clonar este repositório  
  `git clone http://tools.ages.pucrs.br/cine-clube/backend.git`

- Entrar no diretório do projeto  
  `cd backend`

- Instalar as dependências  
  `npm install`

Execute o seguinte comando:
`cp .env.example .env`

A seguir, altere os valores de **DB_USERNAME** e **DB_USERNAME** do arquivo .env, substituindo-os pelo usuário e senha do banco de dados.

_OBS: Se ainda não instalou o banco de dados, veja como na [página de configuração](https://tools.ages.pucrs.br/cine-clube/cineclube-wiki/wikis/configuracao)._

- Rodar as migrações do banco  
  `npm run typeorm -- migration:run`

- Iniciar a aplicação  
  `npm run dev`

- Acesse pelo navegador  
  `http://localhost:5000`

## Comandos do TypeORM

- Rodar as migrações do banco  
  `npm run typeorm -- migration:run`

- Criar as novas migrações  
  `npm run typeorm -- migration:generate -n <nome da migração>`

- Reverter a última migração do banco  
  `npm run typeorm -- migration:revert`
