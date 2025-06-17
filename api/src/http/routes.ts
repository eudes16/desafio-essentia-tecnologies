import { Router } from "express";
import RootController from "../modules/root/interface/RootController";
import RootRoutes from "../modules/root/interface/RootRoutes";
import type AppContext from "../shared/AppContext";

export default class RoutesRegister {
    constructor(private context: AppContext) {}

    registerRoutes(): Router {
        const router = Router();
        new RootRoutes(new RootController(this.context), router).addRoutes();
        return router;
    }
}
