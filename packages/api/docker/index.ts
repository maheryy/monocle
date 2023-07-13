import { createMonocleServer } from "../src";

const { MONOCLE_DATABASE_URL, MONOCLE_CORS_ORIGIN } = process.env;

if (!MONOCLE_DATABASE_URL) {
  throw new Error("Missing MONOCLE_DATABASE_URL");
}

if (!MONOCLE_CORS_ORIGIN) {
  console.warn("No MONOCLE_CORS_ORIGIN provided, defaulting to *");
}

const origin = MONOCLE_CORS_ORIGIN || "*";

const server = createMonocleServer({
  corsOptions: {
    origin,
  },
});

server.listen(3000, () => {
  console.log("Monocle API server listening on port", 3000);
});
