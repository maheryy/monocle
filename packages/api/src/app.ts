import express from "express";
import metricRouter from "./metric/metric.router";
import eventRouter from "./event/event.router";
import dimensionRouter from "./dimension/dimension.router";
import docsRouter from "./docs/docs.router";

export function createMonocleServer() {
  const app = express();

  app.use(express.json());

  app.use("/docs", docsRouter);

  app.use("/metrics", metricRouter);

  app.use("/events", eventRouter);

  app.use("/dimensions", dimensionRouter);

  return app;
}
