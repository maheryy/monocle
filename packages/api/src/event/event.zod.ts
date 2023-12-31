import { z } from "zod";
import { BaseBody } from "../common/common.zod";
import { JsonObject } from "type-fest";

const Event = BaseBody.extend({
  payload: z.record(z.unknown()),
});

export const CreateEvent = Event.omit({
  source: true,
  secret: true,
});

export const GetMouseEvents = z
  .object({
    page: z.string(),
    pageX: z.string().regex(/^\d+$/),
    pageY: z.string().regex(/^\d+$/),
    start: z
      .string()
      .datetime({
        message:
          "Invalid date format. Please use ISO format (YYYY-MM-DDTHH:mm:ss.SSSZ)",
      })
      .default(() => {
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return today.toISOString();
      }),
    end: z.string().datetime().optional(),
  })
  .refine(
    ({ end, start }) => {
      if (!end) {
        return true;
      }

      return new Date(end) > new Date(start);
    },
    {
      message: "End date must be greater than start date",
    }
  );

export type TEvent = z.infer<typeof Event>;

export type TCreateEvent = z.infer<typeof CreateEvent> & {
  payload: JsonObject;
};

export type TGetMouseEvents = z.infer<typeof GetMouseEvents>;
