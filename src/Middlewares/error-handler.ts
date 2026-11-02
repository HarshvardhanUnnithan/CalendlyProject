import type { Request, Response, NextFunction } from "express";
import { api_error } from "../utils/api_errors.js";
import { NodeEnv } from "../config/env.js";

export function error_handler(err: Error, _req: Request, res: Response, _next: NextFunction) {

    if (err instanceof api_error) {
        const body: Record<string, unknown> = {
            success: false,
            message: err.message
        }
        if (err.details) body.details = err.details
        res.status(err.statuscode).json(body)
        return;
    }

    console.error("[Error]", err)
    const body: Record<string, unknown> = {
        success: false,
        message: "Something Wrong Occured"
    }


    if (NodeEnv == "development") body.details = err.stack;
    res.status(500).json(body)

}

