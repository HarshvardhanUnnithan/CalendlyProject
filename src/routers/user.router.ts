import { Router } from "express"

import * as userController from "../controllers/user.controller.js"
import { createUserSchema, updateUserSchema } from "../dtos/user.dto.js"
import { validate } from "../middlewares/validate.js"

export const userRouter: Router = Router()
// everything written  in app.use() will be seen here.


userRouter.get("/", userController.getAllUsers)


userRouter.get("/:id", userController.getUserById)

/*
app.use("/users", userRouter) A request comes in for GET /users/42.
Express matches the /users prefix, chops it off, and hands the remainder to your router

userRouter.get("/", userController.getAllUsers)-if its a get request and nothing is written after /users or what is written in app.use("/xyz")
:id - Specifies id can be  diffrent values and not a fixed value.
:id is a route parameter ,matches exactly one path segment
*/

userRouter.delete("/:id", userController.deleteUser)
userRouter.post("/", validate(createUserSchema), userController.createUser)
userRouter.patch("/:id", validate(updateUserSchema), userController.updateUser)
