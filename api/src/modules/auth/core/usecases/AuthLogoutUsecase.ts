import type AppContext from "../../../../shared/AppContext";
import type { UseCase } from "../../../../shared/UseCase";
import type AuthLogoutIn from "../domain/AuthLogoutIn";
import type AuthLogoutOut from "../domain/AuthLogoutOut";
import type Repository from "../domain/Repository";

export default class AuthLogoutUsecase implements UseCase<AuthLogoutIn, AuthLogoutOut> {
    constructor(private repository: Repository) {
        this.repository = repository;   
    }

    async execute(context: AppContext, input: AuthLogoutIn): Promise<AuthLogoutOut> {

        const { token } = input;
        
        const result  = await this.repository.logout(token)

        return {
            success: result
        }
    }

}