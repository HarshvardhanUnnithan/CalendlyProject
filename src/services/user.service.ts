
//Business Logic

import { getAll, getuserbyid } from "../repositories/user.repository.js"
import { NotFound } from "../utils/api_errors.js"

export async function findallusers() {
    const users = await getAll()
    return users
}

export async function findbyid(id: number) {
    const user = await getuserbyid(id)
    if (!user)// if statements require statements to be true to run,then empty or falsy 
    //values need to be converted to true.
    {
        throw NotFound("User Not found")
    }
    return user
}