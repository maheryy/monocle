# Monocle

Monocle is a web analytics tool that allows you to track user interactions on your website.

## Architecture

Monocle is split into multiple packages

### Server packages (The ones you will always need)

`@monocle/api` handles requests from the different clients and stores data in the database.

`@monocle/ui` allows you to view analytics data.

### Client packages (The ones you may need)

`@monocle/browser` focuses on tracking interactions and collecting data that may occur in a browser.

`@monocle/node` focuses on tracking interactions and collecting data that may occur in a node environment.

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

Use the `createMonocleServer` function to create an [express](https://expressjs.com/en/4x/api.html#express) server that you can extend.

```ts
import { createMonocleServer } from "@ekezoh/monocle.api";

const server = createMonocleServer({
  corsOrigin: "https://example.com",
});

server.listen(3000);
```

### As a standalone server

Make sure to set the following environment variables:

`MONOCLE_DATABASE_URL` is the url of the database to use. (no default)

`MONOCLE_CORS_ORIGIN` is the origin to allow cors from. (default: `*`)

#### Example using docker

```sh
docker run -p 3000:3000 --env-file .env -d @ekezoh/monocle.api
```

## Contributing

### Requirements

- [Node.js](https://nodejs.org/en/) >= 18.16.1
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Setup

At the root of the repository, run the following command to install all dependencies:

```sh
pnpm install
```

### Development

#### Database

Copy all `.env.example` files to `.env` files.

```sh
# Linux based systems
find . -type f -name ".env.example" -exec sh -c 'cp "$1" "${1%.example}"' _ {} \;
```

To start the development database, run the following command:

```sh
docker compose up -d

docker compose exec mongo mongosh --eval 'rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "localhost:27017" }] })'
```

To seed the database, run the following commands in the `packages/api` directory:

```sh
pnpm exec prisma generate
pnpm exec prisma db seed
```

To view the data, you can use [prisma studio](https://www.prisma.io/studio).

```sh
pnpm exec prisma studio
```

Or use mongo-express running on port [8888](http://localhost:8888).

#### Packages

`api` and `ui` has a `dev` script that you can run to start the development server.

```sh
pnpm dev
```

Other packages can be built using nx

```sh
pnpm exec nx build <package>
```
