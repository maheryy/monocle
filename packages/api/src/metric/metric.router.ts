import { Router } from "express";
import { validate } from "../middlewares/validate";
import { CreateMetric } from "./metric.zod";
import { createMetric } from "./metric.controller";

const metricRouter: Router = Router();

metricRouter.post("/", validate(CreateMetric), createMetric);

export default metricRouter;
