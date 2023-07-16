import { z } from "zod";
import { BaseBody } from "../common/common.zod";

const Metric = BaseBody.extend({
  value: z.number(),
});

export const CreateMetric = Metric.omit({
  source: true,
  secret: true,
});

export const GetMetricStats = z.object({
  name: z.enum(["CLS", "FCP", "FID", "LCP", "TTFB", "INP"]),
});

export type TMetric = z.infer<typeof Metric>;
export type TCreateMetric = z.infer<typeof CreateMetric>;
export type TGetMetricStats = z.infer<typeof GetMetricStats>;
