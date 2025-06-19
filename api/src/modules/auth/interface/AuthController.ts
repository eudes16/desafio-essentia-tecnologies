import type { Request, Response } from "express";
import type AppContext from "../../../shared/AppContext";
import AuthLoginUsecase from "../core/usecases/AuthLoginUsecase";
import type AuthIn from "../core/domain/AuthIn";
import AuthRepository from "../infraestructure/AuthRepository";
import type Controller from "../core/domain/Controller";
import type AuthLogoutIn from "../core/domain/AuthLogoutIn";
import AuthLogoutUsecase from "../core/usecases/AuthLogoutUsecase";
import HttpStatus from "../../../shared/http/HttpStatus";
import type DataRequest from "../../../shared/http/DataRequest";
import { Exceptions } from "../../../shared/exceptions/Exceptions";
import type DataResponse from "../../../shared/http/DataResponse";
import type AuthLogoutOut from "../core/domain/AuthLogoutOut";
import AuthService from "../service/AuthService";
import type AuthTokenOut from "../core/domain/AuthTokenOut";

export default class AuthController implements Controller {
    

    constructor(public context: AppContext) { }
    
    async login(dataRequest: DataRequest<AuthIn>): Promise<DataResponse<AuthTokenOut | null>> {
        
        try {
            
            const response = await new AuthService(
                this.context,
                dataRequest,
            ).login();

            if (response.status === false) {
                return {
                    code: response.code || HttpStatus.NOT_FOUND,
                    data: null,
                    message: response.message || "Authentication failed"
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

    async logout(datRequest: DataRequest<AuthLogoutIn>): Promise<DataResponse<AuthLogoutOut | null>> {

        try {

            
            const response = await new AuthService(
                this.context,
                datRequest,
            ).logout();

            if (!response.status) {
                return {
                    code: response.code || HttpStatus.NOT_FOUND,
                    data: null,
                    message: response.message || "Logout failed"
                }
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

    register(dataRequest: DataRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }

}