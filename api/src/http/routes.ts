import { Router, type Request, type Response } from "express";
import RootController from "../modules/root/interface/RootController";
import RootRoutes from "../modules/root/interface/RootRoutes";
import type AppContext from "../shared/AppContext";
import { authMiddleware } from "../shared/middlewares/authentication";
import AuthRoutes from "../modules/auth/interface/AuthRoutes";
import AuthController from "../modules/auth/interface/AuthController";

export default class RoutesRegister {
    constructor(private context: AppContext) { }

    registerRoutes(): Router {
        const router = Router();
        
        // Public Routes
        new RootRoutes(new RootController(
            this.context
        ), router).addRoutes();

        new AuthRoutes(new AuthController(
            this.context
        ), router).addRoutes();

        // Protected Routes
        router.use(authMiddleware); 

        // TODO: Remove this example route
        router.get("/protected", (req: Request, res: Response) => {
            res.status(200).json({ message: "This is a protected route" });
        });

        return router;
    }
}
