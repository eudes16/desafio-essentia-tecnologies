import type TodoCreateIn from "./TodoCreateIn";
import type TodoDeleteIn from "./TodoDeleteIn";
import type TodoOut from "./TodoOut";
import type TodoUpdateIn from "./TodoUpdateIn";

export default interface Repository {

    /** 
     *  Create a new todo item.
     *  @param data - The todo item to create.
     *  This method will add the todo item to the database.
     *  @returns The created todo item.
     */
    create(data: TodoCreateIn): Promise<TodoOut | null>;


    /**
     *  Delete a todo item.
     *  This method will remove the todo item from the database.
     *  If the todo item does not exist, it will return null.
     *  @param data
     *  @returns The deleted todo item or null if it does not exist.
     */
    delete(data: TodoDeleteIn): Promise<TodoOut | null>;

    /**
     *  Update a todo item.
     *  This method will update the todo item in the database.
     *  If the todo item does not exist, it will return null.
     *  @param data - The todo item to update.
     *  @returns The updated todo item or null if it does not exist.
     */
    update(data: TodoUpdateIn): Promise<TodoOut | null>;

}