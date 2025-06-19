import type { Request, Response } from "express";
import RootVersionUseCase from "../core/usecases/RootVersionUseCase";
import type DataRequest from "../../../shared/http/DataRequest";
import HttpStatus from "../../../shared/http/HttpStatus";
import type AppContext from "../../../shared/AppContext";
import RootService from "../service/RootService";
import type { BaseController } from "../../../shared/BaseController";
import type DataResponse from "../../../shared/http/DataResponse";
import { Exceptions } from "../../../shared/exceptions/Exceptions";

export default class RootController implements BaseController {

    constructor(
        public context: AppContext
    ) {}
    
    async execute(dataRequest: DataRequest): Promise<DataResponse> {

        try {
            const response = await new RootService(
                this.context, 
                dataRequest,
            ).getAppVersion();
            
            if (!response.status) {
                return {
                    code: response.code || HttpStatus.NOT_FOUND,
                    data: null
                }
            }
    
            return {
                ...response,
                code: response.code || HttpStatus.OK,
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
