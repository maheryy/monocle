import { BaseClient, Payload } from "@monocle/core";
import { BrowserClientOptions } from "./types";
import { onCLS, onLCP, onFID, onFCP, onTTFB, onINP } from "web-vitals";

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

  event(name: string, payload?: Payload): void {
    this.send("/event", { name, payload });
  }

  metric(name: string, value: number): void {
    this.send("/metric", { name, value });
  }

  dimension(name: string, value: string): void {
    this.send("/dimension", { name, value });
  }

  page(): void {
    this.dimension("page", window.location.href);
  }

  time(action: string, duration: number): void {
    this.metric(action, duration);
  }

  vitals(): void {
    onCLS(({ name, value }) => {
      this.metric(name, value);
    });

    onLCP(({ name, value }) => {
      this.metric(name, value);
    });

    onFID(({ name, value }) => {
      this.metric(name, value);
    });

    onFCP(({ name, value }) => {
      this.metric(name, value);
    });

    onTTFB(({ name, value }) => {
      this.metric(name, value);
    });

    onINP(({ name, value }) => {
      this.metric(name, value);
    });
  }
}
