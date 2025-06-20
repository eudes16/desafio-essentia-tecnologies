type QueryParams = Record<string, any>;

interface QueryResult {
    where: Record<string, any>;
    pagination: { take: number; skip: number };
    include: Record<string, boolean>;
}

const suffixHandlers: [string, (field: string, value: any) => any][] = [
    ['_eq', (f, v) => v],
    ['_neq', (f, v) => ({ not: v })],
    ['_starts_with', (f, v) => ({ startsWith: v })],
    ['_not_starts_with', (f, v) => ({ not: { startsWith: v } })],
    ['_ends_with', (f, v) => ({ endsWith: v })],
    ['_not_ends_with', (f, v) => ({ not: { endsWith: v } })],
    ['_is', (f, v) => ({ is: v })],
    ['_not_is', (f, v) => ({ not: { is: v } })],
    ['_is_empty', (f, v) => ({ isEmpty: v })],
    ['_is_set', (f, v) => ({ isSet: v })],
    ['_in', (f, v) => ({ in: `${v}`.split(',').map(val => f === 'id' ? parseInt(val) : val) })],
    ['_not_in', (f, v) => ({ notIn: `${v}`.split(',') })],
    ['_lt', (f, v) => ({ lt: v })],
    ['_lte', (f, v) => ({ lte: v })],
    ['_gt', (f, v) => ({ gt: v })],
    ['_gte', (f, v) => ({ gte: v })],
    ['_contains', (f, v) => ({ contains: v })],
    ['_not_contains', (f, v) => ({ not: { contains: v } })],
];

export default function resolveQueryFilters<T>(params: QueryParams): QueryResult {
    const where: Record<string, any> = {};
    const pagination = {
        take: +(params.limit ?? 10),
        skip: params.page ? (params.page - 1) * +(params.limit ?? 10) : 0,
    };
    const include: Record<string, boolean> = {};

    for (const [key, value] of Object.entries(params)) {
        if (key === 'includes') {
            for (const v of `${value}`.split(',')) {
                include[v] = true;
            }
            continue;
        }

        let matched = false;
        for (const [suffix, handler] of suffixHandlers) {
            if (key.endsWith(suffix)) {
                const field = key.slice(0, -suffix.length);
                where[field] = handler(field, value);
                matched = true;
                break;
            }
        }
        if (!matched && !['limit', 'page'].includes(key)) {
            where[key] = value;
        }
    }

    return { where, pagination, include };
}
