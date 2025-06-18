import type { ValidateToken } from "./port/JwtToken";
import jwt from "jsonwebtoken";

export const validateToken: ValidateToken = async (token, secret) => {
    const response = await jwt.verify(token, secret, {
        algorithms: ["HS256"],
    });

    return response;
}