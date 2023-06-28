import { z } from "zod";

export const Metric = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
});

export const CreateMetric = Metric.omit({ id: true });

export type TMetric = z.infer<typeof Metric>;

export type TCreateMetric = z.infer<typeof CreateMetric>;
