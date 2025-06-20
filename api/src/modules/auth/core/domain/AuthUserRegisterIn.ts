import type User from "../../../user/core/domain/User";

export default interface AuthUserRegisterIn extends Pick<User, "email" | "name" | "password"> {}