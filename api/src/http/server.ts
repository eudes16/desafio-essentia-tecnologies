import express from "express";
import { env } from "../config/env";
import RoutesRegister from "./routes";
import type AppContext from "../shared/AppContext";
import prismaClient from "../shared/db/prismaClient";

export class HttpServer {
    private app = express();

    constructor() {
        const appContext: AppContext = {
            appName: env.appName,
            appVersion: env.version,
            bdClient: prismaClient,
            jwtSecret: env.jwtSecret,
            jwtExpiration: env.jwtExpiration,
        }

        this.app.use(express.json());
        this.app.use("/api", new RoutesRegister(appContext).registerRoutes());

    }

    public async start() {
        await this.app.listen(env.port, () => {
            console.log(`🚀 Server running at http://${env.host}:${env.port}/api`);
        });
    }
}