import { badRequest } from "./api-error.js"

/*
Ids reach us as text, because URL params and headers are always strings.
parseId turns that text into a positive whole number, or throws a 400.
"7" -> 7, while "abc", "0", "-3" and "1.5" are rejected.
Without this, Number("abc") gives NaN, Prisma rejects it, and the client gets a 500 instead of a 400.
*/
export function parseId(value: unknown, label: string): number {
    const id = Number(value)

    if (!Number.isInteger(id) || id <= 0) {
        throw badRequest(`${label} must be a positive integer`)
    }

    return id
}
