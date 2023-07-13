# Monocle

Monocle is a web analytics tool that allows you to track user interactions on your website.

## Architecture

Monocle is split into multiple packages

### Server packages (The ones you will always need)

`@monocle/api`: handles requests from the different clients and stores data in the database.

`@monocle/ui`: allows you to view analytics data.

### Client packages (The ones you may need)

`@monocle/browser`: focuses on tracking interactions and collecting data that may occur in a browser.

`@monocle/node`: focuses on tracking interactions and collecting data that may occur in a node environment.

## Installation

### As a dependency

```sh
npm install @ekezoh/monocle.api
```

```sh
yarn add @ekezoh/monocle.api
```

```sh
pnpm add @ekezoh/monocle.api
```

### Usage

Use the `createMonocleServer` function to create an express server that will handle requests from the different clients.

```ts
import { createMonocleServer } from "@ekezoh/monocle.api";

const server = createMonocleServer({
  corsOrigin: "https://example.com",
});

server.listen(3000);
```

### As a standalone server

Make sure to set the following environment variables:

MONOCLE_DATABASE_URL: The url of the database to use. (no default)

MONOCLE_CORS_ORIGIN: The origin to allow cors from. (default: `*`)

#### Example using docker

```sh
docker run -p 3000:3000 --env-file .env -d @ekezoh/monocle.api
```
