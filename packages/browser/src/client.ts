import { BaseClient, Payload } from "@monocle/core";
import { BrowserClientOptions } from "./types";

export class BrowserClient extends BaseClient {
  constructor({ app, url }: BrowserClientOptions) {
    super({ app, url });
  }

  track(eventName: string, payload?: Payload): void {
    const url = new URL("/track ", this.url);

    const data = JSON.stringify({
      ...payload,
      app: this.app,
      event: eventName,
      id: this.id,
    });

    navigator.sendBeacon(url, data);
  }
}
