import { Router } from "express";

const dimensionRouter = Router();

dimensionRouter.post("/", (req, res) => {
  res.send("POST /dimension");
});

export default dimensionRouter;
