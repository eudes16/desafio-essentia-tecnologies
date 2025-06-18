import type { CreateToken } from "./port/JwtToken";

const jwt = require('jsonwebtoken');

const generateToken: CreateToken = async (payload: any, secret: string, expiresIn: string = "1d") => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: expiresIn,
    });

    return token;
}


export default generateToken