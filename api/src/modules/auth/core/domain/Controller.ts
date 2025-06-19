import type { Request, Response } from "express";
import type { BaseController } from "../../../../shared/BaseController";
import type DataRequest from "../../../../shared/http/DataRequest";

export default interface Controller extends BaseController {
    login(dataRequest: DataRequest): Promise<any>;
    register(dataRequest: DataRequest): Promise<any>;
    logout(dataRequest: DataRequest): Promise<any>;
}