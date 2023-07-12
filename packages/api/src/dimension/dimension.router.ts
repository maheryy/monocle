import { Router } from "express";
import { validate } from "../middlewares/validate";
import { CreateDimension } from "./dimension";
import { createDimension } from "./dimension.controller";

const dimensionRouter: Router = Router();

dimensionRouter.post("/", validate(CreateDimension), createDimension);

export default dimensionRouter;
