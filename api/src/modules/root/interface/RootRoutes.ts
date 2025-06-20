import { Router } from "express";
import { Routes } from "../../../shared/http/Routes";
import type RootController from "./RootController";
import resolveParams from "../../../http/resolveParams";
import HttpStatus from "../../../shared/http/HttpStatus";
import resolveRecordResponse from "../../../shared/records/resolveRecordResponse";
import updateContext from "../../../shared/updateContext";

export default class RootRoutes extends Routes {
    constructor(private controller: RootController, router: Router) {
        super(controller, router, controller.context);
        this.addRoutes();
    }

    async addRoutes(): Promise<void> {
        await this._router.get("/", async (req, res) => {
            // Update app context with request data context 
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            }
            
            const response =  await this.controller.execute(dataRequest);

            await res.status(response.code || HttpStatus.NOT_FOUND).json(resolveRecordResponse(response, this.controller.context));
        });
    }
}