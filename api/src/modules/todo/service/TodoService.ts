import type AppContext from "../../../shared/AppContext";
import type DataRequest from "../../../shared/http/DataRequest";
import type DataResponse from "../../../shared/http/DataResponse";
import Service from "../../../shared/Service";
import type Repository from "../core/domain/Repository";
import type TodoOut from "../core/domain/TodoOut";
import TodoCreateUsecase from "../core/usecases/TodoCreateUsecase";
import TodoUpdateUsecase from "../core/usecases/TodoUpdateUsecase";
import TodoDeleteUsecase from "../core/usecases/TodoDeleteUsecase";
import TodoRepository from "../infraestructure/TodoRepository";

export default class TodoService extends Service<DataRequest<any>> {
    private repository: Repository;
    constructor(
        public context: AppContext,
        dataRequest: DataRequest,
    ) {
        super(dataRequest);
        this.repository = new TodoRepository(this.context.bdClient);
    }

    async read(): Promise<TodoOut[]> {
        // Implementation for reading todos
        throw new Error("Method not implemented.");
    }

    async create(): Promise<DataResponse<TodoOut | null>> {
        return await new TodoCreateUsecase(this.repository).execute(this.context, this.dataRequest);
    }
    
    async update(): Promise<DataResponse<TodoOut | null>> {
        return await new TodoUpdateUsecase(this.repository).execute(this.context, this.dataRequest);
    }
    
    async delete(): Promise<DataResponse<TodoOut | null>> {
        return await new TodoDeleteUsecase(this.repository).execute(this.context, this.dataRequest);
    }
}