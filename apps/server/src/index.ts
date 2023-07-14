import { createMonocleServer } from "@ekezoh/monocle.api";

const server = createMonocleServer({
  corsOptions: { origin: "*" },
});

server.listen(3000);
