
//Business Logic

import type { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js"
import * as userRepository from "../repositories/user.repository.js"
import { conflict, notFound } from "../utils/api-error.js"

export async function getAllUsers() {
    const users = await userRepository.findAll()
    return users
}

export async function getUserById(id: number) {
    const user = await userRepository.findById(id)
    if (!user)// if statements require statements to be true to run,then empty or falsy
    //values need to be converted to true.
    {
        throw notFound("User Not found")
    }
    return user
}

export async function deleteUser(id: number) {
    await getUserById(id)
    const user = await userRepository.deleteById(id)
    return user
}

export async function updateUser(id: number, data: UpdateUserDto) {
    await getUserById(id)
    if (data.email) {
        const existingUser = await userRepository.findByEmail(data.email)
        if (existingUser && existingUser.id !== id) {
            throw conflict("User with this email already exists")
        }
    }
    const user = await userRepository.updateById(id, data)
    return user
}


export async function createUser(data: CreateUserDto) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const newUser = await userRepository.create(data);
    return newUser;
}