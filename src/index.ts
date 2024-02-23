import { config as dotenv_config } from "dotenv";
dotenv_config(); //Environment configuration loaded here.

import express, { Express, NextFunction, Request, Response } from "express";
import rateLimit, { MemoryStore } from 'express-rate-limit';
import { ValidationError } from "express-json-validator-middleware";
import morgan from 'morgan';

import appRouter from "./route";
import { notFoundErrorHandler } from "./middleware/error-handling";
import HttpStatusCodes from "./constant/httpStatusCodes";
import APIPaths from "./constant/apiPath";

// get environment values
const PORT: string = process.env.PORT || '1818';

const app: Express = express();
app.use(morgan('dev'))

// ============ Rate Limiting Configuration
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 60,
    standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: true, // Disable the `X-RateLimit-*` headers
    store: new MemoryStore(),
});

app.use(limiter);

// ============ JSON middleware Configuration

// MAX 2mb request body
app.use(express.json({ limit: '2mb' }));

// ============ Session Management Configuration
app.set('trust proxy', 1);

// Route Configuration
app.use(APIPaths.BASE, appRouter);

// ============ Error Handling Configuration
app.use(notFoundErrorHandler);

// Set the server timeout to a longer duration (e.g., 5 minutes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof ValidationError) {
        // Handle the error
        res.status(400).send(err.validationErrors);
        next();
    } else {
        res.locals.message = 'Access Denied.';
        res.locals.error = req.app.get('env') === 'development' ? { status: err } : { status: 'Not Authorized ...!', };

        res.status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR);
        res.send(res.locals.error);
    };
});

// DB init Configuration
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.info(`REST API started on: ${PORT}`);
        });
    } catch (error) {
        console.error("Error at starting server: ", error);
    };
};
startServer();