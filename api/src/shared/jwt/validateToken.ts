import type { ValidateToken } from "./port/JwtToken";

const jwt = require('jsonwebtoken');

export const validateToken: ValidateToken = async (token, secret) => {
    const response = jwt.verify(token, secret, {
        algorithms: ["HS256"],
    });

    return response;
}