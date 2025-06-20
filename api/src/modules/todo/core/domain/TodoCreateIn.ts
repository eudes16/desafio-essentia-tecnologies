import type Todo from "./Todo";

export default interface TodoCreateIn extends Pick<Todo, "userId" | "title" | "description" | "dueDate" | "status" | "priority"> {} 



