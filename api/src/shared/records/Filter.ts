export interface Filter {
    _eq: any
    _not: any
    _in: any[]
    _not_in: any[]
    _lt: any
    _lte: any
    _gt: any
    _gte: any
    _contains: any
    _not_contains: any
    _starts_with: any
    _not_starts_with: any
    _ends_with: any
    _not_ends_with: any
    _is: boolean
    _not_is: boolean
    _has: any[]
    _has_every: any[]
    _has_some: any[]
    _is_empty: boolean
    _is_set: boolean
}

export type QueryFilter = {
    [name: string]: Partial<Filter>;
}; 

