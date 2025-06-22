import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type Repository from "../domain/Repository";
import type UserCreateIn from "../domain/UserCreateIn";
import type UserOut from "../domain/UserOut";

// Todo: corrigiar o generic type do DataResponse
export default class UserCreateUsecase implements UseCase<DataRequest<UserCreateIn>, DataResponse<UserOut>> {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    async execute(context: AppContext, input: DataRequest<UserCreateIn>): Promise<DataResponse<UserOut>> {
        const createUser: UserCreateIn = { ...input.data }

        if (createUser.password) {
            createUser.password = context.helpers?.crypto?.passwordEncode(createUser.password) + "";
        }

        const result = await this.repository.create(createUser);

        if (!result) {
            throw new Error("Failed to create user");
        }

        return {
            status: true,
            data: result,
        }
    }

}