import { Router } from "express";
import { validate } from "../middlewares/validate";
import { CreateMetric } from "./metric.zod";
import { createMetric } from "./metric.controller";
import { verifyApp } from "../middlewares/verify";

const metricRouter: Router = Router();

metricRouter.post("/", validate(CreateMetric), verifyApp, createMetric);

export default metricRouter;
