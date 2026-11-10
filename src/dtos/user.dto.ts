import * as z from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    name: z.string().min(2).max(100),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

