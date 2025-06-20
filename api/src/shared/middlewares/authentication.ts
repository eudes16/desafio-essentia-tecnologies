import type { NextFunction, Request, Response } from "express";
import HttpStatus from "../http/HttpStatus";
import { validateToken } from "../jwt/validateToken";
import { TokenExpiredError } from "jsonwebtoken";
import prismaClient from "../db/prismaClient";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token not found.' });
        return;
    }

    const [_, token = ''] = authHeader.split(' ');

    try {
        const decoded = await validateToken(token, process.env.APP_JWT_SECRET as string);

        // Validate session in the database and check if it is still active
        const session =  await prismaClient.session.findFirst({
            where: { token: token, expiresAt: { gt: new Date() } },
        });

        if (!session) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Session not found or expired.' });
            return;
        }

        (req as any).user = decoded;
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token expired.' });
            return;
        }
        console.error('Token validation error:', err);
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token.' });
        return;
    }
};
 