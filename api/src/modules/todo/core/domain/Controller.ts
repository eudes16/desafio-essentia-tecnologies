import type CrudController from "../../../../shared/CrudControler";
import type DataRequest from "../../../../shared/http/DataRequest";

export default interface Controller extends CrudController {
    find(dataRequest: DataRequest): Promise<any>;
    findById(dataRequest: DataRequest): Promise<any>;
    create(dataRequest: DataRequest): Promise<any>;
    update(dataRequest: DataRequest): Promise<any>;
    delete(dataRequest: DataRequest): Promise<any>;
}