import type { Router } from "express";
import { Routes } from "../../../shared/http/Routes";
import type Controller from "../core/domain/Controller";
import resolveParams from "../../../http/resolveParams";
import HttpStatus from "../../../shared/http/HttpStatus";


export default class TodoRoutes extends Routes {
    constructor(private controller: Controller, router: Router) {
        super(controller, router, controller.context);
        this.addRoutes();
    }
    
    async addRoutes(): Promise<void> {
        await this._router.post("/todo", async (req, res) => {
            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.create(dataRequest);
            
            await res.status(response.code || HttpStatus.BAD_REQUEST).json(response);
        });

        await this._router.put("/todo/:id", async (req, res) => {
            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.update(dataRequest);
            
            await res.status(response.code || HttpStatus.BAD_REQUEST).json(response);
        });

        await this._router.delete("/todo/:id", async (req, res) => {
            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.delete(dataRequest);
            
            await res.status(response.code || HttpStatus.BAD_REQUEST).json(response);
        });
    }

}