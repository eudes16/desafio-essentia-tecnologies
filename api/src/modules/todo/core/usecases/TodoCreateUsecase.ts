import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type Repository from "../domain/Repository";
import type TodoCreateIn from "../domain/TodoCreateIn";
import type TodoOut from "../domain/TodoOut";

export default class TodoCreateUsecase implements UseCase<DataRequest<TodoCreateIn>, DataResponse<TodoOut | null>> {
    
    constructor(private respository: Repository) {
        this.respository = respository;
    }
    
    async execute(context: AppContext, input: DataRequest<TodoCreateIn>): Promise<DataResponse<TodoOut | null>> {

        const createTodo: TodoCreateIn = { ...input.data };

        const result = await this.respository.create(createTodo);

        if (!result) {
            return {
                status: false,
                message: "Failed to create todo",
                data: null,
            };
        }

        return {
            status: true,
            data: result,
        };
    }
    
}