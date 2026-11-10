import type { NextFunction, Request, Response } from "express";

import * as userService from "../services/user.service.js";
import { unauthorized } from "../utils/api-error.js";
import { parseId } from "../utils/parse-id.js";

/*
Works out which user is making the request.
For event routes the user id is not in the URL (req.params). The client sends it in a header:
    x-user-id: 7
If the header holds the id of a real user, the id is saved on req.userId and the request moves on.
Anyone can put any id in this header, so this is a stand-in until real login (e.g. a JWT) exists.
*/

const USER_ID_HEADER = "x-user-id";

export async function requireUser(req: Request, _res: Response, next: NextFunction) {
    const rawUserId = req.header(USER_ID_HEADER);

    if (!rawUserId) {
        throw unauthorized(`${USER_ID_HEADER} header is required`);
    }

    const userId = parseId(rawUserId, `${USER_ID_HEADER} header`);
    await userService.getUserById(userId); // throws 404 if no user has this id

    req.userId = userId;
    next();
}
