import prisma from "../database";
import { TCreateMetric } from "./metric.zod";

export function createMetric(data: TCreateMetric) {
  return prisma.metric.create({ data });
}

export async function getMetricStats(appId: string, name: string) {
  const { _avg, _max, _min } = await prisma.metric.aggregate({
    where: {
      appId,
      name,
    },
    _avg: {
      value: true,
    },
    _min: {
      value: true,
    },
    _max: {
      value: true,
    },
  });

  return {
    avg: _avg.value ?? 0,
    min: _min.value ?? 0,
    max: _max.value ?? 0,
  };
}
