import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/DataRequest";
import type DataResponse from "../../../../shared/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type RootOut from "../domain/RootOut";

export default class RootVersionUseCase implements UseCase<DataRequest, DataResponse<RootOut>> {
    async execute(input: DataRequest<any>, context: AppContext): Promise<DataResponse<RootOut>> {

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