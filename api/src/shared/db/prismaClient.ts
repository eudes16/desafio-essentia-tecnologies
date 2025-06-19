import { PrismaClient } from "../../generated/client"
import resolveParams from "../../http/resolveParams"

const log = (process.env.ERROR_LOG?.replace(/\s/g, "")?.split(',') || []) as any

const prismaClient = new PrismaClient({
    log: log
}).$extends({
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                if (
                    operation === "findMany" || operation === "aggregate" || operation === "count" || operation === "findFirst" 
                    || operation === "findUnique" || operation === "findFirstOrThrow" || operation === "findUniqueOrThrow"
                ) {
                    args.where = {
                        ...args.where,
                        deletedAt: null,
                    }
                }
                return query(args)
            },
        },
    },
});

export default prismaClient