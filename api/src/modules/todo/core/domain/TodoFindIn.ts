import type { Filter } from "../../../../shared/records/Filter";
import type { OrderByType } from "../../../../shared/records/OrderBy";
import type { QueryPage } from "../../../../shared/records/Page";

type TodoFields = "id" | "userId" | "title" | "description" | "priority" | "status" | "createdAt" | "updatedAt" | "deleteAt";

export type TodoQueryFields =  {
    [K in TodoFields]?: Partial<Filter>
}

export type TodoOrderByFields = {
    [K in TodoFields]?: OrderByType
}

export default interface TodoFindIn {
    where: TodoQueryFields;
    orderBy?: TodoOrderByFields
    pagination?: QueryPage
}