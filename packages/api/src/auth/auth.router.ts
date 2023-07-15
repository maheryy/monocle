import { Router } from "express";
import * as AuthController from "./auth.controller";
import { validate } from "../middlewares/validate";
import { LoginData, RegisterData } from "./auth.zod";

const authRouter = Router();

authRouter.post("/login", validate(LoginData), AuthController.login);
authRouter.post("/register", validate(RegisterData), AuthController.register);

export default authRouter;
