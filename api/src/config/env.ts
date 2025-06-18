import dotenv from "dotenv";
dotenv.config();

export const env = {
    version: process.env.APP_VERSION || "1.0.0",
    appName: process.env.APP_NAME || "Application",
    host: process.env.APP_HOST || "localhost",
    port: parseInt(process.env.APP_PORT || "4000", 10),
    jwtSecret: process.env.APP_JWT_SECRET || "default_secret",
    jwtExpiration: process.env.APP_JWT_EXPIRATION || "1h",
};