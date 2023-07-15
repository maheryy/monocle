import { z } from "zod";
import { LoginData, RegisterData } from "./auth.zod";

export type TLoginData = z.infer<typeof LoginData>;
export type TRegisterData = z.infer<typeof RegisterData>;

export interface JwtPayload {
  userId: string;
}
