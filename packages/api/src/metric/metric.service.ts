import prisma from "../database";
import { TCreateMetricData } from "./metric.zod";

export function createMetric(data: TCreateMetricData) {
  return prisma.metric.create({ data });
}
