import type AuthIn from "../domain/AuthIn";
import type AuthTokenOut from "../domain/AuthTokenOut";
import type AppContext from "../../../../shared/AppContext";
import type { UseCase } from "../../../../shared/UseCase";
import type Repository from "../domain/Repository";
import generateToken from "../../../../shared/jwt/generateToken";
import type { Session } from "../../../../generated/client";
import type AuthCreateSession from "../domain/AuthCreateSession";
import { validateToken } from "../../../../shared/jwt/validateToken";
import moment from "moment";

/**
 * AuthLoginUsecase is responsible for handling user authentication.
 * It implements the UseCase interface with AuthIn as input and AuthTokenOut as output.
 */
export default class AuthLoginUsecase implements UseCase<AuthIn, AuthTokenOut> {
    constructor(private repository: Repository) {
        this.repository = repository;   
    }

    async execute(context: AppContext, input: AuthIn): Promise<AuthTokenOut> {
        const { email, password } = input;
        

        const authUser = await this.repository.authenticate(email, password);

        if (!authUser) {
            throw new Error("Authentication failed");
        }

        if (authUser.password !== password) {
            throw new Error("Invalid password");
        }

        const payload = {
            id: authUser.id,
            email: authUser.email,
            name: authUser.name,
        }

        const token = await generateToken(payload, context.jwtSecret, context.jwtExpiration);

        const decoded: any = await validateToken(token, context.jwtSecret);

        const utcSeconds = Number(decoded.exp);
        const utcDate = new Date(0); // The 0 sets the date to the epoch
        utcDate.setUTCSeconds(utcSeconds);

        const session: AuthCreateSession = {
            token: token,
            userId: decoded.id,
            expiresAt: utcDate, 
        }

        const sessionResult = await this.repository.saveSession(session as Session);

        if (!sessionResult) {
            throw new Error("Failed to save session");
        }

        return {
            token, 
        }

    }
}
