
export interface QueryPage {
    page?: number | string | null
    limit?: number | string | null
}

export default interface Page {
    totalRecords: number
    currentPage: number
    totalPages: number
    nextPage: number | null
    previousPage: number | null
}
