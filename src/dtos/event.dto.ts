import { z } from "zod";

import { SLUG_PATTERN } from "../utils/slugify.js";

/*
No hostId in the body on purpose: the host is whoever sends the request (x-user-id header),
so a client can't create events for another user. Zod drops unknown fields, so a hostId sent anyway is ignored.
*/
export const createEventSchema = z.object({
    title: z.string().min(2).max(100),
    // Optional: if the client leaves it out, the service builds one from the title.
    slug: z
        .string()
        .max(100)
        .regex(SLUG_PATTERN, "slug may only contain lowercase letters, numbers and single dashes, e.g. 30-min-meeting")
        .optional(),
    description: z.string().optional(),
    durationMinutes: z.number().int().positive(),
    locationType: z.enum(["online", "in-person"]),
    locationValue: z.string().optional(),
    bufferBeforeMinutes: z.number().int().nonnegative().optional(),
    bufferAfterMinutes: z.number().int().nonnegative().optional(),
});

// On update every field is optional, and isActive lets the host switch an event off and on.
export const updateEventSchema = createEventSchema
    .extend({ isActive: z.boolean() })
    .partial();

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;