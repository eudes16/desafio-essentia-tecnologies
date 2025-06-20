import type { OrderBy } from "./OrderBy"

const resolveOrderBy = (orderBy: [OrderBy]): any => {
    const order:any = {}

    orderBy?.forEach((item) => {
        if (!item.field || !item.direction) {
            throw new Error("Invalid orderBy item: field and direction are required")
        }
        
        order[item.field] = item.direction.toLowerCase()
    })

    return order
}

export default resolveOrderBy