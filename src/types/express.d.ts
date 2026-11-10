/*
Type-only file: nothing here runs. It tells TypeScript that a request can carry a userId.
The requireUser middleware sets it from the x-user-id header, so later handlers can read req.userId.
*/

declare global {
    namespace Express {
        interface Request {
            userId?: number
        }
    }
}

export {} // `declare global` is only allowed inside a module, and an export makes this file one
