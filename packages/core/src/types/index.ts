import { JsonObject } from "type-fest";

export interface Payload extends JsonObject {}

export interface Client {
  app: string;
  appId: string;
  host: string;
  visitorId: string;
  identify(userId?: string, payload?: Payload): void;
  event(eventName: string, payload?: Record<string, unknown>): void;
  metric(metricName: string, value: number): void;
  dimension(dimensionName: string, value: string): void;
}

export interface ClientOptions {
  app: string;
  appId: string;
  host: string;
}
