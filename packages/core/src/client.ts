import { Client, ClientOptions, Payload } from "./types";

export abstract class BaseClient implements Client {
  /**
   * The name of the app
   */
  app: string;

  /**
   * The unique ID of the user
   */
  visitorId: string;

  /**
   * The public key of the app
   */
  appId: string;

  /**
   * Monocle server host
   */
  host: string;

  constructor(options: ClientOptions) {
    this.app = options.app;
    this.host = options.host;
    this.appId = options.appId;
    this.visitorId = crypto.randomUUID();
  }

  /**
   * Sends an event
   */
  abstract event(name: string, payload: Payload): void;

  /**
   * Sends a metric
   */
  abstract metric(name: string, value: number): void;

  /**
   * Sends a dimension
   */
  abstract dimension(name: string, value: string): void;

  /**
   * Identifies a user with an unique ID
   */
  identify(userId?: string, payload?: Payload): void {
    if (!userId) {
      this.visitorId = crypto.randomUUID();

      return this.event("identify", { userId: this.visitorId });
    }

    this.visitorId = userId;

    if (!payload) {
      return this.event("identify", { userId: this.visitorId });
    }

    this.event("identify", { userId: this.visitorId, ...payload });
  }
}
