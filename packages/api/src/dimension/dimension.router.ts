import { Router } from "express";
import { validate } from "../middlewares/validate";
import { CreateDimension } from "./dimension.zod";
import {
  createDimension,
  getPageViewsStats,
  getUserAgentsStats,
} from "./dimension.controller";
import { verifyApp } from "../middlewares/verify";
import { authenticate } from "../middlewares/auth";

const dimensionRouter: Router = Router();

dimensionRouter.post(
  "/",
  validate(CreateDimension),
  verifyApp,
  createDimension
);

dimensionRouter.get("/user-agents/stats", authenticate, getUserAgentsStats);

dimensionRouter.get("/page-views/stats", authenticate, getPageViewsStats);

export default dimensionRouter;
