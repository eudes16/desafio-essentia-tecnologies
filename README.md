# Todo App - Desafio Essentia Tecnologies

Projeto de uma aplicação de lista de tarefas

## Funcionalidades

- Listar tarefas
- Adicionar tarefas
- Atualizar tarefas
- Marcar tarefas como concluídas
- Remover tarefas

## Requisitos

- Backend:
  - NodeJS v22+
  - TypeScript
  - Banco de dados MySQL

- Frontend:
  - Angular 14+


## Instalação
### Backend

1. Clone o repositório e acesse a pasta do backend:

    ```bash
    git clone https://github.com/eudes16/desafio-essentia-tecnologies.git
    cd api
    ```

2. Instale as dependências com o [Bun](https://bun.sh):

    ```bash
    bun install
    ```

3. Copie o arquivo de exemplo `.env.example` para `.env` e configure as variáveis de ambiente conforme seu banco de dados:

    ```bash
    cp .env.example .env
    # Edite o arquivo .env conforme necessário
    ```

4. Execute as migrations do Prisma para criar as tabelas no banco de dados:

    ```bash
    bunx prisma migrate deploy
    ```

5. Inicie o servidor backend:

    ```bash
    bun run dev
    ```

---

### Frontend

1. Acesse a pasta do frontend:

    ```bash
    cd ../app
    ```

2. Instale as dependências:

    ```bash
    bun install
    ```
3. Edite o arquivo `app/src/proxy.conf.json`

    ```js
    {
        "/api": {
            "target": "http://localhost:4000", // <-- Ajuste para a url da API
            "secure": false,
            "changeOrigin": true
        }
    }
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    bun start
    ```

Acesse o frontend em `http://localhost:4200`.
