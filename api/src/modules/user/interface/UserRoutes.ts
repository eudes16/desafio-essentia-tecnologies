import type { Router } from "express";
import { Routes } from "../../../shared/http/Routes";
import type Controller from "../core/domain/Controller";
import resolveParams from "../../../http/resolveParams";
import HttpStatus from "../../../shared/http/HttpStatus";
import resolveRecordResponse from "../../../shared/records/resolveRecordResponse";
import updateContext from "../../../shared/updateContext";

export default class UserRoutes extends Routes {
    constructor(private controller: Controller, router: Router) {
        super(controller, router, controller.context);
        this.addRoutes();
    }

    async addRoutes(): Promise<void> {
        await this._router.post("/user", async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.create(dataRequest);

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.put("/user/:id", async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.update(dataRequest);

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.delete("/user/:id", async (req, res) => {
            updateContext(req, this.controller.context);
            
            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.delete(dataRequest);

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

    }

}