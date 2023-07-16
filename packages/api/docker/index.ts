import { createMonocleServer } from "../src";

const { MONOCLE_DATABASE_URL, MONOCLE_CORS_ORIGIN, JWT_SECRET } = process.env;

if (!MONOCLE_DATABASE_URL) {
  throw new Error("Missing MONOCLE_DATABASE_URL");
}

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}

if (!MONOCLE_CORS_ORIGIN) {
  console.warn("No MONOCLE_CORS_ORIGIN provided, defaulting to *");
}

const origin = MONOCLE_CORS_ORIGIN || "*";

const server = createMonocleServer({
  corsOptions: {
    origin,
    credentials: true,
  },
});

server.listen(3000, () => {
  console.log("Monocle API server listening on port", 3000);
});
