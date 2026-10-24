import { Request, Response, NextFunction } from "express";
import { NotFound } from "../utils/api_errors.js";

export const routenotfound = (_req: Request, _res: Response, next: NextFunction) => {
    next(NotFound("Route Not Found"))
}

/*
Here we call the next in line middleware,that will be our errorHandler.
and for the next middle ware we are providing the error object that the notfound() will return.
*/