import { ClientOptions } from "@monocle/core";

export interface NodeClientOptions extends ClientOptions {
  secret: string;
}
