import { BrowserClient, Payload } from "@monocle/browser";
import { ReactClientOptions } from "./types";

export class ReactClient extends BrowserClient {
  constructor({ app, url }: ReactClientOptions) {
    super({ app, url });
  }
}
