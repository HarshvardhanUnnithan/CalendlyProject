
/*
Request and response manupulations and validations.
Request object has everything realated to client request.
Controller functions should have request and response objects.
Controller functions call our service layer.
*/

import { Request, Response } from "express"
import {
    findallusers as findAllUsersService, findbyid as findbyidservice, deletebyid as deletebyidservice,
    createuser as createuserService
} from "../services/user.service.js"
import { sendsuccess } from "../utils/api_response.js"

export async function findlAllUsers(_req: Request, res: Response) {
    const users = await findAllUsersService()
    res.json(users)
}

/*
await findAllUsersService() — calls the service, which returns a Promise because it hits the database.
await pauses this function until that Promise resolves, then hands you the resolved value (the array of users),
not the Promise wrapper.

res.json(response) — serializes the array to JSON, sets Content-Type: application/json, and sends it.
The request is now finished.
*/

export async function finduserByID(req: Request, res: Response) {
    const { id } = req.params;
    const response = await findbyidservice(Number(id))
    res.json(response)

}

/*
The name inside the braces is doing double duty.It's the property key to look up and the variable name to create 
,at the same time.Case-sensitive, exact match.

*/

export async function deleteuserByID(req: Request, res: Response) {
    const { id } = req.params;
    const response = await deletebyidservice(Number(id))
    sendsuccess(res, response, 200, "User deleted successfully")

}


export async function createuser(req: Request, res: Response) {
    const { name, email } = req.body;
    const response = await createuserService({ name, email })
    sendsuccess(res, response, 201, "User created successfully")
}