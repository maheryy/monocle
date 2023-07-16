import { Request, Response, NextFunction } from "express";
import * as eventService from "./event.service";
import { TCreateEventBody } from "./event.zod";

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { source, secret, ...data } = req.body as TCreateEventBody;
    const event = await eventService.createEvent(data);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}
