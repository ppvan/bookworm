import express, { Express } from "express"

import mongoose from "mongoose"
import {
    globalErrorHandler,
    notFoundHandler,
    zodValidationHandler,
} from "./middlewares/error-handler"
import { logRequest } from "./middlewares/log-request"
import bookRouter from "./routes/book-route"

async function main() {
    const connectionString = "mongodb://127.0.0.1:27017/bookworn"
    await mongoose.connect(connectionString)

    const app: Express = express()
    const port = 3000
    app.use(express.json())
    app.use(logRequest)

    app.use("/books", bookRouter)

    app.use("*", notFoundHandler)

    app.use(zodValidationHandler)
    app.use(globalErrorHandler)

    app.listen(port, () => {
        console.log(`Server listen on port: ${port}`)
    })
}

main().catch((err) => {
    console.log(err)
})
