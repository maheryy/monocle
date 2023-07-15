import prisma from "../database";
import { TCreateMetricData } from "./metric.zod";

export function createMetric(data: TCreateMetricData) {
  return prisma.metric.create({ data });
}

export async function getMetricStats(name: string) {
  const { _avg, _max, _min } = await prisma.metric.aggregate({
    where: {
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
