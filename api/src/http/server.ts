import express from 'express';

import { env } from '../config/env';

export const createServer = () => {
    const app = express();

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Example route
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    
    return app;
}

export const startServer = () => {
    const app = createServer();
    const port = env.port;

    app.listen(port, () => {
        console.log(`Server is running on http://${env.host}:${env.port}`);
    });
}