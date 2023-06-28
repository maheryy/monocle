import { createMonocleServer } from "./app";

const server = createMonocleServer();

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
