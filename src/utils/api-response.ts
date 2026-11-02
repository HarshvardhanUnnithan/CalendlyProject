// structuring the response for success.

import type { Response } from "express";

// An interface is a list of what an object must have.
interface SuccessPayload<T> {
    success: true;
    data: T,
    message?: string
}

export function sendSuccess<T>(res: Response, data: T, statusCode = 200, message?: string): void {
    const body: SuccessPayload<T> = {
        success: true,
        data: data
    };

    if (message) body.message = message;
    res.status(statusCode).json(body)
}