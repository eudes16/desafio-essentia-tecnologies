import type AppContext from "../../../shared/AppContext";
import type DataRequest from "../../../shared/DataRequest";
import type DataResponse from "../../../shared/DataResponse";
import Service from "../../../shared/Service";
import type { UseCase } from "../../../shared/UseCase";
import type RootOut from "../core/domain/RootOut";

export default class RootService extends Service<DataRequest<any>>{
    private rootUsecase: UseCase<DataRequest<any>, DataResponse<RootOut>>;
    
    constructor(
        public context: AppContext,
        rootUsecase: UseCase<DataRequest, DataResponse>,
        dataResquest: DataRequest<any>  
    ) {
        super(dataResquest);
        this.rootUsecase = rootUsecase
    }

    async getAppVersion(): Promise<DataResponse<RootOut>> { 
        return await this.rootUsecase.execute(this.context, this.dataRequest);
    }
} 