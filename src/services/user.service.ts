
//Business Logic

import { createuser as createuserRepo, getAll, getuserbyid, removeuserbyid } from "../repositories/user.repository.js"
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

export async function deletebyid(id: number) {
    const user = await removeuserbyid(id)
    return user
}


export async function createuser(user: { name: string, email: string }) {
    const newuser = await createuserRepo(user)
    return newuser
}