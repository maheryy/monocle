import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

export function validate(schema: ZodEffects<AnyZodObject> | AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        ...req.body,
        ...req.params,
        ...req.query,
      });

      return next();
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}
