
/*
Request and response manupulations and validations.
Request object has everything realated to client request.
Controller functions should have request and response objects.
Controller functions call our service layer.
*/

import type { Request, Response } from "express"

import * as userService from "../services/user.service.js"
import { sendSuccess } from "../utils/api-response.js"

/*
Namespace import: `userService.getUserById` makes it obvious which layer is being called,
and lets the controller reuse the same names (getUserById, createUser...) without `as` aliases.
*/

export async function getAllUsers(_req: Request, res: Response) {
    const users = await userService.getAllUsers()
    res.json(users)
}

/*
await userService.getAllUsers() — calls the service, which returns a Promise because it hits the database.
await pauses this function until that Promise resolves, then hands you the resolved value (the array of users),
not the Promise wrapper.

res.json(response) — serializes the array to JSON, sets Content-Type: application/json, and sends it.
The request is now finished.
*/

export async function getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await userService.getUserById(Number(id))
    res.json(response)

}

/*
The name inside the braces is doing double duty.It's the property key to look up and the variable name to create 
,at the same time.Case-sensitive, exact match.

*/

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const response = await userService.deleteUser(Number(id))
    sendSuccess(res, response, 200, "User deleted successfully")

}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const response = await userService.updateUser(Number(id), req.body)
    sendSuccess(res, response, 200, "User updated successfully")
}


export async function createUser(req: Request, res: Response) {
    const response = await userService.createUser(req.body)
    sendSuccess(res, response, 201, "User created successfully")
}