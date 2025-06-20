import type { Request } from "express";
import type AppContext from "./AppContext";

export default async function updateContext(req: Request, context: AppContext): Promise<AppContext> {
    const { pagination, user } = req as any;

    let sessionData: any = {};

    if (pagination  || user ) {
        sessionData = {
            user: user || null,
            pagination: pagination || null,
        };

        context.session = sessionData

    }
    

    return context;

}