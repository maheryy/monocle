import { Router } from "express";
import { validate } from "../middlewares/validate";
import { CreateMetric } from "./metric";
import { createMetric } from "./metric.controller";

const metricRouter = Router();

metricRouter.post("/", validate(CreateMetric), createMetric);

export default metricRouter;
