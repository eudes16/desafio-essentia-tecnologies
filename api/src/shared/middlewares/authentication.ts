import type { NextFunction, Request, Response } from "express";
import HttpStatus from "../HttpStatus";
import { validateToken } from "../jwt/validateToken";
import { TokenExpiredError } from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token not found.' });
        return;
    }

    const [_, token = ''] = authHeader.split(' ');

    try {
        const decoded = await validateToken(token, process.env.APP_JWT_SECRET as string);
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
 