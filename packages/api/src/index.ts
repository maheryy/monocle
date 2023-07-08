import { createMonocleServer } from "./app";

const server = createMonocleServer({
  corsOptions: {
    origin: "http://localhost:5173",
  },
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
