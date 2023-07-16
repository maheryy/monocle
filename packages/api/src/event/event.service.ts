import prisma from "../database";
import { TCreateEvent, TGetMouseEvents } from "./event.zod";

export function createEvent(data: TCreateEvent) {
  return prisma.event.create({ data });
}

export function countEvents(appId: string, name?: string) {
  return prisma.event.count({
    where: {
      name,
    },
  });
}

export async function getEventsStats(appId: string) {
  const eventsCount = await countEvents(appId);

  const events = await prisma.event.groupBy({
    by: ["name"],
    where: {
      appId,
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

export async function getMouseEvents(
  appId: string,
  { page, pageX, pageY, start, end }: TGetMouseEvents
) {
  const [result] = (await prisma.event.aggregateRaw({
    pipeline: [
      {
        $unwind: "$payload.mousePositions",
      },
      {
        $match: {
          name: "mouse",
          "payload.page": page,
          appId,
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
