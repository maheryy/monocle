import { z } from "zod";

export const BaseBody = z.object({
  app: z.string(),
  name: z.string(),
  visitorId: z.string(),
  appId: z.string(),
  secret: z.string().optional(),
  source: z.enum(["browser", "node"]),
});
