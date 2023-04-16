import { Client, ClientOptions } from "../types";

export abstract class BaseClient implements Client {
  protected readonly appId: string;

  constructor(options: ClientOptions) {
    this.appId = options.appId;
  }

  abstract track(eventName: string, payload: unknown): void;
  abstract identify(userId: string, payload: unknown): void;
}
