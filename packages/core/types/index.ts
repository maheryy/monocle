export interface Client {
  track(eventName: string, payload: unknown): void;
  identify(userId: string, payload: unknown): void;
}

export interface ClientOptions {
  appId: string;
}
