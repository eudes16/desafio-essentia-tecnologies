import type { Request, Response } from "express";
import type Controller from "../../../shared/Controller";
import RootVersionUseCase from "../core/usecases/RootVersionUseCase";
import type DataRequest from "../../../shared/DataRequest";
import HttpStatus from "../../../shared/HttpStatus";
import type AppContext from "../../../shared/AppContext";
import RootService from "../service/RootService";
import resolveParams from "../../../http/resolveParams";

export default class RootController implements Controller {

    constructor(public context: AppContext) {}
    
    async execute(req: Request, res: Response) {


        const request: DataRequest = {
            data: resolveParams(req)
        }

        const response = await new RootService(this.context, new RootVersionUseCase(), request).getAppVersion();
        
        if (!response.status) {
            res.status(response.code || HttpStatus.INTERNAL_SERVER_ERROR)
        }

        res.json(response.data)
    }
}
