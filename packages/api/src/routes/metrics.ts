import { Router } from "express";

const metricRouter = Router();

metricRouter.post("/", (req, res) => {
  res.send("POST /metric");
});

export default metricRouter;
