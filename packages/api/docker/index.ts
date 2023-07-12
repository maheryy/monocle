import { createMonocleServer } from "../src";

const server = createMonocleServer();

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
