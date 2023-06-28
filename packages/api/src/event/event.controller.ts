import { Request, Response } from "express";
import * as eventService from "./event.service";

export async function createEvent({ body }: Request, res: Response) {
  const event = await eventService.createEvent(body);

  return res.json(event);
}
