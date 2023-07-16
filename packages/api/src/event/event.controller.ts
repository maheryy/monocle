import { Request, Response, NextFunction } from "express";
import * as eventService from "./event.service";
import { TCreateEventData } from "./event.zod";
import { TGetMouseEvents } from "./event.zod";

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body as TCreateEventData;
    const event = await eventService.createEvent(data);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function getEventsStats(req: Request, res: Response) {
  const events = await eventService.getEventsStats();

  return res.status(200).json(events);
}

export async function getMouseEvents({ query }: Request, res: Response) {
  const events = await eventService.getMouseEvents(query as TGetMouseEvents);

  return res.status(200).json(events);
}
