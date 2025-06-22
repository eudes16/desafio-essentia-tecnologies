import type AuthIn from "../domain/AuthIn";
import type AuthTokenOut from "../domain/AuthTokenOut";
import type AppContext from "../../../../shared/AppContext";
import type { UseCase } from "../../../../shared/UseCase";
import type Repository from "../domain/Repository";
import generateToken from "../../../../shared/jwt/generateToken";
import type { Session } from "../../../../generated/client";
import type AuthCreateSession from "../domain/AuthCreateSession";
import { validateToken } from "../../../../shared/jwt/validateToken";
import type DataRequest from "../../../../shared/http/DataRequest";
import type DataResponse from "../../../../shared/http/DataResponse";
const crypto = require("crypto");

/**
 * AuthLoginUsecase is responsible for handling user authentication.
 * It implements the UseCase interface with AuthIn as input and AuthTokenOut as output.
 */
export default class AuthLoginUsecase implements UseCase<DataRequest<AuthIn>, DataResponse<AuthTokenOut | null>> {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    async execute(context: AppContext, input: DataRequest<AuthIn>): Promise<DataResponse<AuthTokenOut | null>> {
        const { email, password } = input.data;

        const hashedPassword = context.helpers?.crypto?.passwordEncode(password) + ""

        const authUser = await this.repository.authenticate(email, hashedPassword);

        if (!authUser) {
            throw new Error("Authentication failed");
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
            return {
                status: false,
                data: null,
                message: "Failed to save session"
            }
        }

        return {
            status: true,
            data: {
                token
            }
        }

    }
}
