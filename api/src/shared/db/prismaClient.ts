import { PrismaClient } from "../../generated/client"

const log = (process.env.ERROR_LOG?.replace(/\s/g, "")?.split(',') || []) as any

const prismaClient = new PrismaClient({
    log: log
})

export default prismaClient