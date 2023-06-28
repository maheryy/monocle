import { z } from "zod";

export const Common = z.object({
  id: z.string(),
  app: z.string(),
  name: z.string(),
  userId: z.string(),
});
