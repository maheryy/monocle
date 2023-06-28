import express from "express";
import metricRouter from "./routes/metrics";
import eventRouter from "./routes/events";
import dimensionRouter from "./routes/dimensions";
import docsRouter from "./routes/docs";

export function createMonocleServer() {
  const app = express();

  app.use(express.json());

  app.use("/docs", docsRouter);

  app.use("/metrics", metricRouter);

  app.use("/events", eventRouter);

  app.use("/dimensions", dimensionRouter);

  return app;
}
