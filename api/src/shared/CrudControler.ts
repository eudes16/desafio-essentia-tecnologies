import type { BaseController } from "./BaseController"
import type DataRequest from "./http/DataRequest"
import type DataResponse from "./http/DataResponse"

export default interface CrudController extends BaseController {
    find: (request: DataRequest) => Promise<DataResponse>
    findById: (request: DataRequest) => Promise<DataResponse>
    create: (request: DataRequest) => Promise<DataResponse>
    update: (request: DataRequest) => Promise<DataResponse>
    delete: (request: DataRequest) => Promise<DataResponse>
}