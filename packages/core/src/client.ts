import { Client, ClientOptions, Payload } from "./types";

export abstract class BaseClient implements Client {
  /**
   * The name of the app
   */
  app: string;

  /**
   * The unique ID of the user
   */
  id: string = crypto.randomUUID();

  /**
   * The URL of the api
   */
  url: string;

  constructor({ app, url }: ClientOptions) {
    this.app = app;
    this.url = url;
  }

  /**
   * Identify a user with an unique ID
   */
  abstract track(eventName: string, payload: unknown): void;

  identify(id?: string, payload?: Payload): void {
    if (id) {
      this.id = id;

      if (payload) {
        this.track("identify", payload);
      }

      return;
    }

    this.id = crypto.randomUUID();

    this.track("identify", { id });
  }
}
