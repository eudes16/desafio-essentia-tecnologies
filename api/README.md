# API - ToDo
Esta API fornece funcionalidades essenciais para um sistema de gerenciamento de tarefas (ToDo), permitindo que usuários registrem contas, autentiquem-se e gerenciem suas tarefas de forma eficiente. O projeto foi desenvolvido utilizando NodeJS e TypeScript, com suporte a bancos de dados MySQL


## Funcionalidades

- Registro de usuário
- Login
- Logout

- Listar tarefas
- Adicionar tarefas
- Atualizar tarefas
- Marcar tarefas como concluídas
- Remover tarefas

## Stack

- NodeJS v22+
- TypeScript
- Banco de dados MySQL

## Exemplos 
*Login*
1. Registro de usuário
    ```bash
    ## Requisição
    curl --request POST \
    --url http://localhost:4000/auth/register \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/11.2.0' \
    --data '{
        "name": "Steve Von",
        "email": "Emiliano.Heathcote-Hermann10@gmail.com",
        "password": "12345678"
    }'

    ## Resposta 201
    {
	    "data": {
            "id": 9,
            "email": "Jarrod.Kunze25@yahoo.com",
            "name": "Rachel Kirlin V",
            "createdAt": "2025-06-22T21:51:29.877Z",
            "updatedAt": "2025-06-22T21:51:29.877Z"
        }
    }
    ```

2. Login
    ```bash
    ### Requisição
    curl --request POST \
    --url http://localhost:4000/auth/login \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/11.2.0' \
    --data '{
        "email": "eudes.vss@gmail.com",
        "password": "12345678"
    }'

    ## Resposta 200
    {
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldWRlcy52c3NAZ21haWwuY29tIiwibmFtZSI6IkV1ZGVzIFNpbHZhIiwiaWF0IjoxNzUwNjI5MDY4LCJleHAiOjE3NTA3MTU0Njh9.y2S8zFmCAwlXWWH96Vb5gyU8z_ymXY5pBzTcyJEZ_0Y"
        }
    }
    ```

3. Logout
    ```bash
    ## Requisição
    curl --request POST \
    --url http://localhost:4000/api/auth/logout \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldWRlcy52c3NAZ21haWwuY29tIiwibmFtZSI6IkV1ZGVzIFNpbHZhIiwiaWF0IjoxNzUwNjIxNzE1LCJleHAiOjE3NTA3MDgxMTV9.b5iYaaz0PnWkCunLrQfZZ0uL6SD7SYN30Aj-5o54KaY' \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/11.2.0'

    ## Resposta 200
    {
        "data": {
            "logout": true
        }
    }
    ```
#
*Todos*

1. Cadastrar tarefa
    ```bash
    curl --request POST \
    --url http://localhost:4000/api/todo \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldWRlcy52c3NAZ21haWwuY29tIiwibmFtZSI6IkV1ZGVzIFNpbHZhIiwiaWF0IjoxNzUwNjY2MTgxLCJleHAiOjE3NTA3NTI1ODF9.37KRJp87enHikmDJe__tioj5uFVep5HE3ucYaqT8fKM' \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/11.2.0' \
    --data '{
        "title": "International Metrics Architect",
        "description": "discrete",
        "userId": 1,
        "priority": "low",
        "status": "pending"
    }'
    
    ## Resposta 200
    {
        "data": {
            "id": 17,
            "userId": 1,
            "title": "Regional Program Supervisor",
            "description": "24/7",
            "priority": "low",
            "status": "pending",
            "dueDate": null,
            "createdAt": "2025-06-21T03:36:08.127Z",
            "updatedAt": "2025-06-21T03:36:08.127Z"
        }
    }
    ```
2. Editar tarefa
    ```bash
    curl --request PUT \
    --url 'http://localhost:4000/todo/2?page=1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldWRlcy52c3NAZ21haWwuY29tIiwibmFtZSI6IkV1ZGVzIFNpbHZhIiwiaWF0IjoxNzUwNjY2MTgxLCJleHAiOjE3NTA3NTI1ODF9.37KRJp87enHikmDJe__tioj5uFVep5HE3ucYaqT8fKM' \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/11.2.0' \
    --data '{
        "title": "Customer Infrastructure Developer",
        "description": "content-based",
        "userId": 1,
        "priority": "high",
        "status": "in_progress",
        "dueDate": "2025-06-20T00:49:37.798Z"
    }'
    
    ## Resposta 200
    {
        "data": {
            "id": 2,
            "userId": 1,
            "title": "Principal Brand Associate",
            "description": "well-modulated",
            "priority": "high",
            "status": "in_progress",
            "dueDate": "2025-06-20T00:49:37.798Z",
            "createdAt": "2025-06-21T03:36:01.350Z",
            "updatedAt": "2025-06-23T09:20:48.309Z"
        }
    }
    ```

2. Remover tarefa (softdelete)
    ```bash
    curl --request DELETE \
    --url http://localhost:4000/todo/2 \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldWRlcy52c3NAZ21haWwuY29tIiwibmFtZSI6IkV1ZGVzIFNpbHZhIiwiaWF0IjoxNzUwNjcwNTE0LCJleHAiOjE3NTA3NTY5MTR9.LQXJ4L0eCgcgqjKoKwGr0hdsqG7WflU97BQVR-VAaoI' \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/11.2.0'
    
    ## Resposta 200
    {
        "data": {
            "id": 2,
            "userId": 1,
            "title": "Principal Brand Associate",
            "description": "well-modulated",
            "priority": "high",
            "status": "in_progress",
            "dueDate": "2025-06-20T00:49:37.798Z",
            "createdAt": "2025-06-21T03:36:01.350Z",
            "updatedAt": "2025-06-23T09:21:54.664Z",
            "deletedAt": "2025-06-23T09:21:54.663Z" ## <---
        }
    }
    ```
2. Remover tarefa (softdelete)
    ```bash
    curl --request GET \
    --url http://localhost:4000/todo \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldWRlcy52c3NAZ21haWwuY29tIiwibmFtZSI6IkV1ZGVzIFNpbHZhIiwiaWF0IjoxNzUwNjcwNTE0LCJleHAiOjE3NTA3NTY5MTR9.LQXJ4L0eCgcgqjKoKwGr0hdsqG7WflU97BQVR-VAaoI' \
    --header 'User-Agent: insomnia/11.2.0'
    
    ## Resposta 200
    {
        "data": [
            {
                "id": 12,
                "userId": 1,
                "title": "Forward Data Strategist",
                "description": "AI-powered",
                "priority": "low",
                "status": "cancelled",
                "dueDate": null,
                "createdAt": "2025-06-21T03:36:07.146Z",
                "updatedAt": "2025-06-23T04:34:08.247Z"
            }
        ],
    }

    ## Requisição com paginação
    curl --request GET \
    --url 'http://localhost:4000/todo?page=1&limit=5' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldWRlcy52c3NAZ21haWwuY29tIiwibmFtZSI6IkV1ZGVzIFNpbHZhIiwiaWF0IjoxNzUwNjcwNTE0LCJleHAiOjE3NTA3NTY5MTR9.LQXJ4L0eCgcgqjKoKwGr0hdsqG7WflU97BQVR-VAaoI' \
    --header 'User-Agent: insomnia/11.2.0'

    ## Resposta
    {
        "data": [
            {
                "id": 1,
                "userId": 1,
                "title": "Investor Brand Coordinator",
                "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,",
                "priority": "low",
                "status": "in_progress",
                "dueDate": "2025-06-25T23:00:07.000Z",
                "createdAt": "2025-06-21T03:36:00.644Z",
                "updatedAt": "2025-06-21T03:36:00.644Z"
            },
        ]
        "page": { ## O objeto de paginação é adicionado ao retorno
            "currentPage": 1,
            "nextPage": 2,
            "previousPage": null,
            "totalRecords": 18,
            "totalPages": 4
        }
    }

    ## Requisição ordenada
    curl --request GET \
    --url 'http://localhost:4000/todo?order=status,id_desc' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldWRlcy52c3NAZ21haWwuY29tIiwibmFtZSI6IkV1ZGVzIFNpbHZhIiwiaWF0IjoxNzUwNjcwNzc1LCJleHAiOjE3NTA3NTcxNzV9.OnUe8qOHVSvIwSpCy_5hrut3l4pGgTQXy2HFO_GkUqM' \
    --header 'User-Agent: insomnia/11.2.0'

    ## Requisição com filtros
    curl --request GET \
    --url 'http://localhost:4000/todo?id_in=1,3,6&title_starts_with=abc' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldWRlcy52c3NAZ21haWwuY29tIiwibmFtZSI6IkV1ZGVzIFNpbHZhIiwiaWF0IjoxNzUwNjcwNzc1LCJleHAiOjE3NTA3NTcxNzV9.OnUe8qOHVSvIwSpCy_5hrut3l4pGgTQXy2HFO_GkUqM' \
    --header 'User-Agent: insomnia/11.2.0'
    ```