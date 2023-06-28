import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.strict().parseAsync({
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
