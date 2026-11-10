
//Database Calls for event types

import { prisma } from "../config/database.js"
import type { CreateEventDto, UpdateEventDto } from "../dtos/event.dto.js"

/*
Imported as a namespace (`import * as eventRepository`), like user.repository.
Only database calls live here. Rules such as "a host can only touch their own events" belong in event.service.
*/

export async function findAllByHostId(hostId: number) {
    return prisma.eventType.findMany({
        where: { hostId: hostId },
        orderBy: { createdAt: "desc" } // newest first
    })
}

export async function findById(id: number) {
    return prisma.eventType.findUnique({
        where: { id: id }
    })
}

// By the time data reaches the database, the service has made sure it has a slug. 
// intersection type combines several types into one with & ,a type that’s almost right but needs extra fields
export async function create(hostId: number, data: CreateEventDto & { slug: string }) {
    return prisma.eventType.create({
        data: { ...data, hostId: hostId }
    })
}

export async function updateById(id: number, data: UpdateEventDto) {
    return prisma.eventType.update({
        where: { id: id },
        data: data
    })
}

export async function deleteById(id: number) {
    return prisma.eventType.delete({
        where: { id: id }
    })
}


export async function findByHostIdAndSlug(hostId: number, slug: string) {
    return prisma.eventType.findFirst({
        where: {
            isActive: true,
            hostId: hostId,
            slug: slug
        }
    })
}

// Slugs are unique per host, not across all users. Unlike findByHostIdAndSlug,
// this also finds inactive events, because the database rule covers them too.
export async function findBySlugForHost(hostId: number, slug: string) {
    return prisma.eventType.findUnique({
        where: { hostId_slug: { hostId: hostId, slug: slug } }
    })
}

// Every slug of this host that is `base` itself or starts with "base-", e.g. "intro-call", "intro-call-2".
export async function findSlugsStartingWith(hostId: number, base: string) {
    const events = await prisma.eventType.findMany({
        where: {
            hostId: hostId,
            OR: [{ slug: base }, { slug: { startsWith: `${base}-` } }]
        },
        select: { slug: true }
    })
    return events.map((event) => event.slug)
}
