import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { ZodError } from "zod"
import { Enviroment } from "../utils/types"

export class HttpException extends Error {
    public status: number
    public message: string
    constructor(status: number, message: string) {
        super(message)
        this.status = status
        this.message = message
    }
}

function globalErrorHandler(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    let errStatus = 500
    let errMessage = "Something went wrong"
    let errStack = err.stack ?? ""

    if (err instanceof HttpException) {
        errStatus = err.status
        errMessage = err.message
    }

    response.status(errStatus).json({
        message: errMessage,
        errors: [],
        stack: process.env.NODE_ENV === Enviroment.DEV ? errStack : "",
    })
}

function zodValidationHandler(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (err instanceof ZodError) {
        response.status(StatusCodes.BAD_REQUEST).json({
            message: "JSON input validation error.",
            errors: err.flatten().fieldErrors,
        })
    } else {
        next(err)
    }
}

function notFoundHandler(
    request: Request,
    response: Response,
    next: NextFunction
) {
    response.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
    })
}

export { globalErrorHandler, notFoundHandler, zodValidationHandler }
