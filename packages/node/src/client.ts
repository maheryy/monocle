import { BaseClient } from "@monocle/core";
import { MonocleClientOptions } from "./types";
import wretch, { Wretch } from "wretch";

export class MonocleClient extends BaseClient {
  w: Wretch<unknown, unknown, undefined>;
  private secret: string;
  private static monocleInstance: MonocleClient;

  private constructor(options: MonocleClientOptions) {
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

    this.w
      .post(data, url)
      .res()
      .then((res) => console.info(`[Monocle] Request ${url} complete`))
      .catch((err) => console.error(`[Monocle] Error: ${err.message}`));
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

  time(action: string, duration = performance.now()): void {
    this.metric(action, duration);
  }

  static initialize(options: MonocleClientOptions) {
    if (this.monocleInstance) {
      return this.monocleInstance;
    }

    this.monocleInstance = new MonocleClient(options);
    return this.monocleInstance;
  }

  static isInitialized() {
    if (!this.monocleInstance) {
      throw new Error("Monocle has not been initialized.");
    }
  }

  static event(name: string, payload?: Record<string, unknown>) {
    this.isInitialized();
    return this.monocleInstance.event(name, payload);
  }

  static metric(name: string, value: number) {
    this.isInitialized();
    return this.monocleInstance.metric(name, value);
  }

  static dimension(name: string, value: string) {
    this.isInitialized();
    return this.monocleInstance.dimension(name, value);
  }

  static time(action: string, duration = performance.now()) {
    this.isInitialized();
    return this.monocleInstance.time(action, duration);
  }
}
