export type DataResponse<T> = {
    data: T
    page?: Page
    message?: string | string[];
}

export type Page = {
    totalRecords: number
    currentPage: number
    totalPages: number
    nextPage: number | null
    previousPage: number | null
}
