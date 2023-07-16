import { BaseClient } from "@monocle/core";
import { NodeClientOptions } from "./types";
import wretch, { Wretch } from "wretch";

export class MonocleClient extends BaseClient {
  w: Wretch<unknown, unknown, undefined>;
  private secret: string;

  constructor(options: NodeClientOptions) {
    super(options);
    this.w = wretch(options.host);
    this.secret = options.secret;
  }

  private send(url: string, payload: Record<string, unknown>): void {
    const data = {
      ...payload,
      app: this.app,
      visitorId: this.visitorId,
      appId: this.appId,
      secret: this.secret,
      source: "node",
    };

    this.w.post(data, url);
  }

  event(name: string, payload?: Record<string, unknown>): void {
    this.send("/events", { name, ...(payload ? { payload } : {}) });
  }

  metric(name: string, value: number): void {
    this.send("/metrics", { name, value });
  }

  dimension(name: string, value: string): void {
    this.send("/dimensions", { name, value });
  }
}
