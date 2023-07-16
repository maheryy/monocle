import prisma from "../database";
import { TCreateDimensionData } from "./dimension.zod";

export function createDimension(data: TCreateDimensionData) {
  return prisma.dimension.create({ data });
}
