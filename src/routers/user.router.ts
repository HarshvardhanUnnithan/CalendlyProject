import { Router } from "express"
import { finduserByID, findlAllUsers, createuser, deleteuserByID } from "../controllers/user.controller.js"
import { validate } from "../Middlewares/validate.js"
import { Userschema } from "../Dto's/user.dto.js"
export const userRouter: Router = Router()
// everything written  in app.use() will be seen here.


userRouter.get("/", findlAllUsers)


userRouter.get("/:id", finduserByID)

/*
app.use("/users", userRouter) A request comes in for GET /users/42.
Express matches the /users prefix, chops it off, and hands the remainder to your router

userRouter.get("/", findlAllUsers)-if its a get request and nothing is written after /users or what is written in app.use("/xyz")
:id - Specifies id can be  diffrent values and not a fixed value.
:id is a route parameter ,matches exactly one path segment
*/

userRouter.delete("/:id", deleteuserByID)
userRouter.post("/", validate(Userschema), createuser)