import prisma from "../database";
import { TCreateDimension } from "./dimension";

export function createDimension(data: TCreateDimension) {
  return prisma.dimension.create({
    data,
  });
}
