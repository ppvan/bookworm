import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { ZodError } from "zod"

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
    err: Error | unknown,
    request: Request,
    response: Response,
    next: NextFunction
) {
    let errStatus = 500
    let errMessage = "Something went wrong"

    if (err instanceof HttpException) {
        errStatus = err.status
        errMessage = err.message
    }

    response.status(errStatus).json({
        message: errMessage,
        errors: [],
        stack: [],
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
    let err = new HttpException(404, "Page not found")

    next(err)
}

export { globalErrorHandler, notFoundHandler, zodValidationHandler }
