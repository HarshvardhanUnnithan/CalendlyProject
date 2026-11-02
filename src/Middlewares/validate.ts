import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequest } from "../utils/api_errors.js";


//When you write a function, ask:
// “What could go wrong?” Handle those cases at the top and exit. Then write the normal flow below without worrying about them.

export const validate = (schema: ZodType) =>
    (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            throw BadRequest("Validation failed", result.error.issues);
        }

        req.body = result.data;
        next();
    };