FROM node:24-alpine
WORKDIR /app
RUN corepack enable

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm tsc --build apps/spotify

EXPOSE 3102
CMD ["node", "apps/spotify/dist/start.js"]