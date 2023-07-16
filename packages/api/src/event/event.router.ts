import { Router } from "express";
import {
  createEvent,
  getEventsStats,
  getMouseEvents,
} from "./event.controller";
import { validate } from "../middlewares/validate";
import { CreateEvent, GetMouseEvents } from "./event.zod";
import { verifyApp } from "../middlewares/verify";
import { authenticate } from "../middlewares/auth";

const eventRouter: Router = Router();

eventRouter.post("/", validate(CreateEvent), verifyApp, createEvent);

eventRouter.get("/stats", authenticate, getEventsStats);

eventRouter.get(
  "/mouse",
  authenticate,
  validate(GetMouseEvents),
  getMouseEvents
);

export default eventRouter;
