import type AppContext from "./AppContext";

export interface UseCase<IN, OUT> {
    execute(context: AppContext, input: IN): Promise<OUT>;
}