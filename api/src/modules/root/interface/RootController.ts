import type { Request, Response } from "express";
import type Controller from "../../../shared/Controller";
import RootVersionUseCase from "../core/usecases/RootVersionUseCase";
import type DataRequest from "../../../shared/DataRequest";
import HttpStatus from "../../../shared/HttpStatus";

export default class RootController implements Controller {

    constructor(public context: any) {

    }
    
    async execute(req: Request, res: Response) {

        const request: DataRequest = {
            data: req.body
        }

        const response = await new RootVersionUseCase().execute(request, this.context);

        if (!response.status) {
            res.status(response.code || HttpStatus.INTERNAL_SERVER_ERROR)
        }

        res.json(response.data)
    }
}
