import type { Router } from "express";
import { Routes } from "../../../shared/http/Routes";
import type Controller from "../core/domain/Controller";
import resolveParams from "../../../http/resolveParams";
import HttpStatus from "../../../shared/http/HttpStatus";
import resolveRecordResponse from "../../../shared/records/resolveRecordResponse";
import updateContext from "../../../shared/updateContext";
import { authMiddleware } from "../../../shared/middlewares/authentication";

export default class UserRoutes extends Routes {
    constructor(private controller: Controller, router: Router) {
        super(controller, router, controller.context);
        this.register();
    }

    async register(): Promise<void> {
        await this._router.post("/", authMiddleware, async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.create(dataRequest);

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.put("/:id", authMiddleware, async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.update(dataRequest);

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.delete("/:id", authMiddleware, async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            };

            const response = await this.controller.delete(dataRequest);

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

    }

    getRoutes(): Router {
        return this._router;
    }
}