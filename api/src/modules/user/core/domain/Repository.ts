import type User from "./User";
import type UserCreateIn from "./UserCreateIn";
import type UserDeleteIn from "./UserDeleteIn";
import type UserOut from "./UserOut";
import type UserUpdateIn from "./UserUpdateIn";

export default interface Repository {
    /**
     *  Create a new user.
     *  @param createUser - The user data to create.
     *  @returns The created user.
     */
    create: (createUser: UserCreateIn) => Promise<UserOut | null>;

    update: (createUser: UserUpdateIn) => Promise<UserOut | null>;

    delete: (deleteUser: UserDeleteIn) => Promise<UserOut | null>;

}