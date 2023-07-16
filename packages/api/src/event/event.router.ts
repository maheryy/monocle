import { Router } from "express";
import { createEvent } from "./event.controller";
import { validate } from "../middlewares/validate";
import { CreateEvent } from "./event.zod";

const eventRouter: Router = Router();

eventRouter.post("/", validate(CreateEvent), createEvent);

export default eventRouter;
