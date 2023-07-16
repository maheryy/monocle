FROM node:19-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.json ./
COPY packages/ ./packages
COPY apps/ ./apps

RUN npm install -g pnpm
RUN pnpm install

ARG NEXT_PUBLIC_MONOCLE_HOST
ARG NEXT_PUBLIC_MONOCLE_ID

ENV NEXT_PUBLIC_MONOCLE_HOST $NEXT_PUBLIC_MONOCLE_HOST
ENV NEXT_PUBLIC_MONOCLE_ID $NEXT_PUBLIC_MONOCLE_ID
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN pnpm nx build blog

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

WORKDIR /app/apps/blog

EXPOSE 8080

CMD ["npm", "start"]