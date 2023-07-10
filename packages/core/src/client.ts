import { Client, ClientOptions, Payload } from "./types";

export abstract class BaseClient implements Client {
  /**
   * The name of the app
   */
  app: string;

  /**
   * The unique ID of the user
   */
  userId: string = crypto.randomUUID();

  /**
   * The URL of the api
   */
  url: string;

  constructor({ app, url }: ClientOptions) {
    this.app = app;
    this.url = url;
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
    if (userId) {
      this.userId = userId;

      if (payload) {
        this.event("identify", payload);
      }
    }

    this.userId = crypto.randomUUID();

    this.event("identify", { userId });
  }
}
