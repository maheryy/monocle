import prisma from "../database";
import { TCreateEvent } from "./event";

export function createEvent(data: TCreateEvent) {
  return prisma.event.create({
    data,
  });
}
