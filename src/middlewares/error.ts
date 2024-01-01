import { NextFunction, Request, Response } from "express"

function errorHandler(
    err: unknown,
    request: Request,
    response: Response,
    next: NextFunction
) {
    let errStatus = 500
    let errMessage = "Something went wrong"

    response.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: [],
    })
}

export { errorHandler }
