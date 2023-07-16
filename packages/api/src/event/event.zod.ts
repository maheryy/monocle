import { z } from "zod";
import { BaseBody } from "../common/common.zod";

export const CreateEvent = BaseBody.extend({
  payload: z.record(z.unknown()),
});

export type TCreateEventBody = z.infer<typeof CreateEvent>;
export type TCreateEventData = Omit<TCreateEventBody, "source" | "secret">;
