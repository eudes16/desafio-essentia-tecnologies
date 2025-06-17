import type { Request, Response } from "express";
import type { BaseController } from "./BaseController";

export default interface Controller extends BaseController {
    execute: (req: Request, res: Response) => Promise<void>; 
}