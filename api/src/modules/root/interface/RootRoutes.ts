import { Router } from "express";
import { Routes } from "../../../shared/Routes";
import type Controller from "../../../shared/Controller";

export default class RootRoutes extends Routes {
    constructor(private controller: Controller, router: Router) {
        super(controller, router, controller.context);
        this.addRoutes();
    }

    addRoutes(): void {
        this._router.get("/", this.controller.execute.bind(this.controller));
    }
}