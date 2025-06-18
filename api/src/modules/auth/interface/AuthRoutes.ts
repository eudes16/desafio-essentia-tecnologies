import type { Router } from "express";
import type Controller from "../../../shared/Controller";
import { Routes } from "../../../shared/Routes";

export default class AuthRoutes extends Routes {
    constructor(private controller: Controller, router: Router) {
        super(controller, router, controller.context);
        this.addRoutes();
    }

    addRoutes(): void {
        this._router.post("/login", this.controller.execute.bind(this.controller));
    }
}