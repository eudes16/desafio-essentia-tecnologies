import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type Repository from "../domain/Repository";
import type TodoDeleteIn from "../domain/TodoDeleteIn";
import type TodoOut from "../domain/TodoOut";

export default class TodoDeleteUsecase implements UseCase<DataRequest<TodoDeleteIn>, DataResponse<TodoOut | null>> {
    
    constructor(private respository: Repository) {
        this.respository = respository;
    }
    
    async execute(context: AppContext, input: DataRequest<TodoDeleteIn>): Promise<DataResponse<TodoOut | null>> {

        const deleteTodo: TodoDeleteIn = { ...input.data };

        const result = await this.respository.delete(deleteTodo);

        if (!result) {
            return {
                status: false,
                message: "Failed to delete todo",
                data: null,
            };
        }

        return {
            status: true,
            data: result,
        };
    }
    
}