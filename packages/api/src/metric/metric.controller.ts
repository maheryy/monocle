import { Request, Response, NextFunction } from "express";
import * as metricService from "./metric.service";
import { TCreateMetricBody } from "./metric.zod";

export async function createMetric(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { source, secret, ...data } = req.body as TCreateMetricBody;
    const metric = await metricService.createMetric(data);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}
