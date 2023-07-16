import { z } from "zod";
import { BaseBody } from "../common/common.zod";

export const CreateMetric = BaseBody.extend({
  value: z.number(),
});

export const GetMetricStats = z.object({
  name: z.enum(["CLS", "FCP", "FID", "LCP", "TTFB", "INP"]),
});

export type TCreateMetricBody = z.infer<typeof CreateMetric>;
export type TCreateMetricData = Omit<TCreateMetricBody, "source" | "secret">;
export type TGetMetricStats = z.infer<typeof GetMetricStats>;
