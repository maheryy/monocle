import { z } from "zod";
import { BaseBody } from "../common/common.zod";

export const CreateMetric = BaseBody.extend({
  value: z.number(),
});

export type TCreateMetricBody = z.infer<typeof CreateMetric>;
export type TCreateMetricData = Omit<TCreateMetricBody, "source" | "secret">;
