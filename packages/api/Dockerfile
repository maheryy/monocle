FROM node:19-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.json ./
COPY packages/api ./packages/api

RUN npm install -g pnpm
RUN pnpm install

RUN pnpm nx build:docker @ekezoh/monocle.api

ENV NODE_ENV production

WORKDIR /app/packages/api

RUN pnpm prisma generate

EXPOSE 3000

CMD ["node", "dist/index.js"]