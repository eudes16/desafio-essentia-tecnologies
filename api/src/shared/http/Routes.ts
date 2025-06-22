import type { Router } from "express";
import type { BaseController } from "../BaseController";
import type AppContext from "../AppContext";

export abstract class Routes {
    _router: Router;
    _controller: BaseController;

    constructor(controller: BaseController, router: Router, context: AppContext) {
        this._router = router;
        this._controller = controller;
        this._controller.context = context;
    }

    abstract register(): void;

    abstract getRoutes(): Router;
}