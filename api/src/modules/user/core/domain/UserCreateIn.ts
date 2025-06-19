import type User from "./User";

export default interface UserCreateIn extends Pick<User, "email" | "name" | "password"> {}