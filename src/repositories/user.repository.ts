
//Database Calls

import { prisma } from "../config/database.js"; //importing a shared client instance.
import type { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";

/*
Naming: this file is imported as a namespace (`import * as userRepository`),
so names stay short — the call site reads userRepository.findById(id).
`delete` is a reserved word in JS, so deleteById is used instead.
*/

export async function findAll() {
    return prisma.user.findMany()
}

export async function findById(id: number) {
    const user = prisma.user.findUnique(
        {
            where: { "id": id }
        }
    )
    return user
}

export async function deleteById(id: number) {
    const user = prisma.user.delete(
        {
            where: { "id": id }
        }
    )
    return user
}

export async function updateById(id: number, data: UpdateUserDto) {
    const user = await prisma.user.update({
        where: { id: id },
        data: data
    });
    return user;
}

export async function create(data: CreateUserDto) {
    const newUser = await prisma.user.create({ data: data }); //key data is the word Prisma looks for
    return newUser;
}


export async function findByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
    return user;
}


