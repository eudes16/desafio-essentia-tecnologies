import type { Request, Response } from "express";
import type { BaseController } from "../../../../shared/BaseController";

export default interface Controller extends BaseController {
    login(req: Request, res: Response): Promise<any>;
    register(req: Request, res: Response): Promise<any>;
    logout(req: Request, res: Response): Promise<any>;
}