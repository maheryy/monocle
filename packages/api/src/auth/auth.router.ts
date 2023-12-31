import { Router } from "express";
import * as AuthController from "./auth.controller";
import { validate } from "../middlewares/validate";
import { LoginData, RegisterData } from "./auth.zod";
import { authenticate } from "../middlewares/auth";

const authRouter: Router = Router();

authRouter.post("/login", validate(LoginData), AuthController.login);
authRouter.post("/register", validate(RegisterData), AuthController.register);
authRouter.get("/profile", authenticate, AuthController.profile);

export default authRouter;
