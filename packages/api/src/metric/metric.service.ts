import prisma from "../database";
import { TCreateMetric } from "./metric";

export function createMetric(data: TCreateMetric) {
  return prisma.metric.create({
    data,
  });
}
