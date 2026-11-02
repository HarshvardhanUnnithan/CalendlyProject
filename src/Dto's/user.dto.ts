import * as z from 'zod';

export const Userschema = z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string().min(2).max(100),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type UserDtoType = z.infer<typeof Userschema>;