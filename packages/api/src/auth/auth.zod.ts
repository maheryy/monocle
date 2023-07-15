import { z } from "zod";

export const LoginData = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterData = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
});

export type TLoginData = z.infer<typeof LoginData>;
export type TRegisterData = z.infer<typeof RegisterData>;
