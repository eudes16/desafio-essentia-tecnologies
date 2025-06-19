import type AppContext from "../../../shared/AppContext";
import type DataRequest from "../../../shared/http/DataRequest";
import type DataResponse from "../../../shared/http/DataResponse";
import Service from "../../../shared/Service";
import type RootOut from "../core/domain/RootOut";
import RootVersionUseCase from "../core/usecases/RootVersionUseCase";

export default class RootService extends Service<DataRequest<any>>{
    
    constructor(
        public context: AppContext,
        dataResquest: DataRequest<any>,
    ) {
        super(dataResquest);
    }

    async getAppVersion(): Promise<DataResponse<RootOut>> { 
        return await new RootVersionUseCase().execute(this.context, this.dataRequest);
    }
} 