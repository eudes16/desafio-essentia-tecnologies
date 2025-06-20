import type { PrismaClient } from "@prisma/client/extension";

export default interface AppContext {
    /**
     * The name of the application.
     */
    appName: string;

    /**
     * The version of the application.
     */
    appVersion: string;

    bdClient: PrismaClient;

    jwtSecret: string;

    jwtExpiration: string;

    session?: SessionData;
}

export interface AuthenticatedUser {
    id: number;
    email: string;
    name?: string;
}

export interface SessionData {
    user: AuthenticatedUser;
    token: string;
    pagination?: {
        page: number | null;
        limit: number | null;
    }
}