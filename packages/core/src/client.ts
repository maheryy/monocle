import { Client, ClientOptions, Payload } from "./types";

export abstract class BaseClient implements Client {
  /**
   * The name of the app
   */
  app: string;

  /**
   * The unique ID of the user
   */
  userId: string;

  /**
   * The public key of the app
   */
  identifier: string;

  /**
   * Monocle server host
   */
  host: string;

  constructor(options: ClientOptions) {
    this.app = options.app;
    this.host = options.host;
    this.identifier = options.identifier;
    this.userId = crypto.randomUUID();
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
      this.userId = crypto.randomUUID();

      return this.event("identify", { userId: this.userId });
    }

    this.userId = userId;

    if (!payload) {
      return this.event("identify", { userId: this.userId });
    }

    this.event("identify", { userId: this.userId, ...payload });
  }
}
