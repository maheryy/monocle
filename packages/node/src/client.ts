import { BaseClient, Payload } from "@monocle/core";
import { NodeClientOptions } from "./types";
import wretch from "wretch";

export class NodeClient extends BaseClient {
  constructor({ app, url }: NodeClientOptions) {
    super({ app, url });
  }

  track(eventName: string, payload?: Payload): void {
    const w = wretch(this.url);

    const data = {
      ...payload,
      app: this.app,
      event: eventName,
      id: this.id,
    };

    w.post(data, "/track");
  }
}
