import type { Router } from "express";
import { Routes } from "../../../shared/Routes";
import type Controller from "../core/domain/Controller";

export default class AuthRoutes extends Routes {
    constructor(private controller: Controller, router: Router) {
        super(controller, router, controller.context);
        this.addRoutes();
    }

    addRoutes(): void {
        this._router.post("/auth/login", this.controller.login.bind(this.controller));

        this._router.post("/auth/logout", this.controller.logout.bind(this.controller));

        this._router.post("/auth/register", this.controller.register.bind(this.controller));
    }
}