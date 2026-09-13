FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./

COPY apps/frontend ./apps/frontend

COPY shared ./shared
COPY types ./types
COPY base ./base
COPY packages ./packages

RUN pnpm install

WORKDIR /app/apps/frontend

RUN pnpm build

FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/apps/frontend/.output ./.output

EXPOSE 3001

CMD ["node", ".output/server/index.mjs"]