export class ApiError extends Error {
    readonly statusCode: number
    readonly details?: unknown

    constructor(statusCode: number, message: string, details?: unknown) {
        super(message)
        this.statusCode = statusCode
        this.details = details
        this.name = "ApiError"
        Error.captureStackTrace(this, this.constructor)

    }
}


// Factory helpers: camelCase because they are plain functions, not classes (no `new` needed).
export const badRequest = (message: string, details?: unknown) => new ApiError(400, message, details);
export const notFound = (message: string, details?: unknown) => new ApiError(404, message, details)
export const conflict = (message: string, details?: unknown) => new ApiError(409, message, details)
export const internalServerError = (message = "Internal Server Error") => new ApiError(500, message);
