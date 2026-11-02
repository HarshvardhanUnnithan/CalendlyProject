import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

import { badRequest } from "../utils/api-error.js";


//When you write a function, ask:
// “What could go wrong?” Handle those cases at the top and exit. Then write the normal flow below without worrying about them.

export const validate = (schema: ZodType) =>
    (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            throw badRequest("Validation failed", result.error.issues);
        }

        req.body = result.data;
        next();
    };