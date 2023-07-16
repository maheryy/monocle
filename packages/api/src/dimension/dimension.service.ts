import prisma from "../database";
import { TCreateDimension } from "./dimension.zod";
import { UAParser } from "ua-parser-js";

export function createDimension(data: TCreateDimension) {
  return prisma.dimension.create({ data });
}

export function getDimensions(appId: string, name?: string) {
  return prisma.dimension.findMany({
    where: {
      appId,
      name,
    },
  });
}

export async function getUserAgentsStats(appId: string) {
  const userAgents = await getDimensions(appId, "UserAgent");

  const devices = userAgents.reduce(
    (acc, { value }) => {
      const { device } = UAParser(value);

      if (device.type) {
        return {
          ...acc,
          [device.type]: acc[device.type] + 1,
          total: acc.total + 1,
        };
      }

      return acc;
    },
    {
      console: 0,
      mobile: 0,
      tablet: 0,
      smarttv: 0,
      wearable: 0,
      embedded: 0,
      total: 0,
    } as { [key: string]: number }
  );

  return Object.entries(devices).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        count: value,
        percentage: value / devices.total,
      },
    }),
    {} as { [key: string]: { count: number; percentage: number } }
  );
}

export async function countDimensions(appId: string, name?: string) {
  return prisma.dimension.count({
    where: {
      appId,
      name,
    },
  });
}

export async function getPageViewsStats(appId: string) {
  const pageViewsCount = await countDimensions(appId, "PageView");

  const pageViews = await prisma.dimension.groupBy({
    by: ["value"],
    where: {
      appId,
      name: "PageView",
    },
    _count: {
      value: true,
    },
    orderBy: {
      _count: {
        value: "desc",
      },
    },
    take: 10,
  });

  return pageViews.reduce(
    (acc, { value, _count }) => ({
      ...acc,
      [value]: {
        count: _count.value,
        percentage: _count.value / pageViewsCount,
      },
    }),
    {} as { [key: string]: { count: number; percentage: number } }
  );
}
