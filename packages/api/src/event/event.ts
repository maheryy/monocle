import { z } from "zod";
import { JsonObject } from "type-fest";

export const Event = z.object({
  id: z.string(),
  name: z.string(),
  payload: z.record(z.unknown()),
});

export const CreateEvent = Event.omit({ id: true });

export type TEvent = z.infer<typeof Event> & {
  payload: JsonObject;
};

export type TCreateEvent = z.infer<typeof CreateEvent> & {
  payload: JsonObject;
};
