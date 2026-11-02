
//Database Calls

import { prisma } from "../config/database.js";
//importing a shared client instance.

export async function getAll() {
    return prisma.user.findMany()
}

export async function getuserbyid(id: number) {
    const user = prisma.user.findUnique(
        {
            where: { "id": id }
        }
    )
    return user
}

export async function removeuserbyid(id: number) {
    const user = prisma.user.delete(
        {
            where: { "id": id }
        }
    )
    return user
}

export async function createuser(user: { name: string, email: string }) {
    const newuser = prisma.user.create(
        {
            data: user
        }
    )
    return newuser
}