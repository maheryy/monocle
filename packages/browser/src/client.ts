import { BaseClient } from "@monocle/core";

export class BrowserClient extends BaseClient {
  track(eventName: string, payload: unknown): void {
    throw new Error("Method not implemented.");
  }

  identify(userId: string, payload: unknown): void {
    throw new Error("Method not implemented.");
  }
}
