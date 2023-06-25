import { BaseClient, Payload } from "@monocle/core";
import { BrowserClientOptions } from "./types";

export class BrowserClient extends BaseClient {
  constructor({ app, url }: BrowserClientOptions) {
    super({ app, url });
  }

  private send(url: string, payload: Payload): void {
    const data = JSON.stringify({
      ...payload,
      app: this.app,
      id: this.id,
    });

    navigator.sendBeacon(url, data);
  }

  event(eventName: string, payload?: Payload): void {
    this.send("/event", { ...payload, event: eventName });
  }

  page(): void {
    this.send("/page", { url: window.location.href });
  }
}
