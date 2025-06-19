import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type AuthLogoutIn from "../domain/AuthLogoutIn";
import type AuthLogoutOut from "../domain/AuthLogoutOut";
import type Repository from "../domain/Repository";

export default class AuthLogoutUsecase implements UseCase<DataRequest<AuthLogoutIn>, DataResponse<AuthLogoutOut | null>> {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    async execute(context: AppContext, input: DataRequest): Promise<DataResponse<AuthLogoutOut | null>> {

        const { token } = input.data;

        const result = await this.repository.logout(token);

        if (!result) {
            return {
                status: false,
                data: {
                    logout: false,
                },
                message: "Logout failed. Token not found or invalid."
            }
        }

        return {
            status: true,
            data: {
                logout: true,
            },
        }
    }

}