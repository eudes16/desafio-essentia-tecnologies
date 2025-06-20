import type { NextFunction, Request, Response } from "express";

export const getDataToContext = async (req: Request, res: Response, next: NextFunction) => {

    // get page and limit from query parameters
    const page =  req?.query?.page ?? null;
    const limit = req?.query?.limit ?? null;


    // set pagination data in the request context
    if (page || (page && limit)) {
        const pagination: any = {};
        pagination.page = page ? parseInt(page as string, 10) : null;
        pagination.limit = limit ? parseInt(limit as string, 10) : null;
        (req as any).pagination = pagination;
    }

    next();
}