import type { Request, Response, NextFunction } from "express";

import { notFound } from "../utils/api-error.js";

export const routeNotFound = (_req: Request, _res: Response, next: NextFunction) => {
    next(notFound("Route Not Found"))
}

/*
Here we call the next in line middleware,that will be our errorHandler.
and for the next middle ware we are providing the error object that the notFound() will return.
*/