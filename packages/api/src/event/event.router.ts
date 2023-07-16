import { Router } from "express";
import { createEvent, getEventsStats } from "./event.controller";
import { validate } from "../middlewares/validate";
import { CreateEvent } from "./event.zod";
import { verifyApp } from "../middlewares/verify";

const eventRouter: Router = Router();

eventRouter.post("/", validate(CreateEvent), verifyApp, createEvent);

eventRouter.get("/stats", getEventsStats);

export default eventRouter;
