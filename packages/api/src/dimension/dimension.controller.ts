import { Request, Response, NextFunction } from "express";
import * as dimensionService from "./dimension.service";
import { TCreateDimension } from "./dimension.zod";

export async function createDimension(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body as TCreateDimension;
    const dimension = await dimensionService.createDimension(data);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function getUserAgentsStats({ appId }: Request, res: Response) {
  const stats = await dimensionService.getUserAgentsStats(appId);

  return res.status(200).json(stats);
}

export async function getPageViewsStats({ appId }: Request, res: Response) {
  const stats = await dimensionService.getPageViewsStats(appId);

  return res.status(200).json(stats);
}
