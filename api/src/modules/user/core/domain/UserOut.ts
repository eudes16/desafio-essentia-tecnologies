import type User from "./User";

export default interface UserOut extends Omit<User, "password"> {}
