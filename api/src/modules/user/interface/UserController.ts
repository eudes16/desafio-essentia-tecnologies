import type { Request, Response } from "express";
import type AppContext from "../../../shared/AppContext";
import type Controller from "../core/domain/Controller";
import UserRepository from "../infraestructure/UserRepository";
import UserCreateUsecase from "../core/usecases/UserCreateUsecase";
import HttpStatus from "../../../shared/http/HttpStatus";
import type DataRequest from "../../../shared/http/DataRequest";
import type UserCreateIn from "../core/domain/UserCreateIn";
import type UserOut from "../core/domain/UserOut";
import type DataResponse from "../../../shared/http/DataResponse";
import { Exceptions } from "../../../shared/exceptions/Exceptions";
import UserService from "../service/UserService";

export default class UserController implements Controller {

    constructor(public context: AppContext) {}

    async find(dataRequest: DataRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async findById(dataRequest: DataRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    async create(dataRequest: DataRequest<UserCreateIn>): Promise<DataResponse<UserOut | null>> {
        
        try {
            
            const response = await new UserService(
                this.context,
                dataRequest,
            ).createUser()

            if (response.status === false) {
                return {
                    code: response.code || HttpStatus.NOT_FOUND,
                    data: null,
                    message: response.message ||  "Failed to create user"
                };
            }

            return {
                ...response,
                code: HttpStatus.OK,
            }
            
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

    async update(dataRequest: DataRequest): Promise<any> {

        try {

            const response = await new UserService(
                this.context,
                dataRequest,
            ).updateUser()

            if (response.status === false) {
                return {
                    code: response.code || HttpStatus.NOT_FOUND,
                    data: null,
                    message: response.message || "Failed to update user"
                };
            }

            return {
                ...response,
                code: HttpStatus.OK,
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

    async delete(dataRequest: DataRequest): Promise<any> {
        try {

            const response = await new UserService(
                this.context,
                dataRequest,
            ).deleteUser()

            if (response.status === false) {
                return {
                    code: response.code || HttpStatus.NOT_FOUND,
                    data: null,
                    message: response.message || "Failed to delete user"
                };
            }

            return {
                ...response,
                code: HttpStatus.OK,
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
}