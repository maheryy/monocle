import prisma from "../database";
import { TCreateDimensionData } from "./dimension.zod";
import { UAParser } from "ua-parser-js";

export function createDimension(data: TCreateDimensionData) {
  return prisma.dimension.create({ data });
}

export function getDimensions(name?: string) {
  return prisma.dimension.findMany({
    where: {
      name,
    },
  });
}

export async function getUserAgentsStats() {
  const userAgents = await getDimensions("UserAgent");

  const devices = userAgents.reduce(
    (acc, { value }) => {
      const { device } = new UAParser(value).getResult();

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
      [key]: value / devices.total,
    }),
    {} as { [key: string]: number }
  );
}

export async function countDimensions(name?: string) {
  return prisma.dimension.count({
    where: {
      name,
    },
  });
}

export async function getPageViewsStats() {
  const pageViewsCount = await countDimensions("PageView");

  const pageViews = await prisma.dimension.groupBy({
    by: ["value"],
    where: {
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
