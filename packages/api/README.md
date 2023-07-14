# Monocle API

This package provides a server that handles requests from different clients and stores the data in a MongoDB database.

## Installation

```sh
npm install @ekezoh/monocle.api
```

```sh
yarn add @ekezoh/monocle.api
```

```sh
pnpm add @ekezoh/monocle.api
```

## Usage

Use the `createMonocleServer` function to create an [express](https://expressjs.com/en/4x/api.html#express) server that you can extend.

```ts
import { createMonocleServer } from "@ekezoh/monocle.api";

const server = createMonocleServer({
  corsOrigin: "https://example.com",
});

server.listen(3000);
```

## Environment variables

`MONOCLE_DATABASE_URL` is the url of the database to use. (no default)

## Standalone server

You can also use the docker image to run a standalone server.

Make sure to set the following environment variables:

`MONOCLE_DATABASE_URL` is the url of the database to use. (no default)

`MONOCLE_CORS_ORIGIN` is the origin to allow cors from. (default: `*`)

### Example using docker

```sh
docker run -p 3000:3000 --env-file .env -d @ekezoh/monocle.api
```
