import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type Repository from "../domain/Repository";
import type TodoFindIn from "../domain/TodoFindIn";
import type TodoOut from "../domain/TodoOut";

export default class TodoFindUsecase implements UseCase<DataRequest<TodoFindIn>, DataResponse<TodoOut[]>> {

    constructor(private respository: Repository) {
        this.respository = respository;
    }

    async execute(context: AppContext, input: DataRequest<TodoFindIn>): Promise<DataResponse<TodoOut[]>> {
        const { data } = input;

        const todos = await this.respository.find(data);


        return {
            status: true,
            data: todos.results || [],
            count: todos.totalCount || 0,
        }
    }

}