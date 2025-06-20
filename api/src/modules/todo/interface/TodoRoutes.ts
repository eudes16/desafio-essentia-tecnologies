import type { Router } from "express";
import { Routes } from "../../../shared/http/Routes";
import type Controller from "../core/domain/Controller";
import resolveParams from "../../../http/resolveParams";
import HttpStatus from "../../../shared/http/HttpStatus";
import resolveRecordResponse from "../../../shared/records/resolveRecordResponse";
import updateContext from "../../../shared/updateContext";


export default class TodoRoutes extends Routes {
    constructor(private controller: Controller, router: Router) {
        super(controller, router, controller.context);
        this.addRoutes();
    }
    
    async addRoutes(): Promise<void> {
        await this._router.get("/todo", async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.find(dataRequest);
            
            await res.status(response.code || HttpStatus.NOT_FOUND).json(resolveRecordResponse(response, this.controller.context));
        });


        await this._router.post("/todo", async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.create(dataRequest);
            
            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.put("/todo/:id", async (req, res) => {
            this.controller.context = await updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.update(dataRequest);
            
            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.delete("/todo/:id", async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.delete(dataRequest);
            
            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });
    }

}