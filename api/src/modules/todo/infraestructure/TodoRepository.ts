import type { PrismaClient, Todo } from "../../../generated/client";
import type QueryResult from "../../../shared/records/QueryResult";
import resolveQueryFilters from "../../../shared/records/resolveQueryFilter";
import type Repository from "../core/domain/Repository";
import type TodoCreateIn from "../core/domain/TodoCreateIn";
import type TodoDeleteIn from "../core/domain/TodoDeleteIn";
import type TodoFindIn from "../core/domain/TodoFindIn";
import type TodoOut from "../core/domain/TodoOut";
import type TodoUpdateIn from "../core/domain/TodoUpdateIn";

export default class TodoRepository implements Repository {

    constructor(private dbCliente: PrismaClient) {
        this.dbCliente = dbCliente;
    }

    findById(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async create(data: TodoCreateIn): Promise<TodoOut | null> {

        const { title, description, priority, userId, dueDate } = data;

        const todo = await this.dbCliente.todo.create({
            data: {
                userId: userId,
                title: title,
                description: description,
                priority: priority,
                status: data.status,
                dueDate: dueDate,
            }
        });

        if (!todo) {
            return null;
        }

        return {
            id: todo.id,
            userId: todo.userId,
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
            status: todo.status,
            dueDate: todo.dueDate,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt || undefined,
            deletedAt: todo.deletedAt || undefined,
        } as TodoOut;

    }

    async update(data: TodoUpdateIn): Promise<TodoOut | null> {
        const update = { ...data }

        // check if the id exists
        const todo = await this.dbCliente.todo.findUnique({
            where: {
                id: update.id,
            }
        })

        if (!todo) {
            return null;
        }

        const updatedTodo = await this.dbCliente.todo.update({
            where: {
                id: update.id,
            },
            data: {
                title: update.title,
                description: update.description,
                priority: update.priority,
                status: update.status,
                dueDate: update.dueDate,
            }
        });

        if (!updatedTodo) {
            return null;
        }

        return {
            id: updatedTodo.id,
            userId: updatedTodo.userId,
            title: updatedTodo.title,
            description: updatedTodo.description,
            priority: updatedTodo.priority,
            status: updatedTodo.status,
            dueDate: updatedTodo.dueDate,
            createdAt: updatedTodo.createdAt,
            updatedAt: updatedTodo.updatedAt || undefined,
            deletedAt: updatedTodo.deletedAt || undefined,
        } as TodoOut;

    }

    async delete(data: TodoDeleteIn): Promise<TodoOut | null> {
        // check if the id exists
        const todo = await this.dbCliente.todo.findUnique({
            where: {
                id: data.id,
            }
        });

        if (!todo) {
            return null;
        }

        // delete the todo
        const deletedTodo = await this.dbCliente.todo.update({
            data: {
                deletedAt: new Date(),
            },
            where: {
                id: data.id,
            }
        });

        if (!deletedTodo) {
            return null;
        }

        return {
            id: deletedTodo.id,
            userId: deletedTodo.userId,
            title: deletedTodo.title,
            description: deletedTodo.description,
            priority: deletedTodo.priority,
            status: deletedTodo.status,
            dueDate: deletedTodo.dueDate,
            createdAt: deletedTodo.createdAt,
            updatedAt: deletedTodo.updatedAt || undefined,
            deletedAt: deletedTodo.deletedAt || undefined,
        } as TodoOut;
    }


    async find(data: TodoFindIn): Promise<QueryResult<TodoOut>> {
        const { where: _where, pagination: _pagination, orderBy } = resolveQueryFilters(data);


        const whereQuery = {
            ..._where
        }

        const whereCount = {
            ..._where,
        }

        const orderByQuery = {
            ...orderBy
        }

        const [todos, count] = await this.dbCliente.$transaction([
            this.dbCliente.todo.findMany({
                where: {
                    ...whereQuery,
                },
                skip: _pagination?.skip,
                take: _pagination?.take,
                orderBy: orderByQuery,
            }),
            this.dbCliente.todo.count({
                where: {
                    ...whereCount,
                }
            })
        ])


        return {
            results: todos.map((todo) => ({
                id: todo.id,
                userId: todo.userId,
                title: todo.title,
                description: todo.description,
                priority: todo.priority,
                status: todo.status,
                dueDate: todo.dueDate,
                createdAt: todo.createdAt,
                updatedAt: todo.updatedAt || undefined,
                deletedAt: todo.deletedAt || undefined,
            }) as TodoOut),
            totalCount: count,
        };
    }
}