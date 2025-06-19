import type User from "./User";
import type UserCreateIn from "./UserCreateIn";
import type UserOut from "./UserOut";

export default interface Repository {
    /**
     *  Create a new user.
     *  @param createUser - The user data to create.
     *  @returns The created user.
     */
    create: (createUser: UserCreateIn) => Promise<UserOut | null>;
}