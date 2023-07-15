import { BrowserClient } from "@monocle/browser";

const monocle = new BrowserClient({
  app: "nextjs-blog",
  url: "http://localhost:3000",
});

export default monocle;
