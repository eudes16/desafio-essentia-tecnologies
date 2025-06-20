import type AppContext from "../../../shared/AppContext";
import { Exceptions } from "../../../shared/exceptions/Exceptions";
import type DataRequest from "../../../shared/http/DataRequest";
import type DataResponse from "../../../shared/http/DataResponse";
import HttpStatus from "../../../shared/http/HttpStatus";
import type Controller from "../core/domain/Controller";
import type TodoCreateIn from "../core/domain/TodoCreateIn";
import type TodoDeleteIn from "../core/domain/TodoDeleteIn";
import type TodoOut from "../core/domain/TodoOut";
import type TodoUpdateIn from "../core/domain/TodoUpdateIn";
import TodoService from "../service/TodoService";

export default class TodoController implements Controller {

    constructor(public context: AppContext) {}

    find(dataRequest: DataRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }

    findById(dataRequest: DataRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async create(dataRequest: DataRequest<TodoCreateIn>): Promise<DataResponse<TodoOut | null>> {
        try {
            
            const response = await new TodoService(
                this.context,
                dataRequest,
            ).create();

            if (response.status === false) {
                return {
                    code: response.code || HttpStatus.NOT_FOUND,
                    data: null,
                    message: response.message || "Failed to create todo"
                };
            }

            return {
                ...response,
                code: HttpStatus.CREATED,
            };
            
        } catch (error) {
            if (error instanceof Exceptions) {
                return {
                    code: error.code,
                    data: null,
                    message: error.message
                };
            }

            console.log(error)

            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                message: "An unexpected error occurred"
            };
        }
    }

    async update(dataRequest: DataRequest<TodoUpdateIn>): Promise<DataResponse<TodoOut | null>> {
        try {
            const response = await new TodoService(
                this.context,
                dataRequest,
            ).update(); 

            if (response.status === false) {
                return {
                    code: response.code || HttpStatus.NOT_FOUND,
                    data: null,
                    message: response.message || "Failed to create todo"
                };
            }

            return {
                ...response,
                code: HttpStatus.OK,
            };
            
        } catch (error) {
            if (error instanceof Exceptions) {
                return Promise.reject({
                    code: error.code,
                    data: null,
                    message: error.message
                });
            }

            console.log(error);

            return Promise.reject({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                message: "An unexpected error occurred"
            });
        }
    }

    async delete(dataRequest: DataRequest<TodoDeleteIn>): Promise<DataResponse<TodoOut | null>> {
        try {
            const response = await new TodoService(
                this.context,
                dataRequest,
            ).delete(); 

            if (response.status === false) {
                return {
                    code: response.code || HttpStatus.NOT_FOUND,
                    data: null,
                    message: response.message || "Failed to delete todo"
                };
            }

            return {
                ...response,
                code: HttpStatus.OK,
            };
        } catch (error) {
            if (error instanceof Exceptions) {
                return Promise.reject({
                    code: error.code,
                    data: null,
                    message: error.message
                });
            }

            console.log(error);

            return Promise.reject({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                message: "An unexpected error occurred"
            });
        }
    }
}