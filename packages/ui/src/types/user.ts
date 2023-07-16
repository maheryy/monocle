import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

export type TUser = z.infer<typeof userSchema>;
