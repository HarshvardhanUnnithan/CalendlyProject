
//Business Logic for event types

import type { CreateEventDto, UpdateEventDto } from "../dtos/event.dto.js"
import * as eventRepository from "../repositories/event.repository.js"
import { badRequest, conflict, forbidden, notFound } from "../utils/api-error.js"
import { findById } from "../repositories/user.repository.js"
import { slugify } from "../utils/slugify.js"
/*
hostId is always the user making the request (req.userId, set by the requireUser middleware).
Rules checked here:
1. A host can only see, update or delete their own events.
2. An in-person event must say where it happens (locationValue).
3. Every event has a unique slug. If the client doesn't send one, it is built from the title.
*/

export async function getMyEvents(hostId: number) {
    const events = await eventRepository.findAllByHostId(hostId)
    return events
}

export async function getEventById(hostId: number, eventId: number) {
    const event = await eventRepository.findById(eventId)
    if (!event) {
        throw notFound("Event not found")
    }
    if (event.hostId !== hostId) {
        throw forbidden("You do not have access to this event")
    }
    return event
}

export async function createEvent(hostId: number, data: CreateEventDto) {
    checkLocation(data.locationType, data.locationValue)

    let slug: string
    if (data.slug) {
        await checkSlugIsFree(hostId, data.slug) // the client chose it, so tell them if it's taken
        slug = data.slug
    } else {
        slug = await generateUniqueSlug(hostId, data.title) // we choose it, so just pick a free one
    }

    const newEvent = await eventRepository.create(hostId, { ...data, slug: slug })
    return newEvent
}

export async function updateEvent(hostId: number, eventId: number, data: UpdateEventDto) {
    const existingEvent = await getEventById(hostId, eventId) // 404 if missing, 403 if not yours

    // Check the event as it will be after the update: the new value if one was sent, the current one otherwise.
    // ?? is the nullish coalescing operator. It returns the right side only when the left side is null or undefined.
    checkLocation(
        data.locationType ?? existingEvent.locationType,
        data.locationValue ?? existingEvent.locationValue
    )

    if (data.slug && data.slug !== existingEvent.slug) {
        await checkSlugIsFree(hostId, data.slug)
    }

    const event = await eventRepository.updateById(eventId, data)
    return event
}

export async function deleteEvent(hostId: number, eventId: number) {
    await getEventById(hostId, eventId) // 404 if missing, 403 if not yours
    const event = await eventRepository.deleteById(eventId)
    return event
}

async function checkSlugIsFree(hostId: number, slug: string) {
    const existingEvent = await eventRepository.findBySlugForHost(hostId, slug)
    if (existingEvent) {
        throw conflict(`The slug "${slug}" is already taken`)
    }
}

/*
Builds a slug from the title and adds a number if that slug is already used:
"Intro Call" -> "intro-call", then "intro-call-2", "intro-call-3", ...
A title with no letters or digits (e.g. "!!!") falls back to "event".
*/
async function generateUniqueSlug(hostId: number, title: string) {
    const base = slugify(title) || "event"
    const takenSlugs = new Set(await eventRepository.findSlugsStartingWith(hostId, base))

    if (!takenSlugs.has(base)) {
        return base
    }

    let counter = 2
    while (takenSlugs.has(`${base}-${counter}`)) {
        counter++
    }
    return `${base}-${counter}`
}

// In-person events need an address in locationValue. Online events can leave it empty.
function checkLocation(locationType: string, locationValue?: string | null) {
    if (locationType === "in-person" && !locationValue) {
        throw badRequest("locationValue is required for in-person events")
    }
}

export async function findByHostIdAndSlug(hostId: number, slug: string) {
    const event = await eventRepository.findByHostIdAndSlug(hostId, slug)
    if (!event) {
        throw notFound("Event not found")
    }
    const host = await findById(hostId) // throws 404 if no user has this id
    if (!host) {
        throw notFound("Host not found")
    }
    return {
        eventtype: {
            id: event.id,
            name: event.title,
            slug: event.slug,
            description: event.description,
            locationType: event.locationType,
            locationValue: event.locationValue,
            duration: event.durationMinutes,
        },
        host: {
            id: host.id,
            email: host.email,
        }
    }
}