import type { BaseController } from "../../../../shared/BaseController";
import type DataRequest from "../../../../shared/http/DataRequest";

export default interface Controller extends BaseController {
    find(dataRequest: DataRequest): Promise<any>;
    findById(dataRequest: DataRequest): Promise<any>;
    create(dataRequest: DataRequest): Promise<any>;
    update(dataRequest: DataRequest): Promise<any>;
    delete(dataRequest: DataRequest): Promise<any>;
}