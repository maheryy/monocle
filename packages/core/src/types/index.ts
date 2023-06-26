export interface Payload {
  [key: string]: unknown;
}

export interface Client {
  app: string;
  id: string;
  url: string;
  identify(id?: string, payload?: Payload): void;
  event(eventName: string, payload?: Payload): void;
}

export interface ClientOptions {
  app: string;
  url: string;
}
