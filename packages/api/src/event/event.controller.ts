import { Request, Response, NextFunction } from "express";
import * as eventService from "./event.service";
import { TCreateEvent } from "./event.zod";
import { TGetMouseEvents } from "./event.zod";

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body as TCreateEvent;
    const event = await eventService.createEvent(data);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function getEventsStats({ appId }: Request, res: Response) {
  const events = await eventService.getEventsStats(appId);

  return res.status(200).json(events);
}

export async function getMouseEvents({ query, appId }: Request, res: Response) {
  const events = await eventService.getMouseEvents(
    appId,
    query as TGetMouseEvents
  );

  return res.status(200).json(events);
}
