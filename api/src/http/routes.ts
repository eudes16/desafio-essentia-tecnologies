import { Router, type Request, type Response } from "express";
import RootController from "../modules/root/interface/RootController";
import RootRoutes from "../modules/root/interface/RootRoutes";
import type AppContext from "../shared/AppContext";
import { authMiddleware } from "../shared/middlewares/authentication";
import AuthRoutes from "../modules/auth/interface/AuthRoutes";
import AuthController from "../modules/auth/interface/AuthController";
import UserRoutes from "../modules/user/interface/UserRoutes";
import UserController from "../modules/user/interface/UserController";

export default class RoutesRegister {
    constructor(private context: AppContext) { }

    registerRoutes(): Router {
        const router = Router();
        
        // Public Routes
        new RootRoutes(new RootController(
            this.context
        ), router);

        new AuthRoutes(new AuthController(
            this.context
        ), router);
        
        // Protected Routes
        router.use(authMiddleware); 

        new UserRoutes(new UserController(
            this.context
        ), router);
        
        // TODO: Remove this example route
        router.get("/protected", (req: Request, res: Response) => {
            res.status(200).json({ message: "This is a protected route" });
        });

        return router;
    }
}
