import { BaseClient, Payload } from "@monocle/core";
import { NodeClientOptions } from "./types";
import wretch, { Wretch } from "wretch";

export class NodeClient extends BaseClient {
  w: Wretch<unknown, unknown, undefined>;

  constructor({ app, url }: NodeClientOptions) {
    super({ app, url });

    this.w = wretch(url);
  }

  private send(url: string, payload: Payload): void {
    const data = {
      ...payload,
      app: this.app,
      id: this.id,
    };

    this.w.post(data, url);
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
}
