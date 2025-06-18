import { Router, type NextFunction, type Request, type Response } from "express";
import RootController from "../modules/root/interface/RootController";
import RootRoutes from "../modules/root/interface/RootRoutes";
import type AppContext from "../shared/AppContext";
import { authMiddleware } from "../shared/middlewares/authentication";

export default class RoutesRegister {
    constructor(private context: AppContext) { }

    registerRoutes(): Router {
        const router = Router();
        
        // Public Routes
        new RootRoutes(new RootController(
            this.context
        ), router).addRoutes();

        
        // Protected Routes
        router.use(authMiddleware); 

        return router;
    }
}
