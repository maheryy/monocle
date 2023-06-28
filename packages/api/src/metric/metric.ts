import { z } from "zod";
import { Common } from "../common/common";

export const Metric = Common.extend({
  value: z.number(),
});

export const CreateMetric = Metric.omit({ id: true });

export type TMetric = z.infer<typeof Metric>;

export type TCreateMetric = z.infer<typeof CreateMetric>;
