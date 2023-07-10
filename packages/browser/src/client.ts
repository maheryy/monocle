import { BaseClient, Payload } from "@monocle/core";
import { BrowserClientOptions } from "./types";
import { onCLS, onLCP, onFID, onFCP, onTTFB, onINP } from "web-vitals";

export class BrowserClient extends BaseClient {
  constructor({ app, url }: BrowserClientOptions) {
    super({ app, url });
  }

  private send(endpoint: string, payload: Payload): void {
    const body = new Blob(
      [
        JSON.stringify({
          ...payload,
          app: this.app,
          userId: this.userId,
        }),
      ],
      { type: "application/json" }
    );

    const url = new URL(endpoint, this.url);

    const isQueued = navigator.sendBeacon(url, body);

    if (!isQueued) {
      fetch(url, { body, method: "POST", keepalive: true });
    }
  }

  event(name: string, payload?: Payload): void {
    this.send("/events", { name, payload });
  }

  metric(name: string, value: number): void {
    this.send("/metrics", { name, value });
  }

  dimension(name: string, value: string): void {
    this.send("/dimensions", { name, value });
  }

  page(): void {
    this.dimension("page", window.location.href);
  }

  time(action: string, duration = performance.now()): void {
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
