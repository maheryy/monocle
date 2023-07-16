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
