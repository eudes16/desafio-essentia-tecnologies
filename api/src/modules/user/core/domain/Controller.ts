import type { Request, Response } from "express";
import type { BaseController } from "../../../../shared/BaseController";

export default interface Controller extends BaseController {
    create(req: Request, res: Response): Promise<any>;
}