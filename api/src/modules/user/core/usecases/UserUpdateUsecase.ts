import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type Repository from "../domain/Repository";
import type UserOut from "../domain/UserOut";
import type UserUpdateIn from "../domain/UserUpdateIn";

export default class UserUpdateUsecase implements UseCase<DataRequest<UserUpdateIn>, DataResponse<UserOut | null>> {

    constructor(private repository: Repository) {
        this.repository = repository;
    }

    async execute(context: AppContext, input: DataRequest<UserUpdateIn>): Promise<DataResponse<UserOut | null>> {

        const updateUser: UserUpdateIn = { ...input.data };

        if (updateUser.password) {
            updateUser.password = context.helpers?.crypto?.passwordEncode(updateUser.password) + "";
        }

        const result = await this.repository.update(updateUser);

        if (!result) {
            throw new Error("Failed to update user");
        }

        return {
            status: true,
            data: result,
        };

    }


}