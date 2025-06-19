import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type Repository from "../domain/Repository";
import type UserOut from "../domain/UserOut";
import type UserDeleteIn from "../domain/UserDeleteIn";

export default class UserDeleteUsecase implements UseCase<DataRequest<UserDeleteIn>, DataResponse<UserOut | null>> {

    constructor(private repository: Repository) {
            this.repository = repository;   
    }

    async execute(context: AppContext, input: DataRequest<UserDeleteIn>): Promise<DataResponse<UserOut | null>> {

        const deleteUser: UserDeleteIn = { ...input.data };

        const result = await this.repository.delete(deleteUser);

        if (!result) {
            return {
                status: false,
                data: null,
                message: "Failed to find and/or delete user",
            }
        }

        return {
            status: true,
            data: result,
        };

    }


}