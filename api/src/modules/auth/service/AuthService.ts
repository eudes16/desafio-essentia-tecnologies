import type AppContext from "../../../shared/AppContext";
import type DataRequest from "../../../shared/http/DataRequest";
import type DataResponse from "../../../shared/http/DataResponse";
import Service from "../../../shared/Service";
import type AuthIn from "../core/domain/AuthIn";
import type AuthLogoutOut from "../core/domain/AuthLogoutOut";
import type AuthTokenOut from "../core/domain/AuthTokenOut";
import AuthLoginUsecase from "../core/usecases/AuthLoginUsecase";
import AuthLogoutUsecase from "../core/usecases/AuthLogoutUsecase";
import AuthRepository from "../infraestructure/AuthRepository";

export default class AuthService extends Service<DataRequest<any>> {
    private repository: AuthRepository;  
    constructor(
        public context: AppContext,
        dataResquest: DataRequest<AuthIn | any>,
    ) {
        super(dataResquest);
        this.repository = new AuthRepository(this.context.bdClient);
    }

    async login(): Promise<DataResponse<AuthTokenOut | null>> {
        return await new AuthLoginUsecase(this.repository).execute(this.context, this.dataRequest);
    }

    async logout(): Promise<DataResponse<AuthLogoutOut | null>> {
        return await new AuthLogoutUsecase(this.repository).execute(this.context, this.dataRequest);
    }
}
