import { Request, Response } from "express";
import * as metricService from "./metric.service";

export async function createMetric({ body }: Request, res: Response) {
  const metric = await metricService.createMetric(body);

  return res.status(204).end();
}
