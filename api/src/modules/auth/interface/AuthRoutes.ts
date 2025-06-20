import type { Router } from "express";
import type Controller from "../core/domain/Controller";
import { Routes } from "../../../shared/http/Routes";
import resolveParams from "../../../http/resolveParams";
import HttpStatus from "../../../shared/http/HttpStatus";
import resolveRecordResponse from "../../../shared/records/resolveRecordResponse";
import updateContext from "../../../shared/updateContext";

export default class AuthRoutes extends Routes {
    constructor(private controller: Controller, router: Router) {
        super(controller, router, controller.context);
        this.addRoutes();
    }

    async addRoutes(): Promise<void> {
        await this._router.post("/auth/login", async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            }

            const response = await this.controller.login(dataRequest)

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.post("/auth/logout", async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            }

            const response = await this.controller.logout(dataRequest)

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.post("/auth/register", async (req, res) => {
            updateContext(req, this.controller.context);
            
            const dataRequest = {
                data: resolveParams(req),
            }

            const response = await this.controller.register(dataRequest)

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });
    }
}