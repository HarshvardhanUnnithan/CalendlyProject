import { Router } from "express"

import * as eventController from "../controllers/event.controller.js"
import { createEventSchema, updateEventSchema } from "../dtos/event.dto.js"
import { requireUser } from "../middlewares/require-user.js"
import { validate } from "../middlewares/validate.js"

export const eventRouter: Router = Router()

/*
router.use() with no path runs for every request on this router, before the route's own handlers.
So every /events request must carry a valid x-user-id header, or it is rejected right here.
*/
eventRouter.use(requireUser)

eventRouter.get("/", eventController.getMyEvents)
eventRouter.get("/:id", eventController.getEventById)
eventRouter.post("/", validate(createEventSchema), eventController.createEvent)
eventRouter.patch("/:id", validate(updateEventSchema), eventController.updateEvent)
eventRouter.delete("/:id", eventController.deleteEvent)
