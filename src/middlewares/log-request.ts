import { NextFunction, Request, Response } from "express";

import strftime from "../utils/strftime";

export function logRequest(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const nowFormmated = strftime("%d/%b/%Y:%H:%M:%S %z");
    const logStr = `${request.ip} [${nowFormmated}] ${request.method} ${request.path} HTTP ${request.httpVersion}`;
    console.log(logStr);

    next();
}
