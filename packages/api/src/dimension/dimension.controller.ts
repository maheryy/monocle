import { Request, Response, NextFunction } from "express";
import * as dimensionService from "./dimension.service";
import { TCreateDimensionData } from "./dimension.zod";

export async function createDimension(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body as TCreateDimensionData;
    const dimension = await dimensionService.createDimension(data);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function getUserAgentsStats(req: Request, res: Response) {
  const stats = await dimensionService.getUserAgentsStats();

  return res.status(200).json(stats);
}
