import type AppContext from "../../../shared/AppContext";
import type DataRequest from "../../../shared/http/DataRequest";
import type DataResponse from "../../../shared/http/DataResponse";
import Service from "../../../shared/Service";
import type UserOut from "../core/domain/UserOut";
import UserCreateUsecase from "../core/usecases/UserCreateUsecase";
import UserDeleteUsecase from "../core/usecases/UserDeleteUsecase";
import UserUpdateUsecase from "../core/usecases/UserUpdateUsecase";
import UserRepository from "../infraestructure/UserRepository";

export default class UserService extends Service<DataRequest<any>> {
    private repository: UserRepository;  

    constructor(
        public context: AppContext, 
        dataRequest: DataRequest<any>,
    ) {
        super(dataRequest);
        this.repository = new UserRepository(this.context.bdClient);
    }
    
    async createUser(): Promise<DataResponse<UserOut | null>> {
        return await new UserCreateUsecase(this.repository).execute(this.context, this.dataRequest);
    }

    async updateUser(): Promise<DataResponse<UserOut | null>> {
        return await new UserUpdateUsecase(this.repository).execute(this.context, this.dataRequest);
    }

    async deleteUser(): Promise<DataResponse<UserOut | null>> {
        return await new UserDeleteUsecase(this.repository).execute(this.context, this.dataRequest);
    }

}