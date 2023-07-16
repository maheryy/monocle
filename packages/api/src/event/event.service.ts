import prisma from "../database";
import { TCreateEventData } from "./event.zod";

export function createEvent(data: TCreateEventData) {
  return prisma.event.create({ data });
}

export function countEvents(name?: string) {
  return prisma.event.count({
    where: {
      name,
    },
  });
}

export async function getEventsStats() {
  const eventsCount = await countEvents();

  const events = await prisma.event.groupBy({
    by: ["name"],
    where: {
      name: {
        not: "mouse",
      },
    },
    _count: {
      name: true,
    },
    orderBy: {
      _count: {
        name: "desc",
      },
    },
    take: 10,
  });

  return events.reduce(
    (acc, { name, _count }) => ({
      ...acc,
      [name]: {
        count: _count.name,
        percentage: _count.name / eventsCount,
      },
    }),
    {} as { [key: string]: { count: number; percentage: number } }
  );
}
