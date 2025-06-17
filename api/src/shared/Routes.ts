import type { Router } from "express";
import type { BaseController } from "./BaseController";

export abstract class Routes {
    _router: Router;

    constructor(controller: BaseController, router: Router, context: any) {
        this._router = router;
    }

    abstract addRoutes(): void;
}