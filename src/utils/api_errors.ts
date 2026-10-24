export class api_error extends Error {
    readonly statuscode: number
    readonly details?: unknown

    constructor(statuscode: number, message: string, details?: unknown) {
        super(message)
        this.statuscode = statuscode
        this.details = details
        this.name = "Api_Error"
        Error.captureStackTrace(this, this.constructor)

    }
}


export const BadRequest = (message: string, details?: unknown) => new api_error(400, message, details);
export const NotFound = (message: string, details?: unknown) => new api_error(404, message, details)
export const InternalServerError = (message = "Internal Server Error") => new api_error(500, message);
