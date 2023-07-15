import express, { Express } from "express";
import metricRouter from "./metric/metric.router";
import eventRouter from "./event/event.router";
import dimensionRouter from "./dimension/dimension.router";
import docsRouter from "./docs/docs.router";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { MonocleServerOptions } from "./types";
import authRouter from "./auth/auth.router";

export function createMonocleServer({
  corsOptions,
}: MonocleServerOptions = {}): Express {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(compression());
  app.use(helmet());

  app.use("/docs", docsRouter);
  app.use("/auth", authRouter);
  app.use("/metrics", metricRouter);
  app.use("/events", eventRouter);
  app.use("/dimensions", dimensionRouter);

  return app;
}
