import { Router, type Request, type Response, type Express } from "express";
import RootController from "../modules/root/interface/RootController";
import RootRoutes from "../modules/root/interface/RootRoutes";
import type AppContext from "../shared/AppContext";
import { authMiddleware } from "../shared/middlewares/authentication";
import AuthRoutes from "../modules/auth/interface/AuthRoutes";
import AuthController from "../modules/auth/interface/AuthController";
import UserRoutes from "../modules/user/interface/UserRoutes";
import UserController from "../modules/user/interface/UserController";
import TodoController from "../modules/todo/interface/TodoController";
import TodoRoutes from "../modules/todo/interface/TodoRoutes";
import { getDataToContext } from "../shared/middlewares/getDataToContext";

export default class RoutesRegister {
    constructor(private context: AppContext) { }
    async loadRoutes(app: Express): Promise<void> {

        // Middleware to get data for context for each request
        await app.use(getDataToContext);


        app.use("/",
            // Public Routes
            new RootRoutes(new RootController(
                this.context
            ), Router()).getRoutes(),
        )

        // Auth Routes
        app.use("/auth",
            new AuthRoutes(new AuthController(
                this.context
            ), Router()).getRoutes(),
        );

        // Protected Routes

        app.use("/user",
            new UserRoutes(new UserController(
                this.context
            ), Router()).getRoutes(),
        );

        app.use("/todo",
            new TodoRoutes(new TodoController(
                this.context
            ), Router()).getRoutes(),
        );

    }
}
