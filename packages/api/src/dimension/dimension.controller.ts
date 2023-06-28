import { Request, Response } from "express";
import * as dimensionService from "./dimension.service";

export async function createDimension({ body }: Request, res: Response) {
  const dimension = await dimensionService.createDimension(body);

  return res.json(dimension);
}
