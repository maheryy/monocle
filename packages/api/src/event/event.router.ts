import { Router } from "express";
import {
  createEvent,
  getEventsStats,
  getMouseEvents,
} from "./event.controller";
import { validate } from "../middlewares/validate";
import { CreateEvent, GetMouseEvents } from "./event.zod";
import { verifyApp } from "../middlewares/verify";

const eventRouter: Router = Router();

eventRouter.post("/", validate(CreateEvent), verifyApp, createEvent);

eventRouter.get("/stats", verifyApp, getEventsStats);

eventRouter.get("/mouse", validate(GetMouseEvents), verifyApp, getMouseEvents);

export default eventRouter;
