import type AppContext from "../AppContext"
import type DataResponse from "../http/DataResponse"
import type Page from "./Page"
import type RecordResponse from "./RecordResponse"

export default function(response: DataResponse & { count?: number }, context: AppContext): RecordResponse {

    let responseRecords: RecordResponse = {
        data: response?.data ?? [],
    }

    if (context.session?.pagination?.page && response?.data && Array.isArray(response.data)) {
        const totalRecords = response?.count ?? 0
        const limit = context.session?.pagination?.limit ?? 10
        const currentPage = context.session?.pagination?.page ?? 1
    
        const page: Page  = resolveRecordsPagination(
            limit,  
            currentPage, 
            totalRecords
        )

        responseRecords.page = page;
    }

    if (response.message && Array.isArray(response.message)) {
        responseRecords.message = response.message.join(", ");
    }

    return responseRecords;
}

function calculateNumberOfPages(totalRecords: number, limit: number): number {
    return Math.ceil(totalRecords / limit)
}

function resolveRecordsPagination(limit: number, page: number, totalRecords: number): Page {
    const totalPages = calculateNumberOfPages(totalRecords, limit)

    return {
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
        totalRecords,
        totalPages,
    }
}