
/*
Event controllers: take what the request carries, call the service, reply with sendSuccess.

The host's id is not in the URL. The requireUser middleware (see event.router) reads it from the
x-user-id header and stores it on req.userId before any of these functions run.
The `!` in req.userId! tells TypeScript "this is definitely set". That is safe here because
requireUser rejects the request before it gets this far if there is no valid user.
*/

import type { Request, Response } from "express"

import * as eventService from "../services/event.service.js"
import { sendSuccess } from "../utils/api-response.js"
import { parseId } from "../utils/parse-id.js"

export async function getMyEvents(req: Request, res: Response) {
    const events = await eventService.getMyEvents(req.userId!)
    sendSuccess(res, events, 200, "Events fetched successfully")
}

export async function getEventById(req: Request, res: Response) {
    const eventId = parseId(req.params.id, "Event id")
    const event = await eventService.getEventById(req.userId!, eventId)
    sendSuccess(res, event, 200, "Event fetched successfully")
}

export async function createEvent(req: Request, res: Response) {
    const event = await eventService.createEvent(req.userId!, req.body)
    sendSuccess(res, event, 201, "Event created successfully")
}

export async function updateEvent(req: Request, res: Response) {
    const eventId = parseId(req.params.id, "Event id")
    const event = await eventService.updateEvent(req.userId!, eventId, req.body)
    sendSuccess(res, event, 200, "Event updated successfully")
}

export async function deleteEvent(req: Request, res: Response) {
    const eventId = parseId(req.params.id, "Event id")
    const event = await eventService.deleteEvent(req.userId!, eventId)
    sendSuccess(res, event, 200, "Event deleted successfully")
}
