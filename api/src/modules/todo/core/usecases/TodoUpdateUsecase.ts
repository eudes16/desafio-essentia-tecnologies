import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type Repository from "../domain/Repository";
import type TodoOut from "../domain/TodoOut";
import type TodoUpdateIn from "../domain/TodoUpdateIn";

export default class TodoUpdateUsecase implements UseCase<DataRequest<TodoUpdateIn>, DataResponse<TodoOut | null>> {

    constructor(private respository: Repository) {
        this.respository = respository;
    }

    async execute(context: AppContext, input: DataRequest<TodoUpdateIn>): Promise<DataResponse<TodoOut | null>> {

        const updateTodo: TodoUpdateIn = { ...input.data };
        updateTodo.userId = context.session!.user.id;

        const result = await this.respository.update(updateTodo);

        if (!result) {
            return {
                status: false,
                message: "Failed to update todo",
                data: null,
            };
        }

        return {
            status: true,
            data: result,
        };
    }
}