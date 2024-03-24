import express, { Express } from "express";

import "dotenv/config";
import mongoose from "mongoose";

import {
    globalErrorHandler,
    notFoundHandler,
    zodValidationHandler,
} from "./middlewares/error-handler";
import { logRequest } from "./middlewares/log-request";
import bookRouter from "./routes/book-route";

async function main() {
    const connectionString =
        process.env.DB_URL ?? "mongodb://127.0.0.1:27017/bookworn";
    const timeout = parseInt(process.env.DB_TIMEOUT_MS ?? "5000");

    const port = parseInt(process.env.PORT ?? "8000");

    console.log(`connstring = ${connectionString}, timeout = ${timeout}, port = ${port}`);


    await mongoose.connect(connectionString, {
        serverSelectionTimeoutMS: timeout,
    });

    const app: Express = express();
    app.use(express.json());
    app.use(logRequest);

    app.use("/books", bookRouter);

    app.use("*", notFoundHandler);

    app.use(zodValidationHandler);
    app.use(globalErrorHandler);

    app.listen(port, () => {
        console.log(`Server listen on port: ${port}`);
    });
}

main().catch((err) => {
    console.log(err);
});
