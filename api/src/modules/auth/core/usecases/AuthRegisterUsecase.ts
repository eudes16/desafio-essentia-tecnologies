import type AppContext from "../../../../shared/AppContext";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
import type { UseCase } from "../../../../shared/UseCase";
import type AuthUserOut from "../domain/AuthUserOut";
import type AuthUserRegisterIn from "../domain/AuthUserRegisterIn";
import type Repository from "../domain/Repository";

export default class AuthRegisterUsecase implements UseCase<DataRequest<AuthUserRegisterIn>, DataResponse<AuthUserOut | null>> {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    async execute(context: AppContext, input: DataRequest<AuthUserRegisterIn>): Promise<DataResponse<AuthUserOut | null>> {
        const registerUser: AuthUserRegisterIn = { ...input.data };

        registerUser.password = context.helpers?.crypto?.passwordEncode(registerUser.password) + "";

        const result = await this.repository.register(registerUser);

        if (!result) {
            return {
                status: false,
                message: "Failed to register user",
                data: null,
            };
        }

        return {
            status: true,
            data: result,
        };
    }
}