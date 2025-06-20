import type Todo from "./Todo";

export default interface TodoDeleteIn extends Pick<Todo, "id"> {}