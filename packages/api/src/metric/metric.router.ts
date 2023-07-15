import { Router } from "express";
import { validate } from "../middlewares/validate";
import { CreateMetric, GetMetricStats } from "./metric.zod";
import { createMetric, getMetricStats } from "./metric.controller";
import { verifyApp } from "../middlewares/verify";

const metricRouter: Router = Router();

metricRouter.post("/", validate(CreateMetric), verifyApp, createMetric);

metricRouter.get("/:name", validate(GetMetricStats), getMetricStats);

export default metricRouter;
