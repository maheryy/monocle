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

  track(eventName: string, payload?: Payload): void {
    this.send("/track", { ...payload, event: eventName });
  }

  page(): void {
    this.send("/page", { url: window.location.href });
  }
}
