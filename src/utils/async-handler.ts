import { NextFunction, Request, RequestHandler, Response } from "express"

//
/**
 * A unity to wrap async handler and middlewares so Exception can be handle by express.
 * This behavior is auto in express 5 but not current version (4)
 *
 * https://expressjs.com/en/guide/error-handling.html
 * @param func
 * @returns RequestHandler
 */
export function asyncWrapper(func: RequestHandler) {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(func(req, res, next)).catch(next)
    }
}
