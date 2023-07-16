import { Request, Response, NextFunction } from "express";
import * as metricService from "./metric.service";
import { TCreateMetricData } from "./metric.zod";

export async function createMetric(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body as TCreateMetricData;
    const metric = await metricService.createMetric(data);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function getMetricStats({ params }: Request, res: Response) {
  const stats = await metricService.getMetricStats(params.name);

  return res.status(200).json(stats);
}
