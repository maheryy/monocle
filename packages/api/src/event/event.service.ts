import prisma from "../database";
import { TCreateEventData } from "./event.zod";

export function createEvent(data: TCreateEventData) {
  return prisma.event.create({ data });
}
