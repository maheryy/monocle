import prisma from "../database";
import { TCreateEventData, TGetMouseEvents } from "./event.zod";

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

export async function getMouseEvents({
  page,
  pageX,
  pageY,
  start,
  end,
}: TGetMouseEvents) {
  const [result] = (await prisma.event.aggregateRaw({
    pipeline: [
      {
        $unwind: "$payload.mousePositions",
      },
      {
        $match: {
          name: "mouse",
          "payload.page": page,
          $expr: end
            ? {
                $and: [
                  {
                    $gte: [
                      "$createdAt",
                      {
                        $dateFromString: {
                          dateString: start,
                        },
                      },
                    ],
                  },
                  {
                    $lte: [
                      "$createdAt",
                      {
                        $dateFromString: {
                          dateString: end,
                        },
                      },
                    ],
                  },
                ],
              }
            : {
                $gte: [
                  "$createdAt",
                  {
                    $dateFromString: {
                      dateString: start,
                    },
                  },
                ],
              },
          "payload.mousePositions.pageX": +pageX,
          "payload.mousePositions.pageY": +pageY,
        },
      },
      {
        $project: {
          "payload.mousePositions.clientX": 1,
          "payload.mousePositions.clientY": 1,
        },
      },
      {
        $group: {
          _id: null,
          mousePositions: {
            $push: "$payload.mousePositions",
          },
        },
      },
      {
        $project: {
          _id: 0,
          mousePositions: 1,
        },
      },
    ],
  })) as unknown as [{ mousePositions: { x: number; y: number }[] }];

  if (!result) {
    return [];
  }

  return result.mousePositions;
}
