import type { Session, User } from "../../../../generated/client";
import type AuthUserOut from "./AuthUserOut";
import type AuthUserRegisterIn from "./AuthUserRegisterIn";

export default interface Repository {
    /**
     * Authenticates a user with the given credentials.
     * @param email - The email of the user.
     * @param password - The password of the user.
     * @returns A promise that resolves to an authentication token.
     */
    authenticate(email: string): Promise<User | null>;

    /**
     * Saves a session for a user.
     * @param session - The session object containing userId, expiresAt, and token.
     * @returns A promise that resolves to the saved session or null if saving failed.
     */
    saveSession(session: Session): Promise<Session | null>;

    /**
     * Logs out a user by invalidating their session.
     * @param token - The session token to invalidate.
     * @param userId - The ID of the user to log out.
     * @returns A promise that resolves to a boolean indicating success or failure.
     */
    logout(token: string): Promise<boolean>;

    /**
     * Registers a new user with the provided registration details.
     * @param user - The registration details of the user.
     * @returns A promise that resolves to the created user or null if registration failed.
     */
    register(user: AuthUserRegisterIn): Promise<AuthUserOut | null>;
}