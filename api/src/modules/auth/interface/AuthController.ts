import type { Request, Response } from "express";
import type AppContext from "../../../shared/AppContext";
import AuthLoginUsecase from "../core/usecases/AuthLoginUsecase";
import type AuthIn from "../core/domain/AuthIn";
import AuthRepository from "../infraestructure/AuthRepository";
import type Controller from "../core/domain/Controller";
import type AuthLogoutIn from "../core/domain/AuthLogoutIn";
import AuthLogoutUsecase from "../core/usecases/AuthLogoutUsecase";
import HttpStatus from "../../../shared/HttpStatus";

export default class AuthController implements Controller {

    constructor(public context: AppContext) {}
    
    async login(req: Request, res: Response) {

        const request: AuthIn = {
            email: req.body.email,
            password: req.body.password
        };

        const response = await new AuthLoginUsecase(await new AuthRepository(this.context.bdClient)).execute(this.context, request);

        if (!response) {
            res.status(401).json({ error: "Authentication failed" });
            return;
        }

        res.status(200).json(response);
    }

    register(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async logout(req: Request, res: Response): Promise<any> {

        const request: AuthLogoutIn = {
            token: req.headers.authorization?.replace("Bearer ", "") || ""
        }

        const response = await new AuthLogoutUsecase(await new AuthRepository(this.context.bdClient)).execute(this.context, request);

        if (response.success) {
            await res.status(HttpStatus.OK).json({ message: "Logout successful" });
        }
        
        await res.status(HttpStatus.NOT_FOUND).json({ error: "Logout failed" });
    }

}