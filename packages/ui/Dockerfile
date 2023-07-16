FROM node:19-alpine as build

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.json ./
COPY packages/ui ./packages/ui

RUN npm install -g pnpm
RUN pnpm install

ARG VITE_API_URL
ENV VITE_API_URL $VITE_API_URL

RUN pnpm nx build ui

FROM nginx:1.23-alpine as runner

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY packages/ui/config/nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/packages/ui/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]