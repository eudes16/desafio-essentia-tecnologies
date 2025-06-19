import type { User } from "../../../../generated/client";

export default interface UserUpdateIn extends Pick<User, "email" | "name"> {
    id?: number;
    password?: string;
}
