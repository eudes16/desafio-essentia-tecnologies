import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type RootOut from "../domain/RootOut";

export default class RootVersionUseCase implements UseCase<DataRequest, DataResponse<RootOut>> {
    async execute(context: AppContext, input: DataRequest<any>): Promise<DataResponse<RootOut>> {

        const response: DataResponse<RootOut> = {
            status: true,
            data: {
                version: context.appVersion,
                name: context.appName
            }
        };

        return response;
    }

}