ARG NODE_TAG=20.4.0-bullseye-slim

FROM node:${NODE_TAG} as workspace

WORKDIR /home/node

RUN npm install --global pnpm

COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY package.json ./

COPY packages ./packages

COPY tsconfig.json ./

RUN pnpm install --offline



FROM workspace as api

RUN pnpm --filter monocle.api deploy build/api

WORKDIR /home/node/build/api

RUN pnpm build:docker

RUN pnpm exec prisma generate

RUN pnpm prune --prod



FROM node:${NODE_TAG} as production

WORKDIR /home/node/api

COPY --from=api /home/node/build/api/node_modules ./node_modules

COPY --from=api /home/node/build/api/dist .

ENV NODE_ENV production

EXPOSE 3000

USER node

CMD ["node", "index.js"]


