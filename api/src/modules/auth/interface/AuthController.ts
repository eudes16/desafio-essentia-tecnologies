import type { Request, Response } from "express";
import type Controller from "../../../shared/Controller";
import type AppContext from "../../../shared/AppContext";
import AuthLoginUsecase from "../core/usecases/AuthLoginUsecase";
import type AuthIn from "../core/domain/AuthIn";
import AuthRepository from "../infraestructure/AuthRepository";

export default class AuthController implements Controller {

    constructor(public context: AppContext) {}

    async execute(req: Request, res: Response) {

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

}