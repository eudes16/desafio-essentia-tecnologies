import type User from "../../../user/core/domain/User";

export default interface AuthUserOut extends Omit<User, "password"> {}