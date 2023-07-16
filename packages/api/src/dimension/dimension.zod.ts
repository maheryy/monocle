import { z } from "zod";
import { BaseBody } from "../common/common.zod";

const Dimension = BaseBody.extend({
  value: z.string(),
});

export const CreateDimension = Dimension.omit({
  source: true,
  secret: true,
});

export type TDimension = z.infer<typeof Dimension>;
export type TCreateDimension = z.infer<typeof CreateDimension>;
