import { Router } from "express";

const eventRouter = Router();

eventRouter.post("/", (req, res) => {
  res.send("POST /event");
});

export default eventRouter;
