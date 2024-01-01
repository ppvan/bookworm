import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import { fromZodError } from "zod-validation-error"

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
        success: false,
        status: errStatus,
        message: errMessage,
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
        const validationError = fromZodError(err as ZodError)

        response.status(400).json(validationError)
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
