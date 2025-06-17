import type AppContext from "./AppContext";

export interface UseCase<IN, OUT> {
    execute(input: IN, context: AppContext): Promise<OUT>;
}