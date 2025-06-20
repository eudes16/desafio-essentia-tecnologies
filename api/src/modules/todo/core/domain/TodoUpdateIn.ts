import type Todo from "./Todo";

export default interface TodoUpdateIn extends Omit<Todo, "createdAt" | "updatedAt" | "deletedAt"> {}