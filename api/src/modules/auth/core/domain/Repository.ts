import type { Session, User } from "../../../../generated/client";

export default interface Repository {
    /**
     * Authenticates a user with the given credentials.
     * @param email - The email of the user.
     * @param password - The password of the user.
     * @returns A promise that resolves to an authentication token.
     */
    authenticate(email: string, password: string): Promise<User | null>;

    saveSession(session: Session): Promise<Session | null>;
}