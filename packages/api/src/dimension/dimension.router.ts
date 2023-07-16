import { Router } from "express";
import { validate } from "../middlewares/validate";
import { CreateDimension } from "./dimension.zod";
import { createDimension } from "./dimension.controller";
import { verifyApp } from "../middlewares/verify";

const dimensionRouter: Router = Router();

dimensionRouter.post(
  "/",
  validate(CreateDimension),
  verifyApp,
  createDimension
);

export default dimensionRouter;
