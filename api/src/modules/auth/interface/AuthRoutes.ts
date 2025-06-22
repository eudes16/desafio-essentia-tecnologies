import type { Router } from "express";
import type Controller from "../core/domain/Controller";
import { Routes } from "../../../shared/http/Routes";
import resolveParams from "../../../http/resolveParams";
import HttpStatus from "../../../shared/http/HttpStatus";
import resolveRecordResponse from "../../../shared/records/resolveRecordResponse";
import updateContext from "../../../shared/updateContext";
import { authMiddleware } from "../../../shared/middlewares/authentication";

export default class AuthRoutes extends Routes {
    constructor(private controller: Controller, router: Router) {
        super(controller, router, controller.context);
        this.register();
    }

    async register(): Promise<void> {
        await this._router.post("/login", async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            }

            const response = await this.controller.login(dataRequest)

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.post("/logout", authMiddleware, async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            }

            const response = await this.controller.logout(dataRequest)

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });

        await this._router.post("/register", async (req, res) => {
            updateContext(req, this.controller.context);

            const dataRequest = {
                data: resolveParams(req),
            }

            const response = await this.controller.register(dataRequest)

            await res.status(response.code || HttpStatus.BAD_REQUEST).json(resolveRecordResponse(response, this.controller.context));
        });
    }

    getRoutes(): Router {
        return this._router;
    }
}