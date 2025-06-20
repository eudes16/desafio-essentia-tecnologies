import type Page from "./Page"

export default interface RecordResponse<T = any> {
    data: T
    page?: Page
    message?: string | string[]
}

