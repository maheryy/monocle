import express, { Express } from "express";
import { MonocleServerOptions } from "./types";
import { config } from "dotenv";
import helmet from "helmet";
import cors from "cors";
import metricRouter from "./metric/metric.router";
import eventRouter from "./event/event.router";
import dimensionRouter from "./dimension/dimension.router";
import docsRouter from "./docs/docs.router";
import compression from "compression";
import authRouter from "./auth/auth.router";
import { exceptionHandler } from "./middlewares/exception";

export function createMonocleServer({
  corsOptions,
}: MonocleServerOptions = {}): Express {
  const app = express();
  config();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(compression());
  app.use(helmet());

  app.use("/docs", docsRouter);
  app.use("/auth", authRouter);
  app.use("/metrics", metricRouter);
  app.use("/events", eventRouter);
  app.use("/dimensions", dimensionRouter);
  app.use(exceptionHandler);

  return app;
}
