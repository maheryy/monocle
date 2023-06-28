import { z } from "zod";
import { JsonObject } from "type-fest";
import { Common } from "../common/common";

export const Event = Common.extend({
  payload: z.record(z.unknown()),
});

export const CreateEvent = Event.omit({ id: true });

export type TEvent = z.infer<typeof Event> & {
  payload: JsonObject;
};

export type TCreateEvent = z.infer<typeof CreateEvent> & {
  payload: JsonObject;
};
