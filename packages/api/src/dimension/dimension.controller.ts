import { Request, Response, NextFunction } from "express";
import * as dimensionService from "./dimension.service";
import { TCreateDimensionBody } from "./dimension.zod";

export async function createDimension(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { source, secret, ...data } = req.body as TCreateDimensionBody;
    const dimension = await dimensionService.createDimension(data);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}
