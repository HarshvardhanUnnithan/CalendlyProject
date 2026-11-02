import * as z from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    name: z.string().min(2).max(100),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;