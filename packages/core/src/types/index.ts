export interface Payload {
  [key: string]: unknown;
}

export interface Client {
  app: string;
  userId: string;
  url: string;
  identify(userId?: string, payload?: Payload): void;
  event(eventName: string, payload?: Payload): void;
  metric(metricName: string, value: number): void;
  dimension(dimensionName: string, value: string): void;
}

export interface ClientOptions {
  app: string;
  url: string;
}
