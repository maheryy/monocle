import { z } from "zod";

export const Dimension = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

export const CreateDimension = Dimension.omit({ id: true });

export type TDimension = z.infer<typeof Dimension>;

export type TCreateDimension = z.infer<typeof CreateDimension>;
