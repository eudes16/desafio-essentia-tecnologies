import express from "express";
import { env } from "../config/env";
import RoutesRegister from "./routes";
import type AppContext from "../shared/AppContext";
import prismaClient from "../shared/db/prismaClient";
var cors = require('cors')


export class HttpServer {
    private app = express();

    constructor() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        }))
    }

    private async initRoutes(appContext: AppContext) {
        const router = await new RoutesRegister(appContext).registerRoutes();
        this.app.use("/api", router);
    }

    public async start() {
        const appContext: AppContext = {
            appName: env.appName,
            appVersion: env.version,
            bdClient: prismaClient,
            jwtSecret: env.jwtSecret,
            jwtExpiration: env.jwtExpiration,
        };

        await this.initRoutes(appContext);

        this.app.listen(env.port, () => {
            console.log(`🚀 Server running at http://${env.host}:${env.port}/api`);
        });
    }
}