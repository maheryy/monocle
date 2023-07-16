import { z } from "zod";
import { BaseBody } from "../common/common.zod";

export const CreateDimension = BaseBody.extend({
  value: z.string(),
});

export type TCreateDimensionBody = z.infer<typeof CreateDimension>;
export type TCreateDimensionData = Omit<
  TCreateDimensionBody,
  "source" | "secret"
>;
