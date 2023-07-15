import { createMonocleServer } from "@ekezoh/monocle.api";

const server = createMonocleServer({
  corsOptions: {
    origin: [
      "http://localhost:8080",
      "http://localhost:8081",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  },
});

server.listen(3000);
