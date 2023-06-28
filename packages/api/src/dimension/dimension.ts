import { z } from "zod";
import { Common } from "../common/common";

export const Dimension = Common.extend({
  value: z.string(),
});

export const CreateDimension = Dimension.omit({ id: true });

export type TDimension = z.infer<typeof Dimension>;

export type TCreateDimension = z.infer<typeof CreateDimension>;
